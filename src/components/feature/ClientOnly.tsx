import { Suspense, useEffect, useState, type ReactNode } from "react";

/** Renders its children only in the browser, after hydration.
 *  Pages are prerendered to static HTML at build time (scripts/prerender.ts),
 *  and some widgets — the Leaflet maps — touch `window` the moment they're
 *  imported, so they can't run there. Pair this with a React.lazy() import so
 *  the widget's code isn't even loaded on the server. The server (and the first
 *  client render, so hydration matches) gets `fallback` instead. */
export default function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Suspense fallback={fallback}>{children}</Suspense> : <>{fallback}</>;
}
