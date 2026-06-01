"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, RotateCcw, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AffiliateButton } from "@/components/affiliate/AffiliateButton";
import { Badge } from "@/components/ui/Badge";
import { PricingNote } from "@/components/ui/PricingNote";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ComparisonPage } from "@/data/comparisonPages";
import { featureLabels, type Software } from "@/data/software";
import { trackQuizCompleted, trackQuizStarted } from "@/lib/analytics";
import {
  rankSoftwareForQuiz,
  type QuizAnswers,
  type QuizBeltNeed,
  type QuizBudget,
  type QuizGymSize,
  type QuizGymType,
  type QuizNeed,
  type QuizProblem,
  type QuizRecommendation,
  type QuizTechnicalLevel,
} from "@/lib/scoring";

const initialAnswers: QuizAnswers = {
  gymType: "BJJ",
  gymSize: "under_50",
  biggestProblem: "admin_time",
  onlinePayments: "yes",
  classBooking: "not_sure",
  beltTracking: "nice_to_have",
  budget: "not_sure",
  technicalLevel: "simplest",
};

type Option<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

const gymTypeOptions: Option<QuizGymType>[] = [
  { value: "BJJ", label: "BJJ" },
  { value: "MMA", label: "MMA" },
  { value: "Boxing", label: "Boxing" },
  { value: "Karate", label: "Karate" },
  { value: "Taekwondo", label: "Taekwondo" },
  { value: "Judo", label: "Judo" },
  { value: "General martial arts", label: "General martial arts" },
  { value: "Other", label: "Other" },
];

const gymSizeOptions: Option<QuizGymSize>[] = [
  { value: "solo_instructor", label: "Solo instructor" },
  { value: "under_50", label: "Under 50 members" },
  { value: "members_50_150", label: "50-150 members" },
  { value: "members_150_500", label: "150-500 members" },
  { value: "multiple_locations", label: "Multiple locations" },
];

const problemOptions: Option<QuizProblem>[] = [
  { value: "payments", label: "Taking payments" },
  { value: "bookings", label: "Managing bookings" },
  { value: "attendance", label: "Tracking attendance" },
  { value: "waivers", label: "Handling waivers" },
  { value: "communication", label: "Member communication" },
  { value: "reporting", label: "Reporting" },
  { value: "spreadsheets", label: "Replacing spreadsheets" },
  { value: "admin_time", label: "Reducing admin time" },
];

const needOptions: Option<QuizNeed>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
];

const beltOptions: Option<QuizBeltNeed>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "nice_to_have", label: "Nice to have" },
];

const budgetOptions: Option<QuizBudget>[] = [
  { value: "lowest", label: "As low as possible" },
  { value: "under_50", label: "Under £50/month" },
  { value: "50_100", label: "£50-100/month" },
  { value: "100_250", label: "£100-250/month" },
  { value: "250_plus", label: "£250+/month" },
  { value: "not_sure", label: "Not sure" },
];

const technicalOptions: Option<QuizTechnicalLevel>[] = [
  { value: "simplest", label: "I want the simplest option" },
  { value: "comfortable", label: "I am comfortable setting things up" },
  { value: "advanced", label: "I want advanced automation" },
];

type QuizFormProps = {
  software: Software[];
  comparisonPages: ComparisonPage[];
};

type QuestionGroupProps<T extends string> = {
  number: number;
  title: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

function QuestionGroup<T extends string>({ number, title, value, options, onChange }: QuestionGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <legend className="flex gap-3 text-base font-semibold text-zinc-950">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-sm text-emerald-800">
          {number}
        </span>
        {title}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <label
              key={option.value}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-3 py-2 text-sm transition ${
                selected
                  ? "border-zinc-900 bg-zinc-50 text-zinc-950"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              <input
                type="radio"
                checked={selected}
                onChange={() => onChange(option.value)}
                className="size-4 border-zinc-300 text-emerald-700"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function confidenceTone(confidence: QuizRecommendation["confidence"]) {
  if (confidence === "high") return "green";
  if (confidence === "medium") return "blue";
  return "amber";
}

function getSoftwareName(software: Software[], id: string) {
  return software.find((item) => item.id === id)?.name ?? id;
}

function getRelatedComparisons(result: QuizRecommendation, comparisonPages: ComparisonPage[]) {
  return comparisonPages
    .filter((page) => page.softwareAId === result.software.id || page.softwareBId === result.software.id)
    .slice(0, 2);
}

function ResultCard({
  result,
  rank,
  comparisonPages,
  software,
}: {
  result: QuizRecommendation;
  rank: number;
  comparisonPages: ComparisonPage[];
  software: Software[];
}) {
  const comparisons = getRelatedComparisons(result, comparisonPages);

  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Recommendation #{rank}</p>
          <h3 className="mt-1 text-2xl font-semibold text-zinc-950">{result.software.name}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{result.software.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ScoreBadge score={Math.round(result.score / 10)} label="Fit" />
          <Badge tone={confidenceTone(result.confidence)}>Confidence: {result.confidence}</Badge>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-zinc-950">Why it was recommended</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            {result.reasons.map((reason) => (
              <li key={reason} className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-950">Trade-offs to check</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            {result.tradeOffs.map((tradeOff) => (
              <li key={tradeOff} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                <span>{tradeOff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {result.matchedFeatures.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {result.matchedFeatures.slice(0, 6).map((feature) => (
            <Badge key={feature} tone="green">
              {featureLabels[feature]}
            </Badge>
          ))}
        </div>
      ) : null}

      <PricingNote><span className="font-semibold">Pricing caveat:</span> {result.pricingCaveat}</PricingNote>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AffiliateButton linkSlug={result.software.slug} softwareId={result.software.id} sourcePage="quiz" ctaLocation="result_card" label={`Visit ${result.software.name}`} />
        <Link
          href={`/software/${result.software.slug}`}
          className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Read Profile
        </Link>
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/compare/${comparison.slug}`}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            {getSoftwareName(software, comparison.softwareAId)} vs {getSoftwareName(software, comparison.softwareBId)}
          </Link>
        ))}
      </div>
    </Card>
  );
}

export function QuizForm({ software, comparisonPages }: QuizFormProps) {
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);
  const hasTrackedStart = useRef(false);

  const results = useMemo(() => rankSoftwareForQuiz(software, answers, 3), [answers, software]);

  function setAnswer<Key extends keyof QuizAnswers>(key: Key, value: QuizAnswers[Key]) {
    if (!hasTrackedStart.current) {
      trackQuizStarted();
      hasTrackedStart.current = true;
    }

    setAnswers((current) => ({ ...current, [key]: value }));
    setShowResults(false);
  }

  function showRecommendations() {
    setShowResults(true);
    trackQuizCompleted(results.map((result) => result.software.id));
  }

  function restartQuiz() {
    setAnswers(initialAnswers);
    setShowResults(false);
  }

  return (
    <div className="space-y-8">
      <Card className="space-y-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-800">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">Software Fit Quiz</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Results are scored from static software data. No answers are stored, no account is created, and no email is requested.
            </p>
          </div>
        </div>

        <div className="grid gap-7">
          <QuestionGroup
            number={1}
            title="What type of gym do you run?"
            value={answers.gymType}
            options={gymTypeOptions}
            onChange={(value) => setAnswer("gymType", value)}
          />
          <QuestionGroup
            number={2}
            title="How large is your gym?"
            value={answers.gymSize}
            options={gymSizeOptions}
            onChange={(value) => setAnswer("gymSize", value)}
          />
          <QuestionGroup
            number={3}
            title="What is your biggest operational problem?"
            value={answers.biggestProblem}
            options={problemOptions}
            onChange={(value) => setAnswer("biggestProblem", value)}
          />
          <QuestionGroup
            number={4}
            title="Do you need online payments?"
            value={answers.onlinePayments}
            options={needOptions}
            onChange={(value) => setAnswer("onlinePayments", value)}
          />
          <QuestionGroup
            number={5}
            title="Do you need class booking?"
            value={answers.classBooking}
            options={needOptions}
            onChange={(value) => setAnswer("classBooking", value)}
          />
          <QuestionGroup
            number={6}
            title="Do you need belt/progress tracking?"
            value={answers.beltTracking}
            options={beltOptions}
            onChange={(value) => setAnswer("beltTracking", value)}
          />
          <QuestionGroup
            number={7}
            title="What is your monthly budget?"
            value={answers.budget}
            options={budgetOptions}
            onChange={(value) => setAnswer("budget", value)}
          />
          <QuestionGroup
            number={8}
            title="How technical are you?"
            value={answers.technicalLevel}
            options={technicalOptions}
            onChange={(value) => setAnswer("technicalLevel", value)}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm leading-6 text-zinc-600">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <span>Deterministic scoring only. Affiliate availability is used only as a tiny tie-breaker when fit is otherwise equal.</span>
          </div>
          <Button type="button" onClick={showRecommendations}>
            Show Recommendations
          </Button>
        </div>
      </Card>

      {showResults ? (
        <section className="space-y-5" aria-live="polite">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-950">Recommended Shortlist</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Use these as a shortlist, then verify current pricing, features, and terms on each provider website.
              </p>
            </div>
            <Button type="button" variant="secondary" icon={<RotateCcw className="size-4" />} onClick={restartQuiz}>
              Start Over
            </Button>
          </div>
          <div className="grid gap-5">
            {results.map((result, index) => (
              <ResultCard
                key={result.software.id}
                result={result}
                rank={index + 1}
                comparisonPages={comparisonPages}
                software={software}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}





