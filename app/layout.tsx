import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.defaultMetaTitle,
  description: siteConfig.defaultMetaDescription,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
