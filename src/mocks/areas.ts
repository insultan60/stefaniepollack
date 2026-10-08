/** Neighborhood pages (/neighborhoods/<slug>). Copy is from the client's SEO
 *  briefs; anything the brief marked "[confirm]" or left as a placeholder
 *  (MLS figures, the negotiation credential's name, award years) is left out
 *  rather than guessed — add it here once the client supplies it.
 *
 *  Encino and Beverly Hills have no page yet. Link them through areaHref(),
 *  which falls back to /listings until a page exists, so nothing points at a
 *  404. */

export type AreaBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "points"; items: { title: string; text: string }[] }
  | { kind: "link"; label: string; href: string }
  | { kind: "button"; label: string; href: string };

export type AreaSection = { id: string; h2: string; blocks: AreaBlock[]; tint?: boolean };

export type Area = {
  slug: string;
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; italicTitle: string; subtitle: string; image: string; imageAlt: string; listingsButton: string };
  intro: { h2: string; paragraphs: string[]; trust: string[] };
  listings: {
    /** A listing belongs here when its ZIP is in this list or the feed's
     *  city name matches the area name. */
    zips: string[];
    cityLabelZip: string;
    available: { h2: string; text: string; button: string };
    sold: { h2: string; text: string; button: string };
    empty: string;
    alerts: string;
    altNoun: string;
  };
  sections: AreaSection[];
  why: { h2: string; paragraphs: string[]; points: { title: string; text: string }[]; reviewsH3: string; reviewAuthors: string[] };
  faqH2: string;
  faqs: { q: string; a: string }[];
  nearby: string[];
  cta: { title: string; italicTitle: string; text: string };
};

export const areas: Area[] = [
  {
    slug: "studio-city",
    name: "Studio City",
    meta: {
      title: "Studio City Real Estate Agent & Homes for Sale",
      description:
        "Stefanie Pollack is a Studio City real estate agent who grew up here. Browse homes for sale in Studio City, CA, and get local advice to buy or sell.",
    },
    hero: {
      eyebrow: "Studio City, California",
      title: "Studio City",
      italicTitle: "Real Estate Agent",
      subtitle:
        "Stefanie Pollack grew up in Studio City. She helps buyers and sellers across the neighborhood with local knowledge and 20+ years of experience.",
      image: "/images/stefanie/lifestyle-4.jpg",
      imageAlt: "Stefanie Pollack on a tree-lined residential street in Studio City",
      listingsButton: "View Studio City Homes",
    },
    intro: {
      h2: "Your Local Studio City Realtor",
      paragraphs: [
        "Stefanie Pollack is a Studio City real estate agent who grew up here and is now raising her family here. She helps buyers find homes for sale in Studio City, CA, and helps sellers get strong results.",
        "Studio City sits in the San Fernando Valley, close to Ventura Boulevard and the hills. Every street has its own feel, and prices can change from block to block. Stefanie explains those differences before you make a move.",
      ],
      trust: ["Grew up in Studio City", "20+ Years Experience", "$500M+ in Sales", "800+ Families Helped"],
    },
    listings: {
      zips: ["91604"],
      cityLabelZip: "91604",
      available: {
        h2: "Studio City Homes for Sale",
        text: "Browse houses for sale in Studio City, Los Angeles, along with condos. Each listing shows photos, price, and details. Want a showing? Contact Stefanie and she will set it up.",
        button: "View All Studio City Listings",
      },
      sold: {
        h2: "Recently Sold Homes in Studio City",
        text: "See what Studio City homes have sold for. Past sales help you judge price, timing, and demand on the streets you like.",
        button: "View Sold Studio City Homes",
      },
      empty: "Stefanie has no Studio City homes on the market right now. Join the list below to hear about the next one first.",
      alerts: "Join the list to hear about new Studio City homes for sale and off-market news.",
      altNoun: "Studio City home",
    },
    sections: [
      {
        id: "buying",
        h2: "Buying a Home in Studio City",
        blocks: [
          { kind: "p", text: "Studio City offers a mix of homes, from single-family houses to condos. Stefanie helps you decide what fits your budget and routine before you start touring." },
          { kind: "h3", text: "Houses for Sale in Studio City, CA" },
          { kind: "p", text: "Many buyers look for single-family houses here. You will find hillside homes and flat streets, and each lives differently. Stefanie helps you compare lot size, condition, and price against recent sales." },
          { kind: "h3", text: "Studio City Condos for Sale" },
          { kind: "p", text: "Condos often come with a lower price and less upkeep. Stefanie reviews HOA fees, building rules, and recent sales so there are no surprises." },
          { kind: "h3", text: "How Stefanie Helps You Buy" },
          {
            kind: "steps",
            items: [
              { title: "Set your plan.", text: "You share your budget, timeline, and must-haves." },
              { title: "See and compare homes.", text: "Stefanie shows you options and explains how each street differs." },
              { title: "Win the home.", text: "As a certified negotiator, she writes strong offers and guides you to closing." },
            ],
          },
          { kind: "button", label: "Start Your Home Search", href: "/listings" },
        ],
      },
      {
        id: "selling",
        h2: "Sell a House in Studio City",
        tint: true,
        blocks: [
          { kind: "p", text: "Pricing is the most important choice you will make as a seller. Stefanie studies recent Studio City sales, plans the marketing, and manages offers through closing." },
          { kind: "h3", text: "What You Get" },
          { kind: "list", items: ["A price plan based on nearby sales", "A marketing plan for your home", "Offer review and negotiation", "Support through escrow"] },
          { kind: "button", label: "Get Your Studio City Home Value", href: "/sellers" },
        ],
      },
      {
        id: "market",
        h2: "Studio City Real Estate Market",
        blocks: [
          { kind: "p", text: "Studio City real estate moves street by street, and the numbers change every month. Stefanie reviews the latest sales with you before you price or make an offer." },
          { kind: "link", label: "Contact Stefanie for the latest Studio City real estate report", href: "/contact" },
        ],
      },
      {
        id: "living",
        h2: "Living in Studio City, Los Angeles",
        tint: true,
        blocks: [
          { kind: "p", text: "Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley. Ventura Boulevard runs through it with restaurants and shops, and Tujunga Village adds a smaller shopping area." },
          { kind: "p", text: "Nature lovers have Fryman Canyon, with trails in the Santa Monica Mountains. People who work in entertainment value the closeness to CBS Studio Center." },
          { kind: "p", text: "Sherman Oaks and Toluca Lake are close by. The neighborhood has both hillside and flat streets." },
          { kind: "h3", text: "Studio City ZIP Code" },
          { kind: "p", text: "Most of Studio City uses ZIP code 91604. Some edges of the neighborhood share ZIP codes with nearby areas, so check the exact address." },
          { kind: "link", label: "Read the local guide to things to do in Studio City", href: "/blog/the-best-things-to-do-in-studio-city-before-summer-ends" },
        ],
      },
    ],
    why: {
      h2: "Why Work With Stefanie, Your Studio City Realtor",
      paragraphs: [
        "Stefanie grew up in Studio City and has worked in the San Fernando Valley for more than 20 years. She is a Compass agent who has helped over 800 families.",
      ],
      points: [
        { title: "Local roots", text: "She grew up here and is raising her family here." },
        { title: "Clear numbers", text: "Pricing and offers are backed by recent sales." },
        { title: "Strong negotiation", text: "She is a certified negotiator." },
      ],
      reviewsH3: "What Studio City Clients Say",
      reviewAuthors: ["Brian S.", "Grace V.", "Andrew S."],
    },
    faqH2: "Studio City Real Estate FAQs",
    faqs: [
      { q: "Is Studio City part of Los Angeles?", a: "Yes. Studio City is a neighborhood in the City of Los Angeles, in the San Fernando Valley. On listing sites, its addresses may show either Studio City or Los Angeles." },
      { q: "What is the ZIP code for Studio City?", a: "Most of Studio City uses ZIP code 91604. Parts near the edges may share ZIP codes with nearby areas, so check the exact address." },
      { q: "How do I choose among real estate agents in Studio City, CA?", a: "Look for recent sales on streets and in price ranges like yours. Ask how the agent prices, markets, and negotiates, then read recent reviews. A local agent who knows the hills and flats can save you time." },
      { q: "Are there condos for sale in Studio City?", a: "Yes. Condos come up alongside houses. Check the listings above, or ask Stefanie to send you new Studio City condos for sale as they appear." },
      { q: "What should I do first to sell a house in Studio City?", a: "Start with a price review based on recent nearby sales. Then plan repairs, photos, and timing. Stefanie can walk you through each step in a short meeting." },
      { q: "Does Stefanie work outside Studio City?", a: "Yes. She also helps clients in Sherman Oaks, Encino, Beverly Hills, and across Los Angeles." },
    ],
    nearby: ["Sherman Oaks", "Encino", "Beverly Hills"],
    cta: {
      title: "Ready to Buy or Sell",
      italicTitle: "in Studio City?",
      text: "Work with a Studio City real estate agent who grew up here. Start with a short conversation about your goals.",
    },
  },

  {
    slug: "sherman-oaks",
    name: "Sherman Oaks",
    meta: {
      title: "Sherman Oaks Real Estate Agent | Condos & Homes",
      description:
        "Stefanie Pollack is a real estate agent in Sherman Oaks, CA. Browse Sherman Oaks condos and homes, and get local advice to buy or sell.",
    },
    hero: {
      eyebrow: "Sherman Oaks, California",
      title: "Sherman Oaks",
      italicTitle: "Real Estate Agent",
      subtitle:
        "Stefanie Pollack works from Studio City, right next door, and knows Sherman Oaks street by street. She helps buyers and sellers with condos, townhomes, and houses, from the flats along Ventura Boulevard to the hills above it.",
      image: "/images/stefanie/lifestyle-1.jpg",
      imageAlt: "Stefanie Pollack on a sidewalk in a San Fernando Valley neighborhood",
      listingsButton: "View Sherman Oaks Listings",
    },
    intro: {
      h2: "A Real Estate Agent in Sherman Oaks Who Knows Both Sides of the Boulevard",
      paragraphs: [
        "Stefanie Pollack is a real estate agent in Sherman Oaks, CA with more than 20 years of experience in the San Fernando Valley. Her base is Studio City, minutes away, so the freeway exits, school boundaries, and block-to-block price gaps here are everyday knowledge for her.",
        "Real estate in Sherman Oaks is not one market. North of Ventura Boulevard you will find condos, townhomes, and houses on level lots. South of it, the streets climb into the Santa Monica Mountains, where views, slopes, and lot shape change what a home is worth. Stefanie explains what a price actually buys on the street you are considering, before you commit.",
      ],
      trust: ["20+ Years Experience", "$500M+ in Sales", "800+ Families Helped", "Compass Agent"],
    },
    listings: {
      zips: ["91403", "91423", "91413"],
      cityLabelZip: "",
      available: {
        h2: "Sherman Oaks Homes and Condos",
        text: "The current Sherman Oaks listings are below, condos and houses together. Open the full search to narrow by price, bedrooms, or property type, then ask Stefanie to schedule a showing for anything that stands out.",
        button: "View All Sherman Oaks Listings",
      },
      sold: {
        h2: "Recently Sold in Sherman Oaks",
        text: "Sold prices show what buyers really paid, which is more reliable than asking prices. Compare condos and houses separately, since they trade in very different ranges.",
        button: "View Sold Sherman Oaks Homes",
      },
      empty: "Stefanie has no Sherman Oaks homes on the market right now. Open the full search, or join the list below to hear about new Sherman Oaks listings first.",
      alerts: "Get new Sherman Oaks listings and off-market news in your inbox.",
      altNoun: "Sherman Oaks property",
    },
    sections: [
      {
        id: "buying",
        h2: "Buying in Sherman Oaks: Start With the Type of Home",
        blocks: [
          { kind: "p", text: "In Sherman Oaks, the kind of property you choose shapes your budget and your daily life more than the neighborhood name does. Stefanie starts there, narrows the field with you, and then shows you homes that truly fit." },
          { kind: "h3", text: "Houses in Sherman Oaks, CA" },
          { kind: "p", text: "Houses on the flats north of Ventura Boulevard tend to sit on level lots with easier access to shops and the freeways. Houses in the hills trade that convenience for views, privacy, and a different feel. Stefanie pulls recent sales for the specific streets you like, so you can judge lot size, condition, and price against what has really closed. On hillside lots, she also checks slope and drainage, fire-zone insurance, and city hillside rules before you offer." },
          { kind: "button", label: "Start Your Sherman Oaks Home Search", href: "/listings" },
        ],
      },
      {
        id: "condos",
        h2: "Sherman Oaks Condos and Townhomes",
        tint: true,
        blocks: [
          { kind: "p", text: "For many buyers, a condo or townhome is the most realistic way into Sherman Oaks. The price gap between buildings can be large, and the monthly costs matter as much as the sale price, so these purchases need a closer look than a house does." },
          { kind: "h3", text: "Condos in Sherman Oaks, CA" },
          { kind: "p", text: "A good condo can offer location and lower upkeep, but the building itself is part of what you buy. Before you commit, Stefanie reviews:" },
          {
            kind: "list",
            items: [
              "HOA dues and exactly what they cover",
              "The reserve fund and any past or planned special assessments",
              "Rules on pets, rentals, parking, and renovations",
              "Whether lenders will approve the building for financing",
              "Insurance for your unit, including earthquake coverage",
            ],
          },
          { kind: "p", text: "She also compares the unit against recent sales in the same building, which is usually the most accurate price check for a condo." },
          { kind: "h3", text: "Sherman Oaks Townhomes" },
          { kind: "p", text: "Townhomes sit between condos and houses. They often offer more room, a private entrance, and a garage, with shared walls and, in many cases, an HOA. Stefanie checks how ownership is structured, who maintains the roof and exterior, and how a townhome's price compares with both condos and small houses nearby." },
          { kind: "button", label: "See Sherman Oaks Condos and Townhomes", href: "/listings" },
        ],
      },
      {
        id: "selling",
        h2: "Selling in Sherman Oaks",
        blocks: [
          { kind: "p", text: "A sale here starts with getting the comparison right. A hillside house, a flat-lot house, and a condo each need a different set of comparable sales, and a price built on the wrong set costs time or money. Stefanie sets the price, plans the preparation and marketing, and handles offers through closing." },
          { kind: "h3", text: "Selling a House" },
          { kind: "p", text: "If you want to sell a house in Sherman Oaks, Stefanie compares it only with true matches: similar lot type, size, and condition, on similar streets. She then advises which updates are worth doing before listing and which are not, and times the launch around when buyers are most active." },
          { kind: "h3", text: "Selling a Condo or Townhome" },
          { kind: "p", text: "Buyers of condos will study your building as closely as your unit. Stefanie prices against recent sales in your complex, helps you gather the HOA documents early so buyers are not left waiting, and prepares you for questions about dues and assessments." },
          { kind: "button", label: "Get Your Sherman Oaks Home Value", href: "/sellers" },
        ],
      },
      {
        id: "market",
        h2: "Sherman Oaks Real Estate Market",
        tint: true,
        blocks: [
          { kind: "p", text: "Condos and houses in Sherman Oaks sell in very different price ranges, so Stefanie reads the numbers separately for your property type. Ask her for the latest Sherman Oaks real estate report before you price or make an offer." },
          { kind: "link", label: "Ask for the latest Sherman Oaks report", href: "/contact" },
        ],
      },
      {
        id: "living",
        h2: "Living in Sherman Oaks, Los Angeles",
        blocks: [
          { kind: "p", text: "Sherman Oaks is a neighborhood in the City of Los Angeles, sitting between Studio City to the east and Encino to the west. Ventura Boulevard gives it its village feel, with local shops, restaurants, and services. The 101 and 405 freeways meet here, which helps commuters. It also means freeway noise reaches some streets, so Stefanie suggests visiting a home at both rush hour and a quiet hour." },
          { kind: "h3", text: "Schools in Sherman Oaks" },
          { kind: "p", text: "Schools are one of the first things buyers ask about. Most of the neighborhood is served by the Los Angeles Unified School District, but assignments depend on the exact address, and magnet and private options are also available. Stefanie helps you verify the school assignment for any home before you make an offer, and you should confirm it with the district too." },
          { kind: "h3", text: "Parks and Outdoor Time" },
          { kind: "p", text: "Families and dog owners use local parks such as Van Nuys Sherman Oaks Park, and the hillside streets lead toward trails in the Santa Monica Mountains." },
        ],
      },
    ],
    why: {
      h2: "Why Choose Stefanie Among Sherman Oaks Real Estate Agents",
      paragraphs: [
        "Stefanie has worked the San Fernando Valley for more than 20 years and is a Compass agent who has helped over 800 families. Her office is in Studio City, a few minutes from Sherman Oaks, and she knows how the two markets compare.",
      ],
      points: [
        { title: "Neighborhood-level pricing", text: "She values your home against matching streets and property types, not a neighborhood average." },
        { title: "Quick, clear communication", text: "Past clients describe her as responsive and direct, whether by text or phone." },
        { title: "Independent recognition", text: "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars." },
      ],
      reviewsH3: "What Sherman Oaks Clients Say",
      reviewAuthors: ["Leanne S."],
    },
    faqH2: "Sherman Oaks Real Estate FAQs",
    faqs: [
      { q: "How do I choose among real estate agents in Sherman Oaks, CA?", a: "Look for an agent who has closed deals on streets and property types like yours, whether that is a condo, a townhome, a flat-lot house, or a hillside home. Ask for recent examples, how the agent sets a list price, and how they handle multiple offers. Reviews from Sherman Oaks clients and independent recognition help you compare the best real estate agents in the area. Stefanie's include RealTrends Verified and the Los Angeles Magazine Real Estate All-Stars list." },
      { q: "Are there condos for sale in Sherman Oaks?", a: "Yes. Condos are listed alongside houses, so check the listings above, or ask Stefanie to send you new Sherman Oaks condos as they come up. Before choosing one, compare HOA dues, reserves, and building rules, since these affect your monthly cost as much as the price does." },
      { q: "Is Sherman Oaks part of Los Angeles?", a: "Yes. Sherman Oaks is a neighborhood in the City of Los Angeles, in the San Fernando Valley. Some listing sites show either Sherman Oaks or Los Angeles for the same address." },
      { q: "Which schools serve a Sherman Oaks address?", a: "It depends on the exact address. Stefanie can look up the assignment for any home you are considering, and you should verify it with the school district before you write an offer." },
      { q: "What should I do first to sell a house in Sherman Oaks?", a: "Start with a price review based on true comparable sales, meaning homes with a similar lot, size, and condition. Then decide which repairs matter and plan the timing. A short meeting with Stefanie covers all three." },
    ],
    nearby: ["Studio City", "Encino", "Beverly Hills"],
    cta: {
      title: "Thinking About a Move",
      italicTitle: "in Sherman Oaks?",
      text: "Whether you are eyeing a condo off Ventura Boulevard or a house in the hills, start with a short conversation about your goals and timing. Stefanie, your real estate agent in Sherman Oaks and a neighbor from Studio City, will tell you what is realistic.",
    },
  },
];

/** Every neighborhood card on the site, in the order the client asked for
 *  (the three Valley areas first). */
export const areaCards = [
  {
    name: "Studio City",
    tagline: "The heart of the San Fernando Valley",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    alt: "Tree-lined street with a home in Studio City",
  },
  {
    name: "Sherman Oaks",
    tagline: "Upscale living with village charm",
    // Stefanie's own sold listing at 4501 Cedros Ave (the stock photo that
    // was here no longer exists on Unsplash).
    image: "/images/neighborhoods/sherman-oaks.jpg",
    alt: "Condo building with bougainvillea in Sherman Oaks",
  },
  {
    name: "Encino",
    tagline: "Suburban calm with a polished feel",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    alt: "Modern living room in an Encino home",
  },
  {
    name: "Beverly Hills",
    tagline: "Iconic luxury on the Westside",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop",
    alt: "Bedroom in a Beverly Hills home",
  },
];

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

/** The page for an area, or /listings while that area has no page yet. */
export function areaHref(name: string): string {
  const slug = slugOf(name);
  return areas.some((a) => a.slug === slug) ? `/neighborhoods/${slug}` : "/listings";
}

export function hasAreaPage(name: string): boolean {
  return areas.some((a) => a.slug === slugOf(name));
}
