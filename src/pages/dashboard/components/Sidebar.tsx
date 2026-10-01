import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { clearReports } from "../session";
import {
  ChartIcon,
  CloseIcon,
  ExternalIcon,
  FileIcon,
  MenuIcon,
  PlugIcon,
  SearchIcon,
  SignOutIcon,
  UsersIcon,
} from "./icons";

/**
 * Section navigation.
 *
 * Every section is a real route rather than an anchor into one long page, so a
 * link can be bookmarked, opened in a new tab and sent to someone. The date
 * range travels with it: switching from Pages to Search while looking at 90
 * days and silently landing back on 28 would quietly change the numbers under
 * whoever is reading them.
 *
 * Sections whose source is not connected still appear and are still reachable.
 * Hiding them would make the dashboard look permanently smaller than it is,
 * and each one explains its own empty state better than a missing link does.
 */

const NAV = [
  { href: "/dashboard", label: "Overview", Icon: ChartIcon, exact: true },
  { href: "/dashboard/pages", label: "Pages", Icon: FileIcon },
  { href: "/dashboard/audience", label: "Audience", Icon: UsersIcon },
  { href: "/dashboard/search", label: "Google Search", Icon: SearchIcon },
  { href: "/dashboard/connections", label: "Connections", Icon: PlugIcon },
];

function NavList({
  pathname,
  query,
  onNavigate,
  liveCount,
  total,
}: {
  pathname: string;
  query: string;
  onNavigate?: () => void;
  liveCount: number;
  total: number;
}) {
  return (
    <nav aria-label="Dashboard sections" className="dash-nav">
      {NAV.map(({ href, label, Icon, exact }) => {
        const here = pathname.replace(/\/$/, "") || "/";
        const active = exact ? here === href : here.startsWith(href);
        return (
          <Link
            key={href}
            to={`${href}${query}`}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`dash-nav-link${active ? " is-active" : ""}`}
          >
            <Icon />
            <span className="dash-nav-label">{label}</span>
            {href === "/dashboard/connections" ? (
              <span
                className={`dash-nav-badge${
                  liveCount === total ? " is-ok" : liveCount > 0 ? " is-warn" : ""
                }`}
              >
                {liveCount}/{total}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ liveCount, total }: { liveCount: number; total: number }) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function signOut() {
    // POST, never GET: a GET sign-out could be fired by any <img> elsewhere.
    await fetch("/api/dashboard?action=logout", { method: "POST", credentials: "same-origin" }).catch(
      () => undefined,
    );
    clearReports();
    navigate("/dashboard/login", { replace: true });
  }

  const range = params.get("range");
  const query = range ? `?range=${range}` : "";

  const brand = (
    <div className="dash-brand">
      <span aria-hidden="true" className="dash-brand-mark">
        SP
      </span>
      <div className="dash-brand-text">
        <p className="dash-brand-name">Stefanie Pollack</p>
        <p className="dash-brand-sub">Site analytics</p>
      </div>
    </div>
  );

  const footer = (
    <>
      {/* A full page load, not a client-side route change: the site's own
          header, footer and analytics tag are set up on load, and the
          dashboard deliberately kept them out. */}
      <a href="/" className="dash-out">
        <ExternalIcon />
        View the site
      </a>
      <button type="button" onClick={signOut} className="dash-out">
        <SignOutIcon />
        Sign out
      </button>
    </>
  );

  return (
    <>
      {/* ---------------------------- desktop rail ---------------------------- */}
      <aside className="dash-rail">
        {brand}
        <NavList pathname={pathname} query={query} liveCount={liveCount} total={total} />
        <div className="dash-rail-foot">{footer}</div>
      </aside>

      {/* ------------------------------ mobile bar ---------------------------- */}
      <div className="dash-topbar">
        {brand}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sections"
          className="dash-burger"
        >
          <MenuIcon />
        </button>
      </div>

      {open ? (
        <div className="dash-drawer">
          <button
            type="button"
            aria-label="Close sections"
            onClick={() => setOpen(false)}
            className="dash-scrim"
          />
          <div className="dash-drawer-panel">
            <div className="dash-drawer-head">
              {brand}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close sections"
                className="dash-drawer-close"
              >
                <CloseIcon />
              </button>
            </div>
            <NavList
              pathname={pathname}
              query={query}
              onNavigate={() => setOpen(false)}
              liveCount={liveCount}
              total={total}
            />
            <div className="dash-rail-foot">{footer}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
