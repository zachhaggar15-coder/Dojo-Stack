import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/formatting";

type TrustBoxProps = {
  title?: string;
  items: string[];
  className?: string;
};

export function TrustBox({ title = "How this stays useful", items, className }: TrustBoxProps) {
  return (
    <div className={cn("rounded-lg border border-zinc-200 bg-white p-5", className)}>
      <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
