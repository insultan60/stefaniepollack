import { motion } from "framer-motion";
import { photoFocus } from "@/lib/photoFocus";

/* Shared closing call to action. The homepage copy is the default; the
   neighborhood, buyers and sellers pages pass their own heading and text, and
   the buyers and sellers pages their own background photo and first button. */
export default function CTASection({
  eyebrow = "Ready to Start",
  title = "Ready to Buy or Sell",
  italicTitle = "in Los Angeles?",
  text = "Work with a Los Angeles real estate agent who knows Studio City and the Valley. Start with a short conversation about what you want.",
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=800&fit=crop&q=80",
  imageAlt = "Luxury home interior",
  primary = { label: "Schedule a Meeting", href: "/schedule" },
  secondary = { label: "Get in Touch", href: "/contact" },
}: {
  eyebrow?: string;
  title?: string;
  italicTitle?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  primary?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
} = {}) {
  return (
    <section className="relative w-full py-28 md:py-36 lg:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          style={{ objectPosition: photoFocus(image) }}
        />
        <div className="absolute inset-0 bg-foreground-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase mb-6">
            {eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            {title}{" "}
            <br />
            <span className="italic font-normal">{italicTitle}</span>
          </h2>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {text}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={primary.href}
              {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="px-8 py-3.5 bg-white text-foreground-950 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-primary-100 transition-all duration-300 whitespace-nowrap"
            >
              {primary.label}
            </a>
            <a
              href={secondary.href}
              className="px-8 py-3.5 bg-transparent text-white text-sm font-medium tracking-wide uppercase rounded-md border border-white/40 hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            >
              {secondary.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}