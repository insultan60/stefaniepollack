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
// The empty shell, for the routes vercel.json rewrites to it: /account, the
// dashboard, and a /listings/<slug> with no prerendered page (a listing added
// since the last deploy, or a mistyped address). It must not carry the
// homepage's canonical and title the way index.html does - that told crawlers
// each of those URLs was a copy of the homepage. No canonical, and noindex: a
// real listing gets its own prerendered page with its own tags.
await writeFile(
  join(outDir, "spa.html"),
  template
    .replace(/\s*<link rel="canonical"[^>]*>/, "")
    .replace(/\s*<meta property="og:url"[^>]*>/, "")
    .replace("</head>", '<meta name="robots" content="noindex"></head>'),
);

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

/* The snapshot written into each page, trimmed to what that page draws.
   Cards and the map use only the basic fields; the heavy ones (photo gallery,
   description, feature tables, price history) are needed only on a listing's
   own page. The full feed was ~90 KB per page, and it is placed at the END of
   <body>, after the content: AI fetchers and scrapers read a page from the
   top and often stop after a fixed amount, and with the data in <head> they
   ran out before reaching any text ("only the metadata came through").
   Trimming the client copy is safe for hydration because the trimmed fields
   are never rendered on the pages that get the trimmed copy. */
const DETAIL_ONLY = ["gallery", "remarks", "features", "history"];
const card = (p) => Object.fromEntries(Object.entries(p).filter(([k]) => !DETAIL_ONLY.includes(k)));
function listingsScriptFor(path) {
  if (!listings) return "";
  const detailSlug = path.startsWith("/listings/") ? path.slice("/listings/".length) : null;
  const shape = (p) => (p.slug === detailSlug ? p : card(p));
  const data = { available: listings.available.map(shape), sold: listings.sold.map(shape) };
  return `<script>window.__LISTINGS__=${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

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
    // Structured data for the homepage: Stefanie as a RealEstateAgent (a
    // LocalBusiness type), which Google's Rich Results Test recognises and can
    // use for business details in search. Every value here is already
    // published on the site (footer contact details, the Compass Studio City
    // office in the blog, the geo meta in index.html).
    if (path === "/") {
      const agent = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Stefanie Pollack",
        alternateName: "Pollack & Associates",
        description: meta.description,
        url: `${server.SITE_URL}/`,
        logo: `${server.SITE_URL}/images/logo-pollack.webp`,
        image: `${server.SITE_URL}/images/stefanie/headshot.jpg`,
        telephone: "+1-818-625-6171",
        email: "stefanie@stefaniepollack.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12001 Ventura Pl, Suite 100",
          addressLocality: "Studio City",
          addressRegion: "CA",
          postalCode: "91604",
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: 34.1396, longitude: -118.3875 },
        areaServed: ["Los Angeles", "Studio City", "Sherman Oaks", "Encino", "Beverly Hills", "Valley Village", "San Fernando Valley"],
        parentOrganization: { "@type": "Organization", name: "Compass" },
        identifier: "DRE #01815614",
      };
      html = html.replace(
        "</head>",
        `<script type="application/ld+json">${JSON.stringify(agent).replace(/</g, "\\u003c")}</script></head>`,
      );
    }

    // Only pages that show listings (via useIdxListings) need the snapshot.
    // Classic inline script at the end of <body>: it still runs before the
    // app's deferred module script, so the data is there when React starts.
    if (path === "/" || path === "/listings" || path.startsWith("/listings/")) {
      html = html.replace("</body>", `${listingsScriptFor(path)}</body>`);
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

// 404.html: Vercel serves this, with a real 404 status, for any address that
// isn't a file here and isn't rewritten in vercel.json. Before it existed,
// every unknown URL got the empty shell with a 200 and the homepage's title —
// to Google and to scrapers, an empty duplicate of the homepage.
try {
  let html = template.replace('<div id="root"></div>', `<div id="root">${server.render("/404")}</div>`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>Page Not Found | Stefanie Pollack</title>");
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
  html = html.replace(/\s*<meta property="og:url"[^>]*>/, "");
  html = html.replace("</head>", '<meta name="robots" content="noindex"></head>');
  await writeFile(join(outDir, "404.html"), html);
  console.log("prerendered 404.html");
} catch (err) {
  failed++;
  console.error("prerender failed for 404.html:", err);
}

await rm(serverDir, { recursive: true, force: true });

if (failed) {
  console.error(`${failed} page(s) failed to prerender`);
  process.exit(1);
}
