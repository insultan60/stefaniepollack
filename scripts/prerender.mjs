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

const server = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function setAttr(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${pattern}`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeAttr(value)}${after}`);
}

let failed = 0;
for (const path of server.PRERENDER_PATHS) {
  try {
    const meta = server.getPageMeta(path);
    const url = server.canonicalUrl(path);
    const body = server.render(path);

    let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
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

await rm(serverDir, { recursive: true, force: true });

if (failed) {
  console.error(`${failed} page(s) failed to prerender`);
  process.exit(1);
}
