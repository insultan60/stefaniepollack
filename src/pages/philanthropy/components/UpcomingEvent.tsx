import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { HOWL_O_WEEN as EVENT } from "@/lib/events";

/* The next community event, linking to its page. Used on the Philanthropy
   page and the home page. Swap the import (or drop the section) once the
   event has passed. `className` sets the section's spacing for each page. */
export default function UpcomingEvent({ className = "pb-20 md:pb-24" }: { className?: string }) {
  return (
    <section className={`w-full bg-background-50 ${className}`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center bg-accent-100 rounded-2xl p-6 md:p-8 border border-background-200/60"
        >
          <Link to={EVENT.path} className="block">
            <img
              src={EVENT.flyer}
              alt="Howl-O-Ween Dog Costume Parade flyer"
              width={1545}
              height={1999}
              loading="lazy"
              className="w-full max-w-[220px] mx-auto h-auto rounded-xl shadow-md"
            />
          </Link>
          <div>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-3">Upcoming Event</p>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground-950">
              <Link to={EVENT.path} className="hover:text-primary-700 transition-colors">
                {EVENT.name}
              </Link>
            </h2>
            <p className="mt-3 text-foreground-600 leading-relaxed">
              The first annual Studio City dog costume parade, with pictures, fun, and prizes for the best pet
              costumes. Pups and people welcome!
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-foreground-950">
              <li className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary-600" aria-hidden="true" />
                {EVENT.dateLabel}, {EVENT.timeLabel}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" aria-hidden="true" />
                {EVENT.street}, {EVENT.city}
              </li>
            </ul>
            <Link
              to={EVENT.path}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-medium tracking-wide hover:bg-foreground-800 transition-colors"
            >
              Event Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
