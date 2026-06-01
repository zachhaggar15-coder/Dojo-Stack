import type { Metadata } from "next";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { SoftwareDirectory } from "@/components/software/SoftwareDirectory";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { absoluteUrl, createPageMetadata, shouldNoIndexSoftware } from "@/lib/seo";
import { getAllSoftware } from "@/lib/software";

export const metadata: Metadata = createPageMetadata({
  title: "Martial Arts Gym Software Directory",
  description:
    "Browse and filter martial arts gym software by discipline, gym size, payments, booking, attendance, waivers, reporting, mobile app support, free trials, and pricing signals.",
  path: "/software",
  noIndex: getAllSoftware().every(shouldNoIndexSoftware),
});
export default function SoftwareDirectoryPage() {
  const items = getAllSoftware();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Martial arts gym software directory",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(`/software/${item.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <Container className="space-y-8 py-12">
        <SectionHeading
          eyebrow="Software directory"
          title="Browse martial arts gym software"
          description="Search and filter software options for BJJ, MMA, boxing, karate, taekwondo, judo, and general martial arts schools. Feature support and pricing notes stay cautious where manual verification is still needed."
        />
        <SoftwareDirectory software={items} />
        <AffiliateNotice />
      </Container>
    </>
  );
}
