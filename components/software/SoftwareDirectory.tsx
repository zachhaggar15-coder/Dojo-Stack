"use client";

import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { TrackedAffiliateLink } from "@/components/analytics/TrackedAffiliateLink";
import { Badge } from "@/components/ui/Badge";
import { FeatureBadge } from "@/components/ui/FeatureBadge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { trackDirectoryFilterUsed } from "@/lib/analytics";
import {
  featureLabels,
  type AvailabilityStatus,
  type GymSize,
  type GymType,
  type Software,
  type SoftwareFeatureKey,
} from "@/data/software";

const gymTypeFilters: GymType[] = ["BJJ", "MMA", "Boxing", "Karate", "Taekwondo", "Judo", "General martial arts"];

const gymSizeFilters: Array<{ value: GymSize; label: string }> = [
  { value: "solo", label: "Solo instructor" },
  { value: "small", label: "Small gym" },
  { value: "growing", label: "Growing gym" },
  { value: "multi-location", label: "Multi-location" },
];

const featureFilters: Array<{ value: SoftwareFeatureKey; label: string }> = [
  { value: "payments", label: "Payments" },
  { value: "recurringBilling", label: "Recurring billing" },
  { value: "booking", label: "Booking" },
  { value: "attendance", label: "Attendance" },
  { value: "waivers", label: "Waivers" },
  { value: "communication", label: "Member communication" },
  { value: "reporting", label: "Reporting" },
  { value: "mobileApp", label: "Mobile app" },
  { value: "beltTracking", label: "Belt tracking" },
  { value: "multiLocation", label: "Multi-location" },
];

type SortKey = "overall" | "martialArtsFit" | "easeOfUse" | "valueForMoney" | "setupComplexity" | "startingPrice";

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "overall", label: "Overall score" },
  { value: "martialArtsFit", label: "Martial arts fit" },
  { value: "easeOfUse", label: "Ease of use" },
  { value: "valueForMoney", label: "Value for money" },
  { value: "setupComplexity", label: "Setup complexity" },
  { value: "startingPrice", label: "Starting price where known" },
];

export function SoftwareDirectory({ software }: { software: Software[] }) {
  const [query, setQuery] = useState("");
  const [gymTypes, setGymTypes] = useState<GymType[]>([]);
  const [gymSizes, setGymSizes] = useState<GymSize[]>([]);
  const [features, setFeatures] = useState<SoftwareFeatureKey[]>([]);
  const [requiresFreeTrial, setRequiresFreeTrial] = useState(false);
  const [requiresFreePlan, setRequiresFreePlan] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("overall");

  const filteredSoftware = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return software
      .filter((item) => (normalizedQuery ? item.name.toLowerCase().includes(normalizedQuery) : true))
      .filter((item) => gymTypes.length === 0 || gymTypes.some((gymType) => item.targetGymTypes.includes(gymType)))
      .filter((item) => gymSizes.length === 0 || gymSizes.some((gymSize) => item.targetGymSizes.includes(gymSize)))
      .filter(
        (item) =>
          features.length === 0 ||
          features.every((feature) => item.features[feature] === "yes" || item.features[feature] === "partial"),
      )
      .filter((item) => (requiresFreeTrial ? item.freeTrialAvailable === true : true))
      .filter((item) => (requiresFreePlan ? item.freePlanAvailable === true : true))
      .sort((a, b) => compareSoftwareForSort(a, b, sortBy));
  }, [features, gymSizes, gymTypes, query, requiresFreePlan, requiresFreeTrial, software, sortBy]);

  const activeFilterCount = gymTypes.length + gymSizes.length + features.length + Number(requiresFreeTrial) + Number(requiresFreePlan);

  function clearFilters() {
    setQuery("");
    setGymTypes([]);
    setGymSizes([]);
    setFeatures([]);
    setRequiresFreeTrial(false);
    setRequiresFreePlan(false);
    setSortBy("overall");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-emerald-700" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-zinc-950">Filters</h2>
            </div>
            {activeFilterCount > 0 || query ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950"
              >
                <X className="size-3" aria-hidden="true" />
                Clear
              </button>
            ) : null}
          </div>

          <div className="mt-5 grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-zinc-800">
              Search software
              <span className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name"
                  className="min-h-11 w-full rounded-md border border-zinc-300 bg-white px-9 text-sm outline-none focus:border-zinc-950"
                />
              </span>
            </label>

            <FilterGroup title="Gym type">
              {gymTypeFilters.map((gymType) => (
                <CheckboxFilter
                  key={gymType}
                  label={gymType}
                  checked={gymTypes.includes(gymType)}
                  onChange={() => { trackDirectoryFilterUsed("gym_type", gymType); toggleValue(gymType, gymTypes, setGymTypes); }}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Gym size">
              {gymSizeFilters.map((gymSize) => (
                <CheckboxFilter
                  key={gymSize.value}
                  label={gymSize.label}
                  checked={gymSizes.includes(gymSize.value)}
                  onChange={() => { trackDirectoryFilterUsed("gym_size", gymSize.value); toggleValue(gymSize.value, gymSizes, setGymSizes); }}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Features">
              {featureFilters.map((feature) => (
                <CheckboxFilter
                  key={feature.value}
                  label={feature.label}
                  checked={features.includes(feature.value)}
                  onChange={() => { trackDirectoryFilterUsed("feature", feature.value); toggleValue(feature.value, features, setFeatures); }}
                />
              ))}
            </FilterGroup>

            <FilterGroup title="Plan availability">
              <CheckboxFilter label="Free trial" checked={requiresFreeTrial} onChange={() => { trackDirectoryFilterUsed("availability", "free_trial"); setRequiresFreeTrial((value) => !value); }} />
              <CheckboxFilter label="Free plan" checked={requiresFreePlan} onChange={() => { trackDirectoryFilterUsed("availability", "free_plan"); setRequiresFreePlan((value) => !value); }} />
            </FilterGroup>
          </div>
        </div>
      </aside>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600">
            Showing <span className="font-semibold text-zinc-950">{filteredSoftware.length}</span> of {software.length} software options
          </p>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-800">
            Sort by
            <select
              value={sortBy}
              onChange={(event) => { trackDirectoryFilterUsed("sort", event.target.value); setSortBy(event.target.value as SortKey); }}
              className="min-h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-950"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredSoftware.length > 0 ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {filteredSoftware.map((item) => (
              <DirectorySoftwareCard key={item.slug} software={item} />
            ))}
          </div>
        ) : (
          <Card className="text-center">
            <h2 className="text-lg font-semibold text-zinc-950">No matching software found</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Try removing a feature filter or broadening the gym type. Some software records still have unknown feature support until they are manually verified.
            </p>
            <div className="mt-5">
              <Button type="button" variant="secondary" onClick={clearFilters}>
                Reset filters
              </Button>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

function DirectorySoftwareCard({ software }: { software: Software }) {
  const topFeatures = getTopFeatures(software);

  return (
    <Card className="flex h-full flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={`/software/${software.slug}`} className="text-xl font-semibold text-zinc-950 hover:underline">
            {software.name}
          </Link>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{software.shortDescription}</p>
        </div>
        <ScoreBadge score={software.scores.overall} label="Overall" />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Best for</p>
        <ul className="mt-2 grid gap-1 text-sm leading-6 text-zinc-700">
          {software.bestFor.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <PricingNote compact>{software.pricingNotes}</PricingNote>

      <div className="flex flex-wrap gap-2">
        <AvailabilityBadge label="Free trial" value={software.freeTrialAvailable} />
        <AvailabilityBadge label="Free plan" value={software.freePlanAvailable} />
      </div>

      <div className="flex flex-wrap gap-2">
        {topFeatures.length ? (
          topFeatures.map((feature) => <FeatureBadge key={feature} label={featureLabels[feature]} status={software.features[feature]} />)
        ) : (
          <FeatureBadge label="Feature support needs verification" />
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        <Link
          href={`/software/${software.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Read Profile
        </Link>
        <TrackedAffiliateLink
          href={`/go/${software.slug}`}
          softwareId={software.id}
          sourcePage="software_directory"
          ctaLocation="directory_card"
          prefetch={false}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Visit Website
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </TrackedAffiliateLink>
      </div>
    </Card>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-zinc-950">{title}</legend>
      <div className="grid gap-2">{children}</div>
    </fieldset>
  );
}

function CheckboxFilter({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 text-sm text-zinc-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 rounded border-zinc-300 text-zinc-950" />
      {label}
    </label>
  );
}

function AvailabilityBadge({ label, value }: { label: string; value: AvailabilityStatus }) {
  if (value === true) {
    return <Badge tone="green">{label}: yes</Badge>;
  }

  if (value === false) {
    return <Badge>{label}: no</Badge>;
  }

  return <Badge tone="amber">{label}: verify</Badge>;
}

function toggleValue<T>(value: T, currentValues: T[], setValues: (values: T[]) => void) {
  setValues(currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value]);
}

function getTopFeatures(software: Software) {
  return (Object.keys(software.features) as SoftwareFeatureKey[])
    .filter((feature) => software.features[feature] === "yes" || software.features[feature] === "partial")
    .slice(0, 5);
}

function compareSoftwareForSort(a: Software, b: Software, sortBy: SortKey) {
  if (sortBy === "startingPrice") {
    return compareNullablePrices(a.startingPriceMonthly, b.startingPriceMonthly);
  }

  if (sortBy === "setupComplexity") {
    return a.scores.setupComplexity - b.scores.setupComplexity || b.scores.overall - a.scores.overall;
  }

  return b.scores[sortBy] - a.scores[sortBy] || a.name.localeCompare(b.name);
}

function compareNullablePrices(a: number | null, b: number | null) {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return a - b;
}





