import { affiliateLinks, type AffiliateEntry } from "@/data/affiliateLinks";
import type { Software } from "@/data/software";

function isUsableUrl(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isUsableAffiliateDestination(entry: AffiliateEntry | undefined) {
  return Boolean(entry && entry.affiliateStatus === "verified" && isUsableUrl(entry.destinationUrl));
}

function findEntryBySoftwareId(softwareId: string) {
  return Object.values(affiliateLinks).find((entry) => entry.softwareId === softwareId);
}

export function getAffiliateEntry(slug: string) {
  return affiliateLinks[slug];
}

export function getOutboundUrlForSoftware(softwareId: string) {
  const entry = findEntryBySoftwareId(softwareId);

  if (!entry) {
    return null;
  }

  return isUsableAffiliateDestination(entry) ? entry.destinationUrl : entry.fallbackUrl;
}

export function isAffiliateVerified(softwareId: string) {
  return isUsableAffiliateDestination(findEntryBySoftwareId(softwareId));
}

export function getAffiliateRiskNote(softwareId: string) {
  const entry = findEntryBySoftwareId(softwareId);
  return entry?.riskNotes[0] ?? "Provider link status has not been verified.";
}

export function getAffiliateLink(slug: string) {
  return getAffiliateEntry(slug);
}

export function getAffiliateLinkForSoftware(software: Software) {
  return findEntryBySoftwareId(software.id);
}

export function getAffiliateHref(slug: string) {
  return `/go/${slug}`;
}

export function hasConfiguredDestination(entry: AffiliateEntry | Software | undefined) {
  if (!entry) {
    return false;
  }

  if ("softwareId" in entry) {
    return isUsableAffiliateDestination(entry);
  }

  return isAffiliateVerified(entry.id);
}

export function affiliateStatusLabel(entryOrSoftware: AffiliateEntry | Software | undefined) {
  if (!entryOrSoftware) {
    return "Provider link status unknown";
  }

  const status = "softwareId" in entryOrSoftware
    ? entryOrSoftware.affiliateStatus
    : findEntryBySoftwareId(entryOrSoftware.id)?.affiliateStatus ?? entryOrSoftware.affiliateStatus;

  const labels: Record<AffiliateEntry["affiliateStatus"], string> = {
    verified: "Verified referral link",
    pending: "Provider link pending verification",
    uncertain_after_trial: "Provider link uses the normal website while details are verified",
    not_available: "Provider link uses the normal website",
    unknown: "Provider link uses the normal website",
  };

  return labels[status];
}

export function getSafeOutboundUrlForEntry(entry: AffiliateEntry | undefined) {
  if (!entry) {
    return null;
  }

  if (isUsableAffiliateDestination(entry)) {
    return entry.destinationUrl;
  }

  return isUsableUrl(entry.fallbackUrl) ? entry.fallbackUrl : null;
}
