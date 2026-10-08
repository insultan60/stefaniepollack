import { Plus } from "lucide-react";

/* A page's FAQ: a heading, the questions as native <details> (every answer is
   in the HTML for crawlers, collapsed for visitors), and the matching
   FAQPage structured data. Use one per page — Google flags two FAQPage blocks
   on the same URL. */
export default function FaqList({ title, faqs }: { title: React.ReactNode; faqs: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-center font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 mb-10 md:mb-12">
        {title}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
