/* Community events with their own page. One place for the details, read by
   the event pages (src/pages/events/...), the /events listing, the page list
   and meta (src/lib/seo.ts) and the Event structured data
   (scripts/prerender.mjs). A new event is a new entry here, a page for it,
   and a line in EVENTS. */

const address = "4032 Whitsett Ave, Studio City, CA 91604";

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
  flyer: "/images/events/howl-o-ween-2026-flyer.jpg",
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
export const EVENTS = [HOWL_O_WEEN] as const;

export const EVENTS_PAGE = {
  path: "/events",
  meta: {
    title: "Studio City Community Events | Stefanie Pollack",
    description:
      "Community events in Studio City hosted by Stefanie Pollack, REALTOR® and community connector: dates, places and details for neighbors, pups and people.",
  },
} as const;
