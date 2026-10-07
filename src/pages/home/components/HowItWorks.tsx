import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { HOME_FAQS as faqs } from "@/lib/homeFaqs";

const steps = [
  {
    title: "Talk first.",
    text: "Share your goals, budget, and timeline in a short meeting. Stefanie listens first, then explains what is realistic in your area.",
  },
  {
    title: "Get the numbers.",
    text: "She reviews recent nearby sales and builds a price plan. If you want to sell your house in Los Angeles, you will see how nearby sales compare to yours.",
  },
  {
    title: "Move forward.",
    text: "You search or list, negotiate offers, and close with Stefanie handling each step.",
  },
];


/* "How it works" steps plus the homepage FAQ. Answers sit in native
   <details>, so every answer is in the HTML (readable by crawlers and AI
   fetchers) while staying collapsed for visitors. The matching FAQPage
   structured data is part of the homepage schema in scripts/prerender.mjs,
   built from the same HOME_FAQS list. */
export default function HowItWorks() {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              The Process
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950">
              How It <span className="italic font-normal">Works</span>
            </h2>
          </motion.div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col bg-background-100 rounded-2xl p-8 md:p-10"
              >
                <span className="font-heading text-4xl text-primary-600 leading-none">0{i + 1}</span>
                <h3 className="mt-5 font-heading text-xl md:text-2xl text-foreground-950">{step.title}</h3>
                <p className="mt-3 text-sm text-foreground-600 leading-relaxed">{step.text}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-20 md:mt-28 max-w-3xl mx-auto">
            <h2 className="text-center font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 mb-10 md:mb-12">
              Los Angeles Real Estate <span className="italic font-normal">FAQs</span>
            </h2>
            <div className="border-t border-background-200">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-background-200">
                  <summary className="flex items-center justify-between gap-6 py-5 md:py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base md:text-lg font-medium text-foreground-950">{f.q}</h3>
                    <Plus
                      className="w-5 h-5 shrink-0 text-foreground-500 transition-transform duration-300 group-open:rotate-45"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <p className="pb-6 -mt-1 text-sm md:text-base text-foreground-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
