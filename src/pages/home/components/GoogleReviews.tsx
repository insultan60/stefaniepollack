import { useEffect } from "react";

/* Elfsight "Google Reviews" floating badge (5.0 stars, review count). It
   pulls the rating live from Stefanie's Google Business Profile, and clicking
   it opens Elfsight's full reviews popup.

   The badge floats over the page, so this renders nothing visible in place. */
const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";
const ELFSIGHT_APP = "elfsight-app-28b0f6e2-e366-45b2-ae0a-30ecbcfdd07b";

/* Elfsight draws the badge inside a shadow root, which the site's stylesheet
   cannot reach, so these rules are placed inside that shadow root instead.
   They only move and shrink the badge: Elfsight's full-screen layer is left
   alone, so the reviews popup still has the whole screen to open into.
   The 108px bottom padding keeps the badge clear of the hero's DRE / Compass tags. */
const BADGE_CSS = `
  .es-slide-in-position-container {
    justify-content: flex-end !important;
    padding: 0 20px 108px 0 !important;
  }
  .es-badge-container {
    zoom: 0.8;
  }
`;
const STYLE_ID = "sp-badge-position";

function styleBadge() {
  document.querySelectorAll<HTMLElement>(".es-portal-root *").forEach((el) => {
    const root = el.shadowRoot;
    // Added as soon as the shadow root exists, even before Elfsight fills it:
    // changes inside it are invisible to the observer below.
    if (!root || root.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = BADGE_CSS;
    root.appendChild(style);
  });
}

export default function GoogleReviews() {
  useEffect(() => {
    // Load the Elfsight script once, in the browser only (the page is prerendered).
    if (!document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = ELFSIGHT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    // The badge appears some time after the script loads, and Elfsight can
    // redraw it, so keep watching and re-apply the rules whenever needed.
    styleBadge();
    const observer = new MutationObserver(styleBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <div className={ELFSIGHT_APP} data-elfsight-app-lazy />;
}
