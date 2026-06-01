import { bestSoftwarePages } from "@/data/bestSoftwarePages";
import { comparisonPages } from "@/data/comparisonPages";
import { software, type GymType, type Software, type SoftwareFeatureKey } from "@/data/software";
import { scoreSoftwareForNeeds } from "@/lib/scoring";

export function getAllSoftware() {
  return software;
}

export function getSoftwareBySlug(slug: string) {
  return software.find((item) => item.slug === slug);
}

export function getSoftwareById(id: string) {
  return software.find((item) => item.id === id);
}

export function getVerifiedAffiliateSoftware() {
  return software.filter((item) => item.affiliateStatus === "verified" && Boolean(item.affiliateUrl));
}

export function getSoftwareByGymType(gymType: GymType) {
  return software.filter((item) => item.targetGymTypes.includes(gymType));
}

export function getSoftwareByFeature(feature: SoftwareFeatureKey) {
  return software.filter((item) => item.features[feature] === "yes" || item.features[feature] === "partial");
}

export function getTopSoftwareForUseCase({
  gymType,
  priorityFeatures = [],
  limit = 5,
}: {
  gymType?: GymType;
  priorityFeatures?: SoftwareFeatureKey[];
  limit?: number;
}) {
  return software
    .map((item) => ({
      software: item,
      score: scoreSoftwareForNeeds(item, {
        targetGymTypes: gymType ? [gymType] : undefined,
        priorityFeatures,
      }),
    }))
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, limit);
}

export function compareSoftware(ids: string[]) {
  return ids
    .map((id) => getSoftwareById(id) ?? getSoftwareBySlug(id))
    .filter((item): item is Software => Boolean(item));
}

export function getAffiliateUrlOrFallback(item: Software) {
  return item.affiliateStatus === "verified" && item.affiliateUrl ? item.affiliateUrl : item.normalWebsiteUrl;
}

export function getSoftwareBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getSoftwareBySlug(slug))
    .filter((item): item is Software => Boolean(item));
}

export function getComparisonPageBySlug(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}

export function getBestSoftwarePageBySlug(slug: string) {
  return bestSoftwarePages.find((page) => page.slug === slug);
}

export function getSoftwareForBestPage(slug: string) {
  const page = getBestSoftwarePageBySlug(slug);

  if (!page) {
    return [];
  }

  const manuallyRanked = page.rankedSoftwareIds
    .map((id, index) => {
      const item = getSoftwareById(id);

      if (!item) {
        return null;
      }

      return {
        software: item,
        rank: index + 1,
        rankingSource: "manual_override" as const,
        score: {
          score: item.scores.overall * 10,
          confidence: "low" as const,
          reasons: [
            `Editorial rank set in data/bestSoftwarePages.ts for ${page.targetKeyword}.`,
            "Provider data still needs manual verification before publication.",
          ],
        },
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (manuallyRanked.length > 0) {
    return manuallyRanked;
  }

  // Fallback only: if a page has no manual override yet, use editable scores.
  // Affiliate status is deliberately excluded from this ranking.
  return software
    .map((item) => ({
      software: item,
      rank: 0,
      rankingSource: "score_fallback" as const,
      score: {
        score: item.scores.overall * 10,
        confidence: "low" as const,
        reasons: [
          `Score-based fallback for ${page.targetKeyword}.`,
          "Add rankedSoftwareIds in data/bestSoftwarePages.ts after manual review.",
        ],
      },
    }))
    .sort((a, b) => b.score.score - a.score.score)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

export function getComparisonPagesForSoftware(slugOrId: string) {
  const item = getSoftwareBySlug(slugOrId) ?? getSoftwareById(slugOrId);
  const softwareId = item?.id ?? slugOrId;

  return comparisonPages.filter((page) => page.softwareAId === softwareId || page.softwareBId === softwareId);
}
