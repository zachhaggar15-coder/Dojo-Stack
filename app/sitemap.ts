import type { MetadataRoute } from "next";
import { bestSoftwarePages } from "@/data/bestSoftwarePages";
import { comparisonPages } from "@/data/comparisonPages";
import { siteConfig } from "@/data/siteConfig";
import { software } from "@/data/software";
import { hasLaunchBlockingPlaceholders, shouldNoIndexSoftware } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (hasLaunchBlockingPlaceholders()) {
    return [];
  }

  const hasIndexableSoftware = software.some((item) => !shouldNoIndexSoftware(item));
  const hasPublishedComparisons = comparisonPages.some((page) => page.publishStatus === "published");

  const staticRoutes = [
    ...(hasIndexableSoftware ? ["", "/software", "/quiz"] : []),
    ...(hasPublishedComparisons ? ["/compare"] : []),
    "/methodology",
    "/affiliate-disclosure",
    "/contact",
  ];

  const dynamicRoutes = [
    ...software.filter((item) => !shouldNoIndexSoftware(item)).map((item) => `/software/${item.slug}`),
    ...comparisonPages.filter((page) => page.publishStatus === "published").map((page) => `/compare/${page.slug}`),
    ...bestSoftwarePages
      .filter((page) => page.publishStatus === "published")
      .map((page) => `/best-software/${page.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date("2026-06-01"),
  }));
}