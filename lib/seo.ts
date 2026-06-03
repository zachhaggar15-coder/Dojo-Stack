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

export function assetUrl(path: string) {
  return absoluteUrl(path);
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
      images: [
        {
          url: assetUrl(siteConfig.brandAssets.openGraphImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.siteName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [assetUrl(siteConfig.brandAssets.openGraphImage)],
    },
    icons: {
      icon: [
        {
          url: siteConfig.brandAssets.favicon,
          sizes: "48x48",
          type: "image/png",
        },
        {
          url: siteConfig.brandAssets.icon192,
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: siteConfig.brandAssets.icon512,
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: siteConfig.brandAssets.appleTouchIcon,
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "impact-site-verification": siteConfig.verification.impactSiteVerification,
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
  void item;
  return false;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: absoluteUrl("/"),
    description: siteConfig.defaultMetaDescription,
    logo: {
      "@type": "ImageObject",
      url: assetUrl(siteConfig.brandAssets.logo),
      contentUrl: assetUrl(siteConfig.brandAssets.logo),
      width: 1030,
      height: 730,
    },
    image: assetUrl(siteConfig.brandAssets.logo),
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
