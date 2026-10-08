import { articles } from "@/mocks/home";
import { areas } from "@/mocks/areas";

/** Per-page <title>, description and canonical URL.
 *  Used twice: scripts/prerender.mjs bakes them into each page's static HTML
 *  at build time (what crawlers read), and useRouteMeta() keeps the tab title
 *  and tags in step as visitors navigate client-side. Pages not listed here
 *  (account, dashboard, single listings) keep the defaults from index.html. */

export const SITE_URL = "https://www.stefaniepollack.com";

export interface PageMeta {
  title: string;
  description: string;
}

const PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Los Angeles Real Estate Agent | Stefanie Pollack | Compass",
    description:
      "Stefanie Pollack is a Los Angeles real estate agent based in Studio City with 20+ years of experience. Buy or sell in LA, the Valley, and Beverly Hills.",
  },
  "/about": {
    title: "About Stefanie Pollack | Studio City Compass Realtor",
    description:
      "Meet Stefanie Pollack — Studio City native, Compass Realtor and community connector with 20+ years helping buyers and sellers across the San Fernando Valley.",
  },
  "/buyers": {
    title: "Buying a Home in Studio City | Stefanie Pollack",
    description:
      "Buying in Studio City or the San Fernando Valley? Stefanie Pollack guides you from pre-approval to closing with local market insight and off-market access.",
  },
  "/sellers": {
    title: "Sell Your Studio City Home | Stefanie Pollack",
    description:
      "Selling your home in Studio City? Get expert pricing, Compass marketing and skilled negotiation from Stefanie Pollack to sell for top dollar.",
  },
  "/neighborhoods": {
    title: "Los Angeles Neighborhood Guides | Stefanie Pollack",
    description:
      "Compare Studio City, Sherman Oaks, Encino, and Beverly Hills with Stefanie Pollack, a Los Angeles real estate agent who grew up in Studio City.",
  },
  "/philanthropy": {
    title: "Philanthropy & Community | Stefanie Pollack",
    description:
      "Giving back to the neighborhoods that make Studio City home — the causes and community events Stefanie Pollack supports.",
  },
  "/resources": {
    title: "Home Buyer & Seller Resources | Stefanie Pollack",
    description:
      "Tools, guides and calculators for buying or selling a home in Studio City and the San Fernando Valley.",
  },
  "/contact": {
    title: "Contact Stefanie Pollack | Studio City Realtor",
    description:
      "Get in touch with Stefanie Pollack, Studio City real estate agent at Compass. Call, email or send a message to start your home search or sale.",
  },
  "/schedule": {
    title: "Schedule a Consultation | Stefanie Pollack",
    description:
      "Pick a time that works for you and book a real estate consultation directly on Stefanie Pollack's calendar.",
  },
  "/listings": {
    title: "Homes for Sale in Studio City & the Valley | Stefanie Pollack",
    description:
      "Browse current listings and recently sold homes from Stefanie Pollack in Studio City and the San Fernando Valley.",
  },
  "/blog": {
    title: "Studio City Real Estate Blog | Stefanie Pollack",
    description: "Market updates, local guides, and community stories from Stefanie Pollack in Studio City.",
  },
};

for (const area of areas) {
  PAGES[`/neighborhoods/${area.slug}`] = area.meta;
}

for (const a of articles) {
  PAGES[a.href] = { title: `${a.title} | Stefanie Pollack`, description: a.excerpt };
}

/** Every public page that should be prerendered to static HTML. */
export const PRERENDER_PATHS = Object.keys(PAGES);

export function getPageMeta(pathname: string): PageMeta | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return PAGES[path];
}

export function canonicalUrl(pathname: string): string {
  return pathname === "/" ? SITE_URL : `${SITE_URL}${pathname.replace(/\/+$/, "")}`;
}
