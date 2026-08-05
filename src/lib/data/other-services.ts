import type { ServiceCategory } from "./visa-services";

export const otherCategories: ServiceCategory[] = [
  {
    id: "banking",
    title: "Banking & Connectivity",
    sub: "Bank account, health insurance, and local SIM setup.",
    items: [
      { icon: "CreditCard", title: "Bank Account Opening", desc: "We accompany you to the bank and handle all the paperwork to open an Indonesian bank account (BCA, BRI, Mandiri, or BNI) as a foreigner.", duration: "1–2 days", price: "Contact us", waText: "Hi, I need help opening a bank account" },
      { icon: "Activity", title: "BPJS Kesehatan Registration", desc: "Enroll in Indonesia's national health insurance program. We handle registration, class selection, and the first payment setup for you.", duration: "2–3 days", price: "Contact us", waText: "Hi, I need BPJS Kesehatan registration" },
      { icon: "Smartphone", title: "E-SIM / Local SIM Setup", desc: "Get a local Indonesian number with data. We source the best plan, register the SIM under your passport, and activate it on arrival.", duration: "Same day", price: "Contact us", waText: "Hi, I need E-SIM / Local SIM setup" },
    ],
  },
  {
    id: "relocation",
    title: "Relocation",
    sub: "Property search, schools, and moving support in Bali.",
    items: [
      { icon: "House", title: "Property Search (Villa / Kos)", desc: "We source, shortlist, and visit properties on your behalf — villas, apartments, and kos — matching your budget, location, and lifestyle needs.", duration: "3–7 days", price: "Contact us", waText: "Hi, I need help with Property Search" },
      { icon: "GraduationCap", title: "School for Expat Kids", desc: "Guidance on international and bilingual schools in Bali — curriculum comparison, enrollment assistance, and school visits arranged.", duration: "1–2 weeks", price: "Contact us", waText: "Hi, I need help finding a school" },
      { icon: "Truck", title: "Moving & Logistics", desc: "End-to-end moving coordination — packing, domestic transport, customs clearance for international shipments, and storage solutions in Bali.", duration: "Depends on scope", price: "Contact us", waText: "Hi, I need Moving & Logistics service" },
    ],
  },
  {
    id: "concierge",
    title: "Concierge",
    sub: "Airport fast track and professional website for your business.",
    items: [
      { icon: "Plane", title: "Fast Track Airport Services", desc: "Skip the queues at Ngurah Rai (Bali) and Soekarno-Hatta (Jakarta). Our team meets you at the gate and escorts you through immigration fast lane.", duration: "Arrival / Departure", price: "Contact us", waText: "Hi, I need Fast Track Airport service" },
      { icon: "Globe", title: "Website for Your Business", desc: "Professional, mobile-first website for your Bali-based company — design, development, hosting, and domain included. Ready in 2 weeks.", duration: "2 weeks", price: "Contact us", waText: "Hi, I need a website for my business" },
    ],
  },
];
