import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Methodology",
  description: `How ${siteConfig.siteName} evaluates martial arts gym software, handles uncertainty, and keeps outbound-link status separate from recommendation logic.`,
  path: "/methodology",
});

const assessmentFactors = [
  "Martial arts suitability",
  "Feature fit for payments, booking, attendance, waivers, communication, reporting, mobile access, and belt/progress tracking",
  "Gym size fit for solo instructors, small gyms, growing schools, and multi-location operators",
  "Pricing transparency and whether current pricing can be verified",
  "Ease of use and likely setup complexity",
  "Automation potential for recurring billing, reminders, reporting, and admin reduction",
  "Apparent suitability for small gyms that need practical workflows without overbuilt systems",
  "Public information from provider websites or other available sources",
  "Manual review of software data before stronger recommendations are published",
  "Data confidence, including uncertainty notes and last-updated dates",
];

const honestyNotes = [
  {
    title: "Information can change",
    copy: "Software pricing, packaging, features, trials, country support, and affiliate access may change. Pages should be updated when better information is available.",
  },
  {
    title: "Some details may be uncertain",
    copy: "When a field is unknown or needs verification, the site should say so instead of filling gaps with confident-sounding claims.",
  },
  {
    title: "Hands-on testing is not assumed",
    copy: "The site should only claim hands-on testing if that testing actually happened and the scope is clear. Current fit scores are editable research signals, not user reviews or lab results.",
  },
  {
    title: "Corrections are welcome",
    copy: "Readers and software providers can send source updates, corrections, and clarification requests through the contact page.",
  },
];

export default function MethodologyPage() {
  return (
    <Container className="space-y-8 py-12">
      <SectionHeading
        eyebrow="Methodology"
        title="How software is assessed"
        description={`${siteConfig.siteName} is designed as a decision-support platform for martial arts gym owners, not a generic blog or a collection of fake reviews.`}
      />

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-zinc-950">Assessment factors</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
            {assessmentFactors.map((factor) => (
              <li key={factor} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-zinc-950">What rankings should not do</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-700">
            <p>
              Rankings should not be based on affiliate availability. Some provider buttons may be standard outbound
              links, and some may become affiliate or referral links only if verified later. Recommendations should
              start with usefulness for the gym owner.
            </p>
            <p>
              Pages should not invent provider pricing, create fake testimonials, use fake review schema, or present
              uncertain public information as verified fact.
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {honestyNotes.map((note) => (
          <Card key={note.title}>
            <h2 className="text-lg font-semibold text-zinc-950">{note.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{note.copy}</p>
          </Card>
        ))}
      </section>

      <section className="max-w-3xl rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-zinc-950">How to request a correction</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          If pricing, feature support, provider status, or another detail appears outdated, send a correction request with
          the relevant page URL and source. The site can then update the static data files and confidence notes.
        </p>
        <Link href="/contact" className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800">
          Contact the site
        </Link>
      </section>
    </Container>
  );
}
