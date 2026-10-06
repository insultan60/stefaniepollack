import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import "./i18n";
import App from "./App";

export { PRERENDER_PATHS, getPageMeta, canonicalUrl } from "./lib/seo";

/** Renders one page to an HTML string at build time — see scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <App location={url} />
    </StrictMode>,
  );
}
