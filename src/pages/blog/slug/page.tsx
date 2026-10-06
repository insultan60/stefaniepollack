import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { articles } from "@/mocks/home";
import { articleContent, type ArticleBlock } from "@/mocks/articleContent";
import NotFound from "../../NotFound";

export default function BlogArticle() {
  const { slug } = useParams();
  const article = articles.find((a) => a.href === `/blog/${slug}`);

  if (!article) return <NotFound />;

  const body = articleContent[article.href];
  // `articles` is newest first, so "Previous" is the newer post and "Next"
  // the older one — the same convention the old Squarespace blog used.
  const index = articles.indexOf(article);
  const previous = articles[index - 1];
  const next = articles[index + 1];

  return (
    <div className="w-full">
      <section className="relative w-full h-[45vh] min-h-[360px] max-h-[520px] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary-200">
                {article.category}
              </span>
              <span className="text-white/40">&bull;</span>
              <span className="text-[11px] text-white/70">{article.date}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight max-w-3xl mx-auto">
              {article.title}
            </h1>
            <div className="mt-5 flex items-center justify-center gap-1.5 text-white/70">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="text-xs">{article.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-background-50 py-16 md:py-24">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <a
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-600 hover:text-primary-700 transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to Journal
            </a>

            {body ? (
              <div className="space-y-6">
                {body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            ) : (
              <>
                <p className="text-lg text-foreground-700 leading-relaxed">{article.excerpt}</p>

                <div className="mt-10 p-6 rounded-xl bg-accent-100 border border-background-200/60">
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    The full article is on its way — check back soon, or reach out
                    directly if you have questions in the meantime.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex mt-4 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    Get in touch &rarr;
                  </a>
                </div>
              </>
            )}

            {(previous || next) && (
              <nav className="mt-16 pt-8 border-t border-background-200 grid grid-cols-1 sm:grid-cols-2 gap-6" aria-label="More articles">
                {previous ? (
                  <a href={previous.href} className="group">
                    <span className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-primary-600 mb-2">
                      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Previous
                    </span>
                    <span className="font-heading text-lg text-foreground-950 group-hover:text-primary-700 transition-colors leading-snug">
                      {previous.title}
                    </span>
                  </a>
                ) : (
                  <span />
                )}
                {next && (
                  <a href={next.href} className="group sm:text-right">
                    <span className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-primary-600 mb-2">
                      Next
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                    <span className="font-heading text-lg text-foreground-950 group-hover:text-primary-700 transition-colors leading-snug">
                      {next.title}
                    </span>
                  </a>
                )}
              </nav>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="font-heading text-2xl md:text-3xl text-foreground-950 leading-snug pt-6">{block.text}</h2>;
    case "h3":
      return <h3 className="font-heading text-xl md:text-2xl text-foreground-950 leading-snug pt-2">{block.text}</h3>;
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-foreground-700 leading-relaxed marker:text-primary-600">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "signature":
      return (
        <div className="pt-4">
          <p className="font-heading text-xl text-foreground-950">Stefanie Pollack</p>
          <p className="text-sm text-foreground-600 mt-1">REALTOR® + Community Connector</p>
          <p className="text-sm text-foreground-600">Compass | DRE# 01815614</p>
        </div>
      );
    case "faq":
      return (
        <section className="mt-10 pt-10 border-t border-background-200">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground-950 leading-snug mb-8">{block.title}</h2>
          <div className="space-y-7">
            {block.items.map((item) => (
              <div key={item.q}>
                <h3 className="font-heading text-lg md:text-xl text-foreground-950 mb-2">{item.q}</h3>
                <p className="text-base text-foreground-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          {/* FAQ structured data, so search engines can show these as rich results. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: block.items.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }).replace(/</g, "\\u003c"),
            }}
          />
        </section>
      );
    default:
      return <p className="text-base md:text-lg text-foreground-700 leading-relaxed whitespace-pre-line">{block.text}</p>;
  }
}
