"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getAffiliateHref } from "@/lib/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

type AffiliateButtonProps = {
  linkSlug: string;
  label: string;
  variant?: "primary" | "secondary";
  softwareId?: string;
  sourcePage?: string;
  ctaLocation?: string;
};

export function AffiliateButton({
  linkSlug,
  label,
  variant = "primary",
  softwareId = linkSlug,
  sourcePage = "unknown",
  ctaLocation = "affiliate_button",
}: AffiliateButtonProps) {
  return (
    <ButtonLink
      href={getAffiliateHref(linkSlug)}
      prefetch={false}
      variant={variant}
      icon={<ArrowUpRight className="size-4" />}
      onClick={() => trackAffiliateClick(softwareId, sourcePage, ctaLocation)}
    >
      {label}
    </ButtonLink>
  );
}
