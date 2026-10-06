import { useEffect } from "react";
import { canonicalUrl, getPageMeta } from "@/lib/seo";

function setTag(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Keeps <title>, description, Open Graph and canonical tags matching the
 *  current page during client-side navigation. The prerendered HTML already
 *  carries the right values for the first page load (scripts/prerender.mjs);
 *  this only matters once a visitor clicks around. Pages without their own
 *  entry in lib/seo.ts fall back to the homepage values. */
export function useRouteMeta(pathname: string) {
  useEffect(() => {
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return;
    const own = getPageMeta(pathname);
    const meta = own ?? getPageMeta("/")!;
    document.title = meta.title;
    setTag('meta[name="description"]', "content", meta.description);
    setTag('meta[property="og:title"]', "content", meta.title);
    setTag('meta[property="og:description"]', "content", meta.description);
    setTag('meta[name="twitter:title"]', "content", meta.title);
    setTag('meta[name="twitter:description"]', "content", meta.description);
    const url = canonicalUrl(own ? pathname : "/");
    setTag('meta[property="og:url"]', "content", url);
    setTag('link[rel="canonical"]', "href", url);
  }, [pathname]);
}
