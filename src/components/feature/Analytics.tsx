import { useEffect } from "react";

/**
 * The GA4 tag — what actually RECORDS visits for the dashboard to read back.
 *
 * The stream's ID is written in below rather than left to an env var: it is
 * public (every tagged page carries it in its source) and fixed, and a deploy
 * that forgot the variable would silently record nothing. A valid
 * VITE_GA4_MEASUREMENT_ID still overrides it. api/dashboard.ts carries the
 * same default to report on its Connections panel whether the tag is live, so
 * if the ID ever changes, change it in both files.
 *
 * Not installed on localhost, so working on the site never shows up as
 * visits in the numbers the dashboard reports.
 *
 * Installed once, on the first public page a visitor lands on. Route changes
 * after that are recorded by GA4 itself: "page changes based on browser
 * history events" is part of enhanced measurement, on by default for a new
 * web stream. Sending page_view by hand as well would count every navigation
 * twice.
 *
 * Mounted from App.tsx outside /dashboard only, so opening the dashboard to
 * read the traffic is never itself recorded as traffic.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const DEFAULT_ID = "G-SPWN0F006E";
const OVERRIDE = (import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "").trim();
const ID = /^G-[A-Z0-9]+$/i.test(OVERRIDE) ? OVERRIDE : DEFAULT_ID;

let installed = false;

export default function Analytics() {
  useEffect(() => {
    if (installed) return;
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)) return;
    installed = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array copy of it.
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID)}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
