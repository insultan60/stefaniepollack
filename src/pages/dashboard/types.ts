/**
 * The shape api/dashboard.ts returns for action=data. Restated here rather
 * than imported: that file is a serverless function and pulls in node:crypto,
 * which has no business in the browser bundle.
 */

export interface GaTotals {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  screenPageViews: number;
  /** seconds */
  averageSessionDuration: number;
  bounceRate: number;
}

export interface GaRow {
  label: string;
  value: number;
  secondary?: number;
}

export interface GaReport {
  totals: GaTotals;
  previousTotals: GaTotals | null;
  daily: { date: string; users: number; views: number }[];
  topPages: GaRow[];
  channels: GaRow[];
  devices: GaRow[];
  cities: GaRow[];
}

export interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscRow extends GscTotals {
  label: string;
}

export interface GscReport {
  totals: GscTotals;
  previousTotals: GscTotals | null;
  queries: GscRow[];
  pages: GscRow[];
  daily: { date: string; clicks: number; impressions: number }[];
}

export type SourceState = "live" | "missing" | "error";

export interface VarStatus {
  name: string;
  set: boolean;
  what: string;
}

export interface SourceStatus {
  key: "collection" | "ga4" | "gsc";
  title: string;
  state: SourceState;
  provides: string;
  vars: VarStatus[];
  error?: string;
  fix?: string;
}

export interface Loaded<T> {
  data: T;
  live: boolean;
  error?: string;
}

export interface Dashboard {
  days: number;
  ga: Loaded<GaReport>;
  gsc: Loaded<GscReport>;
  sources: SourceStatus[];
  incomplete: boolean;
  collecting: boolean;
}

export const RANGES = [7, 28, 90] as const;

export function readDays(range?: string | null): number {
  return RANGES.some((d) => String(d) === range) ? Number(range) : 28;
}
