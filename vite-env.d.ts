/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID (G-…). Installs the tag; see src/components/feature/Analytics.tsx. */
  readonly VITE_GA4_MEASUREMENT_ID?: string;
}

declare const __BASE_PATH__: string;
declare const __IS_PREVIEW__: boolean;
declare const __READDY_PROJECT_ID__: string;
declare const __READDY_VERSION_ID__: string;
declare const __READDY_AI_DOMAIN__: string;