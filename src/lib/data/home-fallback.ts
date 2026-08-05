import type { ServiceRow } from "@/lib/database.types";

// Shown only if Supabase isn't configured yet or the services table is empty,
// so the homepage never looks broken during first-time setup.
export const fallbackServices: ServiceRow[] = [
  { id: -1, title: "Tourist & Visit Visa", slug: "tourist-visit-visa", summary: "Full handling for tourism, family, and short-stay visits. Includes application, extension, and advisory.", duration: "60 days, extendable", price_from: "IDR 650K", card_type: "visa", sort_order: 1, is_active: true, created_at: "" },
  { id: -2, title: "Business Visa", slug: "business-visa", summary: "For meetings, market research, negotiations, and professional activities across Indonesia.", duration: "60-180 days", price_from: "Contact us", card_type: "visa", sort_order: 2, is_active: true, created_at: "" },
  { id: -3, title: "KITAS / KITAP", slug: "kitas-kitap", summary: "Long-term residence permits for investors, employees, retirees, and family dependents.", duration: "1-5 years", price_from: "Contact us", card_type: "visa", sort_order: 3, is_active: true, created_at: "" },
  { id: -4, title: "Company Establishment", slug: "company-establishment", summary: "Full PT PMA setup: notarial deed, OSS licensing, KBLI selection, and post-registration compliance.", duration: "Full service", price_from: "IDR 15.5M", card_type: "legal", sort_order: 4, is_active: true, created_at: "" },
  { id: -5, title: "Digital Nomad Visa (E33G)", slug: "digital-nomad-visa", summary: "Five-year visa for remote professionals working for companies based outside Indonesia.", duration: "5 years", price_from: "Contact us", card_type: "lifestyle", sort_order: 5, is_active: true, created_at: "" },
  { id: -6, title: "Retirement Visa", slug: "retirement-visa", summary: "Live in Bali long-term. We handle the full KITAP retirement visa process from start to finish.", duration: "5 years", price_from: "Contact us", card_type: "lifestyle", sort_order: 6, is_active: true, created_at: "" },
];
