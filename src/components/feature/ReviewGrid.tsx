import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { allTestimonials } from "@/mocks/home";

/* A page's own reviews, picked by author from the client's review export
   (mocks/home.ts) and shown word for word. The buyers and sellers pages each
   pass their own list, so the two pages no longer repeat one testimonial. */
export default function ReviewGrid({
  title,
  italicTitle,
  intro,
  authors,
}: {
  title: string;
  italicTitle?: string;
  intro: string;
  authors: string[];
}) {
  const reviews = authors
    .map((a) => allTestimonials.find((t) => t.author === a))
    .filter((t): t is (typeof allTestimonials)[number] => Boolean(t));
  if (reviews.length === 0) return null;

  return (
    <section className="w-full bg-background-500 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
              {title}
              {italicTitle && (
                <>
                  {" "}
                  <span className="italic font-normal">{italicTitle}</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-sm md:text-base text-foreground-600">{intro}</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <figure key={r.id} className="bg-background-50 rounded-2xl p-8 flex flex-col">
                <Quote className="w-7 h-7 text-primary-300" strokeWidth={1.5} />
                <blockquote className="mt-5 text-foreground-800 leading-relaxed flex-grow">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-medium text-foreground-950 tracking-wide uppercase">{r.author}</p>
                  <p className="text-xs text-foreground-500 mt-1">{r.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center">
            <a href="/about#testimonials" className="text-sm font-medium text-foreground-800 hover:text-primary-700 inline-flex items-center gap-2">
              Read more client stories
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
