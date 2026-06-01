import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarCheck,
  ClipboardCheck,
  CreditCard,
  FileText,

  MessageSquare,
  SearchCheck,

} from "lucide-react";
import { SoftwareCard } from "@/components/software/SoftwareCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { Card } from "@/components/ui/Card";
import { TrustBox } from "@/components/ui/TrustBox";
import { AffiliateDisclosureInline } from "@/components/ui/AffiliateDisclosureInline";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { createPageMetadata, shouldNoIndexSoftware } from "@/lib/seo";
import { getAllSoftware } from "@/lib/software";

export const metadata: Metadata = createPageMetadata({
  title: "Martial Arts Gym Software Comparison",
  description: siteConfig.defaultMetaDescription,
  path: "/",
  noIndex: getAllSoftware().every(shouldNoIndexSoftware),
});
const problems = [
  ["Missed payments", "Billing gaps and failed collections can turn into weekly admin work."],
  ["Spreadsheets", "Member notes, ranks, and attendance can spread across too many manual files."],
  ["Manual attendance tracking", "Paper check-ins and ad hoc lists make retention signals harder to see."],
  ["Waiver admin", "Waivers need a clear process before new students join classes."],
  ["Class booking confusion", "Drop-ins, trials, waitlists, and full classes can become messy quickly."],
  ["Unclear pricing", "Many platforms require careful checking before total cost is obvious."],
  ["Member communication", "Announcements, billing reminders, and schedule changes need a dependable workflow."],
  ["Similar platforms", "Software options can look alike until you compare fit, setup, and tradeoffs."],
];

const useCases = [
  {
    href: "/best-software/bjj-gyms",
    title: "BJJ Gyms",
    description: "Compare tools for memberships, attendance, payments, and belt workflow fit.",
  },
  {
    href: "/best-software/mma-gyms",
    title: "MMA Gyms",
    description: "Shortlist software for striking, grappling, conditioning, and mixed class schedules.",
  },
  {
    href: "/best-software/small-martial-arts-schools",
    title: "Small Schools",
    description: "Focus on simple setup, clean billing, attendance, and member-management basics.",
  },
  {
    href: "/best-software/gym-payment-automation",
    title: "Payment Automation",
    description: "Review recurring billing, payment collection, reporting, and follow-up workflows.",
  },
  {
    href: "/best-software/gym-class-booking",
    title: "Class Booking",
    description: "Compare booking, attendance, mobile access, and member communication workflows.",
  },
  {
    href: "/best-software/boxing-gyms",
    title: "Boxing Gyms",
    description: "Compare class booking, payments, and member-management fit for boxing clubs.",
  },
  {
    href: "/best-software/gym-attendance-tracking",
    title: "Attendance Tracking",
    description: "Look at retention visibility, class check-ins, and member participation signals.",
  },
  {
    href: "/best-software/gym-waiver-management",
    title: "Waiver Management",
    description: "Review onboarding, form collection, and admin reduction workflows.",
  },
];

const methodologyFactors = [
  "Martial arts fit",
  "Features",
  "Pricing transparency",
  "Gym size",
  "Ease of use",
  "Automation",
  "Available public information",
  "Manual review",
];

export default function HomePage() {
  const featuredSoftware = getAllSoftware().slice(0, 4);

  return (
    <>

      <section className="border-b border-zinc-200 bg-white">
        <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Software comparison for gym owners</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              Find the Right Software for Your Martial Arts Gym
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Compare booking, billing, attendance, waiver, and member-management tools for BJJ, MMA, boxing, karate,
              taekwondo, and martial arts schools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/quiz" icon={<SearchCheck className="size-4" />}>
                Find My Best Software
              </CTAButton>
              <CTAButton href="/software" variant="secondary" icon={<ArrowRight className="size-4" />}>
                Browse Software Directory
              </CTAButton>
            </div>
            <AffiliateDisclosureInline compact className="mt-5 max-w-2xl" />
          </div>

          <TrustBox
            title="Built for practical decisions"
            items={[
              "No fake reviews, ratings, or testimonials",
              "No invented provider pricing claims",
              "Affiliate availability is not a ranking factor",
            ]}
          />
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Common problems"
            title="Gym software decisions get messy fast"
            description="Most owners are not just buying software. They are trying to reduce admin drag without creating a harder system to manage."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map(([title, description]) => (
              <div key={title} className="rounded-lg border border-zinc-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div>
            <SectionHeading
              eyebrow="Recommendation quiz"
              title="Answer a few questions and get a practical shortlist"
              description="The quiz uses gym type, size, and priority workflows to produce editable fit signals. It is a starting point for research, not a claim of hands-on testing."
            />
            <div className="mt-6">
              <CTAButton href="/quiz" icon={<SearchCheck className="size-4" />}>
                Find My Best Software
              </CTAButton>
            </div>
          </div>
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                <ClipboardCheck className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-zinc-950">Quiz preview</h3>
            </div>
            <p className="text-sm leading-6 text-zinc-600">
              Choose your discipline, gym size, and workflows like payments, booking, attendance, waivers, mobile app,
              and member communication. The results prioritize utility, fit, transparency, and ease of use.
            </p>
          </Card>
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Use cases"
            title="Start with the decision you actually need to make"
            description="These guides organize the same software data around common martial arts gym scenarios."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
              >
                <h3 className="text-base font-semibold text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  Open guide
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Software preview"
              title="Compare current software records"
              description="Software entries come from static data files and include uncertainty notes where manual verification is still needed."
            />
            <Link href="/software" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
              View all software
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredSoftware.map((item) => (
              <SoftwareCard key={item.slug} software={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-8 lg:grid-cols-[24rem_minmax(0,1fr)]">
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <Calculator className="size-6 text-emerald-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-zinc-950">Estimate what software needs to be worth</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Use your own membership, tuition, current tools, and admin time assumptions before comparing verified
              vendor pricing.
            </p>
            <div className="mt-6">
              <CTAButton href="/pricing-calculator" variant="secondary" icon={<Calculator className="size-4" />}>
                Open Pricing Calculator
              </CTAButton>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              [CreditCard, "Payments", "Look for recurring billing, payment follow-up, and reporting workflows."],
              [CalendarCheck, "Booking", "Check how classes, trials, capacity, and attendance work in practice."],
              [FileText, "Waivers", "Confirm waiver collection and storage before relying on a platform."],
              [MessageSquare, "Communication", "Review announcements, billing reminders, and member messaging options."],
            ].map(([Icon, title, description]) => (
              <div key={title as string} className="rounded-lg border border-zinc-200 bg-white p-5">
                <Icon className="size-5 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-zinc-950">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{description as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-zinc-200 bg-white py-12">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Methodology"
            title="Recommendations are based on practical fit, not fake certainty"
            description="The model is designed to keep utility, fit, and uncertainty visible so owners can make a more careful shortlist."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {methodologyFactors.map((factor) => (
              <div key={factor} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium text-zinc-800">
                {factor}
              </div>
            ))}
          </div>
          <Link href="/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
            Read the methodology
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <SectionHeading
              eyebrow="Guide"
              title="How to choose martial arts gym management software"
              description="Start with the workflow causing the most friction, then compare only the tools that fit your discipline, size, budget process, and admin capacity."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Map the workflow", "List the jobs you need fixed first: billing, booking, attendance, waivers, or communication."],
                ["Check fit by gym type", "A BJJ academy, boxing club, and taekwondo school may need different ranking, family, and class workflows."],
                ["Verify before buying", "Confirm pricing, payment processing, contracts, migration, and support directly with the vendor."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-lg border border-zinc-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-zinc-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            {siteConfig.disclosureText}
          </div>
        </Container>
      </section>

    </>
  );
}



