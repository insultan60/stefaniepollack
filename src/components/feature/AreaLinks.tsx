import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { areaCards, areaHref } from "@/mocks/areas";

/* Neighborhood link cards for the buyers and sellers pages. Each card's link
   text is passed in (the briefs give each page its own anchor text), and a
   description is optional: the sellers page keeps them as short link cards so
   it does not repeat the buyers page's blurbs. Links go through areaHref(), so
   an area without a page falls back to /listings instead of a 404. */
export default function AreaLinks({
  eyebrow,
  title,
  italicTitle,
  intro,
  areas,
}: {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  intro: string;
  areas: { name: string; linkText: string; description?: string }[];
}) {
  return (
    <section className="w-full bg-accent-100 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">{eyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
              {title}
              {italicTitle && (
                <>
                  {" "}
                  <span className="italic font-normal">{italicTitle}</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-sm md:text-base text-foreground-600 leading-relaxed">{intro}</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((a, i) => {
              const card = areaCards.find((c) => c.name === a.name);
              return (
                <motion.a
                  key={a.name}
                  href={areaHref(a.name)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                  className="group flex flex-col bg-background-50 rounded-2xl overflow-hidden"
                >
                  {card && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-xl text-foreground-950">{a.name}</h3>
                    {a.description && (
                      <p className="mt-2 text-sm text-foreground-600 leading-relaxed flex-grow">{a.description}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 group-hover:text-foreground-950 transition-colors">
                      {a.linkText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <p className="mt-10 text-center">
            <a
              href="/neighborhoods"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground-800 hover:text-primary-700 transition-colors"
            >
              View all Los Angeles neighborhoods
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
