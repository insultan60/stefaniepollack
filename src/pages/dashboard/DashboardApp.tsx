import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { readDays, type Dashboard } from "./types";
import { reports } from "./session";
import Overview from "./sections/Overview";
import Pages from "./sections/Pages";
import Audience from "./sections/Audience";
import Search from "./sections/Search";
import Connections from "./sections/Connections";
import Login from "./sections/Login";
import "./dashboard.css";

/**
 * /dashboard — the private analytics page, as its own lazily loaded chunk.
 *
 * Loaded through React.lazy from the router, so none of this (nor its
 * stylesheet) is downloaded by an ordinary visitor. App.tsx also drops the
 * site's header, footer, custom cursor and analytics tag on these routes: an
 * admin page that fired the tag would record every look at the traffic AS
 * traffic.
 *
 * Every section is a real route, so a link can be bookmarked and sent. The
 * numbers come from api/dashboard.ts, which is where the password is actually
 * enforced; this file only reacts to its 401 by sending you to sign in.
 */

type Load =
  | { state: "loading" }
  | { state: "ready" }
  | { state: "not_configured" }
  | { state: "failed"; message: string };

/** noindex for the whole time the dashboard is mounted. A crawler cannot read
 *  the numbers, but it can still index a sign-in page, and "Stefanie Pollack
 *  dashboard sign in" is not a result this site wants. vercel.json also sends
 *  X-Robots-Tag for these paths, for crawlers that do not run JavaScript. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}

const TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/pages": "Pages",
  "/dashboard/audience": "Audience",
  "/dashboard/search": "Google Search",
  "/dashboard/connections": "Connections",
  "/dashboard/login": "Dashboard sign in",
};

function useTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const before = document.title;
    const name = TITLES[pathname.replace(/\/$/, "")] ?? "Dashboard";
    document.title = `${name} | Stefanie Pollack`;
    return () => {
      document.title = before;
    };
  }, [pathname]);
}

/** The shell every section sits in: sidebar, and the report for the range. */
function Layout() {
  const [params] = useSearchParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const days = readDays(params.get("range"));

  const [load, setLoad] = useState<Load>(reports.has(days) ? { state: "ready" } : { state: "loading" });
  // Kept across range switches, so changing range dims the old numbers rather
  // than blanking the page while the new ones arrive.
  const [shown, setShown] = useState<Dashboard | null>(reports.get(days) ?? null);

  useEffect(() => {
    const cached = reports.get(days);
    if (cached) {
      setShown(cached);
      setLoad({ state: "ready" });
      return;
    }

    let cancelled = false;
    setLoad({ state: "loading" });
    fetch(`/api/dashboard?action=data&range=${days}`, { credentials: "same-origin" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) {
          navigate(`/dashboard/login?next=${encodeURIComponent(pathname + search)}`, {
            replace: true,
          });
          return;
        }
        if (res.status === 503) {
          setLoad({ state: "not_configured" });
          return;
        }
        if (!res.ok) throw new Error(`The dashboard API answered ${res.status}.`);
        const data = (await res.json()) as Dashboard;
        reports.set(days, data);
        if (!cancelled) {
          setShown(data);
          setLoad({ state: "ready" });
        }
      })
      .catch((e) => {
        if (!cancelled) setLoad({ state: "failed", message: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      cancelled = true;
    };
    // pathname/search are only read for the sign-in redirect, not a reason to refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, navigate]);

  const sources = shown?.sources ?? [];
  const live = sources.filter((s) => s.state === "live").length;

  let body;
  if (load.state === "not_configured") {
    body = (
      <div className="dash-shell">
        <p className="dash-lead">
          The dashboard is not configured. Set DASHBOARD_PASSWORD on the host to enable it.
        </p>
      </div>
    );
  } else if (load.state === "failed") {
    body = (
      <div className="dash-shell">
        <p className="dash-lead">The dashboard could not load its data. {load.message}</p>
      </div>
    );
  } else if (!shown) {
    body = (
      <div className="dash-shell">
        <p className="dash-lead" role="status">
          Loading&hellip;
        </p>
      </div>
    );
  } else {
    body = (
      <div aria-busy={load.state === "loading"} className={load.state === "loading" ? "dash-loading" : undefined}>
        {/* The previous report, as it was, until the new range lands: its
            range buttons and figures stay in agreement with each other. */}
        <Outlet context={shown} />
      </div>
    );
  }

  return (
    <div className="dash-root">
      <Sidebar liveCount={live} total={sources.length || 3} />
      <div className="dash-main">{body}</div>
    </div>
  );
}

export default function DashboardApp() {
  useNoIndex();
  useTitle();

  return (
    <div className="dash">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="pages" element={<Pages />} />
          <Route path="audience" element={<Audience />} />
          <Route path="search" element={<Search />} />
          <Route path="connections" element={<Connections />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
