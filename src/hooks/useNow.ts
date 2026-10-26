import { useEffect, useState } from "react";

/** The current time, or null until the page has loaded in the browser.
 *  Pages are prerendered at build time, so anything that depends on today's
 *  date (is an event upcoming or past?) has to wait for the browser: deciding
 *  it during the build would freeze the answer at the build date, and deciding
 *  it differently on first render would not match the prerendered HTML. */
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  return now;
}

/** True once the event's end time has passed (false until the page loads). */
export function useIsPast(end: string): boolean {
  const now = useNow();
  return now !== null && now > new Date(end).getTime();
}
