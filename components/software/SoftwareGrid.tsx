import { SoftwareCard } from "@/components/software/SoftwareCard";
import type { Software } from "@/data/software";

type SoftwareGridProps = {
  items: Software[];
};

export function SoftwareGrid({ items }: SoftwareGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <SoftwareCard key={item.slug} software={item} />
      ))}
    </div>
  );
}
