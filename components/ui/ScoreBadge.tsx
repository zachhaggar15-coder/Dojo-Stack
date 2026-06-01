import { cn } from "@/lib/formatting";

type ScoreBadgeProps = {
  score?: number | null;
  label?: string;
  className?: string;
};

export function ScoreBadge({ score, label = "Fit signal", className }: ScoreBadgeProps) {
  const display = typeof score === "number" ? `${score}/10` : "Verify";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-900",
        className,
      )}
    >
      <span className="text-sky-700">{label}</span>
      <span>{display}</span>
    </span>
  );
}
