import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/formatting";

type CTAButtonVariant = "primary" | "secondary" | "quiet";

type CTAButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: CTAButtonVariant;
  icon?: ReactNode;
};

const variants: Record<CTAButtonVariant, string> = {
  primary: "bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950",
  secondary: "border border-zinc-300 bg-white text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-zinc-600",
  quiet: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-zinc-600",
};

export function CTAButton({ className, variant = "primary", icon, children, ...props }: CTAButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}
