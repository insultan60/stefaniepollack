import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLead } from "@/hooks/useLead";
import { areas } from "@/mocks/areas";

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

/* Testimonials left the menu (the About page still has them, and every area
   page shows local reviews); Neighborhoods took its place. Its dropdown lists
   every area page, built from src/mocks/areas.ts so a new area appears here
   on its own (client request, October 2026). */
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Listings", href: "/listings" },
  {
    label: "Neighborhoods",
    href: "/neighborhoods",
    children: [
      { label: "All Neighborhoods", href: "/neighborhoods" },
      ...areas.map((a) => ({ label: a.name, href: `/neighborhoods/${a.slug}` })),
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/events" },
  { label: "Buyers", href: "/buyers" },
  { label: "Sellers", href: "/sellers" },
  { label: "Resources", href: "/resources" },
];

/* The full menu outgrew the header bar, so the bar keeps only these and the
   Menu button opens a side panel with every link, the account links and
   Contact (client request, October 2026). */
const PRIMARY = ["Listings", "Neighborhoods", "Blog", "Events", "Buyers", "Sellers"];
const primaryLinks = navLinks.filter((l) => PRIMARY.includes(l.label));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const { leadId, requireLead, signOut } = useLead();
  const { pathname } = useLocation();
  // Almost every page opens on a full-bleed dark photo hero (PageHero, the
  // blog article hero, the listing-detail gallery) that the header overlays
  // transparently, same as the homepage. The Listings grid is the one page
  // with no hero — keep it solid & legible from the moment it loads.
  // Event pages open on a light background (the flyer), so they start solid too.
  const solid = scrolled || pathname === "/listings" || pathname.startsWith("/events/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Lock the page behind the open panel; Escape closes it.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-background-50 border-b border-background-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between gap-6 h-20 md:h-24">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                src="/images/logo-pollack.webp"
                alt="Pollack Homes"
                className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                  solid ? "brightness-0" : ""
                }`}
              />
            </a>

            {/* Main links (the rest live in the side panel) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {primaryLinks.map((link) => {
                const item = (
                  <a
                    href={link.href}
                    className={`relative inline-flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors duration-300 group whitespace-nowrap ${
                      solid
                        ? "text-foreground-800 hover:text-foreground-950"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.75} />}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                        solid ? "bg-foreground-950" : "bg-white"
                      }`}
                    />
                  </a>
                );
                if (!link.children) return <div key={link.label}>{item}</div>;
                // Opens on hover and on keyboard focus (focus-within); the
                // pt-4 bridge keeps it open while the pointer crosses the gap.
                return (
                  <div key={link.label} className="relative group/menu">
                    {item}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 invisible opacity-0 translate-y-1 group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-focus-within/menu:translate-y-0 transition-all duration-200">
                      <ul className="min-w-[220px] py-2 bg-background-50 rounded-xl border border-background-200 shadow-xl">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block px-5 py-2.5 text-sm text-foreground-800 hover:bg-background-100 hover:text-foreground-950 transition-colors whitespace-nowrap"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Contact + Menu button */}
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="/contact"
                className={`hidden md:inline-flex px-5 py-2.5 text-sm font-medium tracking-wide uppercase rounded-md transition-all duration-300 whitespace-nowrap ${
                  solid
                    ? "bg-foreground-950 text-background-50 hover:bg-foreground-800"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-foreground-950 backdrop-blur-sm"
                }`}
              >
                Contact
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                className={`inline-flex items-center gap-2 h-10 px-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  solid ? "text-foreground-950 hover:text-foreground-700" : "text-white hover:text-white/80"
                }`}
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
                <span className="hidden md:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side panel with the full menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-foreground-950/50 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-background-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between h-20 md:h-24 px-8 border-b border-background-200/60 shrink-0">
                <a href="/" onClick={close}>
                  <img src="/images/logo-pollack.webp" alt="Pollack Homes" className="h-9 w-auto brightness-0" />
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  autoFocus
                  className="w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full text-foreground-950 hover:bg-background-100 transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-8 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      {link.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setSubOpen((o) => !o)}
                            aria-expanded={subOpen}
                            className={`w-full flex items-center justify-between py-3 font-heading text-2xl transition-colors ${
                              isActive(link.href) ? "text-primary-700" : "text-foreground-950 hover:text-primary-700"
                            }`}
                          >
                            {link.label}
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${subOpen ? "rotate-180" : ""}`}
                              strokeWidth={1.5}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {subOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden pl-4 border-l border-background-200"
                              >
                                {link.children.map((c) => (
                                  <li key={c.href}>
                                    <a
                                      href={c.href}
                                      onClick={close}
                                      className={`block py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                                        pathname === c.href ? "text-primary-700" : "text-foreground-600 hover:text-primary-700"
                                      }`}
                                    >
                                      {c.label}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={link.href}
                          onClick={close}
                          className={`block py-3 font-heading text-2xl transition-colors ${
                            isActive(link.href) ? "text-primary-700" : "text-foreground-950 hover:text-primary-700"
                          }`}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="shrink-0 px-8 py-6 border-t border-background-200/60 space-y-4">
                <div className="flex items-center gap-6 text-sm font-medium tracking-wide uppercase">
                  {leadId ? (
                    <>
                      <a href="/account" onClick={close} className="text-foreground-700 hover:text-foreground-950 transition-colors">
                        My Account
                      </a>
                      <button
                        type="button"
                        onClick={() => { close(); signOut(); }}
                        className="text-foreground-700 hover:text-foreground-950 transition-colors uppercase"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { close(); requireLead(); }}
                      className="text-foreground-700 hover:text-foreground-950 transition-colors uppercase"
                    >
                      Sign In
                    </button>
                  )}
                </div>
                <a
                  href="/contact"
                  onClick={close}
                  className="block w-full text-center px-6 py-3.5 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md hover:bg-foreground-800 transition-colors"
                >
                  Contact Stefanie
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
