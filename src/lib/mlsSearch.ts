/** Builds full-MLS search URLs on Stefanie's IDX Broker hosted search
 *  (search.stefaniepollack.com, MLS idxID e025 — CRMLS).
 *
 *  The /listings grid only holds Stefanie's own handful of IDX listings, so on
 *  its own every search there came back empty. These URLs hand the same filters
 *  to IDX's results page, which searches the whole MLS. Parameters were
 *  verified against the live results page (it prints "N Listings"):
 *    pt          mlsPtID — 1 Residential, 11 Residential Lease,
 *                10 Residential Income, 7 Land
 *    ccz=city&city[]=<cityID>   cityIDs from GET mls/cities/e025
 *    ccz=zipcode&zipcode[]=<zip>
 *    aw_address  free-text street/address match
 *    csv_listingID  MLS number
 *    lp / hp     min / max price; bd / tb min beds / baths
 *    a_propSubType[]  subtype names from GET mls/propertytypes/e025 (OR'd)
 *    srt=newest
 */

export const MLS_SEARCH_BASE = "https://search.stefaniepollack.com/idx/results/listings";
const IDX_ID = "e025";

/** Stefanie's market: the Valley, the Westside and nearby. Neighborhoods like
 *  Studio City or Bel Air are their own "city" in the MLS feed. */
export const MLS_CITIES: Record<string, string> = {
  "Studio City": "45062",
  "Sherman Oaks": "42653",
  Encino: "14669",
  "Toluca Lake": "46605",
  "Valley Village": "48697",
  "North Hollywood": "33375",
  Burbank: "6332",
  "Van Nuys": "48750",
  Reseda: "39062",
  Tarzana: "45876",
  "Woodland Hills": "52545",
  Calabasas: "6722",
  "Hidden Hills": "21077",
  "Beverly Hills": "3944",
  "West Hollywood": "50890",
  Hollywood: "21618",
  "Bel Air": "53557",
  Brentwood: "5487",
  "Santa Monica": "41483",
  Malibu: "28031",
  Glendale: "18136",
  Pasadena: "35668",
  "Los Angeles": "27253",
};

export type ListingMode = "sale" | "rent";
export type HomeType = "Any type" | "House" | "Condo" | "Townhouse" | "Multi-Family" | "Land";

export type MlsCriteria = {
  location: string;
  mode: ListingMode;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type: HomeType;
};

const SUBTYPES: Partial<Record<HomeType, string[]>> = {
  House: ["Single Family Residence"],
  Condo: ["Condominium"],
  Townhouse: ["Townhouse"],
  "Multi-Family": ["Duplex", "Triplex", "Quadruplex"],
};

/** Case-insensitive match of typed text to a market city ("sherman oaks",
 *  "Sherman Oaks, CA", "LA"). */
export function matchCity(text: string): string | null {
  const t = text.toLowerCase().replace(/,?\s*(ca|california)\b.*$/, "").trim();
  if (!t) return null;
  if (t === "la") return "Los Angeles";
  for (const name of Object.keys(MLS_CITIES)) if (name.toLowerCase() === t) return name;
  if (t.length >= 3) for (const name of Object.keys(MLS_CITIES)) if (name.toLowerCase().startsWith(t)) return name;
  return null;
}

const STREET_SUFFIX =
  /\s+(blvd|boulevard|ave|avenue|st|street|dr|drive|rd|road|ln|lane|pl|place|ct|court|way|ter|terrace|cir|circle|pkwy|parkway)\.?$/i;

function streetQuery(text: string): string {
  const t = text
    .split(",")[0]
    .replace(/\s+(#|unit|apt|ste)\s*\S+$/i, "")
    .trim();
  return t.replace(STREET_SUFFIX, "").trim() || t;
}

export function buildMlsSearchUrl(c: MlsCriteria): string {
  const p: [string, string][] = [["idxID", IDX_ID]];

  // Property class: Land is sale-only; multi-family for sale is the MLS's
  // "Residential Income" class rather than a Residential subtype.
  let subtypes = SUBTYPES[c.type] ?? [];
  if (c.type === "Land") p.push(["pt", "7"]);
  else if (c.mode === "rent") p.push(["pt", "11"]);
  else if (c.type === "Multi-Family") {
    p.push(["pt", "10"]);
    subtypes = [];
  } else p.push(["pt", "1"]);

  const loc = c.location.trim();
  const city = matchCity(loc);
  if (/^\d{5}$/.test(loc)) p.push(["ccz", "zipcode"], ["zipcode[]", loc]);
  else if (city) p.push(["ccz", "city"], ["city[]", MLS_CITIES[city]]);
  else if (/^[A-Za-z]{0,3}\d{6,10}$/.test(loc)) p.push(["csv_listingID", loc]);
  // IDX's address match misses abbreviated suffixes ("Ventura Blvd" -> 0,
  // "Ventura" -> 25), so drop a trailing street suffix and unit.
  else if (loc) p.push(["aw_address", streetQuery(loc)]);

  if (c.minPrice) p.push(["lp", String(c.minPrice)]);
  if (c.maxPrice && Number.isFinite(c.maxPrice)) p.push(["hp", String(c.maxPrice)]);
  if (c.beds) p.push(["bd", String(c.beds)]);
  if (c.baths) p.push(["tb", String(c.baths)]);
  for (const s of subtypes) p.push(["a_propSubType[]", s]);
  p.push(["srt", "newest"]);

  return `${MLS_SEARCH_BASE}?${p.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")}`;
}
