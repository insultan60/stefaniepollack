import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, googleReviews } from "@/mocks/googleReviews";

/** Google's multicolour "G", so the section reads as Google reviews at a glance. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Stars({ value, className = "w-4 h-4" }: { value: number; className?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(value) ? "fill-[#FBBC04] text-[#FBBC04]" : "text-foreground-300"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="w-full bg-background-100 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header: the rating does the talking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Google Reviews</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
                What Clients Say <span className="italic font-normal">on Google</span>
              </h2>
              <p className="mt-5 text-sm md:text-base text-foreground-600">
                Reviews from Stefanie's Google Business Profile, shown exactly as clients wrote them.
              </p>
            </div>

            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-background-50 px-6 py-5 shadow-sm ring-1 ring-foreground-200/60 transition-shadow hover:shadow-md self-start md:self-auto"
            >
              <GoogleG className="w-10 h-10 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl leading-none text-foreground-950">{GOOGLE_RATING.rating.toFixed(1)}</span>
                  <Stars value={GOOGLE_RATING.rating} className="w-5 h-5" />
                </div>
                <p className="mt-1.5 text-xs text-foreground-600 inline-flex items-center gap-1.5">
                  Based on {GOOGLE_RATING.count} Google reviews
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </p>
              </div>
            </a>
          </motion.div>

          {/* Masonry columns, so long and short reviews pack without gaps */}
          <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {googleReviews.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="mb-6 break-inside-avoid rounded-2xl bg-background-50 p-7 shadow-sm ring-1 ring-foreground-200/50"
              >
                <Stars value={r.rating} />
                <blockquote className="mt-4 text-[15px] text-foreground-800 leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-foreground-200/60 pt-4">
                  <GoogleG className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground-950">{r.author ?? "Google review"}</p>
                    <p className="text-xs text-foreground-500">{r.date}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <p className="mt-6 text-center">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground-950 px-7 py-3 text-sm font-medium text-foreground-950 transition-colors hover:bg-foreground-950 hover:text-background-50"
            >
              Read all {GOOGLE_RATING.count} reviews on Google
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
