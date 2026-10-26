import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CalendarPlus, Clock, Heart, Instagram, MapPin } from "lucide-react";
import PageHero from "@/components/feature/PageHero";
import CTASection from "../home/components/CTASection";
import { EVENTS, HOWL_O_WEEN } from "@/lib/events";
import { useNow } from "@/hooks/useNow";

/* /events — every community event Stefanie hosts, newest first, split into
   Upcoming and Past by each event's end time (in the browser; see useNow).
   The events themselves live in src/lib/events.ts. */

type Ev = (typeof EVENTS)[number];

function EventCard({ ev, past, i }: { ev: Ev; past: boolean; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center bg-background-50 rounded-2xl p-6 md:p-8 border border-background-200/60"
    >
      <a href={ev.path} className="block" aria-label={ev.name}>
        <img
          src={ev.flyer}
          alt={`${ev.name} flyer`}
          width={1545}
          height={1999}
          loading="lazy"
          className={`w-full max-w-[240px] mx-auto h-auto rounded-xl shadow-md ${past ? "grayscale-[35%]" : ""}`}
        />
      </a>
      <div>
        <span
          className={`inline-block text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full ${
            past ? "bg-background-200 text-foreground-600" : "bg-primary-100 text-primary-700"
          }`}
        >
          {past ? "Past Event" : "Upcoming"}
        </span>
        <h3 className="mt-4 font-heading text-2xl md:text-3xl text-foreground-950">
          <a href={ev.path} className="hover:text-primary-700 transition-colors">
            {ev.name}
          </a>
        </h3>
        <p className="mt-3 text-foreground-600 leading-relaxed">{ev.summary}</p>
        <ul className="mt-5 space-y-2 text-sm text-foreground-950">
          <li className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary-600 shrink-0" aria-hidden="true" />
            {ev.dateLabel}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600 shrink-0" aria-hidden="true" />
            {ev.timeLabel}
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              {ev.venue}, {ev.street}, {ev.city}
            </span>
          </li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={ev.path}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-medium tracking-wide hover:bg-foreground-800 transition-colors"
          >
            Event Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {!past && (
            <a
              href={ev.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-950/20 text-foreground-950 text-sm font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
            >
              <CalendarPlus className="w-4 h-4" aria-hidden="true" />
              Add to Calendar
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  const now = useNow();
  // Until the page loads, every event counts as upcoming (see useNow).
  const isPast = (ev: Ev) => now !== null && now > new Date(ev.end).getTime();
  const upcoming = EVENTS.filter((ev) => !isPast(ev));
  const past = EVENTS.filter(isPast);

  return (
    <div className="w-full">
      <PageHero
        eyebrow="Community Events"
        title="Studio City"
        italicTitle="Together"
        subtitle="Neighborhood events hosted by Stefanie Pollack, for neighbors, families, and their four-legged friends."
        image="/images/philanthropy/food-drive-5.jpg"
        imageAlt="Stefanie Pollack with bags of donations for a community food drive"
      />

      {/* ---------- INTRO ---------- */}
      <section className="w-full bg-background-50 py-20 md:py-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Get Involved</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
              Events for <span className="italic font-normal">Our Neighborhood</span>
            </h2>
            <p className="mt-6 text-foreground-600 leading-relaxed">
              As a REALTOR® and community connector, Stefanie hosts events that bring Studio City neighbors
              together. Find what&rsquo;s coming up below, add it to your calendar, and bring a friend.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- UPCOMING ---------- */}
      <section className="w-full bg-accent-100 py-20 md:py-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground-950 mb-10">
              Upcoming <span className="italic font-normal">Events</span>
            </h2>
            {upcoming.length ? (
              <div className="grid gap-8">
                {upcoming.map((ev, i) => (
                  <EventCard key={ev.path} ev={ev} past={false} i={i} />
                ))}
              </div>
            ) : (
              <div className="bg-background-50 rounded-2xl p-8 border border-background-200/60 text-center">
                <p className="text-foreground-700 leading-relaxed">
                  The next event is being planned. Follow along on Instagram to hear about it first.
                </p>
                <a
                  href={HOWL_O_WEEN.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  @stefanieismyrealtor
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- PAST (once an event has ended) ---------- */}
      {past.length > 0 && (
        <section className="w-full bg-background-50 py-20 md:py-24">
          <div className="w-full px-6 md:px-10 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground-950 mb-10">
                Past <span className="italic font-normal">Events</span>
              </h2>
              <div className="grid gap-8">
                {past.map((ev, i) => (
                  <EventCard key={ev.path} ev={ev} past i={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- GIVING BACK + FOLLOW ---------- */}
      <section className="w-full bg-foreground-950 py-16 md:py-20">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-8 h-8 text-primary-300 mx-auto" aria-hidden="true" />
            <h2 className="mt-5 font-heading text-3xl md:text-4xl text-white">
              Rooted in <span className="italic font-normal">Community</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Beyond these events, Stefanie supports local drives and causes across Studio City and the Valley.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/philanthropy"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-foreground-950 text-sm font-medium tracking-wide hover:bg-primary-100 transition-colors"
              >
                See Philanthropy <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={HOWL_O_WEEN.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/30 text-white text-sm font-medium tracking-wide hover:bg-white hover:text-foreground-950 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                Follow for More Events
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
