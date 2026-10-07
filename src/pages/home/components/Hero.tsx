import { motion } from "framer-motion";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1100px] overflow-hidden">
      {/* max-h: Google renders pages in a viewport stretched to the page's full
          height, so an uncapped h-screen became thousands of pixels tall and its
          centred headline fell far below Google's screenshot. 1100px is taller
          than almost any real screen, so visitors still get a full-screen hero. */}
      {/* Background video (poster-only on mobile / reduced-motion / data-saver) */}
      <div className="absolute inset-0">
        <HeroVideo />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="text-white/70 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Los Angeles Luxury Real Estate
          </p>
          {/* The H1 carries the search phrase ("Los Angeles real estate
              agent"); the old headline lives on as the line beneath it. One
              step smaller than before at lg so the longer line stays on one
              row inside max-w-5xl. */}
          <h1 className="font-heading-h1 text-[1.6rem] sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1] tracking-tight">
            Los Angeles Real Estate Agent{" "}
            <br />
            <span className="italic font-normal">Based in Studio City</span>
          </h1>
          <p className="mt-6 font-heading text-base sm:text-lg md:text-2xl text-white/85 italic">
            Connecting People with <span className="whitespace-nowrap">Homes <span className="amp">&amp;</span> Community</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/schedule"
            className="px-8 py-3.5 bg-white text-foreground-950 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-primary-100 transition-all duration-300 whitespace-nowrap"
          >
            Schedule a Meeting
          </a>
          <a
            href="/listings"
            className="px-8 py-3.5 bg-transparent text-white text-sm font-medium tracking-wide uppercase rounded-md border border-white/40 hover:bg-white/10 hover:border-white transition-all duration-300 whitespace-nowrap"
          >
            View Listings
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-white/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-white/70 animate-scroll-line" />
            </div>
          </div>
        </motion.div>

        {/* Compass badge — bottom-left, mirrored by the licence line on the right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-8 md:bottom-10 md:left-12 flex items-center gap-3.5 px-5 py-3 rounded-full bg-black/25 backdrop-blur-sm border border-white/15"
        >
          <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase font-medium whitespace-nowrap leading-none">
            Brokered by
          </span>
          <img
            src="/images/compass-white.png"
            alt="Compass Real Estate"
            className="h-8 md:h-10 w-auto block"
          />
        </motion.div>

        {/* Licence line — bottom-right. It used to be set into the logo artwork
            itself, where it rendered a few pixels tall and unreadable. Hidden
            below md, where it would collide with the Compass badge; the footer
            carries it on every page regardless. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 right-8 md:bottom-10 md:right-12 hidden md:block px-4 py-2.5 rounded-full bg-black/25 backdrop-blur-sm border border-white/15"
        >
          <span className="text-white/70 text-[10px] tracking-[0.25em] uppercase font-medium whitespace-nowrap leading-none">
            Stefanie Pollack &bull; DRE #01815614
          </span>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20 hidden lg:block" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-white/20 hidden lg:block" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-white/20 hidden lg:block" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20 hidden lg:block" />
    </section>
  );
}