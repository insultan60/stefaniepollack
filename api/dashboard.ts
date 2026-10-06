import crypto from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Everything server-side behind /dashboard: sign in, sign out, and the report
 * data. One endpoint, switched on ?action=.
 *
 * Deliberately one self-contained file, for the same reason api/idx.ts is:
 * Vercel's function bundler for this (non-Next) project has failed to include
 * cross-file imports of shared helper files, and the failure only shows up as
 * FUNCTION_INVOCATION_FAILED in production. So auth, the Google token
 * exchange, the GA4 and Search Console readers and the setup-status logic all
 * live here. vite.config.ts imports handleDashboard() from this file for local
 * dev, which Vite's own bundler handles fine.
 *
 * Unlike a server-rendered dashboard, the pages themselves are part of the
 * public JS bundle — this is a single-page app, so there is no server to gate
 * them. That is fine: the bundle holds layout and copy only. Every number
 * comes from action=data, which refuses anyone without the session cookie.
 *
 *   GET  /api/dashboard?action=data&range=28   the report, or 401
 *   POST /api/dashboard?action=login           { password } -> sets the cookie
 *   POST /api/dashboard?action=logout          clears it
 */

/* ==========================================================================
   Auth
   ========================================================================== */

const COOKIE = "sp_dash";
const MAX_AGE = 60 * 60 * 24 * 14;

/** The cookie holds a digest of the password, never the password itself, so a
 *  cookie lifted off a machine cannot be read back into the secret. */
function sessionToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`stefanie-pollack-dashboard:v1:${password}`)
    .digest("hex");
}

/** Constant-time compare, so a wrong guess does not leak how wrong it was. */
function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function readCookie(header: string | undefined, name: string): string | undefined {
  for (const part of (header ?? "").split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

function cookie(value: string, maxAge: number): string {
  // Secure only on the host: the local dev server is plain http, and some
  // browsers drop a Secure cookie set over it.
  const secure = process.env.VERCEL ? "; Secure" : "";
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

/* ==========================================================================
   Google service-account tokens
   --------------------------------------------------------------------------
   No `googleapis` dependency: it is tens of megabytes for a hundred products
   this site will never call. All that is needed is to sign a JWT and swap it
   for an access token, and Node ships the crypto to do that.
   ========================================================================== */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function serviceAccount(): { email: string; key: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !raw) return null;
  // Hosts that store secrets as single-line strings keep the newlines escaped;
  // the PEM parser needs them real.
  return { email, key: raw.replace(/\\n/g, "\n") };
}

// One token lasts an hour; a warm function instance reuses it.
const tokenCache = new Map<string, { token: string; expires: number }>();

async function accessToken(scope: string): Promise<string> {
  const hit = tokenCache.get(scope);
  if (hit && hit.expires > Date.now() + 60_000) return hit.token;

  const sa = serviceAccount();
  if (!sa) throw new Error("Google service account is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({ iss: sa.email, scope, aud: TOKEN_URL, exp: now + 3600, iat: now }),
  );
  const signature = base64url(crypto.sign("RSA-SHA256", Buffer.from(`${header}.${claim}`), sa.key));

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache.set(scope, { token: json.access_token, expires: Date.now() + json.expires_in * 1000 });
  return json.access_token;
}

/* ==========================================================================
   Google Analytics 4 — visitors, sessions and which pages they read
   ========================================================================== */

interface GaTotals {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  screenPageViews: number;
  /** seconds */
  averageSessionDuration: number;
  bounceRate: number;
}

interface GaRow {
  label: string;
  value: number;
  secondary?: number;
}

interface GaReport {
  totals: GaTotals;
  previousTotals: GaTotals | null;
  daily: { date: string; users: number; views: number }[];
  topPages: GaRow[];
  channels: GaRow[];
  devices: GaRow[];
  cities: GaRow[];
}

type GaApiRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };

async function runReport(body: unknown): Promise<{ rows?: GaApiRow[] }> {
  const property = process.env.GA4_PROPERTY_ID;
  if (!property) throw new Error("GA4_PROPERTY_ID is not set");
  const token = await accessToken(GA_SCOPE);

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`GA4 report failed (${res.status}): ${await res.text()}`);
  return res.json() as Promise<{ rows?: GaApiRow[] }>;
}

function num(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toGaRows(json: { rows?: GaApiRow[] }, withSecondary = false): GaRow[] {
  return (json.rows ?? []).map((r) => ({
    label: r.dimensionValues?.[0]?.value ?? "(not set)",
    value: num(r.metricValues?.[0]?.value),
    secondary: withSecondary ? num(r.metricValues?.[1]?.value) : undefined,
  }));
}

const TOTAL_METRICS = [
  { name: "activeUsers" },
  { name: "newUsers" },
  { name: "sessions" },
  { name: "screenPageViews" },
  { name: "averageSessionDuration" },
  { name: "bounceRate" },
];

function readTotals(json: { rows?: GaApiRow[] }): GaTotals {
  const m = json.rows?.[0]?.metricValues ?? [];
  return {
    activeUsers: num(m[0]?.value),
    newUsers: num(m[1]?.value),
    sessions: num(m[2]?.value),
    screenPageViews: num(m[3]?.value),
    averageSessionDuration: num(m[4]?.value),
    bounceRate: num(m[5]?.value),
  };
}

/**
 * `days` is the window; the same window immediately before it is fetched too
 * so every headline number can carry a change against the comparable period.
 *
 * City rather than country for geography: this is one agent working Studio
 * City and the valley around it, so "United States, 98%" would be true and
 * useless, whereas the split between nearby cities is the actual question.
 */
async function fetchGa4(days: number): Promise<GaReport> {
  const current = { startDate: `${days}daysAgo`, endDate: "today" };
  const previous = { startDate: `${days * 2}daysAgo`, endDate: `${days + 1}daysAgo` };

  const [totals, prev, daily, pages, channels, devices, cities] = await Promise.all([
    runReport({ dateRanges: [current], metrics: TOTAL_METRICS }),
    runReport({ dateRanges: [previous], metrics: TOTAL_METRICS }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
    runReport({
      dateRanges: [current],
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 8,
    }),
  ]);

  return {
    totals: readTotals(totals),
    previousTotals: readTotals(prev),
    daily: (daily.rows ?? []).map((r) => ({
      date: r.dimensionValues?.[0]?.value ?? "",
      users: num(r.metricValues?.[0]?.value),
      views: num(r.metricValues?.[1]?.value),
    })),
    topPages: toGaRows(pages, true),
    channels: toGaRows(channels),
    devices: toGaRows(devices),
    cities: toGaRows(cities),
  };
}

/* ==========================================================================
   Search Console — where "impressions" actually comes from
   --------------------------------------------------------------------------
     impressions = how often the site appeared in Google results
     clicks      = how often someone chose it from those results
     users       = who then arrived (GA4's side of the story)
   Search Console lags about two days, so its window is offset.
   ========================================================================== */

interface GscTotals {
  clicks: number;
  impressions: number;
  /** clicks / impressions */
  ctr: number;
  /** mean position in results */
  position: number;
}

interface GscRow extends GscTotals {
  label: string;
}

interface GscReport {
  totals: GscTotals;
  previousTotals: GscTotals | null;
  queries: GscRow[];
  pages: GscRow[];
  daily: { date: string; clicks: number; impressions: number }[];
}

type GscApiRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function gscQuery(body: Record<string, unknown>): Promise<{ rows?: GscApiRow[] }> {
  // Quotes copied over from .env.local into a host's settings screen become
  // part of the value there, and Search Console answers a quoted site name
  // with a bare 400 "invalid argument" rather than anything naming the cause.
  const site = process.env.GSC_SITE_URL?.trim().replace(/^(["'])(.*)\1$/, "$2").trim();
  if (!site) throw new Error("GSC_SITE_URL is not set");
  const token = await accessToken(GSC_SCOPE);

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`Search Console query failed (${res.status}): ${await res.text()}`);
  return res.json() as Promise<{ rows?: GscApiRow[] }>;
}

function toGscRow(r: GscApiRow): GscRow {
  return {
    label: r.keys?.[0] ?? "(unknown)",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  };
}

function sumGsc(rows: GscApiRow[]): GscTotals {
  const clicks = rows.reduce((a, r) => a + (r.clicks ?? 0), 0);
  const impressions = rows.reduce((a, r) => a + (r.impressions ?? 0), 0);
  // Position is weighted by impressions — a query seen once at rank 1 must not
  // drag the average as hard as one seen a thousand times at rank 40.
  const weighted = rows.reduce((a, r) => a + (r.position ?? 0) * (r.impressions ?? 0), 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weighted / impressions : 0,
  };
}

async function fetchSearchConsole(days: number): Promise<GscReport> {
  const LAG = 2;
  const current = { startDate: isoDaysAgo(days + LAG), endDate: isoDaysAgo(LAG) };
  const previous = { startDate: isoDaysAgo(days * 2 + LAG), endDate: isoDaysAgo(days + LAG + 1) };

  const [daily, prevDaily, queries, pages] = await Promise.all([
    gscQuery({ ...current, dimensions: ["date"], rowLimit: 500 }),
    gscQuery({ ...previous, dimensions: ["date"], rowLimit: 500 }),
    gscQuery({ ...current, dimensions: ["query"], rowLimit: 15 }),
    gscQuery({ ...current, dimensions: ["page"], rowLimit: 12 }),
  ]);

  return {
    totals: sumGsc(daily.rows ?? []),
    previousTotals: sumGsc(prevDaily.rows ?? []),
    queries: (queries.rows ?? []).map(toGscRow),
    pages: (pages.rows ?? []).map(toGscRow),
    daily: (daily.rows ?? []).map((r) => ({
      date: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
    })),
  };
}

/* ==========================================================================
   Zero-valued reports
   --------------------------------------------------------------------------
   So the dashboard renders its real layout before anything is connected.
   Everything is 0 or empty — no sample numbers, because a plausible fake
   figure on an analytics page gets screenshotted and quoted. The date spine
   is the real calendar window, so charts draw a proper axis at zero. The
   page list is filled in client-side from the site's own routes.
   ========================================================================== */

function dateSpine(days: number, lagDays = 0): string[] {
  const out: string[] = [];
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - lagDays);
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function emptyGa(days: number): GaReport {
  return {
    totals: {
      activeUsers: 0,
      newUsers: 0,
      sessions: 0,
      screenPageViews: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
    },
    previousTotals: null,
    daily: dateSpine(days).map((date) => ({ date, users: 0, views: 0 })),
    topPages: [],
    channels: ["Organic Search", "Direct", "Organic Social", "Referral", "Paid Search"].map(
      (label) => ({ label, value: 0 }),
    ),
    devices: ["desktop", "mobile", "tablet"].map((label) => ({ label, value: 0 })),
    cities: [],
  };
}

function emptyGsc(days: number): GscReport {
  return {
    totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    previousTotals: null,
    queries: [],
    pages: [],
    daily: dateSpine(days, 2).map((date) => ({ date, clicks: 0, impressions: 0 })),
  };
}

/* ==========================================================================
   What is wired up, and what is not
   --------------------------------------------------------------------------
   A row of zeros is indistinguishable from a genuinely dead week unless the
   page says which one it is looking at, and "nobody visited" and "nothing is
   measuring" are opposite conclusions. So every zero ships with this state.
   ========================================================================== */

type SourceState = "live" | "missing" | "error";

interface VarStatus {
  name: string;
  set: boolean;
  what: string;
}

interface SourceStatus {
  key: "collection" | "ga4" | "gsc";
  title: string;
  state: SourceState;
  provides: string;
  vars: VarStatus[];
  error?: string;
  fix?: string;
}

function has(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

/** The GA4 stream the site's tag sends to. The tag is hard-coded in
 *  index.html, so this mirrors it rather than reading a setting — keep the
 *  two in step. */
const MEASUREMENT_ID = "G-SPWN0F006E";

/** Google's error bodies are JSON for developers. The failures that actually
 *  happen get a sentence naming the exact thing to do. */
function explain(source: "ga4" | "gsc", error?: string): string | undefined {
  if (!error) return undefined;
  const who = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || "the service account";
  if (/\(403\)/.test(error) || /PERMISSION_DENIED/.test(error)) {
    return source === "ga4"
      ? `Google Analytics refused access. Open analytics.google.com → Admin → Property access management on property ${process.env.GA4_PROPERTY_ID ?? ""} and add ${who} as a Viewer. If it is already there, GA4_PROPERTY_ID is pointing at a different property.`
      : `Search Console refused access. Open search.google.com/search-console → Settings → Users and permissions and add ${who} as a Restricted user.`;
  }
  if (/\(404\)/.test(error)) {
    return source === "ga4"
      ? "Google Analytics has no property with that ID. Check GA4_PROPERTY_ID against Admin → Property details — it is the number, not the G- ID."
      : "Search Console has no property by that name. GSC_SITE_URL must match the property exactly, e.g. sc-domain:stefaniepollack.com.";
  }
  if (/DECODER|PEM|private key/i.test(error)) {
    return "The private key could not be read. Copy private_key from the service account JSON again, in quotes, with its literal backslash-n line breaks left as they are.";
  }
  return undefined;
}

/**
 * Collection is listed apart from reporting on purpose. The tag RECORDS
 * visits; the property ID and service account only READ them back. The
 * reading side can be wired perfectly and still show zeros forever if nothing
 * is recording, and that failure is invisible unless the two are shown apart.
 *
 * The tag is hard-coded in index.html, so it is always reported as installed;
 * there is no setting that could leave it off.
 */
function collectionStatus(): SourceStatus {
  return {
    key: "collection",
    title: "Tracking tag",
    state: "live",
    provides: `The GA4 tag for stream ${MEASUREMENT_ID} loads on every public page of the site.`,
    vars: [],
  };
}

function ga4Status(error?: string): SourceStatus {
  const vars: VarStatus[] = [
    {
      name: "GA4_PROPERTY_ID",
      set: has("GA4_PROPERTY_ID"),
      what: "Numeric property ID, from Admin → Property details. Not the G- id.",
    },
    {
      name: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      set: has("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      what: "Service account address, ending @<project>.iam.gserviceaccount.com.",
    },
    {
      name: "GOOGLE_PRIVATE_KEY",
      set: has("GOOGLE_PRIVATE_KEY"),
      what: "private_key from the service account JSON, with the literal backslash-n line breaks left exactly as they are in the file.",
    },
  ];
  return {
    key: "ga4",
    title: "Google Analytics",
    state: error ? "error" : vars.every((v) => v.set) ? "live" : "missing",
    provides: "Visitors, sessions, page views, devices, cities, and which pages get read.",
    vars,
    error,
    fix: explain("ga4", error),
  };
}

function gscStatus(error?: string): SourceStatus {
  const vars: VarStatus[] = [
    {
      name: "GSC_SITE_URL",
      set: has("GSC_SITE_URL"),
      what: "Exactly as Search Console lists it — sc-domain:stefaniepollack.com for a domain property, or https://www.stefaniepollack.com/ with the trailing slash for a URL-prefix one.",
    },
    {
      name: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      set: has("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      what: "The same service account as above.",
    },
    {
      name: "GOOGLE_PRIVATE_KEY",
      set: has("GOOGLE_PRIVATE_KEY"),
      what: "The same private key as above.",
    },
  ];
  return {
    key: "gsc",
    title: "Search Console",
    state: error ? "error" : vars.every((v) => v.set) ? "live" : "missing",
    provides:
      "Impressions, clicks, click-through rate, ranking position, and the queries people search.",
    vars,
    error,
    fix: explain("gsc", error),
  };
}

/* ==========================================================================
   The report
   ========================================================================== */

const RANGES = [7, 28, 90];

function readDays(range: string | undefined): number {
  return RANGES.some((d) => String(d) === range) ? Number(range) : 28;
}

interface Loaded<T> {
  data: T;
  live: boolean;
  error?: string;
}

/** One source failing must not blank the page: a 403 on Search Console is no
 *  reason to hide visitor numbers that loaded fine. */
async function load<T>(enabled: boolean, fn: () => Promise<T>, fallback: T): Promise<Loaded<T>> {
  if (!enabled) return { data: fallback, live: false };
  try {
    return { data: await fn(), live: true };
  } catch (e) {
    return { data: fallback, live: false, error: e instanceof Error ? e.message : String(e) };
  }
}

interface Dashboard {
  days: number;
  ga: Loaded<GaReport>;
  gsc: Loaded<GscReport>;
  sources: SourceStatus[];
  /** true when at least one source is not reporting */
  incomplete: boolean;
  /** a GA4 tag is installed, so visits are being recorded */
  collecting: boolean;
}

/**
 * Fifteen minutes per range on a warm instance — the same window the other
 * dashboards revalidate on. Moving between sections does not re-query Google,
 * and analytics is not worth hammering the API for. A result with an error in
 * it is not cached, so fixing a permission shows up on the next refresh.
 */
const REPORT_TTL = 15 * 60 * 1000;
const reportCache = new Map<number, { at: number; data: Dashboard }>();

async function loadDashboard(range: string | undefined): Promise<Dashboard> {
  const days = readDays(range);
  const hit = reportCache.get(days);
  if (hit && Date.now() - hit.at < REPORT_TTL) return hit.data;

  const [ga, gsc] = await Promise.all([
    load(has("GA4_PROPERTY_ID"), () => fetchGa4(days), emptyGa(days)),
    load(has("GSC_SITE_URL"), () => fetchSearchConsole(days), emptyGsc(days)),
  ]);

  const sources = [collectionStatus(), ga4Status(ga.error), gscStatus(gsc.error)];
  const data: Dashboard = {
    days,
    ga,
    gsc,
    sources,
    incomplete: sources.some((s) => s.state !== "live"),
    collecting: sources[0].state === "live",
  };

  if (!ga.error && !gsc.error) reportCache.set(days, { at: Date.now(), data });
  return data;
}

/* ==========================================================================
   Request handling — plain inputs and outputs, so the Vercel handler below
   and the Vite dev middleware share it.
   ========================================================================== */

export interface DashboardRequest {
  method: string;
  action: string;
  range?: string;
  cookieHeader?: string;
  body?: unknown;
}

export interface DashboardResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

function json(status: number, data: unknown, extra: Record<string, string> = {}): DashboardResponse {
  return {
    status,
    headers: {
      "Content-Type": "application/json",
      // Never cached anywhere shared: this is private, per-session data, and a
      // CDN copy would serve it to whoever asked next.
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
      ...extra,
    },
    body: JSON.stringify(data),
  };
}

/**
 * Fail CLOSED: with DASHBOARD_PASSWORD unset, every action is refused rather
 * than served. An open analytics endpoint publishes the site's traffic and
 * its best queries to anyone who guesses the URL.
 */
export async function handleDashboard(req: DashboardRequest): Promise<DashboardResponse> {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return json(503, { error: "not_configured" });

  if (req.action === "login") {
    if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
    const sent =
      req.body && typeof req.body === "object" && "password" in req.body
        ? String((req.body as { password: unknown }).password ?? "")
        : "";
    if (!safeEqual(sent, password)) return json(401, { error: "wrong_password" });
    return json(200, { ok: true }, { "Set-Cookie": cookie(sessionToken(password), MAX_AGE) });
  }

  // POST only. A GET sign-out could be fired by any <img> on another site.
  if (req.action === "logout") {
    if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
    return json(200, { ok: true }, { "Set-Cookie": cookie("", 0) });
  }

  if (req.action === "data") {
    if (req.method !== "GET") return json(405, { error: "method_not_allowed" });
    const sent = readCookie(req.cookieHeader, COOKIE);
    if (!sent || !safeEqual(sent, sessionToken(password))) {
      return json(401, { error: "unauthorized" });
    }
    return json(200, await loadDashboard(req.range));
  }

  return json(400, { error: "unknown_action" });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const q = (k: string) => (typeof req.query[k] === "string" ? (req.query[k] as string) : undefined);
    const out = await handleDashboard({
      method: req.method ?? "GET",
      action: q("action") ?? "",
      range: q("range"),
      cookieHeader: req.headers.cookie,
      body: req.body,
    });
    for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
    res.status(out.status).send(out.body);
  } catch (err) {
    console.error("[api/dashboard]", err);
    res.status(500).json({ error: "internal" });
  }
}
