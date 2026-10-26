import { motion } from "framer-motion";
import { CalendarDays, CalendarPlus, Camera, Clock, Heart, Instagram, MapPin, MessageCircle, Navigation, PawPrint, Trophy } from "lucide-react";
import CTASection from "../../home/components/CTASection";
import { HOWL_O_WEEN as EVENT } from "@/lib/events";

/* /events/howl-o-ween — the first annual Howl-O-Ween Dog Costume Parade.
   Everything here is from the flyer (date, time, place, what to expect); the
   Event structured data is written by scripts/prerender.mjs from the same
   details in src/lib/events.ts. */

const EXPECT = [
  { icon: Camera, title: "Pictures", text: "Bring your pup in costume and leave with photos worth framing." },
  { icon: Heart, title: "Fun", text: "An hour and a half of Halloween fun for dogs and the people who love them." },
  { icon: MessageCircle, title: "Conversations", text: "Meet your Studio City neighbors and their four-legged friends." },
  { icon: Trophy, title: "Prizes", text: "Exciting prizes for the best pet costumes. Start planning the look now." },
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export default function HowlOWeen() {
  return (
    <div className="w-full">
      {/* ---------- HERO: details left, flyer right ---------- */}
      <section className="w-full bg-background-50 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
                A Studio City Community Event
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground-950 leading-[1.05]">
                Howl-O-Ween
                <br />
                <span className="italic font-normal">Dog Costume Parade</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-600 leading-relaxed max-w-xl">
                Stefanie Pollack presents the first annual Howl-O-Ween Dog Costume Parade. Join us for
                pictures, fun, conversations, and exciting prizes for the best pet costumes. Pups and
                people welcome!
              </p>

              <dl className="mt-8 grid gap-4 max-w-xl">
                <div className="flex gap-4 items-start">
                  <CalendarDays className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Date</dt>
                    <dd className="text-foreground-950 font-medium">{EVENT.dateLabel}</dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Time</dt>
                    <dd className="text-foreground-950 font-medium">{EVENT.timeLabel}</dd>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd className="text-foreground-950 font-medium">{EVENT.venue}</dd>
                    <dd className="text-foreground-600">
                      {EVENT.street}, {EVENT.city}, {EVENT.region} {EVENT.postalCode}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={EVENT.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-medium tracking-wide hover:bg-foreground-800 transition-colors"
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
                <a
                  href={EVENT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  Get Directions
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
                alt="Howl-O-Ween Dog Costume Parade flyer: Friday, October 30, 2026, 4:30 to 6:00 PM at the Christian Science Church parking lot, 4032 Whitsett Ave, Studio City"
                width={1545}
                height={1999}
                className="w-full h-auto rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] border border-background-200/60"
              />
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ---------- WHAT TO EXPECT ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
                What to Expect
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Pups &amp; People <span className="italic font-normal">Welcome</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPECT.map(({ icon: Icon, title, text }, i) => (
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
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Where</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
                Meet Us in <span className="italic font-normal">Studio City</span>
              </h2>
              <p className="mt-5 text-foreground-600 leading-relaxed">
                The parade gathers in the Christian Science Church parking lot at {EVENT.street}, Studio City.
                Come in costume, two legs or four.
              </p>
              <p className="mt-6 text-foreground-950 font-medium">{EVENT.venue}</p>
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
                title="Map: 4032 Whitsett Ave, Studio City"
                src={EVENT.mapEmbedUrl}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- FOLLOW ---------- */}
      <section className="w-full bg-foreground-950 py-16 md:py-20">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <motion.div {...fade} className="max-w-3xl mx-auto text-center">
            <PawPrint className="w-8 h-8 text-primary-300 mx-auto" aria-hidden="true" />
            <h2 className="mt-5 font-heading text-3xl md:text-4xl text-white">
              Follow for More <span className="italic font-normal">Community Events</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Stefanie Pollack, REALTOR® and community connector, hosts events for Studio City neighbors all year.
              Follow along so you never miss the next one.
            </p>
            <a
              href={EVENT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground-950 text-sm font-medium tracking-wide hover:bg-primary-100 transition-colors"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              @stefanieismyrealtor
            </a>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
