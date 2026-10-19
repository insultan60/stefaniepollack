import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PHOTO_FALLBACK } from "@/lib/media";

/**
 * Full-screen photo viewer for a listing's gallery.
 *
 * The hero crops every photo to a wide band (object-cover), which cuts off
 * most of a portrait room shot, so the client asked for a way to see them
 * bigger. This shows each photo whole (object-contain) at the size of the
 * screen, on black.
 *
 * It shares the page's photo index rather than keeping its own, so closing it
 * leaves the hero on the photo you were last looking at, and opening it starts
 * on the one in the hero.
 *
 * Keyboard: left/right arrows step, Escape closes. Touch: swipe left or right.
 * The page behind is locked from scrolling while it is open, focus moves to
 * the close button, and goes back to whatever opened it on close.
 */
export default function PhotoLightbox({
  photos,
  index,
  onIndex,
  onClose,
  title,
}: {
  photos: string[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  title: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = photos.length;
  const prev = () => onIndex((index - 1 + count) % count);
  const next = () => onIndex((index + 1) % count);

  // Keyboard, scroll lock and focus, for as long as the viewer is open.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Keep the current thumbnail in view as you step through.
  useEffect(() => {
    const thumb = stripRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return createPortal(
    <div
      // Solid, not translucent: the listing page showing through behind a
      // photo competes with it.
      className="fixed inset-0 z-[100] flex flex-col bg-[#0c0c0c] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photos`}
    >
      {/* Top bar: counter and close */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <span className="text-sm font-medium tracking-wide text-white/80">
          {index + 1} / {count}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close photos"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* The photo, whole. A click on the dark space around it closes. */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-2 md:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null || count < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        }}
      >
        <img
          key={index}
          src={photos[index]}
          alt={`${title} — photo ${index + 1} of ${count}`}
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.src = PHOTO_FALLBACK)}
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails: scroll sideways when there are more than fit. */}
      {count > 1 && (
        <div ref={stripRef} className="flex gap-2 overflow-x-auto px-4 md:px-8 py-4 [scrollbar-width:thin]">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => onIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`shrink-0 w-20 h-14 rounded-md overflow-hidden ring-2 transition-all ${
                i === index ? "ring-white" : "ring-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => (e.currentTarget.src = PHOTO_FALLBACK)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
