import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/formatting";

type BrandLogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function BrandLogo({ className, variant = "light" }: BrandLogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-base font-semibold",
        isDark ? "text-white" : "text-zinc-950",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-10 w-11 shrink-0 items-center justify-center rounded-md border bg-white p-1",
          isDark ? "border-zinc-700" : "border-zinc-200",
        )}
      >
        <Image
          src="/dojostack-mark.png"
          alt=""
          width={96}
          height={78}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span>{siteConfig.siteName}</span>
    </Link>
  );
}