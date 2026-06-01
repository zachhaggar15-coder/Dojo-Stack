import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/formatting";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "neutral" | "green" | "amber" | "blue" | "red";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-zinc-200 bg-white text-zinc-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  blue: "border-sky-200 bg-sky-50 text-sky-800",
  red: "border-rose-200 bg-rose-50 text-rose-800",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium leading-none",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
