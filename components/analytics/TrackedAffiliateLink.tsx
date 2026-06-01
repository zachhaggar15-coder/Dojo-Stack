"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import {
  trackAffiliateClick,
  trackComparisonCtaClick,
  trackReviewCtaClick,
} from "@/lib/analytics";

type TrackedAffiliateLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  softwareId: string;
  sourcePage: string;
  ctaLocation: string;
  comparisonSlug?: string;
  trackAs?: "affiliate" | "comparison_cta" | "review_cta";
};

export function TrackedAffiliateLink({
  softwareId,
  sourcePage,
  ctaLocation,
  comparisonSlug,
  trackAs = "affiliate",
  onClick,
  ...props
}: TrackedAffiliateLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackAffiliateClick(softwareId, sourcePage, ctaLocation);

    if (trackAs === "comparison_cta" && comparisonSlug) {
      trackComparisonCtaClick(comparisonSlug, softwareId);
    }

    if (trackAs === "review_cta") {
      trackReviewCtaClick(softwareId);
    }

    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}
