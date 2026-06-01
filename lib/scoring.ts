import type { FeatureSupport, GymSize, GymType, PricingStatus, Software, SoftwareFeatureKey } from "@/data/software";

export type ScoreInput = {
  targetGymTypes?: GymType[];
  targetGymSizes?: GymSize[];
  priorityFeatures?: SoftwareFeatureKey[];
};

export type FitScore = {
  score: number;
  confidence: "low" | "medium";
  reasons: string[];
  cautions: string[];
};

export type QuizGymType = GymType | "Other";
export type QuizGymSize = "solo_instructor" | "under_50" | "members_50_150" | "members_150_500" | "multiple_locations";
export type QuizProblem =
  | "payments"
  | "bookings"
  | "attendance"
  | "waivers"
  | "communication"
  | "reporting"
  | "spreadsheets"
  | "admin_time";
export type QuizNeed = "yes" | "no" | "not_sure";
export type QuizBeltNeed = "yes" | "no" | "nice_to_have";
export type QuizBudget = "lowest" | "under_50" | "50_100" | "100_250" | "250_plus" | "not_sure";
export type QuizTechnicalLevel = "simplest" | "comfortable" | "advanced";

export type QuizAnswers = {
  gymType: QuizGymType;
  gymSize: QuizGymSize;
  biggestProblem: QuizProblem;
  onlinePayments: QuizNeed;
  classBooking: QuizNeed;
  beltTracking: QuizBeltNeed;
  budget: QuizBudget;
  technicalLevel: QuizTechnicalLevel;
};

export type QuizRecommendation = {
  software: Software;
  score: number;
  rawFitScore: number;
  confidence: "low" | "medium" | "high";
  reasons: string[];
  tradeOffs: string[];
  pricingCaveat: string;
  matchedFeatures: SoftwareFeatureKey[];
  needsVerification: SoftwareFeatureKey[];
};

const featureWeights: Record<FeatureSupport, number> = {
  yes: 1,
  partial: 0.6,
  unknown: 0.15,
  no: 0,
};

const quizFeatureWeights: Record<FeatureSupport, number> = {
  yes: 8,
  partial: 5,
  unknown: 1,
  no: -4,
};

const sizeMap: Record<QuizGymSize, GymSize[]> = {
  solo_instructor: ["solo"],
  under_50: ["solo", "small"],
  members_50_150: ["small", "growing"],
  members_150_500: ["growing", "multi-location"],
  multiple_locations: ["multi-location", "enterprise"],
};

const problemFeatureMap: Record<QuizProblem, SoftwareFeatureKey[]> = {
  payments: ["payments", "recurringBilling"],
  bookings: ["booking"],
  attendance: ["attendance", "reporting"],
  waivers: ["waivers", "memberManagement"],
  communication: ["communication", "memberManagement"],
  reporting: ["reporting"],
  spreadsheets: ["memberManagement", "reporting", "attendance"],
  admin_time: ["recurringBilling", "booking", "memberManagement", "communication", "reporting"],
};

const budgetCeilings: Partial<Record<QuizBudget, number>> = {
  under_50: 50,
  "50_100": 100,
  "100_250": 250,
};

function uniqueFeatures(features: SoftwareFeatureKey[]) {
  return Array.from(new Set(features));
}

function featureSupportLabel(support: FeatureSupport) {
  const labels: Record<FeatureSupport, string> = {
    yes: "listed",
    partial: "partially listed",
    unknown: "not yet verified",
    no: "not listed",
  };

  return labels[support];
}


function pricingPenalty(pricingStatus: PricingStatus, budget: QuizBudget, startingPriceMonthly: number | null) {
  const highBudgetSensitivity = budget === "lowest" || budget === "under_50";

  if (budget === "not_sure" || budget === "250_plus") {
    return 0;
  }

  if (pricingStatus === "unknown" || pricingStatus === "custom_quote") {
    return highBudgetSensitivity ? -10 : -5;
  }

  if (pricingStatus === "estimated") {
    return highBudgetSensitivity ? -6 : -3;
  }

  const ceiling = budgetCeilings[budget];

  if (typeof ceiling === "number" && typeof startingPriceMonthly === "number") {
    return startingPriceMonthly <= ceiling ? 4 : -8;
  }

  return 0;
}

function pricingCaveat(software: Software, budget: QuizBudget) {
  if (software.pricingStatus === "known") {
    return software.pricingNotes;
  }

  if (budget === "lowest" || budget === "under_50") {
    return "Pricing is not fully verified, so budget-sensitive gyms should check current costs, plan limits, and payment fees before shortlisting.";
  }

  if (software.pricingStatus === "custom_quote") {
    return "Pricing appears to require provider verification or a quote. Confirm current costs before making a decision.";
  }

  return "Current pricing needs manual verification from the provider website before relying on this recommendation.";
}

export function scoreSoftwareForNeeds(software: Software, input: ScoreInput): FitScore {
  const reasons: string[] = [];
  const cautions: string[] = [];
  let score = software.scores.overall * 4;

  const typeMatches = input.targetGymTypes?.filter((gymType) => software.targetGymTypes.includes(gymType));

  if (typeMatches?.length) {
    score += 25;
    reasons.push(`Gym type match: ${typeMatches.join(", ")}`);
  }

  const sizeMatches = input.targetGymSizes?.filter((size) => software.targetGymSizes.includes(size));

  if (sizeMatches?.length) {
    score += 15;
    reasons.push(`Gym size match: ${sizeMatches.join(", ")}`);
  }

  if (input.priorityFeatures?.length) {
    const featureScore =
      input.priorityFeatures.reduce((total, feature) => total + featureWeights[software.features[feature]], 0) /
      input.priorityFeatures.length;

    score += Math.round(featureScore * 20);

    if (featureScore >= 0.5) {
      reasons.push("Priority workflows have at least partial support in the editable data model.");
    }

    const unknownFeatures = input.priorityFeatures.filter((feature) => software.features[feature] === "unknown");

    if (unknownFeatures.length) {
      cautions.push("Some priority workflows are still marked as needing manual verification.");
    }
  }

  if (software.uncertaintyNotes.length > 0) {
    cautions.push(software.uncertaintyNotes[0]);
  }

  return {
    score: Math.min(Math.round(score), 100),
    confidence: software.uncertaintyNotes.length > 2 ? "low" : "medium",
    reasons,
    cautions,
  };
}

export function scoreSoftwareForQuiz(software: Software, answers: QuizAnswers): QuizRecommendation {
  const reasons: string[] = [];
  const tradeOffs: string[] = [];
  const matchedFeatures: SoftwareFeatureKey[] = [];
  const needsVerification: SoftwareFeatureKey[] = [];
  let score = software.scores.overall * 5;

  if (answers.gymType !== "Other") {
    if (software.targetGymTypes.includes(answers.gymType)) {
      score += 18;
      reasons.push(`Matches your gym type: ${answers.gymType}.`);
    } else if (software.targetGymTypes.includes("General martial arts")) {
      score += 8;
      tradeOffs.push(`Not specifically listed for ${answers.gymType}, but it has a general martial arts fit signal.`);
    } else {
      score -= 4;
      tradeOffs.push(`Gym type fit for ${answers.gymType} needs verification.`);
    }
  } else {
    score += 4;
    tradeOffs.push("No exact gym type was selected, so the recommendation leans on workflow fit instead.");
  }

  const targetSizes = sizeMap[answers.gymSize];
  const sizeMatches = targetSizes.filter((size) => software.targetGymSizes.includes(size));

  if (sizeMatches.length > 0) {
    score += 14;
    reasons.push("Matches the approximate size of your gym.");
  } else if (answers.gymSize === "multiple_locations") {
    score -= software.features.multiLocation === "partial" || software.features.multiLocation === "yes" ? 0 : 8;
    tradeOffs.push("Multi-location support should be verified before choosing this option.");
  } else {
    score -= 3;
    tradeOffs.push("Gym-size fit is not a clear match in the current data model.");
  }

  const priorityFeatures = uniqueFeatures([
    ...problemFeatureMap[answers.biggestProblem],
    ...(answers.onlinePayments === "yes" ? (["payments", "recurringBilling"] as SoftwareFeatureKey[]) : []),
    ...(answers.onlinePayments === "not_sure" ? (["payments"] as SoftwareFeatureKey[]) : []),
    ...(answers.classBooking === "yes" ? (["booking"] as SoftwareFeatureKey[]) : []),
    ...(answers.classBooking === "not_sure" ? (["booking"] as SoftwareFeatureKey[]) : []),
    ...(answers.beltTracking === "yes" ? (["beltTracking"] as SoftwareFeatureKey[]) : []),
    ...(answers.beltTracking === "nice_to_have" ? (["beltTracking"] as SoftwareFeatureKey[]) : []),
  ]);

  priorityFeatures.forEach((feature) => {
    const support = software.features[feature];
    const weight = quizFeatureWeights[support];
    const adjustedWeight = answers.beltTracking === "nice_to_have" && feature === "beltTracking" ? Math.round(weight / 2) : weight;

    score += adjustedWeight;

    if (support === "yes" || support === "partial") {
      matchedFeatures.push(feature);
    }

    if (support === "unknown") {
      needsVerification.push(feature);
    }
  });

  if (matchedFeatures.length > 0) {
    reasons.push(`Priority workflow support is ${featureSupportLabel("partial")} or better for ${matchedFeatures.length} selected area${matchedFeatures.length === 1 ? "" : "s"}.`);
  }

  if (needsVerification.length > 0) {
    tradeOffs.push("Some selected workflows are marked as needing verification in the software data file.");
  }

  const priceAdjustment = pricingPenalty(software.pricingStatus, answers.budget, software.startingPriceMonthly);
  score += priceAdjustment;

  if (priceAdjustment < 0) {
    tradeOffs.push("Pricing is not clear enough for the budget you selected, so this option was penalized.");
  } else if (priceAdjustment > 0) {
    reasons.push("Known pricing appears to fit the selected budget range in the editable data model.");
  }

  if (answers.technicalLevel === "simplest") {
    if (software.scores.setupComplexity >= 7) {
      score -= 12;
      tradeOffs.push("Setup may be heavier than ideal for someone who wants the simplest option.");
    } else if (software.scores.setupComplexity >= 6) {
      score -= 6;
      tradeOffs.push("Setup complexity may need a closer look.");
    } else {
      score += 5;
      reasons.push("Setup complexity signal looks more suitable for a simple workflow.");
    }

    if (software.scores.easeOfUse >= 7) {
      score += 5;
      reasons.push("Ease-of-use signal is comparatively strong in the editable scores.");
    }
  }

  if (answers.technicalLevel === "advanced") {
    if (software.scores.automation >= 7) {
      score += 7;
      reasons.push("Automation score is comparatively strong for advanced workflows.");
    } else if (software.scores.automation <= 5) {
      score -= 4;
      tradeOffs.push("Automation depth may be limited based on the current score." );
    }
  }

  if (answers.technicalLevel === "comfortable") {
    score += software.scores.setupComplexity <= 6 ? 2 : -2;
  }

  if (software.uncertaintyNotes.length > 0) {
    tradeOffs.push(software.uncertaintyNotes[0]);
  }

  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));
  const uncertaintyCount = needsVerification.length + (software.pricingStatus === "unknown" || software.pricingStatus === "custom_quote" ? 1 : 0);
  const confidence = uncertaintyCount >= 4 || software.uncertaintyNotes.length > 3 ? "low" : uncertaintyCount >= 2 ? "medium" : "high";

  return {
    software,
    score: boundedScore,
    rawFitScore: boundedScore,
    confidence,
    reasons: reasons.length ? reasons.slice(0, 4) : ["This option has a general fit signal based on editable software scores."],
    tradeOffs: tradeOffs.length ? tradeOffs.slice(0, 4) : ["Provider details still need manual verification before choosing."],
    pricingCaveat: pricingCaveat(software, answers.budget),
    matchedFeatures,
    needsVerification,
  };
}

export function rankSoftwareForQuiz(software: Software[], answers: QuizAnswers, limit = 3) {
  return software
    .map((item) => scoreSoftwareForQuiz(item, answers))
    .sort((a, b) => {
      const fitDifference = b.score - a.score;

      if (fitDifference !== 0) {
        return fitDifference;
      }

      return (
        b.software.scores.martialArtsFit - a.software.scores.martialArtsFit ||
        b.software.scores.valueForMoney - a.software.scores.valueForMoney ||
        b.software.scores.easeOfUse - a.software.scores.easeOfUse ||
        a.software.name.localeCompare(b.software.name)
      );
    })
    .slice(0, limit);
}
