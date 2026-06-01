"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Calculator, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { featureLabels, type Software } from "@/data/software";
import { trackCalculatorCompleted } from "@/lib/analytics";
import {
  calculateSoftwareCostBand,
  pricingNeedLabels,
  type BudgetSensitivity,
  type PricingCalculatorInput,
  type PricingNeedKey,
} from "@/lib/pricing";

const defaultNeeds: Record<PricingNeedKey, boolean> = {
  onlinePayments: true,
  recurringBilling: true,
  classBooking: true,
  attendanceTracking: true,
  waiverManagement: false,
  memberCommunication: true,
  reporting: false,
  mobileApp: false,
  beltTracking: false,
};

const budgetSensitivityLabels: Record<BudgetSensitivity, string> = {
  very_sensitive: "Keep costs as low as possible",
  balanced: "Balance price and workflow fit",
  flexible: "Pay more if it saves admin time",
};

type PricingCalculatorProps = {
  software: Software[];
};

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
  helper?: string;
};

export function PricingCalculator({ software }: PricingCalculatorProps) {
  const [input, setInput] = useState<PricingCalculatorInput>({
    members: 120,
    instructorsAdmins: 3,
    locations: 1,
    needs: defaultNeeds,
    budgetSensitivity: "balanced",
  });

  const result = useMemo(() => calculateSoftwareCostBand(input, software), [input, software]);

  function updateNumber(key: "members" | "instructorsAdmins" | "locations", value: number) {
    setInput((current) => ({ ...current, [key]: Number.isFinite(value) ? Math.max(0, value) : 0 }));
  }

  function toggleNeed(need: PricingNeedKey) {
    setInput((current) => ({
      ...current,
      needs: {
        ...current.needs,
        [need]: !current.needs[need],
      },
    }));
  }

  function setBudgetSensitivity(value: BudgetSensitivity) {
    setInput((current) => ({ ...current, budgetSensitivity: value }));
  }

  function trackCompletion() {
    trackCalculatorCompleted({
      likelyTier: result.likelyTier,
      complexityScore: result.complexityScore,
      resultIds: result.softwareOptions.map((item) => item.id),
      selectedNeedCount: Object.values(input.needs).filter(Boolean).length,
      locations: input.locations,
      budgetSensitivity: input.budgetSensitivity,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[24rem_minmax(0,1fr)]">
      <Card className="h-fit space-y-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-100 text-sky-800">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Cost Inputs</h2>
            <p className="text-sm leading-6 text-zinc-500">Broad GBP planning bands, not exact vendor pricing.</p>
          </div>
        </div>

        <div className="grid gap-4">
          <NumberField
            label="Number of members"
            value={input.members}
            min={0}
            onChange={(value) => updateNumber("members", value)}
          />
          <NumberField
            label="Number of instructors/admins"
            value={input.instructorsAdmins}
            min={1}
            onChange={(value) => updateNumber("instructorsAdmins", value)}
            helper="Include anyone who may need staff access."
          />
          <NumberField
            label="Number of locations"
            value={input.locations}
            min={1}
            onChange={(value) => updateNumber("locations", value)}
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-zinc-950">Required workflows</legend>
          <div className="grid gap-2">
            {(Object.keys(pricingNeedLabels) as PricingNeedKey[]).map((need) => (
              <label key={need} className="flex min-h-10 items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={input.needs[need]}
                  onChange={() => toggleNeed(need)}
                  className="size-4 rounded border-zinc-300 text-emerald-700"
                />
                {pricingNeedLabels[need]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-zinc-950">Budget sensitivity</legend>
          <div className="grid gap-2">
            {(Object.keys(budgetSensitivityLabels) as BudgetSensitivity[]).map((value) => (
              <label
                key={value}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm transition ${
                  input.budgetSensitivity === value
                    ? "border-zinc-900 bg-zinc-50 text-zinc-950"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                }`}
              >
                <input
                  type="radio"
                  checked={input.budgetSensitivity === value}
                  onChange={() => setBudgetSensitivity(value)}
                  className="size-4 border-zinc-300 text-emerald-700"
                />
                {budgetSensitivityLabels[value]}
              </label>
            ))}
          </div>
        </fieldset>
      </Card>

      <section className="space-y-6">
        <Card className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-500">Likely software tier</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950">{result.likelyTier}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                This is a planning estimate in GBP. It can still be useful for global English-speaking owners as a relative cost band.
              </p>
            </div>
            <ScoreBadge score={result.complexityScore} label="Complexity" />
          </div>

          {result.warning ? (
            <div className="flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>{result.warning}</p>
            </div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">What drives the estimate</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
                {result.costDrivers.map((driver) => (
                  <li key={driver} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-700" aria-hidden="true" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">Recommended priorities</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
                {result.recommendedFeaturePriorities.map((priority) => (
                  <li key={priority} className="flex gap-2">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PricingNote><span>{result.paymentFeeNote}</span><br /><span className="font-medium text-zinc-950">{result.disclaimer}</span></PricingNote>
        </Card>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-950">Software Options That May Fit</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Options are matched by scale and selected workflows. Provider-specific prices are shown only when marked known in the software data.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {result.softwareOptions.map((option) => (
              <Card key={option.id} className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950">{option.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">Fit signal {option.fitScore}/100</p>
                  </div>
                  <Link href={`/software/${option.slug}`} className="text-sm font-semibold text-emerald-800 hover:text-emerald-900">
                    Profile
                  </Link>
                </div>
                <p className="text-sm leading-6 text-zinc-600">{option.pricingNote}</p>
                <p className="text-sm leading-6 text-amber-800">{option.caveat}</p>
                {option.matchedFeatures.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {option.matchedFeatures.slice(0, 5).map((feature) => (
                      <Badge key={feature} tone="green">
                        {featureLabels[feature]}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Turn this estimate into a shortlist</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-700">Use the quiz for fit-based recommendations, or browse the full software directory.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quiz" onClick={trackCompletion}>
              Go to Quiz
            </ButtonLink>
            <ButtonLink href="/software" variant="secondary" onClick={trackCompletion}>
              Browse Software
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function NumberField({ label, value, min, onChange, helper }: NumberFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-800">
      {label}
      <input
        type="number"
        min={min}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="min-h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-950"
      />
      {helper ? <span className="text-xs leading-5 text-zinc-500">{helper}</span> : null}
    </label>
  );
}





