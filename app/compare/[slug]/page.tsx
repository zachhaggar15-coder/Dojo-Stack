import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonPages, type ComparisonPage } from "@/data/comparisonPages";
import { featureLabels, type AvailabilityStatus, type Software, type SoftwareFeatureKey } from "@/data/software";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { getComparisonPageBySlug, getSoftwareById } from "@/lib/software";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type MatrixFeature = {
  label: string;
  features: SoftwareFeatureKey[];
};

const matrixFeatures: MatrixFeature[] = [
  { label: "Payments", features: ["payments"] },
  { label: "Recurring billing", features: ["recurringBilling"] },
  { label: "Booking", features: ["booking"] },
  { label: "Attendance", features: ["attendance"] },
  { label: "Waivers", features: ["waivers"] },
  { label: "Communication", features: ["communication"] },
  { label: "Reporting", features: ["reporting"] },
  { label: "Mobile app", features: ["mobileApp"] },
  { label: "Belt tracking", features: ["beltTracking"] },
  { label: "Multi-location", features: ["multiLocation"] },
  { label: "Automation", features: ["marketingAutomation"] },
];

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonPageBySlug(slug);

  if (!page) {
    return createPageMetadata({
      title: "Comparison Not Found",
      description: "This comparison was not found.",
      path: `/compare/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${page.slug}`,
    noIndex: page.publishStatus !== "published",
    type: "article",
  });
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparisonPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const softwareA = getSoftwareById(page.softwareAId);
  const softwareB = getSoftwareById(page.softwareBId);

  if (!softwareA || !softwareB) {
    notFound();
  }

  const alternatives = getAlternativeSoftware([softwareA, softwareB]);
  const faqs = createFaqs(page, softwareA, softwareB);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbJson = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Software", path: "/software" },
    { name: `${softwareA.name} vs ${softwareB.name}`, path: `/compare/${page.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJson} />
      <JsonLd data={faqSchema} />
      <Container className="space-y-10 py-12">
        <section className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Software comparison</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              {softwareA.name} vs {softwareB.name}: Which Is Better for Martial Arts Gyms?
            </h1>
            {page.publishStatus !== "published" ? <Badge tone="amber">{page.publishStatus}</Badge> : null}
          </div>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{page.intro}</p>
        </section>

        <Card className="border-emerald-200 bg-emerald-50">
          <h2 className="text-xl font-semibold text-zinc-950">Quick decision</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-700">{page.quickVerdict}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <DecisionList title={`Choose ${softwareA.name} if...`} items={page.chooseAIf} />
            <DecisionList title={`Choose ${softwareB.name} if...`} items={page.chooseBIf} />
            <DecisionList title="Consider alternatives if..." items={page.considerAlternativesIf} />
          </div>
        </Card>

        <section className="space-y-6">
          <SectionHeading eyebrow="Summary" title="Side-by-side summary" />
          <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">{softwareA.name}</th>
                  <th className="px-4 py-3">{softwareB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {summaryRows(softwareA, softwareB).map((row) => (
                  <tr key={row.label}>
                    <th className="px-4 py-3 text-left font-medium text-zinc-800">{row.label}</th>
                    <td className="px-4 py-3 text-zinc-700">{row.a}</td>
                    <td className="px-4 py-3 text-zinc-700">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Features"
            title="Feature matrix"
            description="Feature labels are cautious and based on the current static data model. Unknown or partial fields should be verified with each provider."
          />
          <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">{softwareA.name}</th>
                  <th className="px-4 py-3">{softwareB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {matrixFeatures.map((feature) => (
                  <tr key={feature.label}>
                    <th className="px-4 py-3 text-left font-medium text-zinc-800">{feature.label}</th>
                    <td className="px-4 py-3">{formatCombinedFeatureSupport(softwareA, feature.features)}</td>
                    <td className="px-4 py-3">{formatCombinedFeatureSupport(softwareB, feature.features)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <PricingCard software={softwareA} />
          <PricingCard software={softwareB} />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <ProsConsCard software={softwareA} />
          <ProsConsCard software={softwareB} />
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Alternatives" title="Other software to consider" />
          {alternatives.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {alternatives.map((alternative) => (
                <Link key={alternative.slug} href={`/software/${alternative.slug}`} className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-300">
                  <h2 className="text-lg font-semibold text-zinc-950">{alternative.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{alternative.shortDescription}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-zinc-600">No alternatives have been mapped yet.</p>
          )}
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-950">Check current provider details</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Pricing, trial availability, feature packaging, and country support can change. Use the provider websites to verify current details before choosing.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <TrackedAffiliateLink
                  href={`/go/${softwareA.slug}`}
                  softwareId={softwareA.id}
                  sourcePage="comparison"
                  ctaLocation="comparison_cta"
                  comparisonSlug={page.slug}
                  trackAs="comparison_cta"
                  prefetch={false}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Visit {softwareA.name}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </TrackedAffiliateLink>
                <TrackedAffiliateLink
                  href={`/go/${softwareB.slug}`}
                  softwareId={softwareB.id}
                  sourcePage="comparison"
                  ctaLocation="comparison_cta"
                  comparisonSlug={page.slug}
                  trackAs="comparison_cta"
                  prefetch={false}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
                >
                  Visit {softwareB.name}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </TrackedAffiliateLink>
                <ButtonLink href={`/software/${softwareA.slug}`} variant="secondary">
                  Read {softwareA.name} profile
                </ButtonLink>
                <ButtonLink href={`/software/${softwareB.slug}`} variant="secondary">
                  Read {softwareB.name} profile
                </ButtonLink>
              </div>
              <AffiliateNotice compact />
            </div>
          </div>
        </section>

        <Card>
          <h2 className="text-2xl font-semibold text-zinc-950">Methodology</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            This comparison uses static software records, editable fit scores, public-information placeholders, and manual uncertainty notes. It does not claim hands-on testing, user reviews, or a definitive winner. Affiliate availability is kept separate from recommendation logic.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">Last updated: {page.lastUpdated}</p>
        </Card>

        <AffiliateNotice />

        <section className="space-y-6">
          <SectionHeading eyebrow="FAQ" title={`${softwareA.name} vs ${softwareB.name} FAQ`} />
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <h2 className="flex items-start gap-2 text-lg font-semibold text-zinc-950">
                  <HelpCircle className="mt-1 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function DecisionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-zinc-950">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function summaryRows(softwareA: Software, softwareB: Software) {
  return [
    { label: "Best for", a: softwareA.bestFor[0] ?? "Needs verification", b: softwareB.bestFor[0] ?? "Needs verification" },
    { label: "Pricing status", a: softwareA.pricingStatus, b: softwareB.pricingStatus },
    { label: "Free trial", a: formatAvailability(softwareA.freeTrialAvailable), b: formatAvailability(softwareB.freeTrialAvailable) },
    { label: "Free plan", a: formatAvailability(softwareA.freePlanAvailable), b: formatAvailability(softwareB.freePlanAvailable) },
    { label: "Strongest feature", a: strongestFeature(softwareA), b: strongestFeature(softwareB) },
    {
      label: "Main limitation",
      a: softwareA.cons[0] ?? softwareA.uncertaintyNotes[0] ?? "Needs verification",
      b: softwareB.cons[0] ?? softwareB.uncertaintyNotes[0] ?? "Needs verification",
    },
  ];
}

function PricingCard({ software }: { software: Software }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-zinc-950">{software.name} pricing</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{pricingCopy(software)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="amber">{software.pricingStatus}</Badge>
        <Badge>{software.pricingStatus === "known" && software.startingPriceMonthly ? `Starts at ${software.startingPriceMonthly}/mo` : "No verified exact price stored"}</Badge>
      </div>
    </Card>
  );
}

function ProsConsCard({ software }: { software: Software }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-zinc-950">{software.name} pros and cons</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <CheckCircle2 className="size-4 text-emerald-700" aria-hidden="true" />
            Pros
          </h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {software.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <XCircle className="size-4 text-rose-700" aria-hidden="true" />
            Cons
          </h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-700">
            {software.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function formatAvailability(value: AvailabilityStatus) {
  if (value === true) return "Listed as available";
  if (value === false) return "Listed as unavailable";
  return "Needs verification";
}

function formatCombinedFeatureSupport(software: Software, features: SoftwareFeatureKey[]) {
  const values = features.map((feature) => software.features[feature]);
  if (values.includes("yes")) return "Listed";
  if (values.includes("partial")) return "Partial / verify details";
  if (values.every((value) => value === "no")) return "Not listed";
  return "Needs verification";
}

function strongestFeature(software: Software) {
  const feature = (Object.keys(software.features) as SoftwareFeatureKey[]).find(
    (key) => software.features[key] === "yes" || software.features[key] === "partial",
  );
  return feature ? featureLabels[feature] : "Needs verification";
}

function pricingCopy(software: Software) {
  if (software.pricingStatus === "known") {
    return software.startingPriceMonthly
      ? `${software.name} has a stored starting price in the data model, but current plan limits and add-ons should still be verified with the provider.`
      : `${software.name} is marked as known pricing, but no exact starting price is stored yet.`;
  }

  if (software.pricingStatus === "estimated") {
    return `${software.name} pricing is marked as estimated. Treat any number as provisional until checked against current provider materials.`;
  }

  if (software.pricingStatus === "custom_quote") {
    return `${software.name} pricing may require a custom quote or provider confirmation. Check the provider website for current pricing.`;
  }

  return `${software.name} pricing is unknown in the current data model. Check the provider website for current pricing and features.`;
}

function getAlternativeSoftware(items: Software[]) {
  const currentIds = new Set(items.map((item) => item.id));
  const alternatives = items.flatMap((item) => item.alternatives);
  const uniqueAlternativeIds = Array.from(new Set(alternatives)).filter((id) => !currentIds.has(id));

  return uniqueAlternativeIds
    .map((id) => getSoftwareById(id))
    .filter((item): item is Software => Boolean(item))
    .slice(0, 3);
}

function createFaqs(page: ComparisonPage, softwareA: Software, softwareB: Software) {
  return [
    {
      question: `Is ${softwareA.name} or ${softwareB.name} better for martial arts gyms?`,
      answer: page.quickVerdict,
    },
    {
      question: `Which is better for payment automation: ${softwareA.name} or ${softwareB.name}?`,
      answer: `Payment and recurring billing support should be verified directly. In the current data model, ${softwareA.name} is marked ${formatCombinedFeatureSupport(softwareA, ["payments", "recurringBilling"])} and ${softwareB.name} is marked ${formatCombinedFeatureSupport(softwareB, ["payments", "recurringBilling"])}.`,
    },
    {
      question: `Do ${softwareA.name} and ${softwareB.name} support belt tracking?`,
      answer: `${softwareA.name} belt tracking is marked ${softwareA.features.beltTracking}; ${softwareB.name} belt tracking is marked ${softwareB.features.beltTracking}. Verify directly if rank progression is important to your school.`,
    },
    {
      question: `Which one has clearer pricing?`,
      answer: `${softwareA.name} pricing status is ${softwareA.pricingStatus}; ${softwareB.name} pricing status is ${softwareB.pricingStatus}. Do not rely on stale pricing; check each provider's current website or quote process.`,
    },
  ];
}


