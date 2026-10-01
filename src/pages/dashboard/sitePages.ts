import { articles } from "@/mocks/home";
import type { GaReport, Loaded } from "./types";

/**
 * Every public page on the site, with a human name.
 *
 * This exists so the pages panel has something true to show before analytics
 * is connected: the real routes, each reading zero, rather than invented rows
 * or an empty box. Once GA4 is live the measured list replaces it, and any
 * path GA4 reports that is not here still displays — the lookup only supplies
 * a nicer label, it never filters.
 *
 * The fixed routes mirror src/router/config.tsx. Blog posts are read from the
 * same articles list the blog renders, so a new post appears here without
 * anyone remembering to add it. /account is grouped as internal and left out
 * of the counts: it is a signed-in visitor's page, not something to market.
 */

export interface SitePage {
  path: string;
  name: string;
  group: "Core" | "Services" | "Listings" | "Content" | "Internal";
}

export const SITE_PAGES: SitePage[] = [
  { path: "/", name: "Home", group: "Core" },
  { path: "/about", name: "About", group: "Core" },
  { path: "/contact", name: "Contact", group: "Core" },
  { path: "/schedule", name: "Schedule a call", group: "Core" },
  { path: "/philanthropy", name: "Philanthropy", group: "Core" },

  { path: "/buyers", name: "Buyers", group: "Services" },
  { path: "/sellers", name: "Sellers", group: "Services" },
  { path: "/neighborhoods", name: "Neighborhoods", group: "Services" },
  { path: "/resources", name: "Resources", group: "Services" },

  { path: "/listings", name: "Listings", group: "Listings" },

  { path: "/blog", name: "Blog", group: "Content" },
  ...articles.map((a) => ({ path: a.href, name: a.title, group: "Content" as const })),

  { path: "/account", name: "Account", group: "Internal" },
];

const BY_PATH = new Map(SITE_PAGES.map((p) => [p.path, p]));

/** Strips query and trailing slash so GA4 paths line up with the table above. */
export function normalisePath(raw: string): string {
  const noQuery = raw.split("?")[0].split("#")[0];
  if (noQuery.length > 1 && noQuery.endsWith("/")) return noQuery.slice(0, -1);
  return noQuery || "/";
}

/**
 * A readable name for a path.
 *
 * Individual listing pages are generated from IDX at request time, so there is
 * no build-time slug list to register and GA4 will report dozens of them.
 * Naming them by shape keeps the table legible.
 */
export function pageName(path: string): string {
  const clean = normalisePath(path);
  const known = BY_PATH.get(clean);
  if (known) return known.name;

  const listing = clean.match(/^\/listings\/(.+)$/);
  if (listing) return `Listing — ${listing[1].replace(/-/g, " ")}`;

  return clean;
}

export interface PageRow {
  path: string;
  views: number;
  users: number;
}

/**
 * Measured pages when GA4 is live; otherwise the site's real routes at zero,
 * which answers "what pages do we have" and makes the setup state obvious.
 */
export function pageRows(ga: Loaded<GaReport>): PageRow[] {
  if (ga.live) {
    return ga.data.topPages.map((p) => ({
      path: normalisePath(p.label),
      views: p.value,
      users: p.secondary ?? 0,
    }));
  }
  return SITE_PAGES.filter((p) => p.group !== "Internal").map((p) => ({
    path: p.path,
    views: 0,
    users: 0,
  }));
}
