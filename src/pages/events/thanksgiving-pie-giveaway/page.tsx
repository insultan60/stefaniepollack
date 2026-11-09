import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Clock,
  FileDown,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import CTASection from "../../home/components/CTASection";
import { PIE_FLYER_DATES, PIE_GIVEAWAY as EVENT } from "@/lib/events";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/* /events/thanksgiving-pie-giveaway — Stefanie's free Thanksgiving pie.
   Everything here is from the flyer (flavors, reserve-by, pickup, limit, the
   Nov–Dec dates); "Reserve" opens the Google Form the flyer's QR code points
   to. The Event structured data is written by scripts/prerender.mjs from the
   same details in src/lib/events.ts. */

const DETAILS = [
  { label: "Flavors", value: EVENT.flavors },
  { label: "Reserve by", value: EVENT.reserveBy },
  { label: "Pickup", value: `${EVENT.dateLabel.replace(", 2026", "")}, 10 AM – 12 PM` },
  { label: "Limit", value: EVENT.limit },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Reserve your pie",
    text: `Fill out the short form, or call or text ${PHONE_DISPLAY}. Reservations close ${EVENT.reserveBy}.`,
  },
  {
    icon: CalendarDays,
    title: "Pick it up",
    text: `Saturday, November 21, 10 AM – 12 PM at ${EVENT.place}.`,
  },
  {
    icon: Heart,
    title: "Enjoy",
    text: "Apple or pumpkin, on me. A little something sweet to say thank you, neighbor.",
  },
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export default function PieGiveaway() {
  return (
    <div className="w-full">
      {/* ---------- HERO: details left, flyer right ---------- */}
      <section className="w-full bg-background-50 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
                A Thanksgiving Thank You
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground-950 leading-[1.05]">
                Pie&rsquo;s on Me,
                <br />
                <span className="italic font-normal">Neighbor!</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-600 leading-relaxed max-w-xl">
                Reserve your <strong className="font-semibold text-foreground-950">FREE</strong> pie and enjoy a
                little something sweet on me! It&rsquo;s my way of saying thank you to the wonderful neighbors and
                clients who make our community and business so special.
              </p>

              <dl className="mt-8 max-w-xl border-t border-background-200">
                {DETAILS.map((d) => (
                  <div key={d.label} className="grid grid-cols-[120px_1fr] gap-4 py-3.5 border-b border-background-200">
                    <dt className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-600 pt-0.5">
                      {d.label}
                    </dt>
                    <dd className="text-foreground-950">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={EVENT.reserveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-medium tracking-wide hover:bg-foreground-800 transition-colors"
                >
                  <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
                  Reserve Your Free Pie
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call or text {PHONE_DISPLAY}
                </a>
              </div>
              <p className="mt-4 text-sm text-foreground-600">Reservations close {EVENT.reserveBy}.</p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <img
                src={EVENT.flyer}
                alt="Pie's on Me, Neighbor! flyer: free apple or pumpkin Thanksgiving pie, reserve by Monday, November 16, pick up Saturday, November 21, one per household"
                width={EVENT.flyerWidth}
                height={EVENT.flyerHeight}
                className="w-full h-auto rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] border border-background-200/60"
              />
              <figcaption className="mt-4 text-center">
                <a
                  href={EVENT.flyerPdf}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  Download the flyer (PDF)
                </a>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">How It Works</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Reserve, Pick Up, <span className="italic font-normal">Enjoy</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  {...fade}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-background-50 rounded-2xl p-7 border border-background-200/60"
                >
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl text-foreground-950">{title}</h3>
                  <p className="mt-2 text-sm text-foreground-600 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHERE ---------- */}
      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <motion.div {...fade}>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Pickup</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Pick Up in <span className="italic font-normal">Studio City</span>
              </h2>
              <ul className="mt-6 space-y-3 text-foreground-950">
                <li className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-primary-600 shrink-0" aria-hidden="true" />
                  {EVENT.dateLabel}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-600 shrink-0" aria-hidden="true" />
                  10 AM – 12 PM
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {EVENT.street}
                    <br />
                    {EVENT.city}, {EVENT.region} {EVENT.postalCode}
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={EVENT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={EVENT.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                  Google Calendar
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

      {/* ---------- MORE DATES FROM THE FLYER ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fade} className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Upcoming <span className="italic font-normal">Events</span>
              </h2>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-600">Nov – Dec 2026</p>
            </motion.div>
            <ul className="border-t border-foreground-950/15">
              {PIE_FLYER_DATES.map((d) => (
                <li
                  key={d.name}
                  className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr] gap-4 py-6 border-b border-foreground-950/15"
                >
                  <div>
                    <p className="font-heading text-4xl text-foreground-950 leading-none">{d.day}</p>
                    <p className="mt-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-primary-600">
                      {d.when}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl text-foreground-950">
                      {d.name}
                      {"tag" in d && (
                        <span className="ml-3 align-middle inline-block text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-primary-600 text-primary-700">
                          {d.tag}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 text-sm text-foreground-600 leading-relaxed">{d.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- FOLLOW ---------- */}
      <section className="w-full bg-foreground-950 py-16 md:py-20">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <motion.div {...fade} className="max-w-3xl mx-auto text-center">
            <MessageCircle className="w-8 h-8 text-primary-300 mx-auto" aria-hidden="true" />
            <h2 className="mt-5 font-heading text-3xl md:text-4xl text-white">
              Questions About <span className="italic font-normal">Your Pie?</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Call or text Stefanie at {PHONE_DISPLAY}, and follow along for more Studio City community events.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={EVENT.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground-950 text-sm font-medium tracking-wide hover:bg-primary-100 transition-colors"
              >
                <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
                Reserve Your Free Pie
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
