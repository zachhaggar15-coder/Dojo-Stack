import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: `About the ${siteConfig.siteName} software comparison project.`,
  path: "/about",
  noIndex: true,
});
export default function AboutPage() {
  return (
    <Container className="space-y-6 py-12">
      <SectionHeading
          showLogo
        eyebrow="About"
        title="A practical software comparison tool for martial arts businesses"
        description={`${siteConfig.siteName} is an anonymous software comparison project focused on decision support rather than generic blog content.`}
      />
      <div className="max-w-3xl space-y-5 text-base leading-8 text-zinc-700">
        <p>The platform is structured for {siteConfig.targetMarket} comparing gym management software.</p>
        <p>
          The first version uses static data so every recommendation, caveat, outbound-link status, and pricing note can be
          reviewed before publication.
        </p>
      </div>
    </Container>
  );
}
