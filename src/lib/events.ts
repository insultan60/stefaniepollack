/* Community events with their own page. One place for the details, read by
   the event pages (src/pages/events/...), the /events listing, the page list
   and meta (src/lib/seo.ts) and the Event structured data
   (scripts/prerender.mjs). A new event is a new entry here, a page for it,
   and a line in EVENTS. */

const address = "4032 Whitsett Ave, Studio City, CA 91604";
const pieAddress = "4321 Vantage Ave, Studio City, CA 91604";

export const PIE_GIVEAWAY = {
  path: "/events/thanksgiving-pie-giveaway",
  name: "Thanksgiving Pie Giveaway",
  summary:
    "Pie's on me, neighbor! Reserve a free apple or pumpkin pie, Stefanie's Thanksgiving thank-you to Studio City neighbors and clients. Reserve by Monday, November 16.",
  description:
    "Stefanie Pollack's Thanksgiving thank-you to Studio City: reserve a free apple or pumpkin pie by Monday, November 16 and pick it up Saturday, November 21, 10 AM to 12 PM, at 4321 Vantage Ave. One per household, while supplies last.",
  // Saturday, November 21, 2026 is Pacific Standard Time (UTC-8).
  start: "2026-11-21T10:00:00-08:00",
  end: "2026-11-21T12:00:00-08:00",
  dateLabel: "Saturday, November 21, 2026",
  timeLabel: "10 AM – 12 PM pickup",
  venue: "Pie pickup",
  street: "4321 Vantage Ave.",
  city: "Studio City",
  region: "CA",
  postalCode: "91604",
  /** Short "where" line for event cards. */
  place: "4321 Vantage Ave., Studio City",
  flyer: "/images/events/pie-giveaway-2026-flyer.jpg",
  flyerWidth: 1700,
  flyerHeight: 2200,
  flyerPdf: "/events/pie-giveaway-2026-flyer.pdf",
  shareImage: "/images/events/pie-giveaway-2026-share.jpg",
  icsPath: "/events/pie-giveaway-2026.ics",
  /** The Google Form the flyer's QR code opens. */
  reserveUrl: "https://docs.google.com/forms/d/1T3_9iDn0OAhvoCHSzI0ili_y4-48G_gCkjf1NWXtMkM/viewform",
  reserveBy: "Monday, November 16",
  flavors: "Apple · Pumpkin",
  limit: "One per household, while supplies last",
  instagram: "https://www.instagram.com/stefanieismyrealtor/",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pieAddress)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(pieAddress)}&z=16&output=embed`,
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Pick up Thanksgiving pie from Stefanie Pollack")}` +
    "&dates=20261121T180000Z/20261121T200000Z" +
    `&details=${encodeURIComponent("Pick up your reserved free Thanksgiving pie. https://www.stefaniepollack.com/events/thanksgiving-pie-giveaway")}` +
    `&location=${encodeURIComponent(pieAddress)}`,
  meta: {
    title: "Free Thanksgiving Pie Giveaway | Studio City | Stefanie Pollack",
    description:
      "Free apple or pumpkin pie for Studio City neighbors. Reserve by Mon Nov 16, pick up Sat Nov 21, 10 AM–12 PM at 4321 Vantage Ave. One per household.",
  },
} as const;

/** The other dates on the pie flyer's "Upcoming Events" list (Nov–Dec 2026). */
export const PIE_FLYER_DATES = [
  {
    day: "15",
    when: "Nov · Sun",
    name: "13th Annual Neighborhood Food Drive",
    text: "Benefits the North Hollywood Interfaith Food Pantry. Contact Stefanie to schedule your donation pickup.",
  },
  {
    day: "21",
    when: "Nov · Sat",
    name: "Thanksgiving Pie Giveaway",
    text: "Pick up your reserved pie · 10 AM–12 PM · 4321 Vantage Ave., Studio City",
  },
  {
    day: "6",
    when: "Dec · Sun",
    name: "3rd Annual Merry Makers Station",
    tag: "Kids' Event",
    text: "Letters to Santa · Hanukkah Crafts · Holiday Creations. 9:30 AM–12 PM · Studio City Farmers Market, near the Compass office.",
  },
] as const;

export const HOWL_O_WEEN = {
  path: "/events/howl-o-ween",
  name: "Howl-O-Ween Dog Costume Parade",
  /** One or two lines for the event card on /events and the home page. */
  summary:
    "The first annual Studio City dog costume parade, with pictures, fun, and prizes for the best pet costumes. Pups and people welcome!",
  description:
    "Stefanie Pollack presents the first annual Howl-O-Ween Dog Costume Parade, a Studio City community event with pictures, fun, conversations, and prizes for the best pet costumes. Pups and people welcome.",
  // Friday, October 30, 2026 is still Pacific Daylight Time (UTC-7).
  start: "2026-10-30T16:30:00-07:00",
  end: "2026-10-30T18:00:00-07:00",
  dateLabel: "Friday, October 30, 2026",
  timeLabel: "4:30 PM – 6:00 PM",
  venue: "Christian Science Church Parking Lot",
  street: "4032 Whitsett Ave.",
  city: "Studio City",
  region: "CA",
  postalCode: "91604",
  place: "Christian Science Church Parking Lot, 4032 Whitsett Ave., Studio City",
  flyer: "/images/events/howl-o-ween-2026-flyer.jpg",
  flyerWidth: 1545,
  flyerHeight: 1999,
  shareImage: "/images/events/howl-o-ween-2026-share.jpg",
  icsPath: "/events/howl-o-ween-2026.ics",
  instagram: "https://www.instagram.com/stefanieismyrealtor/",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`,
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Howl-O-Ween Dog Costume Parade")}` +
    "&dates=20261030T233000Z/20261031T010000Z" +
    `&details=${encodeURIComponent("First annual Studio City dog costume parade presented by Stefanie Pollack. Pups & people welcome! https://www.stefaniepollack.com/events/howl-o-ween")}` +
    `&location=${encodeURIComponent(`Christian Science Church Parking Lot, ${address}`)}`,
  meta: {
    title: "Howl-O-Ween Dog Costume Parade | Studio City | Stefanie Pollack",
    description:
      "Dog costume parade in Studio City, Fri Oct 30, 2026, 4:30–6 PM at 4032 Whitsett Ave. Pictures, fun and prizes for the best pet costumes. Pups & people welcome!",
  },
} as const;

/** Every event, newest first. /events lists them and splits upcoming from past
 *  by each event's end time. */
export const EVENTS = [PIE_GIVEAWAY, HOWL_O_WEEN] as const;

export const EVENTS_PAGE = {
  path: "/events",
  meta: {
    title: "Studio City Community Events | Stefanie Pollack",
    description:
      "Community events in Studio City hosted by Stefanie Pollack, REALTOR® and community connector: dates, places and details for neighbors, pups and people.",
  },
} as const;
