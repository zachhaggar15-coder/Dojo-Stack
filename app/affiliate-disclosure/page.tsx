import type { Metadata } from "next";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description: `${siteConfig.siteName} explains how outbound, affiliate, and referral links may be used on the site.`,
  path: "/affiliate-disclosure",
});

const disclosurePoints = [
  {
    title: "This site is informational and commercial",
    copy: `${siteConfig.siteName} is built to help martial arts gym owners compare software options. It is also intended to be a commercial website, but the site remains useful when links are standard outbound provider links.`,
  },
  {
    title: "Some outbound links may be standard provider links",
    copy: "Most provider buttons route through an internal /go link so redirects can be managed safely. Unless a relationship is verified, those buttons should send readers to the provider's normal website. Some links may become affiliate or referral links later if terms are confirmed.",
  },
  {
    title: "Affiliate availability does not decide rankings",
    copy: "Recommendations are intended to consider martial arts fit, feature coverage, gym size, pricing transparency, ease of use, value, setup complexity, and available public information. Affiliate availability is not a ranking factor.",
  },
  {
    title: "Provider details should be verified",
    copy: "Pricing, plan limits, features, free trials, country support, and terms can change. Always check the provider website or sales materials before buying software.",
  },
];

export default function AffiliateDisclosurePage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
          showLogo
        eyebrow="Disclosure"
        title="Affiliate and referral disclosure"
        description="A plain-English explanation of how provider links may work on this site."
      />

      <AffiliateNotice />

      <div className="grid gap-5 md:grid-cols-2">
        {disclosurePoints.map((point) => (
          <Card key={point.title}>
            <h2 className="text-lg font-semibold text-zinc-950">{point.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{point.copy}</p>
          </Card>
        ))}
      </div>

      <section className="max-w-3xl rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-zinc-950">What this means for readers</h2>
        <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-700">
          <p>
            Use this site as a starting point for structured research, not as a substitute for checking current provider
            information. A provider may appear on the site even when there is no affiliate or referral relationship, and every listed provider should remain useful to compare without one.
          </p>
          <p>
            Future commercial relationships may help support the site, so they are relevant to how the business may operate. They do
            not justify invented pricing, fake reviews, fake testimonials, or claims of hands-on testing that did not
            happen.
          </p>
        </div>
      </section>
    </Container>
  );
}
