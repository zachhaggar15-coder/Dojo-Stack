import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { siteConfig } from "@/data/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <BrandLogo className="shrink-0" priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {siteConfig.navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href="/quiz" className="min-h-10 px-3" variant="secondary">
            Find My Fit
          </CTAButton>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-800 transition hover:bg-zinc-50">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </summary>
          <nav
            className="absolute right-0 mt-2 grid w-[min(20rem,calc(100vw-2rem))] gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-200"
            aria-label="Mobile navigation"
          >
            {siteConfig.navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quiz" className="mt-1 rounded-md bg-zinc-950 px-3 py-3 text-sm font-semibold text-white hover:bg-zinc-800">
              Find My Best Software
            </Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
