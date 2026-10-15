// Structured data for the inner pages, supplied by the client's SEO (Oct 2026)
// and written into each page's <head> by scripts/prerender.mjs. The homepage
// graph lives in prerender.mjs itself.
//
// Every node ties back to the homepage graph by @id: the site (#website), the
// business (#business) and Stefanie (#stefanie). Los Angeles (#los-angeles) is
// defined in full on every page that points at it, because Google reads each
// page on its own and an @id that only resolves on another page tells it
// nothing.
//
// Where the brief and the live page disagree, the page wins, since schema is
// meant to describe what a visitor sees:
// - WebPage name and description are the page's own <title> and meta
//   description (src/lib/seo.ts, src/mocks/areas.ts). The brief's were earlier
//   drafts, written before the sellers and buyers pages moved from Studio City
//   to Los Angeles keywords.
// - Service names match the cards on the page ("Skilled Negotiation", not
//   "Stellar Negotiation"), and the descriptions drop "Studio City comps" and
//   "a decade-plus", which the page states as Los Angeles and 20+ years.
// - Studio City is a Place, not a City: it is a neighborhood of Los Angeles.
// - The neighborhood FAQs are not repeated here. Each area page already emits
//   a FAQPage from the visible FAQ list (src/components/feature/FaqList.tsx),
//   word for word what the brief supplied, and a second FAQPage on the same
//   page is flagged as a duplicate.
// - The hub's ItemList holds all four neighborhoods the page shows, not two.

const LA = (site) => ({
  "@type": "City",
  "@id": `${site}/neighborhoods#los-angeles`,
  name: "Los Angeles",
  containedInPlace: { "@type": "State", name: "California" },
  sameAs: ["https://en.wikipedia.org/wiki/Los_Angeles", "https://www.wikidata.org/wiki/Q65"],
});

const breadcrumb = (url, trail) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumb`,
  itemListElement: trail.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
});

const webPage = (site, url, meta, mainId, image, type = "WebPage") => ({
  "@type": type,
  "@id": `${url}#webpage`,
  url,
  name: meta.title,
  description: meta.description,
  isPartOf: { "@id": `${site}/#website` },
  about: { "@id": mainId },
  breadcrumb: { "@id": `${url}#breadcrumb` },
  mainEntity: { "@id": mainId },
  ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: `${site}${image.src}`, caption: image.caption } } : {}),
  author: { "@id": `${site}/#stefanie` },
  publisher: { "@id": `${site}/#business` },
  inLanguage: "en-US",
});

const offers = (items) =>
  items.map(([name, description]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description } }));

const valleyAreas = (site) => [
  {
    "@type": "Place",
    name: "Studio City",
    containedInPlace: { "@id": `${site}/neighborhoods#los-angeles` },
  },
  { "@type": "Place", name: "San Fernando Valley" },
  { "@id": `${site}/neighborhoods#los-angeles` },
];

/* ----------------------------------------------------------- sellers */
export function sellersSchema(site, meta, homebotUrl) {
  const url = `${site}/sellers`;
  const svc = `${url}#service`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(site, url, meta, svc, { src: "/images/stefanie/lifestyle-5.jpg", caption: "Stefanie Pollack, Los Angeles listing agent" }),
      breadcrumb(url, [["Home", `${site}/`], ["Sellers", url]]),
      LA(site),
      {
        "@type": "Service",
        "@id": svc,
        name: "Home Seller Representation",
        serviceType: "Real estate listing agent services",
        description:
          "Full-service home selling support including pricing strategy, staging guidance, professional photography, digital marketing through the Compass network, offer negotiation, and escrow coordination.",
        url,
        provider: { "@id": `${site}/#business` },
        audience: { "@type": "Audience", audienceType: "Home sellers" },
        areaServed: valleyAreas(site),
        potentialAction: { "@type": "Action", name: "Get Your Free Home Value", target: homebotUrl },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Seller Services",
          itemListElement: offers([
            ["Pricing Strategy", "A comparative market analysis grounded in real, recent nearby sales, priced to attract strong offers fast."],
            ["Staging Guidance", "Hands-on direction to help your home show its best, from decluttering to styling."],
            ["Professional Photography", "High-resolution photography and video that make your listing stand out the moment it hits the market."],
            ["Digital Marketing", "Targeted online advertising and the reach of the Compass network to put your home in front of serious buyers."],
            ["Skilled Negotiation", "Every offer vetted carefully and negotiated to land the best possible terms, not just the highest number."],
            ["Escrow Coordination", "Full coordination from accepted offer through close, so nothing slips through the cracks."],
          ]),
        },
      },
    ],
  };
}

/* ------------------------------------------------------------ buyers */
export function buyersSchema(site, meta) {
  const url = `${site}/buyers`;
  const svc = `${url}#service`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(site, url, meta, svc, { src: "/images/stefanie/lifestyle-1.jpg", caption: "Stefanie Pollack, Los Angeles buyer's agent" }),
      breadcrumb(url, [["Home", `${site}/`], ["Buyers", url]]),
      LA(site),
      {
        "@type": "Service",
        "@id": svc,
        name: "Home Buyer Representation",
        serviceType: "Real estate buyer's agent services",
        description:
          "Step-by-step guidance for home buyers from pre-approval to closing, including personalized home search, off-market access through the Compass network, neighborhood guidance, negotiation, due diligence, and a trusted local network of lenders, inspectors, and contractors.",
        url,
        provider: { "@id": `${site}/#business` },
        audience: { "@type": "Audience", audienceType: "Home buyers" },
        areaServed: valleyAreas(site),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Buyer Services",
          itemListElement: offers([
            ["Personalized Home Search", "A search tailored to your budget, must-haves, and timeline, including off-market opportunities through the Compass network."],
            ["Market and Neighborhood Guidance", "First-hand knowledge of Studio City and the surrounding Valley, so you know exactly what you're paying for."],
            ["Skilled Negotiation", "A background in finance and more than 20 years in Los Angeles real estate, working to get you the most home for your budget."],
            ["Trusted Local Network", "Vetted lenders, inspectors, and contractors to support you once an offer is accepted."],
            ["Careful Due Diligence", "Thorough guidance from inspection through closing to help you avoid unpleasant surprises after you move in."],
            ["Start-to-Finish Support", "Guidance at every step, from pre-approval to keys in hand, and a resource long after closing day."],
          ]),
        },
      },
    ],
  };
}

/* ------------------------------------------------- neighborhood data */
/* Per-area facts from the brief. ZIP codes come from the page itself
   (area.listings.zips) so the schema and the visible copy cannot drift. */
const AREA = {
  "studio-city": {
    type: "Place",
    description:
      "Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley, known for Ventura Boulevard dining, Tujunga Village shops, and trails at Fryman Canyon.",
    short: "Home base and the heart of the San Fernando Valley, with Ventura Boulevard dining, Tujunga Village shops, and trails at Fryman Canyon.",
    geo: { latitude: 34.1396, longitude: -118.3875 },
    contains: [["Place", "Ventura Boulevard"], ["Place", "Tujunga Village"], ["Park", "Fryman Canyon"]],
    service: "Buyer representation, home pricing, marketing, and negotiation for homes in Studio City, CA.",
    wiki: "https://en.wikipedia.org/wiki/Studio_City,_Los_Angeles",
  },
  "sherman-oaks": {
    type: "Place",
    description:
      "Sherman Oaks is a neighborhood in the City of Los Angeles, in the San Fernando Valley, known for upscale living and village charm along Ventura Boulevard.",
    short: "Upscale living with village charm along Ventura Boulevard.",
    contains: [["Place", "Ventura Boulevard"]],
    service: "Buyer representation, home pricing, marketing, and negotiation for homes in Sherman Oaks, CA.",
    wiki: "https://en.wikipedia.org/wiki/Sherman_Oaks,_Los_Angeles",
  },
  encino: {
    type: "Place",
    description:
      "Encino is a neighborhood in the City of Los Angeles, in the San Fernando Valley, with wide flat lots on the flats, hillside homes in the Santa Monica Mountains, condos near Ventura Boulevard, and luxury estates.",
    short: "Suburban calm with a polished feel: wide lots on the flats, hillside homes, condos near Ventura Boulevard, and luxury estates.",
    contains: [
      ["Place", "Ventura Boulevard"],
      ["Park", "Los Encinos State Historic Park"],
      ["Park", "Sepulveda Basin Recreation Area"],
      ["Place", "Encino Hills"],
      ["Place", "Royal Oaks"],
    ],
    service:
      "Buyer representation, street-level home pricing, marketing, private and luxury listing options, and negotiation for homes, condos, and estates in Encino, CA.",
    wiki: "https://en.wikipedia.org/wiki/Encino,_Los_Angeles",
  },
  "beverly-hills": {
    // Its own city, not part of Los Angeles: it sits in the county, not the city.
    type: "City",
    alternateName: "Beverly Hills, California",
    description:
      "Beverly Hills is an independent city on the Westside of Los Angeles County, surrounded by the City of Los Angeles, with its own city government, police, fire department, and school district.",
    short: "Iconic luxury on the Westside: an independent city with its own government, schools, and services.",
    county: true,
    contains: [
      ["Park", "Beverly Gardens Park"],
      ["Park", "Roxbury Park"],
      ["Place", "Greystone Mansion and Gardens"],
      ["Place", "Coldwater Canyon"],
    ],
    service:
      "Buyer representation, street-level home pricing, discreet luxury marketing, private listing access, and negotiation for homes, condos, townhomes, and estates in Beverly Hills, CA.",
    wiki: "https://en.wikipedia.org/wiki/Beverly_Hills,_California",
  },
};

const LA_COUNTY = {
  "@type": "AdministrativeArea",
  name: "Los Angeles County",
  containedInPlace: { "@type": "AdministrativeArea", name: "California" },
};

function placeNode(site, area, { full }) {
  const d = AREA[area.slug];
  const url = `${site}/neighborhoods/${area.slug}`;
  const zips = area.listings?.zips ?? [];
  return {
    "@type": d.type,
    "@id": `${url}#place`,
    name: area.name,
    ...(full ? { alternateName: d.alternateName ?? `${area.name}, Los Angeles` } : {}),
    url,
    description: full ? d.description : d.short,
    ...(full
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: area.name,
            addressRegion: "CA",
            ...(zips.length ? { postalCode: zips.length === 1 ? zips[0] : zips } : {}),
            addressCountry: "US",
          },
        }
      : {}),
    ...(d.geo ? { geo: { "@type": "GeoCoordinates", ...d.geo } } : {}),
    containedInPlace: d.county ? LA_COUNTY : { "@id": `${site}/neighborhoods#los-angeles` },
    ...(full ? { containsPlace: d.contains.map(([type, name]) => ({ "@type": type, name })) } : {}),
    sameAs: d.wiki,
  };
}

/* ------------------------------------------------ neighborhood pages */
export function areaSchema(site, meta, area) {
  const d = AREA[area.slug];
  if (!d) return null;
  const url = `${site}/neighborhoods/${area.slug}`;
  const place = `${url}#place`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPage(site, url, meta, place, { src: area.hero.image, caption: area.hero.imageAlt }),
      breadcrumb(url, [["Home", `${site}/`], ["Neighborhoods", `${site}/neighborhoods`], [area.name, url]]),
      ...(d.county ? [] : [LA(site)]),
      placeNode(site, area, { full: true }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${area.name} Real Estate Services`,
        serviceType: "Real estate buying and selling services",
        description: d.service,
        provider: { "@id": `${site}/#business` },
        areaServed: { "@id": place },
        url,
      },
    ],
  };
}

/* ------------------------------------------------- neighborhoods hub */
export function hubSchema(site, meta, areas) {
  const url = `${site}/neighborhoods`;
  const listed = areas.filter((a) => AREA[a.slug]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...webPage(site, url, meta, `${url}#list`, null, "CollectionPage"),
        about: { "@id": `${url}#los-angeles` },
      },
      breadcrumb(url, [["Home", `${site}/`], ["Neighborhoods", url]]),
      LA(site),
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: "Los Angeles Neighborhoods Served by Stefanie Pollack",
        numberOfItems: listed.length,
        itemListElement: listed.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: placeNode(site, a, { full: false }),
        })),
      },
    ],
  };
}
