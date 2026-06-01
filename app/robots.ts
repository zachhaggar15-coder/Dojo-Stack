import type { MetadataRoute } from "next";
import { bestSoftwarePages } from "@/data/bestSoftwarePages";
import { comparisonPages } from "@/data/comparisonPages";
import { siteConfig } from "@/data/siteConfig";
import { software } from "@/data/software";
import { getAllArticles, shouldNoIndexArticle } from "@/lib/articles";
import { hasLaunchBlockingPlaceholders, shouldNoIndexSoftware } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const launchBlocked = hasLaunchBlockingPlaceholders();
  const draftOrNoindexRoutes = [
    "/articles",
    ...software.filter(shouldNoIndexSoftware).map((item) => `/software/${item.slug}`),
    ...comparisonPages.filter((page) => page.publishStatus !== "published").map((page) => `/compare/${page.slug}`),
    ...bestSoftwarePages.filter((page) => page.publishStatus !== "published").map((page) => `/best-software/${page.slug}`),
    ...getAllArticles().filter(shouldNoIndexArticle).map((article) => `/articles/${article.slug}`),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/go/", ...draftOrNoindexRoutes],
    },
    ...(launchBlocked ? {} : { sitemap: `${siteConfig.domain}/sitemap.xml` }),
  };
}
