import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="w-full bg-background-50 py-20 md:py-24">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
            Local Knowledge
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground-950">
            Find the Right <span className="italic font-normal">Los Angeles Neighborhood</span>
          </h2>
          <div className="mt-6 space-y-4 text-foreground-600 leading-relaxed">
            <p>
              Stefanie Pollack is a Studio City real estate agent who works across Los Angeles and
              the San Fernando Valley. She grew up in Studio City and is now raising her family there.
            </p>
            <p>
              Each neighborhood has its own prices, pace, and style. Stefanie uses local sales and 20+
              years of experience to show you the real pros and cons of each area.
            </p>
            <p>
              Hillside and flat streets can feel very different, even a few blocks apart. She helps you
              compare them before you make an offer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
