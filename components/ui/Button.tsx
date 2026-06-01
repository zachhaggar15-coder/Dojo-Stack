import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/formatting";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950",
  secondary:
    "border border-zinc-300 bg-white text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-zinc-600",
  ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-zinc-600",
};

export function buttonClasses({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: ButtonVariant;
}) {
  return cn(
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    className,
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

export function Button({ className, variant = "primary", icon, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ className, variant })} {...props}>
      {icon}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

export function ButtonLink({ className, variant = "primary", icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ className, variant })} {...props}>
      {icon}
      {children}
    </Link>
  );
}
