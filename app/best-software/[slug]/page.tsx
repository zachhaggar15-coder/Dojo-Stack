import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { bestSoftwarePages } from "@/data/bestSoftwarePages";
import { featureLabels, type FeatureSupport, type Software, type SoftwareFeatureKey } from "@/data/software";
import { absoluteUrl, breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { getBestSoftwarePageBySlug, getComparisonPagesForSoftware, getSoftwareById, getSoftwareForBestPage } from "@/lib/software";

const featureMatrixBySlug: Record<string, SoftwareFeatureKey[]> = {
  "bjj-gyms": ["recurringBilling", "attendance", "beltTracking", "booking", "memberManagement", "payments"],
  "mma-gyms": ["booking", "attendance", "memberManagement", "payments", "mobileApp", "reporting"],
  "boxing-gyms": ["booking", "payments", "memberManagement", "attendance", "communication", "mobileApp"],
  "small-martial-arts-schools": ["payments", "recurringBilling", "booking", "attendance", "memberManagement", "reporting"],
  "gym-payment-automation": ["payments", "recurringBilling", "reporting", "communication", "memberManagement", "marketingAutomation"],
  "gym-class-booking": ["booking", "attendance", "mobileApp", "communication", "memberManagement", "reporting"],
  "gym-attendance-tracking": ["attendance", "reporting", "memberManagement", "communication", "mobileApp", "beltTracking"],
  "gym-waiver-management": ["waivers", "memberManagement", "communication", "reporting", "mobileApp", "booking"],
};

const buyingGuides: Record<string, string[]> = {
  "bjj-gyms": [
    "Start with membership billing and attendance before evaluating extras. A BJJ gym usually benefits from clean recurring payments, student records, and attendance visibility before advanced marketing tools.",
    "Ask vendors how they handle rank, belt, stripe, or progression history. Do not assume belt tracking is native unless the provider confirms it in current materials.",
    "Check how class scheduling works for fundamentals, advanced classes, open mat, kids programs, and trial students.",
  ],
  "mma-gyms": [
    "Map every class type before comparing platforms. Striking, grappling, wrestling, conditioning, kids classes, and open mats may need different booking or attendance rules.",
    "Verify membership flexibility for unlimited training, limited weekly plans, trials, and drop-ins.",
    "Look for reporting that helps you understand attendance across programs, not just overall check-ins.",
  ],
  "boxing-gyms": [
    "Prioritize booking, payments, and member records over rank-oriented features unless your club has a formal progression model.",
    "Check support for class packs, trial sessions, drop-ins, personal training, and recurring memberships.",
    "Make sure the member-facing schedule is simple enough for new prospects and casual fitness members.",
  ],
  "small-martial-arts-schools": [
    "Choose software that solves today's admin load without forcing a large implementation project.",
    "Verify total cost, payment processing, plan limits, and whether you can export member data later.",
    "Avoid paying for enterprise workflows before your school has the staff or volume to use them.",
  ],
  "gym-payment-automation": [
    "Compare recurring billing, failed-payment handling, payment reminders, and how payment status appears in member records.",
    "Ask about payment processors, fees, contract terms, refunds, chargebacks, and whether billing tools vary by country.",
    "Do not evaluate payments in isolation. The billing workflow should also fit attendance, memberships, cancellations, and reporting.",
  ],
  "gym-class-booking": [
    "List the classes that truly need booking. Some gyms only need reservations for beginners, kids, seminars, or limited-capacity sessions.",
    "Verify waitlists, cancellation windows, capacity limits, and whether attendance is created from the booking workflow.",
    "Check the mobile experience because booking friction often shows up first on a member's phone.",
  ],
  "gym-attendance-tracking": [
    "Decide who will check members in: front desk, coaches, members, or a mixed workflow. The best tool is the one your gym will actually use every class.",
    "Look for inactive-member visibility so attendance data can support retention follow-up.",
    "If attendance affects rank eligibility, verify whether attendance history can connect to progression workflows.",
  ],
  "gym-waiver-management": [
    "Connect waivers to onboarding rather than treating them as isolated documents. Trial students, parents, and new members should be easy to track.",
    "Verify digital signing, guardian consent, document storage, and how staff see incomplete forms.",
    "Treat software as an admin tool, not legal advice. Waiver wording should be reviewed separately for your location.",
  ],
};

const commonMistakes: Record<string, string[]> = {
  "bjj-gyms": [
    "Assuming every gym platform handles belt progression in a way that fits your academy.",
    "Choosing around marketing features before solving billing, attendance, and class admin.",
    "Forgetting to test how kids, families, and trial students are represented in member records.",
  ],
  "mma-gyms": [
    "Comparing tools against one class type when the gym actually runs several different programs.",
    "Ignoring booking and attendance rules for high-demand or limited-capacity sessions.",
    "Choosing a fitness platform without verifying martial arts or youth-program workflows.",
  ],
  "boxing-gyms": [
    "Overvaluing martial arts rank features that a boxing club may never use.",
    "Not checking support for drop-ins, class packs, personal training, and trials.",
    "Picking a tool with a confusing member schedule experience.",
  ],
  "small-martial-arts-schools": [
    "Buying a system built for a larger organization before the school needs it.",
    "Ignoring setup time, migration work, and day-to-day ease of use.",
    "Comparing list prices without checking payment fees, add-ons, and plan limits.",
  ],
  "gym-payment-automation": [
    "Looking only at monthly software price while ignoring payment processing and failed-payment workflows.",
    "Assuming automated reminders will fix every overdue account.",
    "Choosing billing tools that do not connect cleanly to memberships and attendance.",
  ],
  "gym-class-booking": [
    "Requiring reservations for every class when only some sessions need capacity control.",
    "Forgetting to verify cancellation rules, waitlists, and member notifications.",
    "Treating booking separately from attendance and membership eligibility.",
  ],
  "gym-attendance-tracking": [
    "Collecting attendance data without a plan for retention follow-up.",
    "Choosing a check-in workflow that coaches or staff will skip when classes get busy.",
    "Assuming attendance reports will handle belt or progression requirements without verification.",
  ],
  "gym-waiver-management": [
    "Treating waiver collection as separate from new-member onboarding.",
    "Not verifying guardian consent workflows for minors.",
    "Assuming software-provided forms replace location-specific legal review.",
  ],
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const supportTone: Record<FeatureSupport, "green" | "amber" | "red" | "neutral"> = {
  yes: "green",
  partial: "amber",
  no: "red",
  unknown: "neutral",
};

const supportLabel: Record<FeatureSupport, string> = {
  yes: "Listed",
  partial: "Partial",
  no: "Not listed",
  unknown: "Verify",
};

export function generateStaticParams() {
  return bestSoftwarePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestSoftwarePageBySlug(slug);

  if (!page) {
    return createPageMetadata({
      title: "Recommendation Page Not Found",
      description: "This best-software page was not found.",
      path: `/best-software/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/best-software/${page.slug}`,
    noIndex: page.publishStatus !== "published",
  });
}

function formatAvailability(value: Software["freeTrialAvailable"]) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Verify";
}

function getFeatureKeys(slug: string) {
  return featureMatrixBySlug[slug] ?? ["payments", "recurringBilling", "booking", "attendance", "memberManagement", "reporting"];
}

function getRelatedComparisons(items: Software[]) {
  const seen = new Set<string>();

  return items
    .flatMap((item) => getComparisonPagesForSoftware(item.id))
    .filter((comparison) => {
      if (seen.has(comparison.slug)) {
        return false;
      }

      seen.add(comparison.slug);
      return true;
    })
    .slice(0, 5);
}

function getStrongestFeature(item: Software, keys: SoftwareFeatureKey[]) {
  const listed = keys.find((key) => item.features[key] === "yes" || item.features[key] === "partial");
  return listed ? featureLabels[listed] : "Needs verification";
}

function RankedSoftwareCard({ item, rank, featureKeys }: { item: Software; rank: number; featureKeys: SoftwareFeatureKey[] }) {
  const topFeatures = featureKeys.slice(0, 4);

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">#{rank}</p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-950">{item.name}</h3>
        </div>
        <Badge tone="blue">{item.scores.overall}/10 overall signal</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{item.shortDescription}</p>
      <div className="mt-4 space-y-2 text-sm text-zinc-700">
        <p>
          <span className="font-medium text-zinc-950">Best for:</span> {item.bestFor[0] ?? "Manual verification required"}
        </p>
        <p>
          <span className="font-medium text-zinc-950">Pricing:</span> {item.pricingNotes}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {topFeatures.map((feature) => (
          <Badge key={feature} tone={supportTone[item.features[feature]]}>
            {featureLabels[feature]}: {supportLabel[item.features[feature]]}
          </Badge>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/software/${item.slug}`}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Read Profile
        </Link>
        <TrackedAffiliateLink
          href={`/go/${item.slug}`}
          softwareId={item.id}
          sourcePage="best_software"
          ctaLocation="ranked_card"
          prefetch={false}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Visit Website
        </TrackedAffiliateLink>
      </div>
      <AffiliateNotice compact className="mt-4" />
    </article>
  );
}

export default async function BestSoftwarePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getBestSoftwarePageBySlug(slug);

  if (!page) {
    notFound();
  }

  const rankedItems = getSoftwareForBestPage(page.slug);
  const rankedSoftware = rankedItems.map(({ software }) => software);
  const featureKeys = getFeatureKeys(page.slug);
  const relatedComparisons = getRelatedComparisons(rankedSoftware);
  const guide = buyingGuides[page.slug] ?? [];
  const mistakes = commonMistakes[page.slug] ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    itemListElement: rankedSoftware.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(`/software/${item.slug}`),
    })),
  };
  const breadcrumbJson = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Best Software", path: "/best-software/bjj-gyms" },
    { name: page.title, path: `/best-software/${page.slug}` },
  ]);

  return (
    <Container className="space-y-12 py-12">
      <JsonLd data={breadcrumbJson} />
      <JsonLd data={faqSchema} />
      <JsonLd data={itemListSchema} />

      <section className="max-w-4xl">
        <div className="flex flex-wrap gap-2">
          <Badge tone="green">Best software guide</Badge>
          {page.publishStatus !== "published" ? <Badge tone="amber">Needs verification before indexing</Badge> : null}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-950 md:text-5xl">{page.title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-600">{page.intro}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quiz"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Find My Best Software
          </Link>
          <Link
            href="/software"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            Browse All Software
          </Link>
        </div>
      </section>

      <AffiliateNotice />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Use-Case Explanation</h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">{page.useCase}</p>
          <p className="mt-4 text-base leading-7 text-zinc-600">{page.manualVerdict}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-lg font-semibold text-zinc-950">Ranking Criteria</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
            {page.rankingCriteria.map((criterion) => (
              <li key={criterion} className="flex gap-3">
                <span className="mt-2 size-1.5 rounded-full bg-emerald-700" aria-hidden="true" />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-950">Quick Recommendations</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Rankings use editable fit scores and manual editorial ordering. Outbound-link availability is not part of the ranking calculation.
            </p>
          </div>
          <Badge tone="neutral">Updated {page.lastUpdated}</Badge>
        </div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Software</th>
                <th className="px-4 py-3 font-semibold">Useful for</th>
                <th className="px-4 py-3 font-semibold">Strongest signal</th>
                <th className="px-4 py-3 font-semibold">Pricing</th>
                <th className="px-4 py-3 font-semibold">Trial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {rankedItems.map(({ software, rank }) => (
                <tr key={software.id}>
                  <td className="px-4 py-4 font-semibold text-zinc-950">#{rank}</td>
                  <td className="px-4 py-4">
                    <Link className="font-semibold text-emerald-800 hover:text-emerald-900" href={`/software/${software.slug}`}>
                      {software.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-zinc-600">{software.bestFor[0] ?? "Manual verification required"}</td>
                  <td className="px-4 py-4 text-zinc-600">{getStrongestFeature(software, featureKeys)}</td>
                  <td className="px-4 py-4 text-zinc-600">{software.pricingStatus === "known" ? "Known" : "Check provider"}</td>
                  <td className="px-4 py-4 text-zinc-600">{formatAvailability(software.freeTrialAvailable)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-950">Ranked Software Cards</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rankedItems.map(({ software, rank }) => (
            <RankedSoftwareCard key={software.id} item={software} rank={rank} featureKeys={featureKeys} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-950">Feature Comparison Matrix</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Feature labels are cautious data signals from the static software file. Verify current provider details before buying.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Software</th>
                {featureKeys.map((feature) => (
                  <th key={feature} className="px-4 py-3 font-semibold">
                    {featureLabels[feature]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {rankedSoftware.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 font-semibold text-zinc-950">{item.name}</td>
                  {featureKeys.map((feature) => (
                    <td key={feature} className="px-4 py-4">
                      <Badge tone={supportTone[item.features[feature]]}>{supportLabel[item.features[feature]]}</Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Buying Guide</h2>
          <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600">
            {guide.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Common Mistakes</h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-zinc-600">
            {mistakes.map((mistake) => (
              <li key={mistake} className="flex gap-3">
                <span className="mt-3 size-1.5 rounded-full bg-rose-600" aria-hidden="true" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-950">FAQs</h2>
        <div className="mt-5 divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="cursor-pointer text-base font-semibold text-zinc-950">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Related Comparisons</h2>
          {relatedComparisons.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedComparisons.map((comparison) => {
                const softwareA = getSoftwareById(comparison.softwareAId);
                const softwareB = getSoftwareById(comparison.softwareBId);
                return (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    className="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-semibold text-zinc-900 transition hover:border-emerald-300 hover:text-emerald-800"
                  >
                    {softwareA?.name ?? comparison.softwareAId} vs {softwareB?.name ?? comparison.softwareBId}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-zinc-600">More curated comparisons can be added after provider data is verified.</p>
          )}
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-950">Not sure where to start?</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-700">
            Answer a few operational questions and compare recommendations against your gym type, size, and admin priorities.
          </p>
          <Link
            href="/quiz"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Find My Best Software
          </Link>
        </div>
      </section>

      <AffiliateNotice />
    </Container>
  );
}



