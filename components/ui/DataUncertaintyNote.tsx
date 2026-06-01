import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/formatting";

type DataUncertaintyNoteProps = {
  notes?: string[];
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
};

export function DataUncertaintyNote({ notes = [], children, compact = false, className }: DataUncertaintyNoteProps) {
  const fallback = "Some details may need manual verification. Check provider websites for current pricing and features.";

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-950",
        compact ? "p-3 text-xs leading-5" : "p-4 text-sm leading-6",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>
        {children ?? <p>{notes[0] ?? fallback}</p>}
        {notes.length > 1 ? <p className="mt-1 opacity-80">{notes[1]}</p> : null}
      </div>
    </div>
  );
}
