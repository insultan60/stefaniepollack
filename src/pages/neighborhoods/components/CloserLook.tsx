import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { areaHref, hasAreaPage } from "@/mocks/areas";

const areas = [
  {
    name: "Studio City",
    text: "Studio City is Stefanie's home base. Its streets sit near Ventura Boulevard dining, Tujunga Village shops, and the trails at Fryman Canyon. Buyers can choose between hillside and flat streets, and Stefanie explains how each one lives and sells.",
  },
  {
    name: "Sherman Oaks",
    text: "Sherman Oaks sits between Studio City and Encino along Ventura Boulevard. It offers village-style shopping and dining, with a mix of hillside and flat streets. Stefanie helps buyers compare it with nearby areas and helps sellers price against the right sales.",
  },
  {
    name: "Encino",
    text: "Encino is the next stop west on Ventura Boulevard, with a quieter, suburban feel. Streets range from hillside homes to level lots. Stefanie helps clients weigh space, privacy, and price against other Valley areas.",
  },
  {
    name: "Beverly Hills",
    text: "Beverly Hills is a separate city on the Westside, known for Rodeo Drive and high-end homes. Stefanie works with luxury buyers and sellers who want to compare it with the Valley.",
  },
];

export default function CloserLook() {
  return (
    <section className="w-full bg-accent-100 py-20 md:py-28">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950">
            A Closer Look at <span className="italic font-normal">Each Area</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {areas.map((a, i) => (
              <motion.article
                key={a.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="bg-background-50 rounded-2xl p-8 md:p-10 flex flex-col"
              >
                <h3 className="font-heading text-2xl text-foreground-950">{a.name} Real Estate</h3>
                <p className="mt-4 text-foreground-700 leading-relaxed flex-grow">{a.text}</p>
                {/* An area without its own page yet points at the listings, as
                    the brief asks, and the link text says so. */}
                <a
                  href={areaHref(a.name)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground-800 hover:text-primary-700 transition-colors"
                >
                  {hasAreaPage(a.name) ? `Read the ${a.name} guide` : "View current listings"}
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
