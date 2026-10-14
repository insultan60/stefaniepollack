import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* "Know the numbers": an intro, a few H3 topics, a not-advice note and one
   button. Used for the cost of buying and the cost of selling. */
export default function CostsSection({
  eyebrow,
  title,
  italicTitle,
  intro,
  topics,
  note,
  button,
}: {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  intro: string;
  topics: { title: string; text: string }[];
  note: string;
  button: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
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
          <p className="mt-6 text-base md:text-lg text-foreground-700 leading-relaxed">{intro}</p>

          <div className="mt-10 space-y-8">
            {topics.map((t) => (
              <div key={t.title}>
                <h3 className="font-heading text-xl md:text-2xl text-foreground-950">{t.title}</h3>
                <p className="mt-3 text-base md:text-lg text-foreground-700 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 pl-4 border-l-2 border-primary-300 text-sm text-foreground-600 leading-relaxed">{note}</p>

          <p className="mt-10">
            <a
              href={button.href}
              {...(button.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap"
            >
              {button.label}
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
