import { motion } from "framer-motion";

/* Tagline band. The figures it used to repeat (20+ years, $500M+, 800+) are
   shown once, in the About section above; the 98% satisfaction figure was
   dropped because it has no source. */
export default function Stats() {
  return (
    <section className="w-full bg-accent-100 py-16 md:py-20">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto text-center"
        >
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground-950">
            Moving Los Angeles,{" "}
            <span className="italic font-normal">one home at a time.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
