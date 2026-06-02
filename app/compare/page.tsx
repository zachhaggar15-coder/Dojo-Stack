import type { Metadata } from "next";
import { ComparisonPageList } from "@/components/comparison/ComparisonPageList";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonPages } from "@/data/comparisonPages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Software Comparisons",
  description: "Side-by-side comparison templates for martial arts gym software.",
  path: "/compare",
  noIndex: comparisonPages.every((page) => page.publishStatus !== "published"),
});
export default function CompareIndexPage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
          showLogo
        eyebrow="Compare"
        title="Side-by-side software comparisons"
        description="Comparison pages pull from static software data and avoid unsupported claims until each vendor record is verified."
      />
      <ComparisonPageList pages={comparisonPages} />
    </Container>
  );
}
