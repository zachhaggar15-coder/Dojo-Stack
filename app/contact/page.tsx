import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.siteName} for corrections, software provider updates, and general questions.`,
  path: "/contact",
});
const contactSections = [
  {
    title: "Correction requests",
    copy: "Send the page URL, the detail that appears wrong or outdated, and a source we can use to verify the correction. This is the best route for pricing changes, feature updates, country support, and broken links.",
    subject: "Correction request",
  },
  {
    title: "Software provider update requests",
    copy: "Providers can send updates about product positioning, public pricing pages, feature documentation, normal website URLs, and current trial availability. Marketing claims should be backed by source links.",
    subject: "Software provider update",
  },
  {
    title: "General contact",
    copy: "Use this for general questions about the site, commercial disclosures, methodology, or page suggestions. Please do not send sensitive member or gym account data.",
    subject: "General contact",
  },
];

export default function ContactPage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
          showLogo
        eyebrow="Contact"
        title="Send corrections, provider updates, or general questions"
        description="Use the contact email below. Do not include personal member data or confidential account information."
      />

      <ButtonLink href={`mailto:${siteConfig.contactEmail}`} icon={<Mail className="size-4" />}>
        {siteConfig.contactEmail}
      </ButtonLink>

      <div className="grid gap-5 md:grid-cols-3">
        {contactSections.map((section) => (
          <Card key={section.title}>
            <h2 className="text-lg font-semibold text-zinc-950">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{section.copy}</p>
            <ButtonLink
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(section.subject)}`}
              variant="secondary"
              className="mt-5"
              icon={<Mail className="size-4" />}
            >
              Email
            </ButtonLink>
          </Card>
        ))}
      </div>
    </Container>
  );
}
