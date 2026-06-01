import type { GymSize, Software, SoftwareFeatureKey } from "@/data/software";

export type PricingTier =
  | "free/very low cost"
  | "under £50/month"
  | "£50-100/month"
  | "£100-250/month"
  | "£250+/month"
  | "custom quote likely";

export type BudgetSensitivity = "very_sensitive" | "balanced" | "flexible";

export type PricingCalculatorInput = {
  members: number;
  instructorsAdmins: number;
  locations: number;
  needs: Record<PricingNeedKey, boolean>;
  budgetSensitivity: BudgetSensitivity;
};

export type PricingNeedKey =
  | "onlinePayments"
  | "recurringBilling"
  | "classBooking"
  | "attendanceTracking"
  | "waiverManagement"
  | "memberCommunication"
  | "reporting"
  | "mobileApp"
  | "beltTracking";

export type PricingCalculatorResult = {
  likelyTier: PricingTier;
  complexityScore: number;
  costDrivers: string[];
  recommendedFeaturePriorities: string[];
  warning: string | null;
  paymentFeeNote: string;
  disclaimer: string;
  softwareOptions: PricingSoftwareOption[];
};

export type PricingSoftwareOption = {
  id: string;
  name: string;
  slug: string;
  fitScore: number;
  pricingNote: string;
  caveat: string;
  matchedFeatures: SoftwareFeatureKey[];
};

export const pricingAssumptions = {
  memberBands: [
    { max: 25, score: 0, driver: "Very small member base usually keeps software needs light." },
    { max: 50, score: 1, driver: "Under 50 members can often start with lower-cost plans if workflows are simple." },
    { max: 150, score: 2, driver: "50-150 members usually increases the value of billing, booking, and attendance workflows." },
    { max: 500, score: 4, driver: "150-500 members often pushes gyms toward more structured plans and automation." },
    { max: Number.POSITIVE_INFINITY, score: 6, driver: "Large member counts often require higher-tier plans or sales-assisted setup." },
  ],
  adminBands: [
    { max: 2, score: 0, driver: "A small staff can usually keep permissions and setup simpler." },
    { max: 5, score: 1, driver: "Several instructors or admins may require stronger staff access and reporting controls." },
    { max: Number.POSITIVE_INFINITY, score: 2, driver: "Larger admin teams may need more advanced permissions, reporting, or onboarding support." },
  ],
  locationBands: [
    { max: 1, score: 0, driver: "Single-location gyms usually have simpler software requirements." },
    { max: 2, score: 3, driver: "Multiple locations often increase plan complexity and reporting needs." },
    { max: Number.POSITIVE_INFINITY, score: 5, driver: "Several locations can make custom quotes or higher-tier plans more likely." },
  ],
  needScores: {
    onlinePayments: 1,
    recurringBilling: 2,
    classBooking: 2,
    attendanceTracking: 1,
    waiverManagement: 1,
    memberCommunication: 1,
    reporting: 2,
    mobileApp: 2,
    beltTracking: 1,
  } satisfies Record<PricingNeedKey, number>,
};

export const pricingNeedLabels: Record<PricingNeedKey, string> = {
  onlinePayments: "Online payments",
  recurringBilling: "Recurring billing",
  classBooking: "Class booking",
  attendanceTracking: "Attendance tracking",
  waiverManagement: "Waiver management",
  memberCommunication: "Member communication",
  reporting: "Reporting",
  mobileApp: "Mobile app",
  beltTracking: "Belt/progress tracking",
};

const needFeatureMap: Record<PricingNeedKey, SoftwareFeatureKey> = {
  onlinePayments: "payments",
  recurringBilling: "recurringBilling",
  classBooking: "booking",
  attendanceTracking: "attendance",
  waiverManagement: "waivers",
  memberCommunication: "communication",
  reporting: "reporting",
  mobileApp: "mobileApp",
  beltTracking: "beltTracking",
};

function getBandScore(value: number, bands: Array<{ max: number; score: number; driver: string }>) {
  return bands.find((band) => value <= band.max) ?? bands.at(-1)!;
}

function tierFromScore(score: number, input: PricingCalculatorInput): PricingTier {
  if (input.locations >= 4 || input.members > 750) {
    return "custom quote likely";
  }

  if (input.locations > 1 && score >= 12) {
    return "custom quote likely";
  }

  if (score <= 2) return "free/very low cost";
  if (score <= 4) return "under £50/month";
  if (score <= 7) return "£50-100/month";
  if (score <= 11) return "£100-250/month";
  if (score <= 15) return "£250+/month";
  return "custom quote likely";
}

function gymSizesForInput(input: PricingCalculatorInput): GymSize[] {
  if (input.locations > 1) return ["multi-location", "enterprise"];
  if (input.members <= 25) return ["solo", "small"];
  if (input.members <= 150) return ["small", "growing"];
  if (input.members <= 500) return ["growing", "multi-location"];
  return ["multi-location", "enterprise"];
}

function featurePriorities(input: PricingCalculatorInput) {
  const selectedNeeds = (Object.keys(input.needs) as PricingNeedKey[]).filter((need) => input.needs[need]);

  return selectedNeeds.map((need) => pricingNeedLabels[need]);
}

function warningFor(input: PricingCalculatorInput, tier: PricingTier, selectedNeedCount: number) {
  if (tier === "custom quote likely") {
    return "Your scale or location count suggests that sales-assisted plans, onboarding fees, or custom quotes may be more likely.";
  }

  if (input.budgetSensitivity === "very_sensitive" && (tier === "£100-250/month" || tier === "£250+/month")) {
    return "Your requirements may point above a very low-cost budget. Prioritise must-have workflows first and verify plan limits carefully.";
  }

  if (selectedNeedCount >= 7) {
    return "Selecting many advanced workflows can push software into higher-tier plans even when member count is modest.";
  }

  if (input.locations > 1) {
    return "Multiple locations can change pricing and feature availability. Check provider terms before relying on this estimate.";
  }

  return null;
}

function softwareFitScore(software: Software, input: PricingCalculatorInput) {
  const targetSizes = gymSizesForInput(input);
  const selectedNeeds = (Object.keys(input.needs) as PricingNeedKey[]).filter((need) => input.needs[need]);
  const matchedFeatures: SoftwareFeatureKey[] = [];
  let score = software.scores.overall * 5;

  if (targetSizes.some((size) => software.targetGymSizes.includes(size))) {
    score += 14;
  }

  selectedNeeds.forEach((need) => {
    const feature = needFeatureMap[need];
    const support = software.features[feature];

    if (support === "yes") {
      score += 8;
      matchedFeatures.push(feature);
    } else if (support === "partial") {
      score += 5;
      matchedFeatures.push(feature);
    } else if (support === "unknown") {
      score += 1;
    } else {
      score -= 3;
    }
  });

  if (input.locations > 1 && (software.features.multiLocation === "yes" || software.features.multiLocation === "partial")) {
    score += 6;
  }

  if (input.budgetSensitivity === "very_sensitive") {
    if (software.pricingStatus === "unknown" || software.pricingStatus === "custom_quote") {
      score -= 8;
    }

    if (software.scores.setupComplexity >= 7) {
      score -= 5;
    }
  }

  return {
    fitScore: Math.max(0, Math.min(100, Math.round(score))),
    matchedFeatures,
  };
}

function pricingNoteForSoftware(software: Software) {
  if (software.pricingStatus === "known") {
    return software.pricingNotes;
  }

  if (software.pricingStatus === "estimated") {
    return "Pricing is estimated in the software data and should be checked before relying on it.";
  }

  if (software.pricingStatus === "custom_quote") {
    return "Pricing may require a quote or direct provider verification.";
  }

  return "Pricing is not verified in the software data. Check the provider website for current costs.";
}

export function calculateSoftwareCostBand(input: PricingCalculatorInput, software: Software[]): PricingCalculatorResult {
  const memberBand = getBandScore(input.members, pricingAssumptions.memberBands);
  const adminBand = getBandScore(input.instructorsAdmins, pricingAssumptions.adminBands);
  const locationBand = getBandScore(input.locations, pricingAssumptions.locationBands);
  const selectedNeeds = (Object.keys(input.needs) as PricingNeedKey[]).filter((need) => input.needs[need]);
  const needsScore = selectedNeeds.reduce((total, need) => total + pricingAssumptions.needScores[need], 0);
  const budgetAdjustment = input.budgetSensitivity === "very_sensitive" ? -1 : input.budgetSensitivity === "flexible" ? 1 : 0;
  const complexityScore = Math.max(0, memberBand.score + adminBand.score + locationBand.score + needsScore + budgetAdjustment);
  const likelyTier = tierFromScore(complexityScore, input);
  const selectedPriorityLabels = featurePriorities(input);

  const costDrivers = [memberBand.driver, adminBand.driver, locationBand.driver];

  if (selectedNeeds.length > 0) {
    costDrivers.push(
      `Selected workflows add cost pressure: ${selectedNeeds.map((need) => pricingNeedLabels[need]).join(", ")}.`,
    );
  }

  if (input.needs.onlinePayments || input.needs.recurringBilling) {
    costDrivers.push("Payment and recurring billing tools can also involve separate payment-processing fees.");
  }

  const softwareOptions = software
    .map((item) => {
      const fit = softwareFitScore(item, input);

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        fitScore: fit.fitScore,
        pricingNote: pricingNoteForSoftware(item),
        caveat:
          item.pricingStatus === "known"
            ? "Use the listed pricing note as a starting point, then verify current provider terms."
            : "Do not treat this as provider-specific pricing. Current pricing needs verification.",
        matchedFeatures: fit.matchedFeatures,
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 4);

  return {
    likelyTier,
    complexityScore,
    costDrivers,
    recommendedFeaturePriorities: selectedPriorityLabels.length
      ? selectedPriorityLabels
      : ["Member management", "Clear pricing", "Low setup complexity"],
    warning: warningFor(input, likelyTier, selectedNeeds.length),
    paymentFeeNote: "Payment-processing fees may be separate from software subscription pricing.",
    disclaimer:
      "Software pricing changes frequently. Use this as a planning estimate and check provider websites for current pricing.",
    softwareOptions,
  };
}
