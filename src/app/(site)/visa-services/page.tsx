import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/ServiceCategoryPage";
import { visaCategories } from "@/lib/data/visa-services";

export const metadata: Metadata = {
  title: "Visa Services",
  description: "Sali Agency Visa Services — Single Entry, Multiple Entry, KITAS/KITAP, and other visa solutions in Bali.",
};

export default function VisaServicesPage() {
  return (
    <ServiceCategoryPage
      label="Indonesian Visa Solutions"
      placeholder="Search visa type, e.g. KITAS, Digital Nomad, Tourist…"
      categories={visaCategories}
    />
  );
}
