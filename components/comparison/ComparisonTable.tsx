import Link from "next/link";
import { AffiliateButton } from "@/components/affiliate/AffiliateButton";
import { FeatureMatrix } from "@/components/software/FeatureMatrix";
import { FeatureBadge } from "@/components/ui/FeatureBadge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import type { Software, SoftwareFeatureKey } from "@/data/software";

type ComparisonTableProps = {
  items: Software[];
  focusFeatures?: SoftwareFeatureKey[];
};

export function ComparisonTable({ items, focusFeatures }: ComparisonTableProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.slug} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/software/${item.slug}`} className="text-lg font-semibold text-zinc-950 hover:underline">
                  {item.name}
                </Link>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.shortDescription}</p>
              </div>
              <ScoreBadge score={item.scores.overall} label="Overall" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.targetGymSizes.slice(0, 3).map((size) => (
                <FeatureBadge key={size} label={size} />
              ))}
            </div>
            <PricingNote compact className="mt-4">
              {item.pricingNotes}
            </PricingNote>
            <div className="mt-5">
              <AffiliateButton linkSlug={item.slug} softwareId={item.id} sourcePage="comparison_table" ctaLocation="comparison_card" label={`Check ${item.name}`} variant="secondary" />
            </div>
          </article>
        ))}
      </div>
      <FeatureMatrix items={items} features={focusFeatures} />
    </div>
  );
}
