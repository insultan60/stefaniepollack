import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import "./i18n";
import App from "./App";
import { proxyIdxRequest } from "../api/_idxProxy";
import { fetchFeatured, fetchSoldPending, setServerIdxFetch } from "./lib/idx";
import { setListingsSeed, type ListingsData } from "./lib/listingsSeed";

export { PRERENDER_PATHS, getPageMeta, canonicalUrl, SITE_URL } from "./lib/seo";
export { HOME_FAQS } from "./lib/homeFaqs";

/** Renders one page to an HTML string at build time — see scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <App location={url} />
    </StrictMode>,
  );
}

/** Fetches the IDX feed once for the whole build and seeds it into every
 *  render (see lib/listingsSeed.ts). There is no /api/idx during a build, so
 *  the client's requests are routed straight to the proxy logic in Node.
 *  Returns null (and pages fall back to loading in the browser, as before)
 *  if the feed can't be reached — a listings outage must not fail a deploy. */
export async function loadListings(): Promise<ListingsData | null> {
  setServerIdxFetch(async (path) => {
    const [p, q] = path.split("?");
    const r = await proxyIdxRequest({ method: "GET", path: p, query: new URLSearchParams(q || "") });
    return new Response(r.status === 204 ? null : r.body, {
      status: r.status,
      headers: { "content-type": r.contentType },
    });
  });
  try {
    const [available, sold] = await Promise.all([fetchFeatured(), fetchSoldPending()]);
    const data = { available, sold };
    setListingsSeed(data);
    return data;
  } catch (err) {
    console.warn("prerender: listings unavailable, pages will load them in the browser:", err);
    setListingsSeed(null);
    return null;
  } finally {
    setServerIdxFetch(null);
  }
}
