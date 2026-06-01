export type BestSoftwarePublishStatus = "published" | "draft" | "noindex";

export type BestSoftwareFaq = {
  question: string;
  answer: string;
};

export type BestSoftwarePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  audience: string;
  useCase: string;
  intro: string;
  rankingCriteria: string[];
  rankedSoftwareIds: string[];
  manualVerdict: string;
  faqs: BestSoftwareFaq[];
  publishStatus: BestSoftwarePublishStatus;
  lastUpdated: string;
};

// These are editorial recommendation pages, not affiliate-driven rankings.
// Keep rankedSoftwareIds in deliberate order when manual review changes the shortlist.
// Mark pages as published only after pricing, features, and provider claims are manually verified.
export const bestSoftwarePages: BestSoftwarePage[] = [
  {
    slug: "bjj-gyms",
    title: "Best Software for BJJ Gyms",
    metaTitle: "Best Software for BJJ Gyms",
    metaDescription:
      "Compare software options for BJJ gyms with cautious notes on recurring memberships, attendance, class scheduling, belt tracking, payments, and member management.",
    targetKeyword: "best software for BJJ gyms",
    audience: "BJJ academy owners and managers",
    useCase:
      "BJJ schools usually need recurring memberships, attendance visibility, class scheduling, and some way to manage belt or progression workflows without creating extra admin work.",
    intro:
      "BJJ gyms often run on recurring memberships, rotating class schedules, attendance habits, and long-term student progression. This shortlist prioritizes practical gym operations first: billing, member records, attendance, booking, and the likelihood that the system can support rank or progression tracking after verification.",
    rankingCriteria: [
      "Recurring membership and payment workflows",
      "Attendance tracking for retention visibility",
      "Class scheduling and booking fit for academy timetables",
      "Member management for students, families, and prospects",
      "Belt or progression tracking signals that still need verification",
      "Ease of use for small academy teams",
    ],
    rankedSoftwareIds: ["gymdesk", "zen-planner", "teamup", "pushpress", "wellnessliving"],
    manualVerdict:
      "Gymdesk is the current cautious starting point for BJJ-specific research in this dataset, while Zen Planner and TeamUp are useful comparisons for broader gym management and class scheduling. Verify belt tracking, family account behavior, and current pricing before treating any option as a final recommendation.",
    faqs: [
      {
        question: "What matters most when choosing BJJ gym software?",
        answer:
          "Recurring billing, attendance, member records, class scheduling, and progression workflows are usually more important than broad marketing features. Check current vendor materials before assuming rank tracking is included.",
      },
      {
        question: "Should BJJ gyms require belt tracking?",
        answer:
          "It depends on how your academy manages promotions. If belt or stripe history is central to daily operations, verify the workflow directly with the provider before choosing.",
      },
      {
        question: "Are these rankings based on affiliate availability?",
        answer:
          "No. The shortlist is ordered around likely operational fit, feature coverage, value, transparency, and editable software scores. Affiliate availability does not determine placement.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "mma-gyms",
    title: "Best Software for MMA Gyms",
    metaTitle: "Best Software for MMA Gyms",
    metaDescription:
      "Compare software options for MMA gyms that manage multiple class types, memberships, attendance, booking, payments, and member communication.",
    targetKeyword: "best software for MMA gyms",
    audience: "MMA gym owners and operators",
    useCase:
      "MMA gyms often combine striking, grappling, wrestling, open mat, youth programs, and conditioning, so software needs to handle multiple class types without confusing members or staff.",
    intro:
      "MMA gyms need flexible systems because the schedule is rarely one simple class stream. A useful platform should help with memberships, attendance, class booking, payments, and communication across striking, grappling, conditioning, and beginner programs.",
    rankingCriteria: [
      "Support for multiple class types and schedules",
      "Recurring memberships and payments",
      "Attendance tracking across programs",
      "Booking or reservation workflows",
      "Member management for mixed training paths",
      "Reporting that helps owners spot participation trends",
    ],
    rankedSoftwareIds: ["gymdesk", "pushpress", "teamup", "zen-planner", "wodify"],
    manualVerdict:
      "Gymdesk is a practical first comparison point for martial arts operations, while PushPress, TeamUp, Zen Planner, and Wodify may fit gyms with stronger fitness or hybrid training needs. Confirm booking rules, attendance views, and package support before deciding.",
    faqs: [
      {
        question: "What software features are useful for MMA gyms?",
        answer:
          "Look for memberships, recurring billing, booking, attendance, class categories, member communication, and reporting. Verify whether the platform handles your mix of striking, grappling, and conditioning classes cleanly.",
      },
      {
        question: "Do MMA gyms need booking software?",
        answer:
          "Booking can help when class capacity, trial sessions, or beginner programs need structure. Smaller gyms may only need scheduling and attendance at first.",
      },
      {
        question: "Is fitness gym software enough for an MMA gym?",
        answer:
          "Sometimes, especially for hybrid facilities. Traditional martial arts workflows, rank progression, or youth programs may need additional verification.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "boxing-gyms",
    title: "Best Software for Boxing Gyms",
    metaTitle: "Best Software for Boxing Gyms",
    metaDescription:
      "Compare software options for boxing gyms focused on class booking, payments, member management, attendance, and simple gym administration.",
    targetKeyword: "best software for boxing gyms",
    audience: "Boxing club owners and striking gym operators",
    useCase:
      "Boxing gyms often need smooth class booking, recurring or package payments, attendance records, and member management without martial arts rank complexity.",
    intro:
      "Boxing gyms may care less about belt progression and more about class booking, payments, trial sessions, member records, and keeping coaches aligned with who is attending. This shortlist favors tools that appear useful for class-based clubs and fitness-oriented striking gyms.",
    rankingCriteria: [
      "Class booking and schedule clarity",
      "Payments, packages, and recurring billing",
      "Member management for prospects and active members",
      "Attendance tracking for retention and capacity planning",
      "Ease of setup for small teams",
      "Mobile or member-facing workflows where available",
    ],
    rankedSoftwareIds: ["teamup", "pushpress", "gymdesk", "glofox", "mindbody"],
    manualVerdict:
      "TeamUp is a strong cautious comparison point for boxing gyms because booking and class administration are central to the use case. PushPress and Gymdesk are also worth reviewing, while Glofox and Mindbody may fit larger or more fitness-oriented operators after verification.",
    faqs: [
      {
        question: "What should boxing gyms look for in management software?",
        answer:
          "Class booking, payments, memberships, attendance, waivers, and member communication are usually core needs. Avoid assuming combat-sport-specific features unless the vendor confirms them.",
      },
      {
        question: "Is belt tracking important for boxing gyms?",
        answer:
          "Usually not. Boxing gyms may get more value from booking, payments, packages, attendance, and member management.",
      },
      {
        question: "Can boxing gyms use general fitness studio software?",
        answer:
          "Often yes, but check whether the platform handles memberships, drop-ins, trials, and coach-led classes in the way your gym operates.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "small-martial-arts-schools",
    title: "Best Software for Small Martial Arts Schools",
    metaTitle: "Best Software for Small Martial Arts Schools",
    metaDescription:
      "Compare software for small martial arts schools that need simple payments, scheduling, attendance, member records, and pricing that is easy to verify.",
    targetKeyword: "best software for small martial arts schools",
    audience: "Solo instructors and small martial arts school owners",
    useCase:
      "Small martial arts schools need enough structure to reduce admin without being forced into an overbuilt system that costs too much or takes weeks to configure.",
    intro:
      "For small schools, the best software is usually the one that removes the most admin with the least setup burden. Payments, member records, booking, attendance, and clear pricing matter more than enterprise dashboards or complex automation that the owner will not use.",
    rankingCriteria: [
      "Simple setup and everyday usability",
      "Recurring billing and payment collection",
      "Member records without heavy configuration",
      "Class scheduling and attendance basics",
      "Pricing transparency or easy quote verification",
      "Avoiding overbuilt systems for solo or small teams",
    ],
    rankedSoftwareIds: ["gymdesk", "teamup", "pushpress", "zen-planner", "wellnessliving"],
    manualVerdict:
      "Gymdesk and TeamUp are the current cautious starting points for smaller schools because the dataset suggests a closer fit with simple gym administration and class workflows. Broader platforms may still be useful, but owners should verify setup effort and total cost before committing.",
    faqs: [
      {
        question: "What is the best software for a small martial arts school?",
        answer:
          "The best option depends on your admin pain. Start with payments, member records, attendance, and scheduling, then verify pricing and setup effort directly with the provider.",
      },
      {
        question: "Should a small school choose the most feature-rich platform?",
        answer:
          "Not necessarily. A simpler tool that your team actually uses may be a better fit than a larger system with features you do not need.",
      },
      {
        question: "Why are some pages marked cautious or noindex?",
        answer:
          "Many provider details still need manual verification. The page can be useful as a research scaffold before it is ready for confident public ranking.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gym-payment-automation",
    title: "Best Gym Software for Payment Automation",
    metaTitle: "Best Gym Software for Payment Automation",
    metaDescription:
      "Compare martial arts gym software for recurring billing, payment collection, failed-payment follow-up, reporting, and member-management workflows.",
    targetKeyword: "best gym software for payment automation",
    audience: "Gym owners trying to reduce missed payments and manual billing work",
    useCase:
      "Payment automation should reduce missed payments, manual invoices, awkward follow-ups, and disconnected spreadsheets while keeping member records accurate.",
    intro:
      "Missed payments can quietly create more admin than almost any other gym problem. This shortlist focuses on recurring billing, payment collection, reporting, member records, and the likely ability to support failed-payment workflows after vendor verification.",
    rankingCriteria: [
      "Recurring billing support",
      "Payment collection and billing workflow clarity",
      "Failed-payment follow-up signals that need verification",
      "Member records tied to billing status",
      "Reporting for outstanding balances or account visibility",
      "Value and setup effort for smaller martial arts gyms",
    ],
    rankedSoftwareIds: ["gymdesk", "pushpress", "zen-planner", "wellnessliving", "mindbody"],
    manualVerdict:
      "Gymdesk, PushPress, and Zen Planner are the first payment-automation comparisons in this dataset. WellnessLiving and Mindbody may be relevant for larger operations, but pricing, processing details, and failed-payment tools must be checked before publication.",
    faqs: [
      {
        question: "What payment automation features should martial arts gyms check?",
        answer:
          "Recurring billing, stored payment methods, failed-payment handling, payment reporting, membership status, and processor availability should all be verified with current vendor sources.",
      },
      {
        question: "Can software eliminate all missed payments?",
        answer:
          "No. Software can reduce manual work and improve visibility, but failed cards, cancellations, and account disputes still need human processes.",
      },
      {
        question: "Should payment fees decide the software choice?",
        answer:
          "Fees matter, but they should be weighed against admin time, reliability, member experience, and whether the platform fits the rest of your gym workflow.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gym-class-booking",
    title: "Best Gym Software for Class Booking",
    metaTitle: "Best Gym Software for Class Booking",
    metaDescription:
      "Compare martial arts gym software for class booking, schedules, capacity management, attendance, and member communication.",
    targetKeyword: "best gym software for class booking",
    audience: "Gym owners who need clearer scheduling, capacity, and class reservation workflows",
    useCase:
      "Class booking software helps when members need to reserve spots, owners need capacity control, and staff need a reliable view of who is expected in each class.",
    intro:
      "Class booking matters most when schedules are busy, class sizes vary, trial students need structure, or members get confused about where to train. This shortlist looks at booking, scheduling, capacity signals, attendance, and communication rather than broad marketing claims.",
    rankingCriteria: [
      "Class booking and schedule management",
      "Capacity or reservation workflow signals",
      "Attendance connection after booking",
      "Member-facing usability and mobile access",
      "Communication around class changes or reminders",
      "Fit for small and growing class-based gyms",
    ],
    rankedSoftwareIds: ["teamup", "gymdesk", "zen-planner", "glofox", "wellnessliving"],
    manualVerdict:
      "TeamUp is the first cautious comparison point for booking-heavy gyms, followed by Gymdesk and Zen Planner for broader admin fit. Glofox and WellnessLiving may suit gyms that want a broader member-facing platform after verification.",
    faqs: [
      {
        question: "When does a martial arts gym need class booking software?",
        answer:
          "Booking becomes useful when classes fill up, trial lessons need coordination, members attend multiple programs, or front-desk staff spend too much time answering schedule questions.",
      },
      {
        question: "Should every class require reservations?",
        answer:
          "Not always. Some gyms only need reservations for beginner courses, seminars, kids classes, or limited-capacity sessions.",
      },
      {
        question: "What should I verify before choosing booking software?",
        answer:
          "Check waitlists, cancellation windows, capacity limits, attendance connection, mobile experience, and whether recurring memberships can book the right classes.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gym-attendance-tracking",
    title: "Best Gym Software for Attendance Tracking",
    metaTitle: "Best Gym Software for Attendance Tracking",
    metaDescription:
      "Compare martial arts gym software for attendance tracking, retention visibility, member records, reporting, and class participation workflows.",
    targetKeyword: "best gym software for attendance tracking",
    audience: "Gym owners who want better retention visibility and class participation records",
    useCase:
      "Attendance tracking helps owners see who is training, who is drifting away, and which classes need attention before retention problems become obvious.",
    intro:
      "Attendance is one of the clearest signals of member health in a martial arts gym. A useful system should make check-ins easy, connect attendance to member records, and provide enough reporting to spot people who may need follow-up.",
    rankingCriteria: [
      "Attendance check-in workflow",
      "Member visibility for inactive or at-risk students",
      "Reporting connected to retention decisions",
      "Class-level attendance patterns",
      "Ease of use for coaches or front-desk staff",
      "Optional connection to rank or progression records",
    ],
    rankedSoftwareIds: ["gymdesk", "zen-planner", "wodify", "pushpress", "teamup"],
    manualVerdict:
      "Gymdesk and Zen Planner are useful first comparisons for attendance-focused martial arts research. Wodify and PushPress may fit hybrid gyms, while TeamUp may be enough for simpler class attendance needs after verification.",
    faqs: [
      {
        question: "Why is attendance tracking important for martial arts gyms?",
        answer:
          "Attendance can reveal retention risk, class demand, coaching workload, and student consistency. It is especially useful when connected to member records and follow-up workflows.",
      },
      {
        question: "Does attendance tracking replace coaching judgment?",
        answer:
          "No. It gives owners better visibility, but coaches still need to interpret why students miss classes and decide how to follow up.",
      },
      {
        question: "Should attendance connect to belt progression?",
        answer:
          "For many martial arts schools, yes. If attendance influences eligibility or progression, verify the provider's rank or progression workflow before choosing.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
  {
    slug: "gym-waiver-management",
    title: "Best Gym Software for Waiver Management",
    metaTitle: "Best Gym Software for Waiver Management",
    metaDescription:
      "Compare martial arts gym software for waiver management, onboarding, member records, admin reduction, and trial-student workflows.",
    targetKeyword: "best gym software for waiver management",
    audience: "Gym owners who want cleaner onboarding and less waiver paperwork",
    useCase:
      "Waiver workflows can reduce onboarding friction by keeping forms, member records, and trial-student intake connected instead of scattered across paper or spreadsheets.",
    intro:
      "Waivers are not glamorous, but they can create repeated admin friction for trial students, parents, seminars, and new memberships. This shortlist focuses on waiver signals, onboarding, member records, communication, and how easily staff can keep records organized.",
    rankingCriteria: [
      "Waiver or form workflow signals that need verification",
      "New-member and trial-student onboarding",
      "Member records connected to signed documents",
      "Admin reduction for staff and coaches",
      "Communication around incomplete forms",
      "Fit for small and growing martial arts schools",
    ],
    rankedSoftwareIds: ["teamup", "wellnessliving", "mindbody", "gymdesk", "glofox"],
    manualVerdict:
      "TeamUp is a practical first comparison point for onboarding-oriented class businesses, while WellnessLiving and Mindbody may be relevant for larger operations. Verify waiver, form, parent consent, and document-storage behavior before choosing.",
    faqs: [
      {
        question: "What waiver features should a martial arts gym verify?",
        answer:
          "Check digital signing, document storage, parent or guardian workflows, trial-student intake, and whether signed waivers are tied to member records.",
      },
      {
        question: "Can gym software replace legal review of waivers?",
        answer:
          "No. Software can help collect and store forms, but waiver language and legal requirements should be reviewed separately for your location.",
      },
      {
        question: "Why connect waivers to onboarding?",
        answer:
          "When forms, memberships, and trial attendance live together, staff spend less time chasing paperwork and are less likely to miss important steps.",
      },
    ],
    publishStatus: "noindex",
    lastUpdated: "2026-05-27",
  },
];
