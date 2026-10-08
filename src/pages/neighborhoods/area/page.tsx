import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Quote } from "lucide-react";
import PageHero from "@/components/feature/PageHero";
import FaqList from "@/components/feature/FaqList";
import CTASection from "../../home/components/CTASection";
import { PropertyCard, type ListedProperty } from "../../listings/components/PropertyGrid";
import { useIdxListings } from "@/hooks/useIdxListings";
import { useLead } from "@/hooks/useLead";
import { areas, areaCards, areaHref, type Area, type AreaBlock } from "@/mocks/areas";
import { allTestimonials } from "@/mocks/home";
import NotFound from "../../NotFound";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const eyebrowClass = "text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4";
const h2Class = "font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight";
const outlineButton =
  "inline-flex items-center gap-2 px-6 py-3 border border-foreground-300 text-foreground-800 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-950 hover:text-background-50 hover:border-foreground-950 transition-all duration-300 whitespace-nowrap";

export default function AreaPage() {
  const { slug } = useParams();
  const area = areas.find((a) => a.slug === slug);
  if (!area) return <NotFound />;

  return (
    <div className="w-full">
      <PageHero
        eyebrow={area.hero.eyebrow}
        title={area.hero.title}
        italicTitle={area.hero.italicTitle}
        subtitle={area.hero.subtitle}
        image={area.hero.image}
        imageAlt={area.hero.imageAlt}
      >
        <a
          href="#listings"
          className="px-8 py-3.5 bg-white text-foreground-950 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-primary-100 transition-all duration-300 whitespace-nowrap"
        >
          {area.hero.listingsButton}
        </a>
        <a
          href="/schedule"
          className="px-8 py-3.5 bg-transparent text-white text-sm font-medium tracking-wide uppercase rounded-md border border-white/40 hover:bg-white/10 hover:border-white transition-all duration-300 whitespace-nowrap"
        >
          Schedule a Meeting
        </a>
      </PageHero>

      <Intro area={area} />
      <Listings area={area} />
      {area.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`w-full py-20 md:py-28 ${section.tint ? "bg-accent-100" : "bg-background-50"}`}
        >
          <div className="w-full px-6 md:px-10 lg:px-16">
            <motion.div {...reveal} className="max-w-3xl mx-auto">
              <h2 className={h2Class}>{section.h2}</h2>
              <div className="mt-8 space-y-5">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}
      <Why area={area} />

      <section className="w-full bg-background-50 py-20 md:py-28">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <FaqList title={area.faqH2} faqs={area.faqs} />
        </div>
      </section>

      <Nearby area={area} />
      <CTASection title={area.cta.title} italicTitle={area.cta.italicTitle} text={area.cta.text} />
    </div>
  );
}

function Intro({ area }: { area: Area }) {
  return (
    <section className="w-full bg-background-50 py-20 md:py-28">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
          <p className={eyebrowClass}>Local Knowledge</p>
          <h2 className={h2Class}>{area.intro.h2}</h2>
          <div className="mt-8 space-y-4 text-foreground-700 leading-relaxed text-base md:text-lg">
            {area.intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>
        <ul className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-background-200 rounded-xl overflow-hidden border border-background-200">
          {area.intro.trust.map((item) => (
            <li key={item} className="bg-background-50 px-4 py-6 text-center text-xs md:text-sm font-medium tracking-wide uppercase text-foreground-800">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Both views are rendered and the inactive one is hidden with CSS, so the
   sold homes are in the page's HTML too (crawlers never click the toggle). */
function Listings({ area }: { area: Area }) {
  const { data, loading } = useIdxListings();
  const { requireLead } = useLead();
  const [tab, setTab] = useState<"available" | "sold">("available");

  const inArea = (p: ListedProperty) =>
    (p.zip ? area.listings.zips.includes(p.zip) : false) || p.city.toLowerCase().startsWith(area.name.toLowerCase());
  const views = {
    available: (data?.available ?? []).filter(inArea),
    sold: dedupe((data?.sold ?? []).filter(inArea)),
  };
  const cityLabel = (p: ListedProperty) => `${area.name}, CA${p.zip ? ` ${p.zip}` : ""}`;
  const street = (address: string) => address.replace(/\s+(#|unit\s|apt\s)?\d+[a-z]?$/i, "").trim();

  return (
    <section id="listings" className="w-full bg-accent-100 py-20 md:py-28 scroll-mt-24">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-background-200 rounded-full" role="tablist">
              {(["available", "sold"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`px-6 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 whitespace-nowrap ${
                    tab === key ? "bg-foreground-950 text-background-50" : "text-foreground-600 hover:text-foreground-950"
                  }`}
                >
                  {key === "available" ? "Available" : "Sold"}
                </button>
              ))}
            </div>
          </div>

          {(["available", "sold"] as const).map((key) => {
            const copy = area.listings[key];
            const homes = views[key];
            const isSold = key === "sold";
            return (
              <div key={key} className={tab === key ? "" : "hidden"}>
                <div className="text-center mb-12 md:mb-14">
                  <p className={eyebrowClass}>Portfolio</p>
                  <h2 className={h2Class}>{copy.h2}</h2>
                  <p className="mt-5 text-sm md:text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">{copy.text}</p>
                </div>
                {loading ? (
                  <p className="text-center text-sm text-foreground-500 py-12">Loading listings…</p>
                ) : homes.length === 0 ? (
                  <p className="text-center text-sm md:text-base text-foreground-600 py-10 max-w-xl mx-auto">
                    {isSold ? `No sold ${area.name} homes to show yet.` : area.listings.empty}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {homes.map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        isSold={isSold}
                        cityLabel={cityLabel(p)}
                        alt={
                          isSold
                            ? `${street(p.address)}, ${area.listings.altNoun} sold by Stefanie Pollack`
                            : `${street(p.address)}, ${area.listings.altNoun} for sale`
                        }
                      />
                    ))}
                  </div>
                )}
                <div className="text-center mt-12">
                  <a href={isSold ? "/listings?tab=sold" : "/listings"} className={outlineButton}>
                    {copy.button}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            );
          })}

          <div className="mt-14 pt-10 border-t border-background-300/60 flex flex-col md:flex-row items-center justify-center gap-5 text-center">
            <p className="text-sm md:text-base text-foreground-700">{area.listings.alerts}</p>
            <button
              type="button"
              onClick={() => requireLead(`Get new ${area.name} listings and off-market news.`)}
              className="px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The feed repeats a sold home once per sale record; one card each. */
function dedupe<T extends ListedProperty>(list: T[]): T[] {
  const seen = new Set<string>();
  return list.filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)));
}

function Why({ area }: { area: Area }) {
  const reviews = area.why.reviewAuthors
    .map((author) => allTestimonials.find((t) => t.author === author))
    .filter((t): t is (typeof allTestimonials)[number] => Boolean(t));
  return (
    <section className="w-full bg-background-500 py-20 md:py-28">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
            <h2 className={h2Class}>{area.why.h2}</h2>
            {area.why.paragraphs.map((p) => (
              <p key={p} className="mt-6 text-foreground-700 leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
          </motion.div>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {area.why.points.map((pt) => (
              <li key={pt.title} className="bg-background-50 rounded-2xl p-7">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-100/70 text-primary-700">
                  <Check className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-heading text-xl text-foreground-950">{pt.title}</h3>
                <p className="mt-2 text-sm text-foreground-600 leading-relaxed">{pt.text}</p>
              </li>
            ))}
          </ul>

          {reviews.length > 0 && (
            <div className="mt-20">
              <h3 className="text-center font-heading text-2xl md:text-3xl text-foreground-950">{area.why.reviewsH3}</h3>
              <div className={`mt-10 grid grid-cols-1 gap-6 ${reviews.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-2xl mx-auto"}`}>
                {reviews.map((r) => (
                  <figure key={r.id} className="bg-background-50 rounded-2xl p-8 flex flex-col">
                    <Quote className="w-7 h-7 text-primary-300" strokeWidth={1.5} />
                    <blockquote className="mt-5 text-foreground-800 leading-relaxed flex-grow">&ldquo;{r.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6">
                      <p className="text-sm font-medium text-foreground-950 tracking-wide uppercase">{r.author}</p>
                      <p className="text-xs text-foreground-500 mt-1">{r.location}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-10 text-center">
                <a href="/about#testimonials" className="text-sm font-medium text-foreground-800 hover:text-primary-700 inline-flex items-center gap-2">
                  Read more client stories
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Nearby({ area }: { area: Area }) {
  const cards = area.nearby.map((name) => areaCards.find((c) => c.name === name)).filter(Boolean) as typeof areaCards;
  return (
    <section className="w-full bg-accent-100 py-20 md:py-28">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${h2Class} text-center`}>
            Explore Nearby <span className="italic font-normal">Neighborhoods</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {cards.map((c) => (
              <a key={c.name} href={areaHref(c.name)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl block">
                <img src={c.image} alt={c.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-2xl text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{c.tagline}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-10 text-center">
            <a href="/neighborhoods" className={outlineButton}>
              All Los Angeles Neighborhoods
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Block({ block }: { block: AreaBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="text-base md:text-lg text-foreground-700 leading-relaxed">{block.text}</p>;
    case "h3":
      return <h3 className="pt-4 font-heading text-xl md:text-2xl text-foreground-950">{block.text}</h3>;
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base md:text-lg text-foreground-700 leading-relaxed">
              <Check className="w-5 h-5 mt-1 shrink-0 text-primary-600" strokeWidth={1.75} />
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-heading text-2xl text-primary-600 leading-none w-8 shrink-0">0{i + 1}</span>
              <p className="text-base md:text-lg text-foreground-700 leading-relaxed">
                <strong className="font-medium text-foreground-950">{s.title}</strong> {s.text}
              </p>
            </li>
          ))}
        </ol>
      );
    case "points":
      return (
        <ul className="space-y-3">
          {block.items.map((pt) => (
            <li key={pt.title} className="text-base md:text-lg text-foreground-700 leading-relaxed">
              <strong className="font-medium text-foreground-950">{pt.title}:</strong> {pt.text}
            </li>
          ))}
        </ul>
      );
    case "link":
      return (
        <p>
          <a href={block.href} className="inline-flex items-center gap-2 text-base font-medium text-primary-700 underline underline-offset-4 decoration-primary-300 hover:decoration-primary-700">
            {block.label}
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </p>
      );
    case "button":
      return (
        <p className="pt-4">
          <a href={block.href} className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap">
            {block.label}
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </p>
      );
  }
}
