import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* A numbered, step-by-step process (the buying and selling journeys). An
   ordered list, so the sequence is real in the HTML and not just visual. */
export default function ProcessSteps({
  eyebrow,
  title,
  italicTitle,
  intro,
  steps,
  button,
}: {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  intro: string;
  steps: { title: string; text: string }[];
  button?: { label: string; href: string };
}) {
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

          <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="bg-background-50 rounded-2xl p-7 md:p-8"
              >
                <span className="font-heading text-3xl text-primary-600 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-heading text-xl text-foreground-950">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground-600 leading-relaxed">{s.text}</p>
              </motion.li>
            ))}
          </ol>

          {button && (
            <p className="mt-12 text-center">
              <a
                href={button.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap"
              >
                {button.label}
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
