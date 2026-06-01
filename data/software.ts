export type AffiliateStatus = "verified" | "pending" | "uncertain_after_trial" | "not_available" | "unknown";
export type PricingStatus = "known" | "estimated" | "unknown" | "custom_quote";
export type FeatureSupport = "yes" | "partial" | "no" | "unknown";
export type AvailabilityStatus = boolean | "unknown";

export type GymType =
  | "BJJ"
  | "MMA"
  | "Boxing"
  | "Karate"
  | "Taekwondo"
  | "Judo"
  | "General martial arts"
  | "Fitness"
  | "CrossFit"
  | "Yoga"
  | "Wellness";

export type GymSize = "solo" | "small" | "growing" | "multi-location" | "enterprise";

export type SoftwareFeatureKey =
  | "payments"
  | "recurringBilling"
  | "booking"
  | "attendance"
  | "waivers"
  | "memberManagement"
  | "communication"
  | "reporting"
  | "mobileApp"
  | "beltTracking"
  | "multiLocation"
  | "websiteBuilder"
  | "marketingAutomation";

export type SoftwareScores = {
  martialArtsFit: number;
  easeOfUse: number;
  setupComplexity: number;
  automation: number;
  valueForMoney: number;
  overall: number;
};

export type Software = {
  id: string;
  name: string;
  slug: string;
  normalWebsiteUrl: string;
  affiliateUrl: string | null;
  affiliateStatus: AffiliateStatus;
  affiliateAccessNotes: string;
  affiliateLastChecked: string;
  shortDescription: string;
  longDescription: string;
  pricingStatus: PricingStatus;
  startingPriceMonthly: number | null;
  pricingNotes: string;
  freeTrialAvailable: AvailabilityStatus;
  freePlanAvailable: AvailabilityStatus;
  targetGymTypes: GymType[];
  targetGymSizes: GymSize[];
  bestFor: string[];
  notIdealFor: string[];
  countriesSupported: string[];
  features: Record<SoftwareFeatureKey, FeatureSupport>;
  scores: SoftwareScores;
  pros: string[];
  cons: string[];
  uncertaintyNotes: string[];
  sourcesToVerify: string[];
  alternatives: string[];
  lastUpdated: string;
};

export const featureLabels: Record<SoftwareFeatureKey, string> = {
  payments: "Payments",
  recurringBilling: "Recurring billing",
  booking: "Booking",
  attendance: "Attendance",
  waivers: "Waivers",
  memberManagement: "Member management",
  communication: "Communication",
  reporting: "Reporting",
  mobileApp: "Mobile app",
  beltTracking: "Belt tracking",
  multiLocation: "Multi-location",
  websiteBuilder: "Website builder",
  marketingAutomation: "Marketing automation",
};

export const featureSupportLabels: Record<FeatureSupport, string> = {
  yes: "Listed",
  partial: "Partial",
  no: "Not listed",
  unknown: "Needs verification",
};

// Scores are editable editorial fit signals on a 1-10 scale. They are not user ratings,
// hands-on reviews, or affiliate-driven rankings. Verify provider data before publishing.
const placeholderScores = (overrides: Partial<SoftwareScores> = {}): SoftwareScores => ({
  martialArtsFit: 5,
  easeOfUse: 5,
  setupComplexity: 5,
  automation: 5,
  valueForMoney: 5,
  overall: 5,
  ...overrides,
});

const defaultFeatures: Record<SoftwareFeatureKey, FeatureSupport> = {
  payments: "unknown",
  recurringBilling: "unknown",
  booking: "unknown",
  attendance: "unknown",
  waivers: "unknown",
  memberManagement: "unknown",
  communication: "unknown",
  reporting: "unknown",
  mobileApp: "unknown",
  beltTracking: "unknown",
  multiLocation: "unknown",
  websiteBuilder: "unknown",
  marketingAutomation: "unknown",
};

const verificationNotes = [
  "Feature support is placeholder-level and needs manual verification against current vendor documentation.",
  "Pricing, trial, free plan, country coverage, and implementation details need manual verification before publication.",
];

export const software: Software[] = [
  {
    id: "gymdesk",
    name: "Gymdesk",
    slug: "gymdesk",
    normalWebsiteUrl: "https://gymdesk.com",
    affiliateUrl: null,
    affiliateStatus: "uncertain_after_trial",
    affiliateAccessNotes:
      "Referral system is accessible during a free trial, but access after the 30-day trial has not been verified. Add a real referral URL only after confirming ongoing access and terms.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Gym management software that may fit small and growing martial arts schools.",
    longDescription:
      "Gymdesk is included as a martial arts software candidate because it appears relevant for memberships, classes, payments, and day-to-day gym administration. All detailed feature and pricing claims still need source verification before publication.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Do not publish exact pricing until current Gymdesk pricing is manually verified from an official source.",
    freeTrialAvailable: true,
    freePlanAvailable: "unknown",
    targetGymTypes: ["BJJ", "MMA", "Boxing", "General martial arts", "Fitness"],
    targetGymSizes: ["solo", "small", "growing"],
    bestFor: ["Small academies wanting a broad gym-management workflow", "Owners comparing payments, attendance, and member admin in one tool"],
    notIdealFor: ["Operators that require verified enterprise workflows", "Schools that need confirmed belt-tracking behavior before shortlisting"],
    countriesSupported: ["Manual verification required"],
    features: {
      ...defaultFeatures,
      payments: "partial",
      recurringBilling: "partial",
      booking: "partial",
      attendance: "partial",
      memberManagement: "partial",
      reporting: "partial",
    },
    scores: placeholderScores({ martialArtsFit: 8, easeOfUse: 7, setupComplexity: 5, automation: 6, valueForMoney: 6, overall: 7 }),
    pros: ["Appears relevant to martial arts and fitness gym operations", "Appears relevant for core gym administration workflows"],
    cons: ["Referral access after trial is uncertain", "Exact feature support and current pricing need verification"],
    uncertaintyNotes: [
      "Current provider-link and account-access details should be checked again before launch.",
      "Belt tracking, waiver, mobile app, and marketing automation details need manual verification.",
      ...verificationNotes,
    ],
    sourcesToVerify: ["Official Gymdesk pricing page", "Official Gymdesk features pages", "Referral or affiliate dashboard terms"],
    alternatives: ["zen-planner", "teamup", "pushpress"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "zen-planner",
    name: "Zen Planner",
    slug: "zen-planner",
    normalWebsiteUrl: "https://zenplanner.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Fitness and studio management software often considered by gyms and training facilities.",
    longDescription:
      "Zen Planner is included as a general gym and studio management candidate for martial arts schools to evaluate. Treat all martial-arts-specific fit, feature support, pricing, and trial details as unverified until checked against current vendor materials.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Verify current pricing and packaging from official vendor sources before publishing.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["BJJ", "MMA", "Boxing", "General martial arts", "Fitness"],
    targetGymSizes: ["small", "growing", "multi-location"],
    bestFor: ["Studios comparing established gym-management platforms", "Owners who need member, class, and reporting workflows reviewed together"],
    notIdealFor: ["Schools that need a verified martial-arts-first product", "Owners who need public pricing before contacting sales"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, payments: "partial", recurringBilling: "partial", booking: "partial", attendance: "partial", memberManagement: "partial", reporting: "partial" },
    scores: placeholderScores({ martialArtsFit: 7, easeOfUse: 6, setupComplexity: 6, automation: 6, valueForMoney: 5, overall: 6 }),
    pros: ["Broad gym-management positioning", "Likely relevant for membership and class workflows"],
    cons: ["Martial-arts-specific workflows need verification", "Some provider details still need verification"],
    uncertaintyNotes: ["Verify whether belt tracking is native, configurable, or unavailable.", ...verificationNotes],
    sourcesToVerify: ["Official Zen Planner pricing page", "Official Zen Planner feature pages", "Affiliate/referral program availability"],
    alternatives: ["gymdesk", "mindbody", "wellnessliving"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "pushpress",
    name: "PushPress",
    slug: "pushpress",
    normalWebsiteUrl: "https://pushpress.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Gym management software commonly associated with fitness and training businesses.",
    longDescription:
      "PushPress is included as a candidate for martial arts gyms that also evaluate broader fitness gym platforms. Its current martial arts fit, feature coverage, pricing, and any referral availability require manual verification.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Verify current pricing, plan limits, add-ons, and any free plan or trial details before publishing.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["Fitness", "CrossFit", "Boxing", "MMA", "General martial arts"],
    targetGymSizes: ["small", "growing"],
    bestFor: ["Fitness-oriented gyms comparing operational tools", "Hybrid training facilities that need payments and member admin"],
    notIdealFor: ["Traditional schools that need verified belt tracking", "Enterprise operators without confirmed multi-location requirements"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, payments: "partial", recurringBilling: "partial", booking: "partial", memberManagement: "partial", mobileApp: "unknown", reporting: "partial" },
    scores: placeholderScores({ martialArtsFit: 6, easeOfUse: 6, setupComplexity: 5, automation: 6, valueForMoney: 5, overall: 6 }),
    pros: ["Relevant for fitness-style gym administration", "Potential fit for hybrid martial arts and conditioning facilities"],
    cons: ["Martial arts rank workflows need verification", "Some provider details still need verification"],
    uncertaintyNotes: ["Verify if the product supports martial arts-specific attendance and rank workflows.", ...verificationNotes],
    sourcesToVerify: ["Official PushPress pricing page", "Official PushPress feature pages", "Affiliate/referral program availability"],
    alternatives: ["gymdesk", "teamup", "wodify"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "teamup",
    name: "TeamUp",
    slug: "teamup",
    normalWebsiteUrl: "https://goteamup.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Class booking and membership software for fitness studios and training businesses.",
    longDescription:
      "TeamUp is included as a booking and membership-management candidate for martial arts clubs. Verify current feature support for payments, recurring billing, attendance, waivers, and martial-arts-specific needs before using it in recommendations.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Verify current public pricing and plan limits from official TeamUp sources before publishing.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["Boxing", "MMA", "General martial arts", "Fitness", "Yoga"],
    targetGymSizes: ["solo", "small", "growing"],
    bestFor: ["Class-based gyms that care about booking and memberships", "Small clubs comparing straightforward admin tools"],
    notIdealFor: ["Schools that need confirmed belt tracking", "Large organizations needing verified enterprise workflows"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, booking: "partial", payments: "partial", recurringBilling: "partial", attendance: "partial", memberManagement: "partial", communication: "unknown" },
    scores: placeholderScores({ martialArtsFit: 6, easeOfUse: 7, setupComplexity: 4, automation: 5, valueForMoney: 6, overall: 6 }),
    pros: ["Likely relevant for class scheduling and membership workflows", "May suit small class-based clubs"],
    cons: ["Belt tracking and deeper martial arts workflows need verification", "Some provider details still need verification"],
    uncertaintyNotes: ["Verify country support, payment processors, and waiver handling.", ...verificationNotes],
    sourcesToVerify: ["Official TeamUp pricing page", "Official TeamUp feature pages", "Affiliate/referral program availability"],
    alternatives: ["gymdesk", "pushpress", "wellnessliving"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "mindbody",
    name: "Mindbody",
    slug: "mindbody",
    normalWebsiteUrl: "https://www.mindbodyonline.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Broad wellness and fitness business software for studios and larger operators.",
    longDescription:
      "Mindbody is included as a broad wellness and fitness platform that some martial arts or boxing businesses may compare. Its fit for rank-based martial arts schools, pricing, packaging, and implementation requirements need manual verification.",
    pricingStatus: "custom_quote",
    startingPriceMonthly: null,
    pricingNotes: "Treat pricing as requiring manual verification. Do not publish exact numbers without a current official source.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["Fitness", "Wellness", "Boxing", "General martial arts"],
    targetGymSizes: ["growing", "multi-location", "enterprise"],
    bestFor: ["Larger studios evaluating broad wellness business software", "Operators that need to compare marketplace, booking, and reporting workflows"],
    notIdealFor: ["Small schools that want lightweight setup", "Rank-based academies without verified belt-tracking support"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, payments: "partial", recurringBilling: "partial", booking: "partial", reporting: "partial", mobileApp: "partial", multiLocation: "partial", marketingAutomation: "partial" },
    scores: placeholderScores({ martialArtsFit: 4, easeOfUse: 5, setupComplexity: 8, automation: 7, valueForMoney: 4, overall: 5 }),
    pros: ["Broad platform for wellness and fitness businesses", "May suit larger or multi-location operators"],
    cons: ["May be more platform than a small martial arts school needs", "Martial arts-specific workflows need verification"],
    uncertaintyNotes: ["Confirm current quote process, contract terms, and martial arts fit.", ...verificationNotes],
    sourcesToVerify: ["Official Mindbody pricing or quote materials", "Official Mindbody feature pages", "Affiliate/referral program availability"],
    alternatives: ["wellnessliving", "zen-planner", "glofox"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "glofox",
    name: "Glofox",
    slug: "glofox",
    normalWebsiteUrl: "https://www.glofox.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Fitness management software for gyms, studios, and training businesses.",
    longDescription:
      "Glofox is included as a broader fitness management platform that martial arts gym owners may encounter during research. Verify current pricing, features, country support, and martial-arts-specific fit before publishing recommendations.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Verify current pricing and packaging directly with official Glofox materials before publishing.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["Fitness", "Boxing", "MMA", "General martial arts"],
    targetGymSizes: ["small", "growing", "multi-location"],
    bestFor: ["Gyms comparing branded app, booking, and member-management workflows", "Fitness-oriented martial arts or striking studios"],
    notIdealFor: ["Traditional belt-ranking schools without verified rank support", "Owners who require confirmed public pricing"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, booking: "partial", payments: "partial", recurringBilling: "partial", memberManagement: "partial", mobileApp: "partial", reporting: "partial", marketingAutomation: "unknown" },
    scores: placeholderScores({ martialArtsFit: 5, easeOfUse: 6, setupComplexity: 6, automation: 6, valueForMoney: 5, overall: 5 }),
    pros: ["Likely relevant for gym and studio operations", "May suit branded member experience comparisons"],
    cons: ["Martial arts fit is not verified", "Some provider details still need verification"],
    uncertaintyNotes: ["Verify martial arts use cases, current feature packaging, and country coverage.", ...verificationNotes],
    sourcesToVerify: ["Official Glofox pricing page", "Official Glofox feature pages", "Affiliate/referral program availability"],
    alternatives: ["mindbody", "wellnessliving", "pushpress"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "wodify",
    name: "Wodify",
    slug: "wodify",
    normalWebsiteUrl: "https://www.wodify.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Gym software associated with fitness, performance, and class-based training businesses.",
    longDescription:
      "Wodify is included for comparison because some martial arts-adjacent facilities also evaluate performance and class-based fitness platforms. Its fit for martial arts schools, especially rank tracking and family workflows, needs manual verification.",
    pricingStatus: "unknown",
    startingPriceMonthly: null,
    pricingNotes: "Verify current pricing, plan requirements, and add-ons from official Wodify sources before publishing.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["CrossFit", "Fitness", "Boxing", "MMA"],
    targetGymSizes: ["small", "growing", "multi-location"],
    bestFor: ["Performance-oriented gyms comparing fitness operations tools", "Hybrid facilities with conditioning and martial arts programs"],
    notIdealFor: ["Traditional martial arts schools needing verified belt tracking", "Owners looking for a martial-arts-first platform"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, payments: "partial", recurringBilling: "partial", booking: "partial", attendance: "partial", memberManagement: "partial", reporting: "partial", mobileApp: "partial" },
    scores: placeholderScores({ martialArtsFit: 4, easeOfUse: 5, setupComplexity: 6, automation: 6, valueForMoney: 5, overall: 5 }),
    pros: ["Relevant for fitness and performance gym comparisons", "May fit hybrid martial arts and conditioning models"],
    cons: ["Martial arts-specific workflows need verification", "Some provider details still need verification"],
    uncertaintyNotes: ["Verify whether any martial arts-specific workflows are supported or require workarounds.", ...verificationNotes],
    sourcesToVerify: ["Official Wodify pricing page", "Official Wodify feature pages", "Affiliate/referral program availability"],
    alternatives: ["pushpress", "glofox", "teamup"],
    lastUpdated: "2026-05-27",
  },
  {
    id: "wellnessliving",
    name: "WellnessLiving",
    slug: "wellnessliving",
    normalWebsiteUrl: "https://www.wellnessliving.com",
    affiliateUrl: null,
    affiliateStatus: "unknown",
    affiliateAccessNotes: "No verified special outbound URL has been provided; use the normal website fallback.",
    affiliateLastChecked: "2026-05-27",
    shortDescription: "Business management software for wellness, fitness, and appointment or class-based businesses.",
    longDescription:
      "WellnessLiving is included as a broad wellness and fitness management platform that martial arts gyms may compare. Current pricing, implementation needs, country support, and martial-arts-specific workflows require manual verification.",
    pricingStatus: "custom_quote",
    startingPriceMonthly: null,
    pricingNotes: "Treat pricing as needing manual verification. Do not publish exact numbers without a current official source.",
    freeTrialAvailable: "unknown",
    freePlanAvailable: "unknown",
    targetGymTypes: ["Fitness", "Wellness", "Yoga", "Boxing", "General martial arts"],
    targetGymSizes: ["small", "growing", "multi-location"],
    bestFor: ["Studios comparing broader wellness management systems", "Operators evaluating booking, communication, and marketing workflows"],
    notIdealFor: ["Schools that need a simple martial-arts-first tool", "Owners who need verified public pricing before shortlisting"],
    countriesSupported: ["Manual verification required"],
    features: { ...defaultFeatures, payments: "partial", recurringBilling: "partial", booking: "partial", memberManagement: "partial", communication: "partial", reporting: "partial", marketingAutomation: "partial", mobileApp: "partial" },
    scores: placeholderScores({ martialArtsFit: 5, easeOfUse: 5, setupComplexity: 7, automation: 7, valueForMoney: 5, overall: 5 }),
    pros: ["Broad wellness and fitness workflow coverage may be useful for larger studios", "Likely relevant for booking and communication comparisons"],
    cons: ["Martial arts rank workflows need verification", "May require more setup than small schools want"],
    uncertaintyNotes: ["Confirm current pricing model, country support, and martial arts use cases.", ...verificationNotes],
    sourcesToVerify: ["Official WellnessLiving pricing or quote materials", "Official WellnessLiving feature pages", "Affiliate/referral program availability"],
    alternatives: ["mindbody", "glofox", "teamup"],
    lastUpdated: "2026-05-27",
  },
];
