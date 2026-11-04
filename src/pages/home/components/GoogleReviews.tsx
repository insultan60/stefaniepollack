import { useEffect } from "react";

/* Elfsight "Google Reviews" floating badge (5.0 stars, review count). It
   pulls the rating live from Stefanie's Google Business Profile.

   The badge floats over the page, so this renders nothing visible in place.
   Its corner and size are set in index.css (.es-portal-root), because
   Elfsight draws the badge inside a shadow root the site's CSS cannot reach. */
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

  return <div className={ELFSIGHT_APP} data-elfsight-app-lazy />;
}
