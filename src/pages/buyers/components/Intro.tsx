import { motion } from "framer-motion";
import { photoFocus } from "@/lib/photoFocus";
import ProofStrip from "@/components/feature/ProofStrip";

export default function Intro() {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="/images/stefanie/lifestyle-4.jpg"
                alt="Stefanie Pollack, Los Angeles buyer's agent"
                className="w-full h-full object-cover"
                style={{ objectPosition: photoFocus("/images/stefanie/lifestyle-4.jpg") }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-primary-300 rounded-lg -z-10 hidden lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              For Buyers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
              A Los Angeles Buyer&apos;s Agent{" "}
              <span className="italic font-normal">Who Does the Heavy Lifting</span>
            </h2>
            <div className="mt-8 space-y-4 text-foreground-700 leading-relaxed">
              <p>
                Buying a home in Los Angeles takes time most people do not have. A buyer&apos;s agent
                handles the legwork so you can focus on homes that fit.
              </p>
              <p>
                Stefanie Pollack has 20+ years of experience across Los Angeles and the San Fernando
                Valley. She helps you set a budget, find homes (including some off-market), write strong
                offers, and close without surprises.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="/contact"
                className="inline-flex px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors duration-300 whitespace-nowrap"
              >
                Start Your Home Search
              </a>
            </div>
          </motion.div>
        </div>
        <ProofStrip />
      </div>
    </section>
  );
}
