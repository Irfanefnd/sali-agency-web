import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/ServiceCategoryPage";
import { otherCategories } from "@/lib/data/other-services";

export const metadata: Metadata = {
  title: "Other Services",
  description: "Sali Agency Lifestyle & Concierge Services — banking, relocation, and concierge support in Bali.",
};

export default function OtherServicesPage() {
  return (
    <ServiceCategoryPage
      label="Lifestyle & Concierge"
      placeholder="Search service, e.g. bank account, E-SIM, airport…"
      categories={otherCategories}
    />
  );
}
