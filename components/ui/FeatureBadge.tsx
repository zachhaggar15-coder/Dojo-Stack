import type { FeatureSupport } from "@/data/software";
import { cn } from "@/lib/formatting";

type FeatureBadgeProps = {
  label: string;
  status?: FeatureSupport;
  className?: string;
};

const statusClasses: Record<FeatureSupport, string> = {
  yes: "border-emerald-200 bg-emerald-50 text-emerald-900",
  partial: "border-sky-200 bg-sky-50 text-sky-900",
  unknown: "border-zinc-200 bg-zinc-50 text-zinc-700",
  no: "border-zinc-200 bg-white text-zinc-500",
};

const statusLabels: Record<FeatureSupport, string> = {
  yes: "Listed",
  partial: "Partial",
  unknown: "Verify",
  no: "Not listed",
};

export function FeatureBadge({ label, status, className }: FeatureBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
        status ? statusClasses[status] : "border-zinc-200 bg-white text-zinc-700",
        className,
      )}
    >
      <span>{label}</span>
      {status ? <span className="text-[11px] font-semibold opacity-75">{statusLabels[status]}</span> : null}
    </span>
  );
}
