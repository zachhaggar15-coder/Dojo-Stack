import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/formatting";

type AffiliateDisclosureInlineProps = {
  className?: string;
  compact?: boolean;
};

export function AffiliateDisclosureInline({ className, compact = false }: AffiliateDisclosureInlineProps) {
  return (
    <p className={cn("text-zinc-500", compact ? "text-xs leading-5" : "text-sm leading-6", className)}>
      {siteConfig.disclosureText} Verify current pricing and features with providers. {" "}
      <Link href="/affiliate-disclosure" className="font-semibold text-zinc-700 underline-offset-2 hover:underline">
        Disclosure
      </Link>
    </p>
  );
}
