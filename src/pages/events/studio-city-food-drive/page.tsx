import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  HandHeart,
  Heart,
  Home,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
} from "lucide-react";
import CTASection from "../../home/components/CTASection";
import { FOOD_DRIVE as EVENT } from "@/lib/events";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/* /events/studio-city-food-drive — the 13th annual Studio City Food Drive.
   Everything here is from the flyer (pickup day, drop-off place and hours,
   the beneficiary); the Event structured data is written by
   scripts/prerender.mjs from the same details in src/lib/events.ts. */

const WAYS = [
  {
    icon: Home,
    title: "Live in my neighborhood?",
    lines: [
      "Look for a grocery bag at your door!",
      "Fill it, then register for donation pickup on Sunday, November 15. Call or text Stefanie to get on the pickup list.",
    ],
  },
  {
    icon: Heart,
    title: "Outside my neighborhood?",
    lines: [
      "Drop off your donations!",
      "Sunday, November 15, 8 AM – 2 PM at 4321 Vantage Ave., Studio City. Every donation makes a difference.",
    ],
  },
];

const PHOTOS = [
  { src: "/images/philanthropy/food-drive-2.jpg", alt: "Grocery bags of donations from a past Studio City food drive" },
  { src: "/images/philanthropy/food-drive-3.jpg", alt: "Stefanie Pollack collecting food drive donations" },
  { src: "/images/philanthropy/food-drive-4.jpg", alt: "Neighbors delivering donations to the food pantry" },
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export default function FoodDrive() {
  return (
    <div className="w-full">
      {/* ---------- HERO: details left, flyer right ---------- */}
      <section className="w-full bg-background-50 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">13th Annual</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground-950 leading-[1.05]">
                Studio City
                <br />
                <span className="italic font-normal">Food Drive</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-600 leading-relaxed max-w-xl">
                An opportunity to give back. Every bag collected goes to the {EVENT.beneficiary}, helping
                neighbors across the Valley put food on the table this season.
              </p>

              <dl className="mt-8 grid gap-4 max-w-xl">
                <div className="flex gap-4 items-start">
                  <CalendarDays className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Date</dt>
                    <dd className="text-foreground-950 font-medium">Donation pickup: {EVENT.dateLabel}</dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Drop-off hours</dt>
                    <dd className="text-foreground-950 font-medium">Drop-off {EVENT.timeLabel}</dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Drop-off location</dt>
                    <dd className="text-foreground-950 font-medium">
                      {EVENT.street}, {EVENT.city}, {EVENT.region} {EVENT.postalCode}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <HandHeart className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Benefiting</dt>
                    <dd className="text-foreground-950 font-medium">Benefiting the {EVENT.beneficiary}</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-medium tracking-wide hover:bg-foreground-800 transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Schedule a Pickup: {PHONE_DISPLAY}
                </a>
                <a
                  href={EVENT.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                  Add to Google Calendar
                </a>
                <a
                  href={EVENT.icsPath}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Apple / Outlook
                </a>
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <img
                src={EVENT.flyer}
                alt="13th Annual Studio City Food Drive flyer: donation pickup Sunday, November 15, 2026, drop-off 8 AM to 2 PM at 4321 Vantage Ave., benefiting the North Hollywood Interfaith Food Pantry"
                width={EVENT.flyerWidth}
                height={EVENT.flyerHeight}
                className="w-full h-auto rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] border border-background-200/60"
              />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ---------- TWO WAYS TO GIVE ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fade} className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">How to Give</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Two Ways to <span className="italic font-normal">Donate</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WAYS.map(({ icon: Icon, title, lines }, i) => (
                <motion.div
                  key={title}
                  {...fade}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-background-50 rounded-2xl p-8 border border-background-200/60"
                >
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl text-foreground-950">{title}</h3>
                  <p className="mt-3 font-medium text-foreground-950">{lines[0]}</p>
                  <p className="mt-2 text-foreground-600 leading-relaxed">{lines[1]}</p>
                </motion.div>
              ))}
            </div>
            <motion.p {...fade} className="mt-10 flex items-center justify-center gap-2 text-center text-foreground-700">
              <ShoppingBag className="w-4 h-4 text-primary-600" aria-hidden="true" />
              Questions or want a bag? Call or text{" "}
              <a href={PHONE_HREF} className="font-medium text-foreground-950 underline underline-offset-4">
                {PHONE_DISPLAY}
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------- PAST DRIVES ---------- */}
      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="max-w-2xl mb-12">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">13 Years Running</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Neighbors Helping <span className="italic font-normal">Neighbors</span>
              </h2>
              <p className="mt-5 text-foreground-600 leading-relaxed">
                For thirteen years, Studio City families have filled bags, left them on the porch, and helped
                stock the shelves at the {EVENT.beneficiary}. Thank you for your donation and support!
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PHOTOS.map((photo, i) => (
                <motion.img
                  key={photo.src}
                  {...fade}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHERE ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <motion.div {...fade}>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Drop-Off</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Drop Off in <span className="italic font-normal">Studio City</span>
              </h2>
              <p className="mt-6 text-foreground-950 font-medium">{EVENT.dateLabel}, {EVENT.timeLabel}</p>
              <p className="text-foreground-600">
                {EVENT.street}
                <br />
                {EVENT.city}, {EVENT.region} {EVENT.postalCode}
              </p>
              <a
                href={EVENT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary-700 hover:text-primary-800"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Open in Google Maps
              </a>
            </motion.div>
            <motion.div {...fade} className="rounded-2xl overflow-hidden border border-background-200/60 aspect-[4/3]">
              <iframe
                title="Map: 4321 Vantage Ave, Studio City"
                src={EVENT.mapEmbedUrl}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="w-full bg-foreground-950 py-16 md:py-20">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <motion.div {...fade} className="max-w-3xl mx-auto text-center">
            <HandHeart className="w-8 h-8 text-primary-300 mx-auto" aria-hidden="true" />
            <h2 className="mt-5 font-heading text-3xl md:text-4xl text-white">
              Your Neighbor, <span className="italic font-normal">Community Connector</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Stefanie Pollack, local REALTOR®. Reach out to schedule your donation pickup.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground-950 text-sm font-medium tracking-wide hover:bg-primary-100 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:bg-white hover:text-foreground-950 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {EMAIL}
              </a>
              <a
                href={EVENT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:bg-white hover:text-foreground-950 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                @stefanieismyrealtor
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
