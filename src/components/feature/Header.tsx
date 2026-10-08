import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLead } from "@/hooks/useLead";
import { areas } from "@/mocks/areas";

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

/* Testimonials left the menu (the About page still has them, and every area
   page shows local reviews); Neighborhoods took its place, with each area
   page in a dropdown. */
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
  { label: "Buyers", href: "/buyers" },
  { label: "Sellers", href: "/sellers" },
  { label: "Resources", href: "/resources" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { leadId, requireLead, signOut } = useLead();
  const { pathname } = useLocation();
  // Almost every page opens on a full-bleed dark photo hero (PageHero, the
  // blog article hero, the listing-detail gallery) that the header overlays
  // transparently, same as the homepage. The Listings grid is the one page
  // with no hero — keep it solid & legible from the moment it loads.
  // Also solid while the mobile menu is open: the menu is a light panel, and
  // the white logo and close icon disappeared against it.
  const solid = scrolled || mobileOpen || pathname === "/listings";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
          <div className="flex items-center justify-between h-20 md:h-24">
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => {
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

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {leadId ? (
                <div className="flex items-center gap-4">
                  <a
                    href="/account"
                    className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 whitespace-nowrap ${
                      solid ? "text-foreground-700 hover:text-foreground-950" : "text-white/80 hover:text-white"
                    }`}
                  >
                    My Account
                  </a>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 whitespace-nowrap ${
                      solid ? "text-foreground-700 hover:text-foreground-950" : "text-white/80 hover:text-white"
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => requireLead()}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 whitespace-nowrap ${
                    solid ? "text-foreground-700 hover:text-foreground-950" : "text-white/80 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
              )}
              <a
                href="/contact"
                className={`px-5 py-2.5 text-sm font-medium tracking-wide uppercase rounded-md transition-all duration-300 whitespace-nowrap ${
                  solid
                    ? "bg-foreground-950 text-background-50 hover:bg-foreground-800"
                    : "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-foreground-950 backdrop-blur-sm"
                }`}
              >
                Contact
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                solid ? "text-foreground-950" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                } ${solid ? "bg-foreground-950" : "bg-white"}`}
              />
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                } ${solid ? "bg-foreground-950" : "bg-white"}`}
              />
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                } ${solid ? "bg-foreground-950" : "bg-white"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background-50"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, i) => (
                <div key={link.label} className="flex flex-col items-center">
                  <motion.a
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl md:text-3xl font-heading font-medium text-foreground-950 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                  {/* Sub-pages (the area pages) as a small row under their parent. */}
                  {link.children && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1"
                    >
                      {link.children
                        .filter((c) => c.href !== link.href)
                        .map((c) => (
                          <a
                            key={c.href}
                            href={c.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-xs font-medium tracking-wide uppercase text-foreground-600 hover:text-primary-600"
                          >
                            {c.label}
                          </a>
                        ))}
                    </motion.div>
                  )}
                </div>
              ))}
              {leadId ? (
                <motion.a
                  href="/account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-foreground-700 hover:text-primary-600 transition-colors"
                >
                  My Account
                </motion.a>
              ) : (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                  onClick={() => { setMobileOpen(false); requireLead(); }}
                  className="text-lg font-medium text-foreground-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </motion.button>
              )}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.08, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 bg-foreground-950 text-background-50 text-sm font-medium tracking-wide uppercase rounded-md"
              >
                Contact Stefanie
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
