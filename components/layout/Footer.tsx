import Link from "next/link";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-200">
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-base font-semibold text-white">{siteConfig.siteName}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{siteConfig.tagline}</p>
          <AffiliateNotice compact variant="footer" className="mt-5 max-w-3xl" />
        </div>
        <div className="space-y-4 lg:text-right">
          <nav className="flex flex-wrap gap-3 lg:justify-end" aria-label="Footer navigation">
            {siteConfig.footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-zinc-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs leading-5 text-zinc-500">Built for practical software research. No fake reviews, ratings, or urgency claims.</p>
        </div>
      </Container>
    </footer>
  );
}
