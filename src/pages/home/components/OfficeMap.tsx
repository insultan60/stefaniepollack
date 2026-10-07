import { lazy } from "react";
import { motion } from "framer-motion";
import ClientOnly from "@/components/feature/ClientOnly";

// Leaflet needs `window`, so the map loads in the browser only — see ClientOnly.
const OfficeMapCanvas = lazy(() => import("./OfficeMapCanvas"));

export default function OfficeMap() {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28 lg:py-36" id="office-map">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              Find Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 mb-6">
              Visit the Office <span className="italic font-normal">in Studio City</span>
            </h2>
            <p className="text-sm md:text-base text-foreground-600 max-w-2xl mx-auto">
              Stefanie&apos;s office is in Studio City, CA 91604. Call{" "}
              <a href="tel:+18186256171" className="text-foreground-900 underline underline-offset-4 hover:text-primary-700">(818) 625-6171</a>{" "}
              or email{" "}
              <a href="mailto:stefanie@stefaniepollack.com" className="text-foreground-900 underline underline-offset-4 hover:text-primary-700">stefanie@stefaniepollack.com</a>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-background-200 h-[360px] md:h-[440px]"
          >
            <ClientOnly>
              <OfficeMapCanvas />
            </ClientOnly>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
