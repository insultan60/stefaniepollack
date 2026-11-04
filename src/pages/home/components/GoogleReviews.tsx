import { useEffect } from "react";
import { motion } from "framer-motion";

/* Elfsight "Google Reviews" widget. It pulls the reviews live from
   Stefanie's Google Business Profile, so new reviews show up on their own.
   Manage the widget's layout and filters in the Elfsight dashboard. */
const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";
const ELFSIGHT_APP = "elfsight-app-28b0f6e2-e366-45b2-ae0a-30ecbcfdd07b";

export default function GoogleReviews() {
  // Load the Elfsight script once, in the browser only (the page is prerendered).
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = ELFSIGHT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="w-full bg-background-100 py-20 md:py-28 lg:py-36">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-4">Google Reviews</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground-950 leading-tight">
              What Clients Say <span className="italic font-normal">on Google</span>
            </h2>
            <p className="mt-5 text-sm md:text-base text-foreground-600">
              Reviews from Stefanie's Google Business Profile, shown exactly as clients wrote them.
            </p>
          </motion.div>

          <div className="mt-14 min-h-[200px]">
            <div className={ELFSIGHT_APP} data-elfsight-app-lazy />
          </div>
        </div>
      </div>
    </section>
  );
}
