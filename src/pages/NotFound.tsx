/** Shown for any address that isn't a page — prerendered to out/404.html,
 *  which Vercel serves with a real 404 status (see vercel.json), and rendered
 *  in place for a blog post or listing that no longer exists. It deliberately
 *  doesn't echo the requested path: the 404.html file is built once, so the
 *  path in it would never match the address being shown. */
export default function NotFound() {
  /* The dark band matters: the header is transparent with white text until
     the page scrolls, on the assumption every page opens on a dark hero. A
     light 404 page left the menu invisible. */
  return (
    <>
      <section className="w-full bg-foreground-950 pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase mb-5">404</p>
          <h1 className="font-heading text-4xl md:text-6xl text-white font-medium leading-tight">
            Page <span className="italic font-normal">Not Found</span>
          </h1>
        </div>
      </section>
      <section className="w-full bg-background-50 py-16 md:py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-base text-foreground-600 leading-relaxed">
          The page you&rsquo;re looking for has moved or no longer exists. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="px-8 py-3.5 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors whitespace-nowrap"
          >
            Back to Home
          </a>
          <a
            href="/listings"
            className="px-8 py-3.5 border border-foreground-300 text-foreground-800 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-950 hover:text-background-50 transition-colors whitespace-nowrap"
          >
            View Listings
          </a>
          <a
            href="/contact"
            className="px-8 py-3.5 border border-foreground-300 text-foreground-800 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-950 hover:text-background-50 transition-colors whitespace-nowrap"
          >
            Contact
          </a>
        </div>
        </div>
      </section>
    </>
  );
}
