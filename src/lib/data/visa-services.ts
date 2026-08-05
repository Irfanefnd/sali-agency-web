export type ServiceCard = {
  icon: string; // lucide-react icon name
  title: string;
  desc: string;
  duration: string;
  price: string;
  features?: string[];
  waText: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  sub: string;
  items: ServiceCard[];
};

export const visaCategories: ServiceCategory[] = [
  {
    id: "single-entry",
    title: "Single Entry Visa",
    sub: "Tourism, business trips, and short-stay visits.",
    items: [
      {
        icon: "Plane",
        title: "Visa on Arrival (VoA)",
        desc: "Available at major airports and seaports. Quick approval for eligible nationalities for tourism and short stays.",
        duration: "30 days, extendable",
        price: "IDR 500.000",
        features: ["Available at 33+ entry points", "Extendable once (30 days)", "Convertible to B211A", "Queue handling service"],
        waText: "Hi, I need help with Visa on Arrival",
      },
      {
        icon: "FileText",
        title: "Tourist Visa (B213)",
        desc: "Single entry tourist visa applied via embassy or e-visa. Ideal for planned trips with longer initial stay.",
        duration: "60 days",
        price: "From IDR 650.000",
        features: ["60-day initial validity", "Extendable up to 180 days", "Embassy & e-visa submission", "Document preparation included"],
        waText: "Hi, I need help with Tourist Visa B213",
      },
      {
        icon: "Briefcase",
        title: "Business Visa (B211A) — Single",
        desc: "For business meetings, market surveys, negotiations, and professional activities in Indonesia. Single entry.",
        duration: "60 days",
        price: "Contact us",
        features: ["Business activities permitted", "Extendable up to 180 days", "Sponsor letter arranged", "Fast processing available"],
        waText: "Hi, I need help with Business Visa B211A Single",
      },
      {
        icon: "Users",
        title: "Social / Cultural Visa (B211B)",
        desc: "For social visits, family reunions, cultural exchange programs, and language study in Indonesia.",
        duration: "60 days",
        price: "Contact us",
        features: ["Family & social visits", "Cultural/education programs", "Extendable up to 180 days", "Sponsor arrangement"],
        waText: "Hi, I need help with Social Cultural Visa B211B",
      },
    ],
  },
  {
    id: "multiple-entry",
    title: "Multiple Entry Visa",
    sub: "Enter and exit Indonesia freely multiple times.",
    items: [
      {
        icon: "Repeat",
        title: "Multiple Entry Business Visa",
        desc: "Multiple entry B211A for executives and professionals who frequently travel in and out of Indonesia for business.",
        duration: "180 days / entry",
        price: "Contact us",
        features: ["Unlimited entries", "Up to 180 days per stay", "Business activities covered", "1-year validity"],
        waText: "Hi, I need Multiple Entry Business Visa",
      },
      {
        icon: "Laptop",
        title: "Digital Nomad Visa (E33G)",
        desc: "Indonesia's 5-year visa for remote workers employed by overseas companies. Live and work in Bali tax-free.",
        duration: "5 years",
        price: "Contact us",
        features: ["5-year validity, multiple entry", "No Indonesian tax obligation", "No work permit required", "Income proof guidance", "Activation in Bali"],
        waText: "Hi, I need Digital Nomad Visa E33G",
      },
      {
        icon: "Sun",
        title: "Retirement Visa (ITAS/ITAP)",
        desc: "Long-term multiple entry visa for retirees aged 55+. Live your dream life in Bali with a valid, renewable permit.",
        duration: "5 years, renewable",
        price: "Contact us",
        features: ["Age 55+ eligible", "Passive income requirement", "Sponsor arrangement", "No work restriction", "Annual reporting handled"],
        waText: "Hi, I need Retirement Visa",
      },
    ],
  },
  {
    id: "kitas-kitap",
    title: "KITAS / KITAP",
    sub: "Long-term and permanent stay permits for investors, employees & families.",
    items: [
      {
        icon: "FileCheck",
        title: "Work KITAS",
        desc: "Temporary stay permit for foreign nationals employed by an Indonesian company. Requires RPTKA and IMTA work permit.",
        duration: "1–2 years",
        price: "Contact us",
        features: ["RPTKA & IMTA processing", "Sponsored by employer", "Annual renewal", "Multiple re-entry permit"],
        waText: "Hi, I need Work KITAS",
      },
      {
        icon: "TrendingUp",
        title: "Investor KITAS",
        desc: "For foreign investors holding shares in a PT PMA. Allows you to legally reside in Indonesia and manage your company.",
        duration: "1–2 years",
        price: "Contact us",
        features: ["PT PMA shareholding required", "Director / Commissioner role", "Multiple re-entry permit", "Annual extension"],
        waText: "Hi, I need Investor KITAS",
      },
      {
        icon: "Users",
        title: "Family / Dependent KITAS",
        desc: "Spouse and children of KITAS holders can join on a dependent KITAS, allowing them to legally live in Indonesia.",
        duration: "Follows sponsor",
        price: "Contact us",
        features: ["Spouse & children eligible", "Tied to sponsor's permit", "Re-entry permit included", "School enrollment support"],
        waText: "Hi, I need Family KITAS",
      },
      {
        icon: "IdCard",
        title: "KITAP (Permanent Stay)",
        desc: "Indonesia's permanent residence permit. Available to long-term KITAS holders and qualifying spouses of Indonesian citizens.",
        duration: "5 years, renewable",
        price: "Contact us",
        features: ["5 years consecutive KITAS required", "Indonesian spouse pathway", "No annual reporting", "Full rights to stay"],
        waText: "Hi, I need KITAP",
      },
      {
        icon: "Sun",
        title: "Retirement KITAS",
        desc: "Special KITAS for retirees aged 55+. Live comfortably in Bali long-term with a fully managed permit process.",
        duration: "1 year, renewable",
        price: "Contact us",
        features: ["Age 55+ eligible", "Passive income proof", "Sponsor arrangement", "Annual renewal handled"],
        waText: "Hi, I need Retirement KITAS",
      },
    ],
  },
  {
    id: "other",
    title: "Other Visa Services",
    sub: "Extension, conversion, document legalization & consultation.",
    items: [
      {
        icon: "RefreshCw",
        title: "Visa Extension",
        desc: "Extend your current visa without leaving Indonesia. We handle the paperwork, queue, and submission on your behalf.",
        duration: "30–60 days",
        price: "From IDR 450.000",
        features: ["VoA, B211A, B213 extensions", "Same-day processing", "Queue handling included", "Document preparation"],
        waText: "Hi, I need Visa Extension service",
      },
      {
        icon: "RefreshCcw",
        title: "Visa Conversion",
        desc: "Convert your Visa on Arrival or tourist visa to a business or social visa without leaving Bali.",
        duration: "3–5 working days",
        price: "Contact us",
        features: ["VoA → B211A conversion", "Tourist → Business", "Sponsor letter provided", "No airport exit needed"],
        waText: "Hi, I need Visa Conversion",
      },
      {
        icon: "FileText",
        title: "Document Legalization",
        desc: "Apostille, notarization, and sworn translation for foreign documents required in the Indonesian immigration process.",
        duration: "3–7 working days",
        price: "Contact us",
        features: ["Apostille certification", "Notarized translation", "Sworn translator network", "Embassy-accepted formats"],
        waText: "Hi, I need Document Legalization",
      },
      {
        icon: "MessageCircleQuestionMark",
        title: "Immigration Consulting",
        desc: "Not sure which visa fits your situation? Book a one-on-one consultation with our immigration experts.",
        duration: "60 min session",
        price: "Contact us",
        features: ["Personal situation assessment", "Best visa pathway recommendation", "Cost & timeline estimate", "Follow-up support"],
        waText: "Hi, I need an Immigration Consultation",
      },
    ],
  },
];
