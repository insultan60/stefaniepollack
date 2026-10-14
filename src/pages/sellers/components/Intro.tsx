import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { photoFocus } from "@/lib/photoFocus";
import ProofStrip from "@/components/feature/ProofStrip";
import { HOMEBOT_URL } from "@/lib/homebot";

export default function Intro() {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              For Sellers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
              A Los Angeles Listing Agent{" "}
              <span className="italic font-normal">Who Gets You to Closing Day</span>
            </h2>
            <div className="mt-8 space-y-4 text-foreground-700 leading-relaxed">
              <p>
                Preparing a home for sale is a lot to add to a busy life. Stefanie Pollack takes it on, so
                you can move from listing to closing day with less stress.
              </p>
              <p>
                With 20+ years of experience across Los Angeles and the San Fernando Valley, she prices
                your home from recent sales, prepares it to show well, markets it to serious buyers, and
                vets every offer before you decide.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={HOMEBOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors duration-300 whitespace-nowrap"
              >
                Get Your Free Home Value
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="/images/stefanie/portrait-3.jpg"
                alt="Stefanie Pollack, Los Angeles listing agent"
                className="w-full h-full object-cover"
                style={{ objectPosition: photoFocus("/images/stefanie/portrait-3.jpg") }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary-300 rounded-lg -z-10 hidden lg:block" />
          </motion.div>
        </div>
        <ProofStrip />
      </div>
    </section>
  );
}
