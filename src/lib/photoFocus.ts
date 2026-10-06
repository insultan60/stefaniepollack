/** Where Stefanie is standing in each of her photos, as a CSS object-position.
 *
 *  The photos are 3:2 landscape, but they're shown in other shapes — 4:5
 *  portrait cards, phone-width banners, a round avatar — and `object-cover`
 *  crops to the centre by default. In several shots she isn't in the centre
 *  (portrait-2 and lifestyle-4 have her at the far right), so a centre crop
 *  cut her out. Every slot that crops one of these photos passes its src
 *  through photoFocus() so the crop is anchored on her instead.
 *
 *  When adding a new photo of her, add its focus point here. */
const FOCUS: Record<string, string> = {
  "/images/stefanie/headshot.jpg": "50% 18%",
  "/images/stefanie/lifestyle-1.jpg": "30% 40%",
  "/images/stefanie/lifestyle-2.jpg": "40% 40%",
  "/images/stefanie/lifestyle-3.jpg": "62% 40%",
  "/images/stefanie/lifestyle-4.jpg": "82% 50%",
  "/images/stefanie/lifestyle-5.jpg": "45% 40%",
  "/images/stefanie/lifestyle-6.jpg": "60% 50%",
  "/images/stefanie/lifestyle-7.jpg": "50% 50%",
  "/images/stefanie/portrait-1.jpg": "27% 50%",
  "/images/stefanie/portrait-2.jpg": "80% 50%",
  "/images/stefanie/portrait-3.jpg": "67% 50%",
  "/images/stefanie/schedule-hero.jpg": "67% 40%",
};

export function photoFocus(src: string): string | undefined {
  return FOCUS[src];
}
