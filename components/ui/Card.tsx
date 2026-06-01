import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/formatting";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn("rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/60", className)}
      {...props}
    />
  );
}
