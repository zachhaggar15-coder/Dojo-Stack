import type { Metadata } from "next";
import { PricingCalculator } from "@/components/calculator/PricingCalculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { getAllSoftware } from "@/lib/software";

export const metadata: Metadata = createPageMetadata({
  title: "Martial Arts Gym Software Pricing Calculator",
  description:
    "Estimate broad gym software cost bands in GBP based on members, staff, locations, features, and budget sensitivity. Use it as planning guidance, not exact provider pricing.",
  path: "/pricing-calculator",
  noIndex: true,
});
export default function PricingCalculatorPage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
        eyebrow="Calculator"
        title="Estimate a realistic software budget band"
        description="Use this as a planning tool for martial arts gym software costs. It estimates broad GBP bands, avoids invented provider pricing, and reminds you to verify current vendor prices."
      />
      <PricingCalculator software={getAllSoftware()} />
    </Container>
  );
}
