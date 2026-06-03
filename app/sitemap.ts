import type { MetadataRoute } from "next";
import { bestSoftwarePages } from "@/data/bestSoftwarePages";
import { comparisonPages } from "@/data/comparisonPages";
import { siteConfig } from "@/data/siteConfig";
import { software } from "@/data/software";
import { getAllArticles } from "@/lib/articles";
import { hasLaunchBlockingPlaceholders } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (hasLaunchBlockingPlaceholders()) {
    return [];
  }

  const staticRoutes = [
    "",
    "/software",
    "/compare",
    "/quiz",
    "/pricing-calculator",
    "/methodology",
    "/affiliate-disclosure",
    "/about",
    "/contact",
    "/articles",
  ];

  const dynamicRoutes = [
    ...software.map((item) => `/software/${item.slug}`),
    ...comparisonPages.map((page) => `/compare/${page.slug}`),
    ...bestSoftwarePages.map((page) => `/best-software/${page.slug}`),
    ...getAllArticles().map((article) => `/articles/${article.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date("2026-06-03"),
  }));
}
