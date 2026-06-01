import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ComparisonPage } from "@/data/comparisonPages";

type ComparisonPageListProps = {
  pages: ComparisonPage[];
};

export function ComparisonPageList({ pages }: ComparisonPageListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {pages.map((page) => (
        <Card key={page.slug} className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-950">{page.metaTitle.replace(": Which Is Better for Martial Arts Gyms?", "")}</h2>
            {page.publishStatus !== "published" ? <Badge tone="amber">{page.publishStatus}</Badge> : null}
          </div>
          <p className="text-sm leading-6 text-zinc-600">{page.metaDescription}</p>
          <Link
            href={`/compare/${page.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Open comparison
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>
      ))}
    </div>
  );
}
