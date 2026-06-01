import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { DataUncertaintyNote } from "@/components/ui/DataUncertaintyNote";
import { LastUpdated } from "@/components/ui/LastUpdated";
import { SoftwareFitSummary } from "@/components/software/SoftwareFitSummary";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureLabels, type FeatureSupport, type Software, type SoftwareFeatureKey } from "@/data/software";
import { siteConfig } from "@/data/siteConfig";
import { absoluteUrl, createPageMetadata, shouldNoIndexSoftware } from "@/lib/seo";
import { getAllSoftware, getComparisonPagesForSoftware, getSoftwareBySlug } from "@/lib/software";

const featureSections: Array<{
  title: string;
  features: SoftwareFeatureKey[];
  note: (software: Software) => string;
}> = [
  {
    title: "Payments and billing",
    features: ["payments", "recurringBilling"],
    note: (software) => `${software.name} should be checked for payment processing, recurring billing rules, fees, and failed-payment handling before you rely on it.`,
  },
  {
    title: "Booking",
    features: ["booking"],
    note: (software) => `Review ${software.name}'s booking flow for classes, trials, capacity limits, cancellations, and waitlists if those matter to your gym.`,
  },
  {
    title: "Attendance",
    features: ["attendance"],
    note: (software) => `Confirm how ${software.name} handles check-ins, class attendance history, and reporting before replacing manual tracking.`,
  },
  {
    title: "Waivers",
    features: ["waivers"],
    note: () => `Check whether waiver collection is built in, integrated, or handled through a separate workflow.`,
  },
  {
    title: "Member management",
    features: ["memberManagement"],
    note: () => `Look at member profiles, membership status, family accounts, notes, and export options before committing.`,
  },
  {
    title: "Communication",
    features: ["communication", "marketingAutomation"],
    note: (software) => `Verify reminders, announcements, segmented messaging, and automation depth directly with ${software.name}.`,
  },
  {
    title: "Reporting",
    features: ["reporting"],
    note: () => `Reporting should be checked against the numbers you actually use: revenue, attendance, retention, leads, and membership changes.`,
  },
  {
    title: "Mobile app",
    features: ["mobileApp"],
    note: () => `If students or coaches need mobile access, verify app availability, branding, permissions, and supported countries.`,
  },
  {
    title: "Martial arts-specific functionality",
    features: ["beltTracking"],
    note: () => `Belt or rank tracking is especially important for many martial arts schools. Confirm whether it is native, configurable, or unavailable.`,
  },
  {
    title: "Multi-location support",
    features: ["multiLocation"],
    note: () => `Multi-location gyms should verify location permissions, reporting rollups, staff access, and pricing implications.`,
  },
];

const supportCopy: Record<FeatureSupport, string> = {
  yes: "Listed in the current data model.",
  partial: "Potential or partial support. Verify details with the provider.",
  no: "Not listed in the current data model.",
  unknown: "Needs manual verification.",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSoftware().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getSoftwareBySlug(slug);

  if (!item) {
    return createPageMetadata({
      title: "Software Not Found",
      description: "This software record was not found.",
      path: `/software/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${item.name} Review for Martial Arts Gyms`,
    description: `${item.name} review for martial arts gym owners: features, pricing notes, best-fit use cases, limitations, alternatives, and verification notes.`,
    path: `/software/${item.slug}`,
    noIndex: shouldNoIndexSoftware(item),
    type: "article",
  });
}

export default async function SoftwareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const software = getSoftwareBySlug(slug);

  if (!software) {
    notFound();
  }

  const comparisonPages = getComparisonPagesForSoftware(software.slug);
  const alternatives = software.alternatives.map((alternativeSlug) => getSoftwareBySlug(alternativeSlug)).filter(Boolean) as Software[];
  const showCaution = hasManyUnknowns(software);
  const strongestUseCase = software.bestFor[0] ?? "Gyms that match the listed target use cases after verification.";
  const mainLimitation = software.cons[0] ?? software.uncertaintyNotes[0] ?? "Several details need manual verification before choosing this provider.";
  const faqs = createFaqs(software);
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

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(software)} />
      <JsonLd data={faqSchema} />
      <Container className="space-y-10 py-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Software review</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">{software.name}</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{software.shortDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {software.bestFor.slice(0, 3).map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex flex-wrap gap-3">
                <TrackedAffiliateLink
                  href={`/go/${software.slug}`}
                  softwareId={software.id}
                  sourcePage="software_review"
                  ctaLocation="hero"
                  trackAs="review_cta"
                  prefetch={false}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Visit Website
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </TrackedAffiliateLink>
                <ButtonLink href="/software" variant="secondary" icon={<ArrowRight className="size-4" />}>
                  Back to Software Directory
                </ButtonLink>
              </div>
              <AffiliateNotice compact />
            </div>
          </div>
          <Card>
            <p className="text-sm font-medium text-zinc-500">Overall score</p>
            <p className="mt-2 text-4xl font-semibold text-zinc-950">{software.scores.overall}/10</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Editable fit signal based on the static data model. This is not a user rating or hands-on test score.
            </p>
          </Card>
        </section>

        {showCaution ? (
          <DataUncertaintyNote notes={software.uncertaintyNotes}>
            <p>Some details on this page may need verification. Check the provider website for current pricing and features.</p>
          </DataUncertaintyNote>
        ) : null}

        <SoftwareFitSummary software={software} />

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <VerdictCard title="Best for" copy={software.bestFor.join(" ")} />
          <VerdictCard title="Not ideal for" copy={software.notIdealFor.join(" ")} />
          <VerdictCard title="Strongest likely use case" copy={strongestUseCase} />
          <VerdictCard title="Main limitation" copy={mainLimitation} />
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Feature breakdown"
            title={`${software.name} features to verify`}
            description="Feature labels are cautious. Where support is unknown or partial, check the provider website or sales materials before relying on it."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {featureSections.map((section) => (
              <Card key={section.title}>
                <h2 className="text-lg font-semibold text-zinc-950">{section.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.features.map((feature) => (
                    <FeatureBadge key={feature} feature={feature} status={software.features[feature]} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{section.note(software)}</p>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <h2 className="text-2xl font-semibold text-zinc-950">Pricing</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{getPricingCopy(software)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="amber">Pricing status: {software.pricingStatus}</Badge>
            <Badge>{software.pricingStatus === "known" && software.startingPriceMonthly ? `Starts at ${formatPrice(software.startingPriceMonthly)}/mo` : "No verified exact public price shown"}</Badge>
          </div>
          <div className="mt-6 space-y-3">
            <TrackedAffiliateLink
              href={`/go/${software.slug}`}
              softwareId={software.id}
              sourcePage="software_review"
              ctaLocation="pricing"
              trackAs="review_cta"
              prefetch={false}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Check Current Pricing
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TrackedAffiliateLink>
            <AffiliateNotice compact />
          </div>
        </Card>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-950">
              <CheckCircle2 className="size-5 text-emerald-700" aria-hidden="true" />
              Pros
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700">
              {software.pros.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-950">
              <XCircle className="size-5 text-rose-700" aria-hidden="true" />
              Cons
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700">
              {software.cons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Alternatives" title={`Alternatives to ${software.name}`} />
          {alternatives.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {alternatives.map((alternative) => (
                <Link key={alternative.slug} href={`/software/${alternative.slug}`} className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-300">
                  <h3 className="text-lg font-semibold text-zinc-950">{alternative.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{alternative.shortDescription}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-zinc-600">No alternatives have been mapped yet.</p>
          )}
        </section>

        {comparisonPages.length ? (
          <section className="space-y-6">
            <SectionHeading eyebrow="Compare" title={`${software.name} comparison pages`} />
            <div className="grid gap-5 md:grid-cols-2">
              {comparisonPages.map((page) => (
                <Link key={page.slug} href={`/compare/${page.slug}`} className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-300">
                  <h3 className="text-lg font-semibold text-zinc-950">{page.metaTitle.replace(": Which Is Better for Martial Arts Gyms?", "")}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{page.metaDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <Card>
          <h2 className="text-2xl font-semibold text-zinc-950">Data confidence note</h2>
          <LastUpdated value={software.lastUpdated} className="mt-3" />
          {software.uncertaintyNotes.length ? (
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700">
              {software.uncertaintyNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </Card>

        <section className="space-y-6">
          <SectionHeading eyebrow="FAQ" title={`${software.name} FAQ`} />
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

        <AffiliateNotice />
      </Container>
    </>
  );
}

function VerdictCard({ title, copy }: { title: string; copy: string }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-700">{copy}</p>
    </Card>
  );
}

function FeatureBadge({ feature, status }: { feature: SoftwareFeatureKey; status: FeatureSupport }) {
  const tone = status === "yes" ? "green" : status === "partial" ? "blue" : status === "no" ? "red" : "amber";

  return (
    <Badge tone={tone}>
      {featureLabels[feature]}: {supportCopy[status]}
    </Badge>
  );
}

function hasManyUnknowns(software: Software) {
  const unknownFeatureCount = Object.values(software.features).filter((value) => value === "unknown").length;
  const unknownAvailabilityCount = [software.freeTrialAvailable, software.freePlanAvailable].filter((value) => value === "unknown").length;

  return unknownFeatureCount >= 4 || unknownAvailabilityCount > 0 || software.pricingStatus === "unknown" || software.pricingStatus === "custom_quote";
}

function getPricingCopy(software: Software) {
  if (software.pricingStatus === "known") {
    return software.startingPriceMonthly
      ? `${software.name} is marked as having known pricing in the data model, starting at ${formatPrice(software.startingPriceMonthly)} per month. Verify current plan limits, fees, and add-ons with the provider.`
      : `${software.name} is marked as having known pricing, but no starting monthly price is stored yet. Check the provider website before publishing exact figures.`;
  }

  if (software.pricingStatus === "estimated") {
    return software.startingPriceMonthly
      ? `${software.name} has an estimated starting price of ${formatPrice(software.startingPriceMonthly)} per month in the data model. Treat this as an estimate until verified with the provider.`
      : `${software.name} pricing is marked as estimated, but no exact estimate is stored. Do not publish a number until it is verified.`;
  }

  if (software.pricingStatus === "custom_quote") {
    return `${software.name} pricing appears to require provider verification or a custom quote. Check the provider website for current pricing and package details.`;
  }

  return `${software.name} pricing is currently unknown in this data model. Check the provider website for current pricing and features before making a decision.`;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function createFaqs(software: Software) {
  return [
    {
      question: `Is ${software.name} a good fit for martial arts gyms?`,
      answer: `${software.name} may be worth considering for ${software.targetGymTypes.slice(0, 4).join(", ")} use cases, but the best fit depends on your billing, booking, attendance, waiver, communication, and rank-tracking needs. This page does not claim hands-on testing.`,
    },
    {
      question: `Does ${software.name} support belt tracking?`,
      answer: `Belt tracking is currently marked as ${software.features.beltTracking}. If rank progression is important for your school, verify this directly with ${software.name} before choosing it.`,
    },
    {
      question: `How much does ${software.name} cost?`,
      answer: getPricingCopy(software),
    },
    {
      question: `Does ${software.name} offer a free trial or free plan?`,
      answer: `Free trial availability is marked as ${String(software.freeTrialAvailable)} and free plan availability is marked as ${String(software.freePlanAvailable)}. Check the provider website for current access options.`,
    },
    {
      question: `What should I verify before choosing ${software.name}?`,
      answer: `Verify current pricing, payment processing, booking rules, attendance workflow, waivers, reporting, mobile access, support, migration options, and any martial arts-specific requirements such as belt tracking.`,
    },
  ];
}

function createBreadcrumbSchema(software: Software) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.siteName,
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Software",
        item: absoluteUrl("/software"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: software.name,
        item: absoluteUrl(`/software/${software.slug}`),
      },
    ],
  };
}









