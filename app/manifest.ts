import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,
    short_name: siteConfig.siteName,
    description: siteConfig.defaultMetaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: siteConfig.brandAssets.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.brandAssets.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
