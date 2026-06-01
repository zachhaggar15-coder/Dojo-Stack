import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { FeatureBadge } from "@/components/ui/FeatureBadge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import type { Software, SoftwareFeatureKey } from "@/data/software";
import { featureLabels } from "@/data/software";

export function SoftwareCard({ software, fitNote }: { software: Software; fitNote?: string }) {
  const topFeatures = (Object.keys(software.features) as SoftwareFeatureKey[])
    .filter((feature) => software.features[feature] === "yes" || software.features[feature] === "partial")
    .slice(0, 4);

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/50 transition hover:border-zinc-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href={`/software/${software.slug}`} className="text-lg font-semibold text-zinc-950 hover:underline">
            {software.name}
          </Link>
          <p className="mt-1 text-sm leading-6 text-zinc-600">{software.shortDescription}</p>
        </div>
        <ScoreBadge score={software.scores.overall} label="Overall" />
      </div>

      {fitNote ? <p className="mt-4 text-sm leading-6 text-zinc-700">{fitNote}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {topFeatures.length ? (
          topFeatures.map((feature) => <FeatureBadge key={feature} label={featureLabels[feature]} status={software.features[feature]} />)
        ) : (
          <FeatureBadge label="Feature support needs verification" />
        )}
      </div>

      <PricingNote compact className="mt-4">
        {software.pricingNotes}
      </PricingNote>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        <TrackedAffiliateLink
          href={`/go/${software.slug}`}
          softwareId={software.id}
          sourcePage="software_card"
          ctaLocation="card_primary"
          prefetch={false}
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Visit Website
        </TrackedAffiliateLink>
        <Link
          href={`/software/${software.slug}`}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Details
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
