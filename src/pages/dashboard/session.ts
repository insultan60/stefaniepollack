import { useOutletContext } from "react-router-dom";
import type { Dashboard } from "./types";

/**
 * Session-lifetime report cache, one per range, so moving between sections
 * does not refetch. The API already caches for fifteen minutes; this saves the
 * round trip too. Cleared on sign-in and sign-out, so a different login never
 * sees a report fetched under the previous one.
 */
export const reports = new Map<number, Dashboard>();

export function clearReports() {
  reports.clear();
}

/** Each section reads the report its layout loaded. */
export function useReport(): Dashboard {
  return useOutletContext<Dashboard>();
}
