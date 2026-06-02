import { BrandLogo } from "@/components/layout/BrandLogo";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  showLogo?: boolean;
};

export function SectionHeading({ eyebrow, title, description, showLogo = false }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {showLogo ? <BrandLogo className="mb-6 text-sm" /> : null}
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-zinc-600">{description}</p> : null}
    </div>
  );
}
