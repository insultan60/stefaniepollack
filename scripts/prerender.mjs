// Prerenders every public page to static HTML after `vite build`.
//
// Why: this is a client-rendered React app, so the HTML the server sends is an
// empty <div id="root"></div> plus one shared <title>. Crawlers that don't run
// JavaScript (and Screaming Frog in text mode) saw no page content at all, and
// every page had the homepage's title and canonical. Here each route in
// src/lib/seo.ts is rendered once in Node (via the SSR bundle of
// src/entry-server.tsx) and written to out/<route>/index.html with its own
// title, description and canonical. In the browser, main.tsx hydrates that
// markup, so the site behaves exactly as before.
//
// Routes that aren't prerendered (single listings, account, dashboard, 404s)
// are served the untouched shell, out/spa.html — see the rewrite in vercel.json.

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "out");
const serverDir = join(root, "out-server");

const template = await readFile(join(outDir, "index.html"), "utf8");
// The empty shell, for every route that isn't prerendered.
await writeFile(join(outDir, "spa.html"), template);

// Locally the IDX key lives in .env.local; on Vercel it's already in the
// environment. Only fill in what isn't set.
try {
  for (const line of (await readFile(join(root, ".env.local"), "utf8")).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // no .env.local — fine on Vercel
}

const server = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);

// Real listings, so /, /listings and each listing's own page carry the homes
// in their HTML instead of "Loading listings…". See src/lib/listingsSeed.ts.
const listings = await server.loadListings();
const listingsScript = listings
  ? `<script>window.__LISTINGS__=${JSON.stringify(listings).replace(/</g, "\\u003c")}</script>`
  : "";

const pages = server.PRERENDER_PATHS.map((path) => ({ path, meta: server.getPageMeta(path) }));
if (listings) {
  const all = [
    ...listings.available.map((p) => ({ p, label: `${p.price} · For Sale` })),
    ...listings.sold.map((p) => ({ p, label: `Sold ${p.dateSold}` })),
  ];
  const seen = new Set();
  for (const { p, label } of all) {
    if (!p.slug || seen.has(p.slug)) continue;
    seen.add(p.slug);
    pages.push({
      path: `/listings/${p.slug}`,
      meta: {
        title: `${p.address}, ${p.city} | Stefanie Pollack`,
        description: `${p.address}, ${p.city} — ${p.beds} bed, ${p.baths} bath, ${p.sqft} sq ft. ${label}. Listed by Stefanie Pollack, Studio City Compass Realtor.`,
      },
    });
  }
  console.log(`listings: ${listings.available.length} for sale, ${listings.sold.length} sold`);
}

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function setAttr(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${pattern}`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeAttr(value)}${after}`);
}

let failed = 0;
for (const { path, meta } of pages) {
  try {
    const url = server.canonicalUrl(path);
    const body = server.render(path);

    let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    // Only pages that show listings (via useIdxListings) need the snapshot;
    // the rest would just download ~90 KB they never read.
    if (path === "/" || path === "/listings" || path.startsWith("/listings/")) {
      html = html.replace("</head>", `${listingsScript}</head>`);
    }
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(meta.title)}</title>`);
    html = setAttr(html, /(<meta name="description" content=")[^"]*(")/, meta.description);
    html = setAttr(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title);
    html = setAttr(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description);
    html = setAttr(html, /(<meta property="og:url" content=")[^"]*(")/, url);
    html = setAttr(html, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title);
    html = setAttr(html, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description);
    html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url);

    const file = path === "/" ? join(outDir, "index.html") : join(outDir, path, "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`prerendered ${path}`);
  } catch (err) {
    failed++;
    console.error(`prerender failed for ${path}:`, err);
  }
}

// sitemap.xml and robots.txt, generated from the same page list so they can
// never drift from what's actually published. URLs are the canonical form
// (no trailing slash) — a trailing-slash URL 308-redirects (vercel.json
// "trailingSlash": false), and sitemap entries that redirect aren't indexed.
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map(({ path }) => `  <url><loc>${server.canonicalUrl(path)}</loc></url>\n`).join("") +
  "</urlset>\n";
await writeFile(join(outDir, "sitemap.xml"), sitemap);
await writeFile(
  join(outDir, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard",
    "Disallow: /account",
    "Disallow: /api/",
    "",
    `Sitemap: ${server.SITE_URL}/sitemap.xml`,
    "",
  ].join("\n"),
);
console.log(`wrote sitemap.xml (${pages.length} URLs) and robots.txt`);

await rm(serverDir, { recursive: true, force: true });

if (failed) {
  console.error(`${failed} page(s) failed to prerender`);
  process.exit(1);
}
