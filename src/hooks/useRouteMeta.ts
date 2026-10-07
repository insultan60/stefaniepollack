import { useEffect, useRef } from "react";
import { canonicalUrl, getPageMeta } from "@/lib/seo";

function setTag(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Keeps <title>, description, Open Graph and canonical tags matching the
 *  current page during client-side navigation. The prerendered HTML already
 *  carries the right values for the first page load (scripts/prerender.mjs),
 *  including pages with no entry in lib/seo.ts such as each listing — so on
 *  the first load those are left exactly as the HTML set them. Only when a
 *  visitor clicks through to such a page does it fall back to the homepage
 *  title and description (with the page's own canonical URL). */
export function useRouteMeta(pathname: string) {
  const firstLoad = useRef(true);

  useEffect(() => {
    const isFirstLoad = firstLoad.current;
    firstLoad.current = false;
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return;
    const own = getPageMeta(pathname);
    if (!own && isFirstLoad) return;
    const meta = own ?? getPageMeta("/")!;
    document.title = meta.title;
    setTag('meta[name="description"]', "content", meta.description);
    setTag('meta[property="og:title"]', "content", meta.title);
    setTag('meta[property="og:description"]', "content", meta.description);
    setTag('meta[name="twitter:title"]', "content", meta.title);
    setTag('meta[name="twitter:description"]', "content", meta.description);
    const url = canonicalUrl(pathname);
    setTag('meta[property="og:url"]', "content", url);
    setTag('link[rel="canonical"]', "href", url);
  }, [pathname]);
}
