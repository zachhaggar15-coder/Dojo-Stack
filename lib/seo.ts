import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import type { Software } from "@/data/software";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle =
    title === siteConfig.defaultMetaTitle || title === siteConfig.siteName ? title : `${title} | ${siteConfig.siteName}`;
  const url = absoluteUrl(path);
  const shouldNoIndex = noIndex || hasLaunchBlockingPlaceholders();

  return {
    metadataBase: new URL(siteConfig.domain),
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.siteName,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: shouldNoIndex ? { index: false, follow: false } : undefined,
  };
}

export function hasLaunchBlockingPlaceholders() {
  return siteConfig.launchSafety.hasPlaceholderDomain || siteConfig.launchSafety.hasPlaceholderContactEmail;
}

export function isSoftwarePlaceholderHeavy(item: Software) {
  const unknownFeatureCount = Object.values(item.features).filter((value) => value === "unknown").length;
  const hasUnknownAvailability = item.freeTrialAvailable === "unknown" || item.freePlanAvailable === "unknown";
  const hasUnverifiedPricing = item.pricingStatus === "unknown" || item.pricingStatus === "custom_quote";
  const hasManyUncertaintyNotes = item.uncertaintyNotes.length >= 3;

  return unknownFeatureCount >= 4 || hasUnknownAvailability || hasUnverifiedPricing || hasManyUncertaintyNotes;
}

export function shouldNoIndexSoftware(item: Software) {
  return isSoftwarePlaceholderHeavy(item);
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: absoluteUrl("/"),
    description: siteConfig.defaultMetaDescription,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contactEmail,
      contactType: "customer support",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: absoluteUrl("/"),
    description: siteConfig.defaultMetaDescription,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
