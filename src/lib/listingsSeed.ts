import type { AvailableProperty, SoldProperty } from "@/lib/idx";

export type ListingsData = { available: AvailableProperty[]; sold: SoldProperty[] };

declare global {
  interface Window {
    __LISTINGS__?: ListingsData;
  }
}

/** Listings captured at build time, so prerendered pages contain real homes
 *  instead of "Loading listings…" (crawlers and scrapers read the HTML, and
 *  the IDX feed otherwise only arrives after JavaScript runs).
 *
 *  On the server, scripts/prerender.mjs fetches the feed and calls
 *  setListingsSeed() before rendering. It also writes the same data into each
 *  page as window.__LISTINGS__, so the browser's first render matches the
 *  HTML exactly (hydration) before useIdxListings swaps in a fresh copy. */
let serverSeed: ListingsData | null = null;

export function setListingsSeed(data: ListingsData | null) {
  serverSeed = data;
}

export function getListingsSeed(): ListingsData | null {
  if (typeof window !== "undefined") return window.__LISTINGS__ ?? null;
  return serverSeed;
}
