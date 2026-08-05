import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/ServiceCategoryPage";
import { legalCategories } from "@/lib/data/legal-services";

export const metadata: Metadata = {
  title: "Legal Services",
  description: "Sali Agency Legal Services — company setup, licensing, property, contracts, and IP protection in Indonesia.",
};

export default function LegalServicesPage() {
  return (
    <ServiceCategoryPage
      label="Indonesian Legal Solutions"
      placeholder="Search legal service, e.g. PT PMA, property lease, trademark…"
      categories={legalCategories}
    />
  );
}
