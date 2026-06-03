export type ComparisonPublishStatus = "published" | "draft" | "noindex";

export type ComparisonPage = {
  slug: string;
  softwareAId: string;
  softwareBId: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  quickVerdict: string;
  chooseAIf: string[];
  chooseBIf: string[];
  considerAlternativesIf: string[];
  publishStatus: ComparisonPublishStatus;
  lastUpdated: string;
};

// Curated comparisons only. Do not auto-generate every pair; add a new object here
// only when the comparison has a real editorial purpose and enough source data to review.
export const comparisonPages: ComparisonPage[] = [
  {
    slug: "gymdesk-vs-zen-planner",
    softwareAId: "gymdesk",
    softwareBId: "zen-planner",
    metaTitle: "Gymdesk vs Zen Planner: Which Is Better for Martial Arts Gyms?",
    metaDescription:
      "Compare Gymdesk and Zen Planner for martial arts gyms, including billing, booking, attendance, pricing transparency, limitations, and cautious fit notes.",
    intro:
      "Gymdesk and Zen Planner are both relevant shortlist candidates for martial arts gym owners, but they may suit different operating styles. This comparison focuses on fit signals for memberships, payments, attendance, booking, setup effort, and martial arts-specific workflows.",
    quickVerdict:
      "Gymdesk currently looks more directly aligned with smaller martial arts and fitness gyms in this data model, while Zen Planner may appeal to owners comparing a broader established gym-management platform. Both records still need manual verification before confident recommendations.",
    chooseAIf: [
      "You run a small or growing martial arts school and want a gym-management option that appears closely aligned with class-based operations.",
      "You are willing to verify Gymdesk's billing, attendance, and belt-tracking details before deciding.",
    ],
    chooseBIf: [
      "You want to compare a broader gym-management platform with established fitness-studio positioning.",
      "You are comfortable checking current packaging, contracts, and martial-arts-specific workflow support directly with the provider.",
    ],
    considerAlternativesIf: [
      "You need verified public pricing before speaking with vendors.",
      "Belt tracking or family-account workflows are non-negotiable and not yet confirmed.",
    ],
    publishStatus: "published",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gymdesk-vs-pushpress",
    softwareAId: "gymdesk",
    softwareBId: "pushpress",
    metaTitle: "Gymdesk vs PushPress: Which Is Better for Martial Arts Gyms?",
    metaDescription:
      "Compare Gymdesk and PushPress for martial arts and hybrid training gyms, with cautious notes on payments, booking, attendance, pricing, and fit.",
    intro:
      "Gymdesk and PushPress can both appear in research for martial arts or hybrid training facilities. This page compares them through the lens of small gym administration, recurring payments, booking, attendance, and martial-arts workflow uncertainty.",
    quickVerdict:
      "Gymdesk may be the more martial-arts-relevant starting point in the current data model, while PushPress may be worth considering for fitness-oriented or hybrid facilities. Verify both products before making a final shortlist.",
    chooseAIf: [
      "Your gym is primarily a martial arts school and you want the shortlist to start with martial-arts-relevant workflows.",
      "You want to investigate Gymdesk's current trial, billing, and feature details directly with the provider.",
    ],
    chooseBIf: [
      "Your facility blends martial arts with broader fitness or performance training.",
      "You want to compare a platform commonly associated with fitness gym operations.",
    ],
    considerAlternativesIf: [
      "You need confirmed belt tracking, waiver handling, or country support before choosing.",
      "You want a platform with verified pricing, contract terms, and public documentation already checked.",
    ],
    publishStatus: "published",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "zen-planner-vs-pushpress",
    softwareAId: "zen-planner",
    softwareBId: "pushpress",
    metaTitle: "Zen Planner vs PushPress: Which Is Better for Martial Arts Gyms?",
    metaDescription:
      "Compare Zen Planner and PushPress for martial arts, fitness, and hybrid gyms using cautious feature, pricing, setup, and fit notes.",
    intro:
      "Zen Planner and PushPress are broader gym-management options rather than martial-arts-only tools. This comparison helps owners think through which product may be more appropriate for fitness-oriented operations, hybrid gyms, and martial arts schools that need verified workflows.",
    quickVerdict:
      "Zen Planner may fit owners comparing established gym-management software, while PushPress may be more interesting for fitness-oriented gyms. The current data does not justify a confident winner without manual verification.",
    chooseAIf: [
      "You want to evaluate an established gym and studio management platform.",
      "You are comparing reporting, membership, and class-management workflows across a broader gym context.",
    ],
    chooseBIf: [
      "Your gym has a fitness, performance, or hybrid training model alongside martial arts classes.",
      "You want to investigate a platform commonly considered by modern fitness gyms.",
    ],
    considerAlternativesIf: [
      "Your school needs martial-arts-first rank tracking and attendance workflows.",
      "You want verified public pricing before narrowing the shortlist.",
    ],
    publishStatus: "published",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gymdesk-vs-teamup",
    softwareAId: "gymdesk",
    softwareBId: "teamup",
    metaTitle: "Gymdesk vs TeamUp: Which Is Better for Martial Arts Gyms?",
    metaDescription:
      "Compare Gymdesk and TeamUp for martial arts schools and class-based gyms, including booking, payments, attendance, pricing notes, and limitations.",
    intro:
      "Gymdesk and TeamUp both matter for class-based gym owners, but they may solve different parts of the admin problem. This comparison looks at martial arts fit, class booking, billing, attendance, member management, and verification gaps.",
    quickVerdict:
      "Gymdesk may be a better starting point for martial arts-specific research, while TeamUp may be useful for owners whose biggest issue is class booking and simple membership administration. Both require current source checks.",
    chooseAIf: [
      "You want to start with software that appears more directly relevant to martial arts and gym administration.",
      "You are comparing payments, attendance, member management, and possible rank-related workflows.",
    ],
    chooseBIf: [
      "Class booking, schedules, trials, and small-studio admin are your highest priorities.",
      "You want a potentially simpler class-based tool to compare against broader gym-management platforms.",
    ],
    considerAlternativesIf: [
      "You need confirmed martial arts belt tracking before shortlisting either platform.",
      "You need multi-location controls or enterprise workflows that are not yet verified in the data model.",
    ],
    publishStatus: "published",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "mindbody-vs-gymdesk",
    softwareAId: "mindbody",
    softwareBId: "gymdesk",
    metaTitle: "Mindbody vs Gymdesk: Which Is Better for Martial Arts Gyms?",
    metaDescription:
      "Compare Mindbody and Gymdesk for martial arts gyms, from broad wellness platform fit to smaller gym-management workflows and pricing uncertainty.",
    intro:
      "Mindbody and Gymdesk represent different ends of the gym software shortlist. Mindbody is a broad wellness and fitness platform, while Gymdesk appears more focused on gym-management needs that may suit smaller martial arts schools.",
    quickVerdict:
      "Mindbody may be worth considering for larger wellness-oriented operators, while Gymdesk may be a more practical starting point for smaller martial arts schools. Current data is too uncertain for a definitive recommendation.",
    chooseAIf: [
      "You operate a larger, wellness-oriented, or multi-location business and want to evaluate a broad platform.",
      "Marketplace, automation, reporting, or broader studio workflows matter more than martial-arts-specific simplicity.",
    ],
    chooseBIf: [
      "You run a smaller martial arts school and want to focus on day-to-day gym administration first.",
      "You want to compare a potentially lighter option before exploring broader wellness platforms.",
    ],
    considerAlternativesIf: [
      "You need verified public pricing, contract terms, or migration details before choosing.",
      "You need confirmed belt tracking and martial arts-specific family workflows.",
    ],
    publishStatus: "published",
    lastUpdated: "2026-05-27",
  },
];
