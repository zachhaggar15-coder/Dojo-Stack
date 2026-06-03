import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { hasLaunchBlockingPlaceholders } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const launchBlocked = hasLaunchBlockingPlaceholders();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/go/"],
    },
    ...(launchBlocked ? {} : { sitemap: `${siteConfig.domain}/sitemap.xml` }),
  };
}
