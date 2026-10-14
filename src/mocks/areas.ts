/** Neighborhood pages (/neighborhoods/<slug>). Copy is from the client's SEO
 *  briefs; anything the brief marked "[confirm]" or left as a placeholder
 *  (MLS figures, the negotiation credential's name, award years) is left out
 *  rather than guessed — add it here once the client supplies it.
 *
 *  Every area card links through areaHref(), which falls back to /listings
 *  for any area without a page here, so nothing points at a 404.
 *
 *  All four pages follow the client briefs. Beverly Hills has no reviews
 *  block until a Beverly Hills or Westside review is on file. */

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
          { kind: "link", label: "Read the local guide to things to do in Sherman Oaks", href: "/blog/things-to-do-in-sherman-oaks" },
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

  {
    slug: "encino",
    name: "Encino",
    meta: {
      title: "Encino Real Estate Agent | Homes for Sale",
      description:
        "Stefanie Pollack is an Encino real estate agent helping buyers and sellers with homes, condos, and luxury estates. Local Valley experience.",
    },
    hero: {
      eyebrow: "Encino, California",
      title: "Encino",
      italicTitle: "Real Estate Agent",
      subtitle:
        "Stefanie Pollack helps buyers and sellers across Encino, from condos and ranch-style homes to hillside estates. She works the Valley every day and knows which streets, lots, and views hold their value.",
      image: "/images/neighborhoods/encino-hero.jpg",
      imageAlt: "The Encino Commons arch over Ventura Boulevard in Encino",
      listingsButton: "View Encino Listings",
    },
    intro: {
      h2: "An Encino Real Estate Agent Who Works the Valley Every Day",
      paragraphs: [
        "Stefanie Pollack is a real estate agent in Encino, CA with more than 20 years of Los Angeles experience. She is based in nearby Studio City, so Ventura Boulevard, Balboa, and the canyon roads are part of her normal week.",
        "Encino, California real estate is not one market. You will find wide lots on the flats, condos close to the boulevard, and homes in the hills with long views across the Valley. Two homes a mile apart can sit in very different price ranges, so she starts by showing what your street and property type are actually worth.",
      ],
      trust: ["20+ Years Experience", "$500M+ in Sales", "800+ Families Helped", "Compass Agent"],
    },
    listings: {
      zips: ["91316", "91436"],
      cityLabelZip: "",
      available: {
        h2: "Encino Real Estate for Sale",
        text: "Browse the houses, condos, and townhomes now for sale in Encino, with open house dates where they are available. Stefanie can arrange private tours and tell you about homes before they reach the big portals.",
        button: "View All Encino Listings",
      },
      sold: {
        h2: "Recently Sold in Encino",
        text: "Sold prices show what buyers really paid, and that is often different from the asking price. Look at sales of similar homes on nearby streets, not the Encino average.",
        button: "View Sold Encino Homes",
      },
      empty: "Stefanie has no Encino homes on the market right now. Open the full search, or join the list below to hear about new Encino listings first.",
      alerts: "Get new Encino real estate listings and off-market news by email.",
      altNoun: "Encino property",
    },
    sections: [
      {
        id: "buying",
        h2: "Buying a Home in Encino",
        blocks: [
          { kind: "p", text: "Most people shopping for real estate for sale in Encino, CA are balancing three things: the type of home, the location, and the amount of land. Stefanie helps you decide where you can be flexible before you start touring, so you spend weekends on homes that fit." },
          { kind: "h3", text: "Houses for Sale in Encino, CA" },
          { kind: "p", text: "Many houses on the Encino flats sit on wide, flat lots with room for a pool and a yard. Homes in the hills trade that for views and privacy, but they often come with slopes, retaining walls, and narrower roads. Stefanie pulls recent sales on your target streets and checks City of Los Angeles hillside and permit rules before you plan a remodel." },
          { kind: "h3", text: "Encino Condos and Townhomes" },
          { kind: "p", text: "Condos and townhomes suit buyers who want less upkeep, a lock-and-leave setup, or a lower entry price than a house. Compare monthly dues and what they cover, the building's reserves, rental rules, and parking before you compare prices. Stefanie reviews those documents with you so there are no surprises at closing." },
          { kind: "h3", text: "What Does It Cost to Buy in Encino?" },
          { kind: "p", text: "Prices here vary a lot by street, lot size, and condition, so a single number rarely helps. Condos, townhomes, and older or smaller houses usually sit at the lower end. Stefanie shows you what your budget can buy, and what it cannot, before the first showing." },
          { kind: "button", label: "Start Your Encino Home Search", href: "/listings" },
        ],
      },
      {
        id: "luxury",
        h2: "Encino Luxury Real Estate",
        tint: true,
        blocks: [
          { kind: "p", text: "Encino luxury real estate is about more than a big house. Buyers weigh gated entry, guest houses, pools and tennis courts, views, and how much of a lot is truly usable. A luxury real estate agent in Encino, CA should know the difference between a large lot and a flat, buildable one." },
          { kind: "p", text: "Some of the best homes sell quietly before a public listing ever appears. Stefanie uses her network and Compass's private listing options to find them for buyers and to market them for sellers." },
          { kind: "p", text: "If you are selling a high-end home, she plans around privacy as well as price. That can mean a private preview for select buyers, professional photography and video, and a comparison against truly similar estates." },
          { kind: "button", label: "Talk With Stefanie About a Luxury Home", href: "/contact" },
        ],
      },
      {
        id: "selling",
        h2: "Selling Your Home in Encino",
        blocks: [
          { kind: "p", text: "Many real estate agents in Encino, CA will price a home from a neighborhood average. Stefanie prices yours against recent sales of homes with a similar lot, size, condition, and street, because a house on the flats and a hillside home attract different buyers." },
          { kind: "p", text: "From there she plans the preparation, photography, marketing, and showings, and she handles offers and negotiation through closing. She will also talk with you about listing publicly, sharing the home privately first, or doing both." },
          { kind: "button", label: "Get Your Encino Home Value", href: "/sellers" },
        ],
      },
      {
        id: "market",
        h2: "Encino Real Estate Market",
        tint: true,
        blocks: [
          { kind: "p", text: "The Encino real estate market moves by street and property type, and a few high-priced sales can lift an average quickly. That is why Stefanie compares your home to close matches and not to a citywide figure." },
          { kind: "link", label: "Contact Stefanie for a current read on where Encino stands", href: "/contact" },
        ],
      },
      {
        id: "living",
        h2: "Encino Neighborhoods, ZIP Codes, Schools, and Parks",
        blocks: [
          { kind: "h3", text: "Encino Neighborhoods and ZIP Codes" },
          { kind: "p", text: "Encino sits in the San Fernando Valley and is part of the City of Los Angeles. Its ZIP codes are 91316 and 91436, so a search for Encino 91316 real estate will show only part of the picture." },
          { kind: "p", text: "The area south of Ventura Boulevard climbs into the Santa Monica Mountains, where Encino Hills real estate offers views and larger lots. Pockets such as Royal Oaks each have their own feel and price range, and Stefanie can walk you through them." },
          { kind: "h3", text: "Schools in Encino" },
          { kind: "p", text: "Most Encino homes are served by the Los Angeles Unified School District, and the school assigned to a home depends on its address. Charter and magnet options may also be available. Check the exact address with the district before you make an offer." },
          { kind: "h3", text: "Parks and Outdoor Time" },
          { kind: "p", text: "Los Encinos State Historic Park is a short outing with an old ranch house and a pond, and the Sepulveda Basin Recreation Area offers trails, sports fields, and open space nearby. Many residents also use the hiking routes in the hills above Ventura Boulevard. Dining and shopping along the boulevard fill in the rest of daily life." },
        ],
      },
    ],
    why: {
      h2: "Why Choose Stefanie Among Encino Real Estate Agents",
      paragraphs: [
        "Stefanie Pollack is a Compass agent who has guided more than 800 families through buying and selling in Los Angeles. Compass is a national real estate brokerage, and its tools and private listing options give her clients extra reach.",
      ],
      points: [
        { title: "Valley knowledge", text: "She lives and works in the neighborhoods around Encino, so she knows how streets, schools, and commute routes affect value." },
        { title: "Street-level pricing", text: "Your offer or list price comes from matching sales, not a citywide number." },
        { title: "Independent recognition", text: "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars." },
      ],
      reviewsH3: "What Clients Say",
      // Jon D. is an Encino client; the brief asks for Encino or West Valley
      // reviews only, never ones borrowed from other neighborhoods.
      reviewAuthors: ["Jon D."],
    },
    faqH2: "Encino Real Estate FAQs",
    faqs: [
      { q: "How do I choose among real estate agents in Encino, CA?", a: "Ask for recent sales in your price range and property type, and how the agent handles competing offers. If you search for the best real estate agent in Encino or the top real estate agents in Encino, compare reviews and recognition such as RealTrends Verified, and talk with more than one agent." },
      { q: "Is Encino part of Los Angeles?", a: "Yes. Encino is a neighborhood in the City of Los Angeles, in the San Fernando Valley, so city rules for permits, zoning, and transfer taxes apply." },
      { q: "What extra taxes or fees should I expect when buying or selling in the City of Los Angeles?", a: "Buyers and sellers pay the usual escrow, title, and loan costs, and sellers pay transfer taxes. Higher-priced sales can also trigger the city's transfer tax measure, known as Measure ULA. Stefanie can explain the numbers for your price range before you list or make an offer." },
      { q: "Can I see Encino homes before they are listed?", a: "Sometimes. Some homes sell privately through agent networks and Compass's private listing options. Tell Stefanie what you want and she will watch for matches." },
      { q: "What should I do first to sell a house in Encino?", a: "Start with a price opinion built from matching sales. Then decide whether to list publicly, share the home privately first, or do both. A short call can cover all three." },
    ],
    nearby: ["Studio City", "Sherman Oaks", "Beverly Hills"],
    cta: {
      title: "Ready to Buy or Sell",
      italicTitle: "in Encino?",
      text: "Whether you are starting a search or already have a street in mind, a short call is the best first step. Stefanie, your Encino real estate agent, will tell you what the numbers say and what to do next.",
    },
  },

  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    meta: {
      title: "Beverly Hills Real Estate Agent | Homes & Condos",
      description:
        "Stefanie Pollack is a Beverly Hills real estate agent for buyers and sellers of homes, condos, and estates. Compare Beverly Hills with the Valley.",
    },
    hero: {
      eyebrow: "Beverly Hills, California",
      title: "Beverly Hills",
      italicTitle: "Real Estate Agent",
      subtitle:
        "Stefanie Pollack helps buyers and sellers across Beverly Hills, from condos and townhomes to estates. She brings the view of a Valley agent who knows how both sides of the hills compare.",
      image: "/images/neighborhoods/beverly-hills-hero.jpg",
      imageAlt: "A Beverly Hills street lined with tall palm trees",
      listingsButton: "View Beverly Hills Listings",
    },
    intro: {
      h2: "A Beverly Hills Real Estate Agent With a Valley and Westside View",
      paragraphs: [
        "Stefanie Pollack is a Beverly Hills real estate agent with more than 20 years of Los Angeles experience, based in Studio City. Many of her clients are choosing between the Valley and the Westside, and she can compare both from experience.",
        "Beverly Hills runs its own schools, police, and permitting, and prices shift sharply between the flats, the hills, and the condo buildings. Whether you want a Beverly Hills realtor for a first Westside purchase or a high-end sale, she starts by showing what a specific street and property type is really worth.",
      ],
      trust: ["20+ Years Experience", "$500M+ in Sales", "800+ Families Helped", "Compass Agent"],
    },
    listings: {
      // Filtered by ZIP. Some 90210 addresses are in the City of Los Angeles,
      // and the feed's postal city reads "Beverly Hills" for them too, so the
      // page cannot tell them apart; the ZIP section below says so instead.
      zips: ["90210", "90211", "90212"],
      cityLabelZip: "",
      available: {
        h2: "Beverly Hills Homes for Sale",
        text: "Houses, condos, and townhomes now on the market in Beverly Hills are below, with open house dates shown where available. Stefanie can arrange private showings and point you to homes that are not yet public.",
        button: "View All Beverly Hills Listings",
      },
      sold: {
        h2: "Recently Sold in Beverly Hills",
        text: "Recent sales show what buyers actually paid, and in this market the gap between asking and closing price can be large. Compare sales of similar homes on similar streets, not the city as a whole.",
        button: "View Sold Beverly Hills Homes",
      },
      empty: "Stefanie has no Beverly Hills homes on the market right now. Open the full search, or join the list below to hear about new Beverly Hills listings and off-market homes first.",
      alerts: "Get new Beverly Hills listings and off-market news in your inbox.",
      altNoun: "Beverly Hills property",
    },
    sections: [
      {
        id: "buying",
        h2: "Buying a Home in Beverly Hills",
        blocks: [
          { kind: "p", text: "Buying here is shaped by three choices: the type of property, the part of the city, and how much privacy and space you want. Stefanie helps you sort those out before you tour, so your time goes to homes that truly fit." },
          { kind: "h3", text: "Houses for Sale in Beverly Hills, CA" },
          { kind: "p", text: "Start with the setting. The flats offer walkable access to dining and shopping, while the canyons and hills trade that for views, privacy, and larger lots, plus more upkeep and trickier access. Stefanie checks recent sales on your target streets, and reviews the city's own permit rules before any remodel, since they differ from Los Angeles." },
          { kind: "h3", text: "Beverly Hills Condos and Townhomes" },
          { kind: "p", text: "Condos here range from small buildings to full-service high-rises, and townhomes give you more room and a house-like layout. Beyond price, Stefanie compares what the monthly dues buy, such as services, security, and parking, and reviews the building's finances and rules. For townhomes she also confirms how the property is owned and who maintains the exterior." },
          { kind: "h3", text: "What Does It Cost to Buy in Beverly Hills?" },
          { kind: "p", text: "Many people search for the cheapest house in Beverly Hills, and the honest answer is that entry prices are high and move with the market. The lowest-priced options are usually condos, townhomes, and smaller or older houses, and what you give up in space or condition depends on the street. Stefanie shows you what your budget can realistically buy, and what it cannot, before you start touring." },
          { kind: "button", label: "Start Your Beverly Hills Home Search", href: "/listings" },
        ],
      },
      {
        id: "luxury",
        h2: "Beverly Hills Luxury Real Estate",
        tint: true,
        blocks: [
          { kind: "p", text: "At the top of the market, the questions change. Buyers of Beverly Hills mansions and estates care about privacy, security, lot size and usable land, views, and how much work the property needs. Many of the best opportunities are never listed publicly, so Stefanie uses her network and Compass's private listing options to find and present them." },
          { kind: "p", text: "Sellers of high-end homes need a different plan too: careful pricing against truly comparable estates, professional photography and video, and discreet marketing when privacy matters. Stefanie works with luxury buyers and sellers who want a clear, honest comparison with other markets, including the Valley." },
          { kind: "button", label: "Talk With Stefanie About a Luxury Home", href: "/contact" },
        ],
      },
      {
        id: "selling",
        h2: "Selling in Beverly Hills",
        blocks: [
          { kind: "p", text: "What you compare against decides your price. A hillside estate, a house on the flats, and a condo each attract a different buyer pool, so Stefanie prices yours against sales that truly match, then plans preparation, marketing, and offers through closing." },
          { kind: "p", text: "She also helps you decide whether to list publicly, share the home privately first, or do both. That choice matters most for higher-priced homes and for owners who value discretion." },
          { kind: "button", label: "Get Your Beverly Hills Home Value", href: "/sellers" },
        ],
      },
      {
        id: "market",
        h2: "Beverly Hills Real Estate Market",
        tint: true,
        blocks: [
          { kind: "p", text: "The Beverly Hills median home price can swing from quarter to quarter, because a few very high sales move the average. For that reason, Stefanie studies sales by street and property type." },
          { kind: "link", label: "Contact Stefanie for a current read on the market", href: "/contact" },
        ],
      },
      {
        id: "living",
        h2: "Beverly Hills ZIP Codes, Schools, and Parks",
        blocks: [
          { kind: "h3", text: "Beverly Hills ZIP Codes" },
          { kind: "p", text: "The Beverly Hills ZIP codes are 90210, 90211, and 90212. Here is what catches many buyers off guard: a 90210 mailing address does not always mean the home is in the City of Beverly Hills. Some 90210 homes, including some hillside estates, sit in the City of Los Angeles. That changes the school district, city services, and building rules. Stefanie confirms which city a home is in before you fall in love with it, whether you are looking at a house in Beverly Hills 90210 or any other address." },
          { kind: "h3", text: "Schools in Beverly Hills" },
          { kind: "p", text: "Beverly Hills has its own school district, separate from the Los Angeles Unified School District. Because attendance follows the city line, check which school serves an exact address, whether you are comparing middle schools, elementary schools, or preschools. Private schools in the area add more options." },
          { kind: "h3", text: "Parks and Outdoor Time" },
          { kind: "p", text: "Beverly Hills parks and gardens are part of daily life here, from Beverly Gardens Park along Santa Monica Boulevard to Roxbury Park and Greystone Mansion and Gardens. Hiking and canyon trails are close by, and Coldwater Canyon, which links the Valley with Beverly Hills, is one of the routes many Studio City and Sherman Oaks residents already know." },
          { kind: "link", label: "Read the local guide to things to do in Beverly Hills", href: "/blog/things-to-do-in-beverly-hills" },
        ],
      },
    ],
    why: {
      h2: "Why Choose Stefanie Among Beverly Hills Real Estate Agents",
      paragraphs: [
        "Compass agent Stefanie Pollack has guided more than 800 families through buying and selling in Los Angeles.",
      ],
      points: [
        { title: "A two-market view", text: "She works the Valley and the Westside, so she can tell you honestly what you gain and give up by choosing one over the other." },
        { title: "Street-level pricing", text: "Your offer or list price is built on matching sales, not a citywide number." },
        { title: "Independent recognition", text: "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars." },
      ],
      reviewsH3: "What Clients Say",
      // Left empty on purpose: the brief says to leave the reviews out until a
      // Beverly Hills or Westside review exists, not to borrow another area's.
      reviewAuthors: [],
    },
    faqH2: "Beverly Hills Real Estate FAQs",
    faqs: [
      { q: "How do I choose among real estate agents in Beverly Hills, CA?", a: "Look for recent sales in your price range and property type, and ask how the agent finds off-market homes and handles competing offers. Whether you want the best realtor in Beverly Hills or a broker or buyer's agent you trust, check reviews and recognition such as RealTrends Verified." },
      { q: "Is Beverly Hills in LA?", a: "No, not as a city. Beverly Hills is its own city, surrounded by the City of Los Angeles, with its own city government, police, fire department, and school district. Many people say it is in Los Angeles because it sits within Los Angeles County and the Los Angeles area." },
      { q: "What are the ZIP codes for Beverly Hills?", a: "Beverly Hills uses 90210, 90211, and 90212. Some 90210 addresses are in the City of Los Angeles, so check the exact address." },
      { q: "What is the cheapest way to buy in Beverly Hills?", a: "Condos and townhomes are usually the lowest-priced options, followed by smaller or older houses. Prices change often, so Stefanie reviews current MLS data with you and shows what your budget can and cannot buy." },
      { q: "Are there condos and townhomes for sale in Beverly Hills?", a: "Yes, in a range of building types. Browse them in the listings above, and look closely at monthly dues and what they include, since that changes what you can afford." },
      { q: "What should I do first to sell a house in Beverly Hills?", a: "Decide how visible you want the sale to be: a public listing, private marketing, or both. Then get a price opinion built from matching sales. Stefanie can cover both in one short call." },
    ],
    nearby: ["Studio City", "Sherman Oaks", "Encino"],
    cta: {
      title: "Ready to Buy or Sell",
      italicTitle: "in Beverly Hills?",
      text: "Whether you are weighing the Valley against the Westside or already have an address in mind, start with a short call. Stefanie, your Beverly Hills real estate agent, will tell you what the numbers say.",
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
    // Public domain (JGKlein, Wikimedia Commons): Encino Commons, Ventura Blvd.
    image: "/images/neighborhoods/encino.jpg",
    alt: "The Encino Commons arch over Ventura Boulevard in Encino",
  },
  {
    name: "Beverly Hills",
    tagline: "Iconic luxury on the Westside",
    // Unsplash License (Lesli Whitecotton, unsplash.com/photos/2cFzLSweHN8).
    image: "/images/neighborhoods/beverly-hills.jpg",
    alt: "A Beverly Hills street lined with tall palm trees",
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
