import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import CalendlyInline from "./CalendlyInline";
import { useLead } from "@/hooks/useLead";

const CALENDLY_URL = "https://calendly.com/stefaniepollack";

/* Booking popup for every "Schedule a Meeting" / "Meet with Stefanie" /
   "Book a Meeting" button on the site.

   The buttons stay plain <a href="/schedule"> links: crawlers follow them,
   ctrl/cmd-click and middle-click still open the full page in a new tab, and
   nothing breaks before the app has hydrated. Once it has, a plain left click
   on any such link is caught here and opens Calendly in place instead of
   navigating away. On /schedule itself the calendar is already on the page,
   so the popup stays out of the way. */
export default function ScheduleModal() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { email } = useLead();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href="/schedule"]');
      if (!link || pathname === "/schedule") return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Close on Escape, and stop the page behind from scrolling while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // A route change (e.g. a link inside the popup's page chrome) closes it.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-foreground-950/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Schedule a meeting with Stefanie Pollack"
              className="pointer-events-auto relative w-[min(1080px,100%)] max-h-[92vh] overflow-y-auto bg-background-50 rounded-2xl shadow-xl"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-6 px-6 md:px-10 pt-6 md:pt-8 pb-4 bg-background-50 border-b border-background-200/70">
                <div>
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary-600 mb-2">
                    Schedule a Meeting
                  </p>
                  <h2 className="font-heading text-2xl md:text-3xl text-foreground-950">
                    Choose Your <span className="italic font-normal">Day and Time</span>
                  </h2>
                  <p className="mt-1 text-sm text-foreground-600">
                    A 30-minute, no-obligation conversation by phone, Zoom, or in person.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-background-200 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground-700" strokeWidth={1.5} />
                </button>
              </div>
              {/* Same measured heights as the /schedule page: Calendly gets
                  taller as it narrows, and sits side by side once its frame
                  is ~1000px wide (a viewport of ~1110px with this padding). */}
              <CalendlyInline
                url={CALENDLY_URL}
                prefillEmail={email ?? undefined}
                className="h-[1000px] min-[640px]:h-[1120px] min-[1112px]:h-[820px]"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
