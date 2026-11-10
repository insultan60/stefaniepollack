/* Community events with their own page. One place for the details, read by
   the event pages (src/pages/events/...), the /events listing, the page list
   and meta (src/lib/seo.ts) and the Event structured data
   (scripts/prerender.mjs). A new event is a new entry here, a page for it,
   and a line in EVENTS. */

const address = "4032 Whitsett Ave, Studio City, CA 91604";
const foodDriveAddress = "4321 Vantage Ave, Studio City, CA 91604";

export const FOOD_DRIVE = {
  path: "/events/studio-city-food-drive",
  name: "13th Annual Studio City Food Drive",
  summary:
    "Donation pickup day for the 13th annual Studio City Food Drive, benefiting the North Hollywood Interfaith Food Pantry. Neighbors get a grocery bag at the door; everyone else can drop off donations.",
  description:
    "Stefanie Pollack's 13th annual Studio City Food Drive benefits the North Hollywood Interfaith Food Pantry. Neighbors in her area get a grocery bag at the door and register for pickup on Sunday, November 15; anyone can drop off donations at 4321 Vantage Ave., Studio City, 8 AM to 2 PM.",
  // Sunday, November 15, 2026 is Pacific Standard Time (UTC-8).
  start: "2026-11-15T08:00:00-08:00",
  end: "2026-11-15T14:00:00-08:00",
  dateLabel: "Sunday, November 15, 2026",
  timeLabel: "8 AM – 2 PM",
  venue: "Donation drop-off",
  street: "4321 Vantage Ave.",
  city: "Studio City",
  region: "CA",
  postalCode: "91604",
  /** Short "where" line for event cards. */
  place: "Drop-off at 4321 Vantage Ave., Studio City",
  flyer: "/images/events/food-drive-2026-flyer.jpg",
  flyerWidth: 1545,
  flyerHeight: 1999,
  shareImage: "/images/events/food-drive-2026-share.jpg",
  icsPath: "/events/food-drive-2026.ics",
  beneficiary: "North Hollywood Interfaith Food Pantry",
  instagram: "https://www.instagram.com/stefanieismyrealtor/",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(foodDriveAddress)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(foodDriveAddress)}&z=16&output=embed`,
  googleCalendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("13th Annual Studio City Food Drive")}` +
    "&dates=20261115T160000Z/20261115T220000Z" +
    `&details=${encodeURIComponent("Donation pickup and drop-off, benefiting the North Hollywood Interfaith Food Pantry. https://www.stefaniepollack.com/events/studio-city-food-drive")}` +
    `&location=${encodeURIComponent(foodDriveAddress)}`,
  meta: {
    title: "13th Annual Studio City Food Drive | Nov 15 | Stefanie Pollack",
    description:
      "Studio City food drive benefiting the North Hollywood Interfaith Food Pantry. Donation pickup Sun Nov 15, or drop off 8 AM–2 PM at 4321 Vantage Ave.",
  },
} as const;
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
export const EVENTS = [FOOD_DRIVE, HOWL_O_WEEN] as const;

export const EVENTS_PAGE = {
  path: "/events",
  meta: {
    title: "Studio City Community Events | Stefanie Pollack",
    description:
      "Community events in Studio City hosted by Stefanie Pollack, REALTOR® and community connector: dates, places and details for neighbors, pups and people.",
  },
} as const;
