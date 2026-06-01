import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";
import { getAllArticles, getArticleBySlug, shouldNoIndexArticle } from "@/lib/articles";
import { getBestSoftwarePageBySlug, getComparisonPageBySlug, getSoftwareById } from "@/lib/software";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "This supporting article was not found.",
      path: `/articles/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/articles/${article.slug}`,
    noIndex: shouldNoIndexArticle(article),
    type: "article",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const faqs = article.faqs;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbJson = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: article.title, path: `/articles/${article.slug}` },
  ]);

  const relatedSoftware = article.relatedSoftwareIds.map((id) => getSoftwareById(id)).filter(Boolean);
  const relatedBestPages = article.relatedBestSoftwarePages.map((pageSlug) => getBestSoftwarePageBySlug(pageSlug)).filter(Boolean);
  const relatedComparisons = article.relatedComparisonPages.map((pageSlug) => getComparisonPageBySlug(pageSlug)).filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbJson} />
      <JsonLd data={faqSchema} />
      <Container className="space-y-10 py-12">
        <section className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <Badge tone={article.status === "published" ? "green" : "amber"}>{article.status}</Badge>
            {article.needsManualReview ? <Badge tone="amber">Needs manual review</Badge> : null}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-950">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{article.intro}</p>
          <p className="mt-4 text-sm text-zinc-500">Last updated: {article.lastUpdated}</p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <article className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="rounded-lg border border-zinc-200 bg-white p-6">
                <h2 className="text-2xl font-semibold text-zinc-950">{section.heading}</h2>
                <p className="mt-3 text-base leading-8 text-zinc-700">{section.body}</p>
                {section.manualVerificationNotes?.length ? (
                  <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                    <p className="font-semibold">Manual verification needed</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {section.manualVerificationNotes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ))}

            <section className="space-y-4">
              <SectionHeading eyebrow="FAQ" title="Questions this draft should answer" />
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <h2 className="text-lg font-semibold text-zinc-950">{faq.question}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{faq.answer}</p>
                </Card>
              ))}
            </section>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <h2 className="text-lg font-semibold text-zinc-950">Commercial pages to review next</h2>
              <div className="mt-4 space-y-4">
                <RelatedGroup title="Software" items={relatedSoftware.map((item) => ({ label: item!.name, href: `/software/${item!.slug}` }))} />
                <RelatedGroup title="Best-software pages" items={relatedBestPages.map((page) => ({ label: page!.title, href: `/best-software/${page!.slug}` }))} />
                <RelatedGroup title="Comparisons" items={relatedComparisons.map((page) => ({ label: page!.metaTitle, href: `/compare/${page!.slug}` }))} />
              </div>
            </Card>
            <Card>
              <h2 className="text-lg font-semibold text-zinc-950">Publishing control</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                This article should stay draft or noindex until factual claims are manually checked and every linked commercial page is ready.
              </p>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}

function RelatedGroup({ title, items }: { title: string; items: Array<{ label: string; href: string }> }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{title}</h3>
      <div className="mt-2 grid gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm font-semibold text-emerald-800 hover:text-emerald-900">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
