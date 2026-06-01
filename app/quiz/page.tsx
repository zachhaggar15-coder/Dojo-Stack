import type { Metadata } from "next";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { QuizForm } from "@/components/quiz/QuizForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonPages } from "@/data/comparisonPages";
import { createPageMetadata, shouldNoIndexSoftware } from "@/lib/seo";
import { getAllSoftware } from "@/lib/software";

export const metadata: Metadata = createPageMetadata({
  title: "Martial Arts Gym Software Recommendation Quiz",
  description:
    "Answer a few questions about your martial arts gym and get deterministic software recommendations based on fit, features, budget sensitivity, and setup needs.",
  path: "/quiz",
  noIndex: getAllSoftware().every(shouldNoIndexSoftware),
});
export default function QuizPage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
        eyebrow="Fit quiz"
        title="Find software that fits how your gym actually runs"
        description="This quiz uses static software data and transparent scoring rules. It does not collect email addresses, create accounts, call an AI API, or store personal data."
      />
      <AffiliateNotice />
      <QuizForm software={getAllSoftware()} comparisonPages={comparisonPages} />
    </Container>
  );
}
