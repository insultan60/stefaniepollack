import { motion } from "framer-motion";
import { Home, Tag, CalendarCheck, ArrowRight, type LucideIcon } from "lucide-react";

const cards: {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
  variant: "outline" | "filled";
}[] = [
  {
    icon: Home,
    title: "Buy a Home in Los Angeles",
    description:
      "Good homes can move fast, so you need a plan before you start touring. Stefanie helps you set a budget, spot fair pricing, and write offers that sellers take seriously. As a certified negotiator, she works to protect your price and your terms.",
    cta: "Start Home Search",
    href: "/listings",
    variant: "outline",
  },
  {
    icon: Tag,
    title: "Sell Your Home in Los Angeles",
    description:
      "Pricing is the first big decision, and it shapes every offer you get. Stefanie studies recent nearby sales, plans the marketing, and handles each offer through closing.",
    cta: "Get Your Home Value",
    href: "/sellers",
    variant: "filled",
  },
  {
    icon: CalendarCheck,
    title: "Schedule a Consultation",
    description:
      "Not sure where to start? Book a short meeting. You will leave with a clear view of the market and a plan that fits your timeline.",
    cta: "Book a Meeting",
    href: "/schedule",
    variant: "outline",
  },
];

export default function BuyerSellerCTA() {
  return (
    <section className="w-full bg-accent-100 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">
              How Can We Help
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950">
              Buy or Sell a Home{" "}
              <span className="italic font-normal">in Los Angeles</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Stefanie Pollack is a Los Angeles real estate agent who helps buyers and sellers across Studio City, the San Fernando Valley, and Beverly Hills. She has 20+ years of experience and grew up in Studio City. Tell her what you want, and she will build a plan around it.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group flex flex-col bg-background-50 rounded-2xl border border-background-200/60 p-8 md:p-10 hover:border-background-300/80 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100/70 text-primary-700 mb-6">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl text-foreground-950">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-foreground-600 leading-relaxed flex-grow">
                    {card.description}
                  </p>

                  {/* CTA */}
                  <a
                    href={card.href}
                    className={`mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 whitespace-nowrap ${
                      card.variant === "filled"
                        ? "bg-foreground-950 text-background-50 hover:bg-foreground-800"
                        : "border border-foreground-300 text-foreground-800 hover:border-foreground-950 hover:text-foreground-950"
                    }`}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}