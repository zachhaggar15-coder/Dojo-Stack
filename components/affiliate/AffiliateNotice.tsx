import Link from "next/link";
import { Info } from "lucide-react";
import { AffiliateDisclosureInline } from "@/components/ui/AffiliateDisclosureInline";
import { cn } from "@/lib/formatting";

type AffiliateNoticeProps = {
  compact?: boolean;
  className?: string;
  variant?: "default" | "footer";
};

export function AffiliateNotice({ compact = false, className, variant = "default" }: AffiliateNoticeProps) {
  const isFooter = variant === "footer";

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        isFooter ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50",
        compact && "p-3",
        className,
      )}
    >
      <Info className={cn("mt-0.5 size-4 shrink-0", isFooter ? "text-zinc-400" : "text-zinc-500")} aria-hidden="true" />
      {isFooter ? (
        <p className="text-xs leading-5 text-zinc-400">
          Some links may be standard provider links, and some may become affiliate or referral links if verified. Recommendations are not determined by affiliate availability. {" "}
          <Link href="/affiliate-disclosure" className="font-semibold text-zinc-200 underline-offset-2 hover:underline">
            Disclosure
          </Link>
        </p>
      ) : (
        <AffiliateDisclosureInline compact={compact} />
      )}
    </div>
  );
}
