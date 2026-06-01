import { Info } from "lucide-react";
import { cn } from "@/lib/formatting";

type PricingNoteProps = {
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
};

export function PricingNote({ children, compact = false, className }: PricingNoteProps) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700",
        compact ? "p-3 text-xs leading-5" : "p-4 text-sm leading-6",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
