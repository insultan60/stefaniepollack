import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CalendarPlus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { HOWL_O_WEEN as EVENT } from "@/lib/events";
import { useIsPast } from "@/hooks/useNow";

/* The next community event, linking to its page. Used on the Philanthropy
   page and the home page; it hides itself once the event has ended, so it
   never advertises a past date. Point the import at the next event to bring
   it back. `className` sets the section's spacing for each page; `large` is the home
   page's version, as wide as the sections around it (max-w-7xl). */
export default function UpcomingEvent({
  className = "pb-20 md:pb-24",
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  const past = useIsPast(EVENT.end);
  if (past) return null;
  return (
    <section className={`w-full bg-background-50 ${className}`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className={`mx-auto grid grid-cols-1 items-center bg-accent-100 rounded-2xl border border-background-200/60 ${
            large
              ? "max-w-7xl md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-10 lg:gap-16 p-8 md:p-12 lg:p-16"
              : "max-w-5xl md:grid-cols-[220px_1fr] gap-8 p-6 md:p-8"
          }`}
        >
          <Link to={EVENT.path} className="block">
            <img
              src={EVENT.flyer}
              alt="Howl-O-Ween Dog Costume Parade flyer"
              width={1545}
              height={1999}
              loading="lazy"
              className={`w-full mx-auto h-auto rounded-xl ${large ? "max-w-[420px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]" : "max-w-[220px] shadow-md"}`}
            />
          </Link>
          <div>
            <p className={`font-medium tracking-[0.25em] uppercase text-primary-600 ${large ? "text-sm mb-4" : "text-xs mb-3"}`}>
              Upcoming Event
            </p>
            <h2 className={`font-heading text-foreground-950 ${large ? "text-3xl md:text-5xl leading-tight" : "text-2xl md:text-3xl"}`}>
              <Link to={EVENT.path} className="hover:text-primary-700 transition-colors">
                {EVENT.name}
              </Link>
            </h2>
            <p className={`text-foreground-600 leading-relaxed ${large ? "mt-5 text-lg max-w-xl" : "mt-3"}`}>{EVENT.summary}</p>
            <ul className={`text-foreground-950 ${large ? "mt-7 space-y-3 text-base md:text-lg" : "mt-4 space-y-1.5 text-sm"}`}>
              <li className="flex items-center gap-3">
                <CalendarDays className={`${large ? "w-5 h-5" : "w-4 h-4"} text-primary-600 shrink-0`} aria-hidden="true" />
                {EVENT.dateLabel}, {EVENT.timeLabel}
              </li>
              <li className="flex items-start gap-3">
                <MapPin className={`${large ? "w-5 h-5 mt-0.5" : "w-4 h-4"} text-primary-600 shrink-0`} aria-hidden="true" />
                {large ? `${EVENT.venue}, ${EVENT.street}, ${EVENT.city}` : `${EVENT.street}, ${EVENT.city}`}
              </li>
            </ul>
            <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${large ? "mt-9" : "mt-6"}`}>
              <Link
                to={EVENT.path}
                className={`inline-flex items-center gap-2 rounded-full bg-foreground-950 text-white font-medium tracking-wide hover:bg-foreground-800 transition-colors ${large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
              >
                Event Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              {large && (
                <a
                  href={EVENT.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground-950/20 text-foreground-950 text-base font-medium tracking-wide hover:bg-foreground-950 hover:text-white transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                  Add to Calendar
                </a>
              )}
              <Link
                to="/events"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
              >
                All events
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
