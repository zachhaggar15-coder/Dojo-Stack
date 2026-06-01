import { AffiliateButton } from "@/components/affiliate/AffiliateButton";
import { AffiliateNotice } from "@/components/affiliate/AffiliateNotice";
import { FeatureMatrix } from "@/components/software/FeatureMatrix";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Software } from "@/data/software";
import { formatDate } from "@/lib/formatting";

export function SoftwareProfile({ software }: { software: Software }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {software.targetGymTypes.map((gymType) => (
              <Badge key={gymType}>{gymType}</Badge>
            ))}
          </div>
          <p className="text-lg leading-8 text-zinc-700">{software.longDescription}</p>
        </div>

        <FeatureMatrix items={[software]} />

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-zinc-950">Pricing Data</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{software.pricingNotes}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="amber">Status: {software.pricingStatus}</Badge>
              <Badge tone="neutral">Starting price: {software.startingPriceMonthly ?? "Needs verification"}</Badge>
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-zinc-950">Trial Or Free Access</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Free trial: {String(software.freeTrialAvailable)}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Free plan: {String(software.freePlanAvailable)}</p>
          </Card>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-zinc-950">Best For</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-700">
              {software.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-zinc-950">Not Ideal For</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-700">
              {software.notIdealFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-950">Manual Verification Notes</h2>
          <ul className="mt-4 grid gap-3">
            {software.uncertaintyNotes.map((item) => (
              <li key={item} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <aside className="space-y-4">
        <Card className="sticky top-24">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-zinc-500">Provider link</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                The website button uses the managed /go route and falls back to the provider&apos;s normal website unless a verified referral URL is added later.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Last updated</p>
              <p className="mt-2 text-sm text-zinc-700">{formatDate(software.lastUpdated)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Editable scores</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Overall: {software.scores.overall}/10</p>
              <p className="text-sm leading-6 text-zinc-700">Martial arts fit: {software.scores.martialArtsFit}/10</p>
            </div>
            <AffiliateButton linkSlug={software.slug} softwareId={software.id} sourcePage="software_profile" ctaLocation="sidebar" label={`Check ${software.name}`} />
            <AffiliateNotice compact />
          </div>
        </Card>
      </aside>
    </div>
  );
}

