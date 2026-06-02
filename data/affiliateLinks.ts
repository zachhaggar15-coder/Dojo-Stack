export type AffiliateStatus = "verified" | "pending" | "uncertain_after_trial" | "not_available" | "unknown";
export type AffiliateAccessType = "public_signup" | "free_signup" | "free_trial_access" | "paid_required" | "unclear" | "unknown";
export type CommissionType = "recurring" | "one_time" | "unknown" | "none";

export type AffiliateEntry = {
  softwareId: string;
  slug: string;
  displayName: string;
  destinationUrl: string | null;
  fallbackUrl: string;
  affiliateStatus: AffiliateStatus;
  accessType: AffiliateAccessType;
  commissionType: CommissionType;
  commissionNotes: string;
  lastChecked: string;
  riskNotes: string[];
};

type AffiliateEntryInput = Omit<AffiliateEntry, "destinationUrl" | "commissionType" | "commissionNotes" | "lastChecked"> &
  Partial<Pick<AffiliateEntry, "destinationUrl" | "commissionType" | "commissionNotes" | "lastChecked">>;

const makeAffiliateEntry = ({
  destinationUrl = null,
  commissionType = "unknown",
  commissionNotes = "Commission details have not been verified. Do not publish commission claims until terms are confirmed.",
  lastChecked = "2026-05-27",
  ...entry
}: AffiliateEntryInput): AffiliateEntry => ({
  ...entry,
  // Paste real affiliate/referral URLs into each provider entry only after verification.
  destinationUrl,
  commissionType,
  commissionNotes,
  lastChecked,
});

export const affiliateLinks: Record<string, AffiliateEntry> = {
  gymdesk: makeAffiliateEntry({
    softwareId: "gymdesk",
    slug: "gymdesk",
    displayName: "Gymdesk",
    destinationUrl: "https://app.gymdesk.com/a/AvLyE",
    fallbackUrl: "https://gymdesk.com",
    affiliateStatus: "verified",
    accessType: "free_trial_access",
    commissionType: "unknown",
    commissionNotes: "Affiliate URL provided by the site owner. Commission terms have not been provided, so do not publish commission claims.",
    lastChecked: "2026-06-02",
    riskNotes: [
      "Affiliate URL provided by the site owner on 2026-06-02.",
      "Commission terms and long-term dashboard access still require manual verification before publishing monetisation details.",
    ],
  }),
  "zen-planner": makeAffiliateEntry({
    softwareId: "zen-planner",
    slug: "zen-planner",
    displayName: "Zen Planner",
    fallbackUrl: "https://zenplanner.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  pushpress: makeAffiliateEntry({
    softwareId: "pushpress",
    slug: "pushpress",
    displayName: "PushPress",
    fallbackUrl: "https://pushpress.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  teamup: makeAffiliateEntry({
    softwareId: "teamup",
    slug: "teamup",
    displayName: "TeamUp",
    fallbackUrl: "https://goteamup.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  mindbody: makeAffiliateEntry({
    softwareId: "mindbody",
    slug: "mindbody",
    displayName: "Mindbody",
    fallbackUrl: "https://www.mindbodyonline.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  glofox: makeAffiliateEntry({
    softwareId: "glofox",
    slug: "glofox",
    displayName: "Glofox",
    fallbackUrl: "https://www.glofox.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  wodify: makeAffiliateEntry({
    softwareId: "wodify",
    slug: "wodify",
    displayName: "Wodify",
    fallbackUrl: "https://www.wodify.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
  wellnessliving: makeAffiliateEntry({
    softwareId: "wellnessliving",
    slug: "wellnessliving",
    displayName: "WellnessLiving",
    fallbackUrl: "https://www.wellnessliving.com",
    affiliateStatus: "unknown",
    accessType: "unknown",
    riskNotes: ["No verified special outbound URL has been provided; use the normal website fallback."],
  }),
};
