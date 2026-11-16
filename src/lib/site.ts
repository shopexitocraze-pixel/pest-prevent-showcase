// Public, non-secret site constants shared by the SEO head tags and the
// server-side mailer. Keeping them in code guarantees SSR and client hydration
// produce identical <head> output (env reads would differ between runtimes).
//
// Keep SITE_URL in sync with the SITE_URL entry in .env.
export const SITE_URL = "https://globalelitepestmanagement.in";
export const SITE_NAME = "Global Elite Pest Management";

export const PHONE = "+917010976603";
export const PHONE_DISPLAY = "+91 70109 76603";
export const WHATSAPP = "https://wa.me/917010976603";

export const ADDRESS_LINES = [
  "Tiruvalluvar Street, Lenin Nagar,",
  "Venkateswara Nagar, Ambattur,",
  "Chennai, Tamil Nadu – 600053",
];

// Filled in .env as VITE_GOOGLE_REVIEWS_URL (public, client-visible URL).
// Filled in .env as VITE_GOOGLE_REVIEWS_URL (public, client-visible URL).
// Dotted access matches src/lib/gallery.ts so Vite's env define applies here
// too (bracket access would not be replaced at build time).
export const GOOGLE_REVIEWS_URL: string =
  (import.meta.env.VITE_GOOGLE_REVIEWS_URL as string | undefined) ?? "";

export const AREAS_SERVED = [
  "Ambattur",
  "Anna Nagar",
  "Mogappair",
  "Avadi",
  "Padi",
  "Porur",
  "Adyar",
  "Velachery",
  "T. Nagar",
  "Guindy",
  "OMR / Sholinganallur",
  "Chromepet",
  "Tambaram",
  "Sriperumbudur",
  "Koyambedu",
  "Mylapore",
] as const;
