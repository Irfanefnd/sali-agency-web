import type { ServiceCategory } from "./visa-services";

export const legalCategories: ServiceCategory[] = [
  {
    id: "business-setup",
    title: "Business Setup",
    sub: "Establish your company legally in Indonesia.",
    items: [
      { icon: "Building2", title: "PT PMA (Foreign Company)", desc: "Foreign-owned limited liability company. The standard structure for expats doing business in Indonesia.", duration: "3–4 weeks", price: "Contact us", waText: "Hi, I need help setting up a PT PMA" },
      { icon: "Building", title: "PT Lokal (Local Company)", desc: "Fully Indonesian-owned limited liability company. Suitable for businesses requiring 100% local ownership.", duration: "2–3 weeks", price: "Contact us", waText: "Hi, I need help setting up a PT Lokal" },
      { icon: "Handshake", title: "CV (Partnership)", desc: "A commanditaire vennootschap — a lighter structure for small local businesses with two or more partners.", duration: "1–2 weeks", price: "Contact us", waText: "Hi, I need help setting up a CV" },
      { icon: "Clock", title: "Company Dissolution", desc: "Formal legal closure of a PT PMA or PT Lokal, including deregistration from all government systems.", duration: "4–8 weeks", price: "Contact us", waText: "Hi, I need Company Dissolution service" },
      { icon: "FilePen", title: "Company Amendment", desc: "Change of directors, commissioners, shareholders, address, or business activities. Notarized and registered with the ministry.", duration: "2–3 weeks", price: "Contact us", waText: "Hi, I need Company Amendment service" },
    ],
  },
  {
    id: "licensing",
    title: "Licensing & Compliance",
    sub: "Business licenses, tax registration, and regulatory permits.",
    items: [
      { icon: "FileText", title: "NIB & OSS Registration", desc: "Business Identification Number (NIB) via the Online Single Submission system. Required for all business activities in Indonesia.", duration: "3–5 days", price: "Contact us", waText: "Hi, I need NIB & OSS Registration" },
      { icon: "CreditCard", title: "NPWP (Tax ID)", desc: "Company and individual tax registration number. Mandatory for invoicing, banking, and any official Indonesian tax compliance.", duration: "3–7 days", price: "Contact us", waText: "Hi, I need NPWP registration" },
      { icon: "Clock", title: "Annual Compliance Reporting", desc: "Annual tax return (SPT), mandatory GMS report, and ministry of law submissions to keep your company in good standing.", duration: "Annual", price: "Contact us", waText: "Hi, I need Annual Compliance Reporting" },
      { icon: "ShieldCheck", title: "Business License (SIUP / IUMK)", desc: "Sector-specific operating licenses for retail, hospitality, F&B, and other regulated industries in Bali.", duration: "1–3 weeks", price: "Contact us", waText: "Hi, I need a Business License" },
      { icon: "SquareCheck", title: "PKP (VAT Registered Taxpayer)", desc: "Registration as a taxable entrepreneur (Pengusaha Kena Pajak) for companies exceeding the VAT revenue threshold.", duration: "1–2 weeks", price: "Contact us", waText: "Hi, I need PKP registration" },
    ],
  },
  {
    id: "property",
    title: "Property & Land",
    sub: "Leases, land titles, and property due diligence in Bali.",
    items: [
      { icon: "House", title: "Land Lease Agreement (HGB/HAK PAKAI)", desc: "Notarized long-term lease agreements for villas, commercial spaces, and land. Legally enforceable with clear exit clauses.", duration: "5–10 days", price: "Contact us", waText: "Hi, I need a Land Lease Agreement" },
      { icon: "ShieldCheck", title: "Property Due Diligence", desc: "Certificate verification, zoning check, tax clearance review, and encumbrance search before you sign any property deal.", duration: "3–5 days", price: "Contact us", waText: "Hi, I need Property Due Diligence" },
      { icon: "Building", title: "Strata Title (PPJB / AJB)", desc: "Purchase and sale deed (AJB) and binding sale-purchase agreement (PPJB) for eligible property transactions in Indonesia.", duration: "1–2 weeks", price: "Contact us", waText: "Hi, I need help with Strata Title" },
      { icon: "FileSearch", title: "Lease Review & Negotiation", desc: "Legal review of existing lease drafts, identification of unfavorable clauses, and negotiation support before signing.", duration: "2–4 days", price: "Contact us", waText: "Hi, I need Lease Review & Negotiation" },
    ],
  },
  {
    id: "contracts",
    title: "Contracts & Agreements",
    sub: "Drafted, reviewed, and notarized under Indonesian law.",
    items: [
      { icon: "Users", title: "Employment Agreement", desc: "Bilingual Indonesian-English employment contracts compliant with UU Ketenagakerjaan, covering PKWT and PKWTT employment types.", duration: "3–5 days", price: "Contact us", waText: "Hi, I need an Employment Agreement" },
      { icon: "Signature", title: "Partnership Agreement", desc: "Joint venture and business partnership agreements defining profit sharing, responsibilities, and dispute resolution under Indonesian law.", duration: "3–7 days", price: "Contact us", waText: "Hi, I need a Partnership Agreement" },
      { icon: "ShieldCheck", title: "NDA / Confidentiality Agreement", desc: "Non-disclosure agreements for business negotiations, employees, and contractors operating under Indonesian jurisdiction.", duration: "1–2 days", price: "Contact us", waText: "Hi, I need an NDA" },
      { icon: "FileCheck", title: "Service & Vendor Contracts", desc: "B2B service agreements, freelancer contracts, and supplier deals with clear scope, deliverables, and termination clauses.", duration: "2–4 days", price: "Contact us", waText: "Hi, I need a Service or Vendor Contract" },
      { icon: "FileSearch", title: "Contract Review", desc: "Legal review of any existing contract — flag risk clauses, suggest revisions, and verify enforceability under Indonesian law.", duration: "1–3 days", price: "Contact us", waText: "Hi, I need Contract Review" },
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    sub: "Trademark, copyright, and brand protection in Indonesia.",
    items: [
      { icon: "Award", title: "Trademark Registration", desc: "Register your brand name, logo, or tagline with DJKI (DGIP). Protection across all product and service classes in Indonesia.", duration: "12–18 months", price: "Contact us", waText: "Hi, I need Trademark Registration" },
      { icon: "PenTool", title: "Copyright Registration", desc: "Official copyright registration for creative works, software, music, and publications with DJKI Indonesia.", duration: "1–3 months", price: "Contact us", waText: "Hi, I need Copyright Registration" },
      { icon: "RefreshCw", title: "Trademark Renewal", desc: "Renew your existing Indonesian trademark before expiry. We handle the submission, documentation, and follow-up with DJKI.", duration: "10-year cycle", price: "Contact us", waText: "Hi, I need Trademark Renewal" },
    ],
  },
  {
    id: "documents",
    title: "Document Services",
    sub: "Translation, legalization, driving license, and BPJS registration.",
    items: [
      { icon: "Languages", title: "Sworn Translation", desc: "Certified bilingual translation by sworn translators for legal, immigration, and official documents accepted by Indonesian authorities.", duration: "1–3 days", price: "Contact us", waText: "Hi, I need Sworn Translation" },
      { icon: "IdCard", title: "Driving License (SIM) Conversion", desc: "Convert your foreign driving license to an Indonesian SIM A or SIM C. We handle the test registration, documentation, and processing.", duration: "3–5 days", price: "Contact us", waText: "Hi, I need SIM conversion" },
      { icon: "FileCheck", title: "Document Legalization (Apostille)", desc: "Apostille certification and notarial legalization of foreign documents for use in Indonesia — birth certificates, diplomas, company documents.", duration: "3–7 days", price: "Contact us", waText: "Hi, I need Document Legalization" },
      { icon: "Activity", title: "BPJS Ketenagakerjaan", desc: "Mandatory worker social security registration for companies and foreign employees. We handle registration, monthly contributions, and compliance.", duration: "3–5 days", price: "Contact us", waText: "Hi, I need BPJS Ketenagakerjaan registration" },
    ],
  },
];
