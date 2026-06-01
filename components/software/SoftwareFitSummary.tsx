import type { Software } from "@/data/software";
import { ScoreBadge } from "@/components/ui/ScoreBadge";

type SoftwareFitSummaryProps = {
  software: Software;
};

export function SoftwareFitSummary({ software }: SoftwareFitSummaryProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 sm:grid-cols-2">
      <div>
        <p className="font-semibold text-zinc-950">Best for</p>
        <p className="mt-1">{software.bestFor[0] ?? "Needs manual verification"}</p>
      </div>
      <div>
        <p className="font-semibold text-zinc-950">Check carefully</p>
        <p className="mt-1">{software.notIdealFor[0] ?? software.uncertaintyNotes[0] ?? "Pricing and feature support"}</p>
      </div>
      <div className="sm:col-span-2">
        <ScoreBadge score={software.scores.overall} label="Overall" />
      </div>
    </div>
  );
}
