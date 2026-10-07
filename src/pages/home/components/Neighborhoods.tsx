import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const areas = [
  {
    name: "Studio City",
    description:
      "Home base and the heart of the San Fernando Valley. Ventura Boulevard dining, Tujunga Village shops, and trails at Fryman Canyon are close by.",
    cta: "Explore Studio City Real Estate",
  },
  {
    name: "Sherman Oaks",
    description: "Upscale living with village charm along Ventura Boulevard.",
    cta: "Explore Sherman Oaks",
  },
  {
    name: "Encino",
    description: "Suburban calm with a polished feel and easy access to Ventura Boulevard.",
    cta: "Explore Encino",
  },
  {
    name: "Beverly Hills",
    description: "Iconic luxury on the Westside, near Rodeo Drive.",
    cta: "Explore Beverly Hills",
  },
];

export default function Neighborhoods() {
  return (
    <section className="w-full bg-accent-100 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              Neighborhoods
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950">
              Los Angeles Neighborhoods{" "}
              <span className="italic font-normal">We Serve</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Stefanie is based in Studio City and works across Los Angeles. Each area has its own
              prices, pace, and style, so she explains the differences before you decide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {areas.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col bg-background-50 rounded-2xl border border-background-200/60 p-8 hover:border-background-300/80 transition-all duration-500"
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary-100/70 text-primary-700 mb-5">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-foreground-950">{area.name}</h3>
                <p className="mt-3 text-sm text-foreground-600 leading-relaxed flex-grow">{area.description}</p>
                <a
                  href="/neighborhoods"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground-800 hover:text-primary-700 transition-colors"
                >
                  {area.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </a>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm md:text-base text-foreground-600">
            Looking somewhere else in Los Angeles or the Valley?{" "}
            <a href="/contact" className="text-foreground-900 underline underline-offset-4 hover:text-primary-700">
              Contact Stefanie
            </a>
            , and she will tell you if she can help.
          </p>
        </div>
      </div>
    </section>
  );
}
