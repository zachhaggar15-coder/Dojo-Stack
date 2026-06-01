import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = createPageMetadata({
  title: "Supporting Articles",
  description: "Draft supporting content for martial arts gym software research, linked to software, comparison, quiz, and best-software pages.",
  path: "/articles",
  noIndex: true,
});

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
        eyebrow="Supporting content"
        title="Controlled article drafts"
        description="These articles support commercial decision pages. Drafts are noindexed until manually reviewed and intentionally published."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <Card key={article.slug}>
            <div className="flex flex-wrap gap-2">
              <Badge tone={article.status === "published" ? "green" : "amber"}>{article.status}</Badge>
              {article.needsManualReview ? <Badge tone="amber">Needs manual review</Badge> : null}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-zinc-950">
              <Link href={`/articles/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{article.intro}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">{article.category}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
