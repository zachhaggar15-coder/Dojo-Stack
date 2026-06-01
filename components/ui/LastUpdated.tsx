import { cn } from "@/lib/formatting";

type LastUpdatedProps = {
  value: string;
  className?: string;
};

export function LastUpdated({ value, className }: LastUpdatedProps) {
  return <p className={cn("text-xs font-medium text-zinc-500", className)}>Last updated: {value}</p>;
}
