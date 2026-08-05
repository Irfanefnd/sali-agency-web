export const siteConfig = {
  name: "Sali Agency",
  description:
    "Sali Agency - Expert visa, immigration, and legal services in Bali. Trusted by 2,500+ global clients with a 98% approval rate.",
  url: "https://saliagency.com",
  email: "support@saliagency.com",
  // Placeholder WhatsApp number carried over from the original site — replace with the real Sali Agency WhatsApp Business number.
  whatsapp: "6280000000000",
  address: "Jimbaran, Bali, Indonesia",
};

export function waLink(text?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
