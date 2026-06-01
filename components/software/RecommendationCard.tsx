import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { FeatureBadge } from "@/components/ui/FeatureBadge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import type { Software, SoftwareFeatureKey } from "@/data/software";
import { featureLabels } from "@/data/software";

type RecommendationCardProps = {
  software: Software;
  rank?: number;
  sourcePage: string;
  ctaLocation: string;
  featureKeys?: SoftwareFeatureKey[];
  reason?: string;
};

export function RecommendationCard({ software, rank, sourcePage, ctaLocation, featureKeys = [], reason }: RecommendationCardProps) {
  const features = featureKeys.length
    ? featureKeys
    : (Object.keys(software.features) as SoftwareFeatureKey[]).filter((feature) => software.features[feature] === "yes" || software.features[feature] === "partial").slice(0, 4);

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          {rank ? <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Recommendation #{rank}</p> : null}
          <h3 className="mt-1 text-xl font-semibold text-zinc-950">{software.name}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{software.shortDescription}</p>
        </div>
        <ScoreBadge score={software.scores.overall} label="Score" />
      </div>

      {reason ? <p className="mt-4 text-sm leading-6 text-zinc-700">{reason}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {features.map((feature) => (
          <FeatureBadge key={feature} label={featureLabels[feature]} status={software.features[feature]} />
        ))}
      </div>

      <PricingNote compact className="mt-4">
        {software.pricingNotes}
      </PricingNote>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <TrackedAffiliateLink
          href={`/go/${software.slug}`}
          softwareId={software.id}
          sourcePage={sourcePage}
          ctaLocation={ctaLocation}
          prefetch={false}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Visit Website
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </TrackedAffiliateLink>
        <Link
          href={`/software/${software.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Read Profile
        </Link>
      </div>
    </article>
  );
}
