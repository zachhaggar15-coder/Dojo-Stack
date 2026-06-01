export type ArticleStatus = "draft" | "published" | "noindex";

export type ArticleCategory =
  | "buying-guide"
  | "booking"
  | "payments"
  | "admin"
  | "alternatives"
  | "small-gyms"
  | "migration"
  | "waivers"
  | "attendance";

export type ArticleSection = {
  heading: string;
  body: string;
  manualVerificationNotes?: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  category: ArticleCategory;
  status: ArticleStatus;
  relatedSoftwareIds: string[];
  relatedBestSoftwarePages: string[];
  relatedComparisonPages: string[];
  intro: string;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  lastUpdated: string;
  needsManualReview: boolean;
};

// Controlled supporting content only. Articles should support commercial pages;
// they should not become a generic blog or publish without manual review.
export const articles: Article[] = [
  {
    title: "How to Choose Martial Arts Gym Management Software",
    slug: "how-to-choose-martial-arts-gym-management-software",
    metaTitle: "How to Choose Martial Arts Gym Management Software",
    metaDescription:
      "A practical draft guide to choosing martial arts gym software by matching payments, booking, attendance, waivers, member management, and pricing transparency to gym needs.",
    targetKeyword: "how to choose martial arts gym management software",
    category: "buying-guide",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "zen-planner", "teamup", "pushpress"],
    relatedBestSoftwarePages: ["bjj-gyms", "mma-gyms", "small-martial-arts-schools"],
    relatedComparisonPages: ["gymdesk-vs-zen-planner", "gymdesk-vs-teamup"],
    intro:
      "Choosing martial arts gym software is easiest when the decision starts with the work that currently slows the school down. This draft supports the software directory, quiz, and best-software pages by framing the buying process around gym operations rather than generic feature lists.",
    sections: [
      {
        heading: "Start with the workflow causing the most friction",
        body:
          "Most schools should compare software around a primary problem: missed payments, booking confusion, attendance visibility, waiver collection, communication, or spreadsheet replacement. A platform that fixes the main admin bottleneck is usually more useful than one with the longest feature list.",
        manualVerificationNotes: ["Confirm whether each linked provider currently supports the workflow before publishing."],
      },
      {
        heading: "Match software to gym type and size",
        body:
          "A solo instructor, a small BJJ academy, a striking gym, and a multi-location school may need different setup depth. The quiz and best-software pages should be used to compare likely fit by discipline, member count, staff count, and class complexity.",
      },
      {
        heading: "Treat pricing as a verification step",
        body:
          "Software pricing, payment-processing fees, onboarding costs, and plan limits can change. Use the pricing calculator for broad planning, then verify provider websites before relying on exact numbers.",
        manualVerificationNotes: ["Add current provider pricing sources before changing this article to published."],
      },
    ],
    faqs: [
      {
        question: "What should martial arts gyms compare first?",
        answer:
          "Start with the operational problem that costs the most time or money, then compare software that supports that workflow for your gym type and size.",
      },
      {
        question: "Should outbound link status affect the decision?",
        answer:
          "No. Links may be standard provider links or affiliate/referral links if verified later, but rankings and recommendations should be based on usefulness, verified features, transparency, and fit for the gym.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "Best Booking Systems for Martial Arts Gyms",
    slug: "best-booking-systems-for-martial-arts-gyms",
    metaTitle: "Best Booking Systems for Martial Arts Gyms",
    metaDescription:
      "Draft support article for comparing martial arts gym booking systems, including class schedules, capacity, waitlists, member experience, and attendance links.",
    targetKeyword: "best booking systems for martial arts gyms",
    category: "booking",
    status: "draft",
    relatedSoftwareIds: ["teamup", "gymdesk", "zen-planner", "glofox"],
    relatedBestSoftwarePages: ["gym-class-booking", "boxing-gyms", "mma-gyms"],
    relatedComparisonPages: ["gymdesk-vs-teamup", "gymdesk-vs-zen-planner"],
    intro:
      "Booking software matters when class capacity, trial lessons, kids programs, or multi-discipline schedules create confusion. This draft supports booking-focused commercial pages without claiming any provider has been hands-on tested.",
    sections: [
      {
        heading: "Booking should fit the class structure",
        body:
          "A martial arts gym may need booking for beginner courses, kids classes, seminars, sparring sessions, or limited-capacity sessions. The first check is whether the system can reflect the way the timetable actually works.",
      },
      {
        heading: "Capacity and cancellation rules can change the plan requirement",
        body:
          "Capacity limits, waitlists, cancellation windows, and member notifications may be included only on certain plans or may need verification with providers. Do not assume all booking tools include the same controls.",
        manualVerificationNotes: ["Verify provider support for waitlists, cancellation windows, and capacity controls."],
      },
      {
        heading: "Booking should connect to attendance",
        body:
          "For many gyms, booking is only useful if staff can see who reserved, who attended, and who stopped showing up. Booking and attendance pages should link together because the workflows often overlap.",
      },
    ],
    faqs: [
      {
        question: "Do all martial arts gyms need class booking?",
        answer:
          "No. Some gyms only need booking for trial lessons, special courses, or limited-capacity sessions. Smaller schools may start with scheduling and attendance instead.",
      },
      {
        question: "What booking features should be verified?",
        answer: "Check capacity, waitlists, cancellation rules, reminders, attendance connection, and mobile booking experience.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "How to Automate Payments for a BJJ Gym",
    slug: "how-to-automate-payments-for-a-bjj-gym",
    metaTitle: "How to Automate Payments for a BJJ Gym",
    metaDescription:
      "Draft article on BJJ gym payment automation, recurring memberships, failed-payment follow-up, billing visibility, and software shortlisting caveats.",
    targetKeyword: "automate payments for a BJJ gym",
    category: "payments",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "zen-planner", "pushpress", "wellnessliving"],
    relatedBestSoftwarePages: ["bjj-gyms", "gym-payment-automation"],
    relatedComparisonPages: ["gymdesk-vs-zen-planner", "gymdesk-vs-pushpress"],
    intro:
      "BJJ gyms commonly rely on recurring memberships, so payment automation can reduce missed collections and manual follow-up. This draft should be reviewed against current provider billing features before publication.",
    sections: [
      {
        heading: "Recurring memberships are the core workflow",
        body:
          "The software shortlist should focus on recurring billing, membership status, stored payment methods where available, and visibility into overdue accounts. These features need provider-level verification before any strong product claims are made.",
        manualVerificationNotes: ["Verify recurring billing and failed-payment workflows for each related provider."],
      },
      {
        heading: "Failed payments still need a human process",
        body:
          "Automation can make failed payments easier to identify and follow up, but it does not replace clear cancellation policies, member communication, or owner oversight.",
      },
      {
        heading: "Payment-processing fees may be separate",
        body:
          "Software subscription pricing and payment-processing fees are often separate considerations. Any article about payment automation should direct readers to verify provider and processor terms.",
        manualVerificationNotes: ["Add current payment processing and fee source links before publishing."],
      },
    ],
    faqs: [
      {
        question: "Can BJJ billing be fully automated?",
        answer:
          "Recurring billing can reduce manual work, but failed cards, refunds, cancellations, and disputes still need clear human processes.",
      },
      {
        question: "What should a BJJ gym verify before choosing payment software?",
        answer:
          "Verify recurring billing, failed-payment handling, processor availability, fees, reporting, and how billing status connects to member records.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "How to Reduce Admin Time in a Martial Arts Academy",
    slug: "how-to-reduce-admin-time-in-a-martial-arts-academy",
    metaTitle: "How to Reduce Admin Time in a Martial Arts Academy",
    metaDescription:
      "Draft operational guide for reducing martial arts academy admin through payments, booking, attendance, waivers, communication, and reporting workflows.",
    targetKeyword: "reduce admin time martial arts academy",
    category: "admin",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "teamup", "pushpress", "zen-planner"],
    relatedBestSoftwarePages: ["small-martial-arts-schools", "gym-payment-automation", "gym-class-booking"],
    relatedComparisonPages: ["gymdesk-vs-teamup", "gymdesk-vs-pushpress"],
    intro:
      "Admin time usually comes from repeated small tasks: chasing payments, answering schedule questions, updating spreadsheets, tracking attendance, and collecting waivers. This draft links those tasks back to the quiz, calculator, directory, and best-software pages.",
    sections: [
      {
        heading: "Find the repeated task, not the fanciest feature",
        body:
          "The best first automation is usually the task the owner repeats every week. For many academies that is billing, attendance updates, class scheduling, waiver collection, or member communication.",
      },
      {
        heading: "Avoid overbuilding the system",
        body:
          "Small academies can lose time if software setup is too complex. Simpler workflows may be more valuable than advanced automation that requires ongoing configuration.",
      },
      {
        heading: "Use reporting to decide what to fix next",
        body:
          "Basic reporting can show attendance trends, overdue accounts, and member status. These signals help owners decide which workflow should be improved after the first admin bottleneck is solved.",
        manualVerificationNotes: ["Verify reporting depth and setup complexity provider by provider."],
      },
    ],
    faqs: [
      {
        question: "What admin task should martial arts gyms automate first?",
        answer: "Start with the task that repeats most often and causes the most friction, commonly billing, booking, attendance, or waivers.",
      },
      {
        question: "Can software create more admin work?",
        answer: "Yes. A system that is too complex for the gym can create setup, training, and maintenance work that outweighs the benefit.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "Gymdesk Alternatives for Martial Arts Schools",
    slug: "gymdesk-alternatives-for-martial-arts-schools",
    metaTitle: "Gymdesk Alternatives for Martial Arts Schools",
    metaDescription:
      "Draft support article for comparing Gymdesk alternatives for martial arts schools, with cautious links to Zen Planner, TeamUp, PushPress, and comparison pages.",
    targetKeyword: "Gymdesk alternatives martial arts schools",
    category: "alternatives",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "zen-planner", "teamup", "pushpress"],
    relatedBestSoftwarePages: ["bjj-gyms", "small-martial-arts-schools", "gym-class-booking"],
    relatedComparisonPages: ["gymdesk-vs-zen-planner", "gymdesk-vs-pushpress", "gymdesk-vs-teamup"],
    intro:
      "This draft supports Gymdesk comparison and software profile pages. It should not imply Gymdesk or any alternative has been tested unless that testing is later documented.",
    sections: [
      {
        heading: "Compare around the reason you are looking for alternatives",
        body:
          "A school might compare alternatives because of booking needs, pricing uncertainty, payment workflows, setup preferences, or multi-location requirements. The reason matters more than a generic list of competitors.",
      },
      {
        heading: "Shortlist alternatives by workflow",
        body:
          "TeamUp may be relevant for booking-heavy research, Zen Planner for broader gym-management comparison, and PushPress for hybrid fitness-oriented gyms in the current data model. These are cautious positioning notes, not verified product claims.",
        manualVerificationNotes: ["Verify current positioning, pricing, and feature support for each alternative before publishing."],
      },
      {
        heading: "Use comparison pages before choosing",
        body:
          "The related comparison pages are the main commercial assets for this topic. This article should route readers to those pages rather than trying to replace them.",
      },
    ],
    faqs: [
      {
        question: "What are Gymdesk alternatives for martial arts schools?",
        answer:
          "Potential alternatives in this dataset include Zen Planner, TeamUp, and PushPress, but each should be compared by workflow and verified against current provider information.",
      },
      {
        question: "Should this article rank alternatives?",
        answer: "No. It should support the comparison pages and software directory, not replace the controlled ranking pages.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "Zen Planner Alternatives for Martial Arts Schools",
    slug: "zen-planner-alternatives-for-martial-arts-schools",
    metaTitle: "Zen Planner Alternatives for Martial Arts Schools",
    metaDescription:
      "Draft support article for comparing Zen Planner alternatives for martial arts schools, with cautious links to Gymdesk, PushPress, Mindbody, and related comparisons.",
    targetKeyword: "Zen Planner alternatives martial arts schools",
    category: "alternatives",
    status: "draft",
    relatedSoftwareIds: ["zen-planner", "gymdesk", "pushpress", "mindbody"],
    relatedBestSoftwarePages: ["bjj-gyms", "mma-gyms", "small-martial-arts-schools"],
    relatedComparisonPages: ["gymdesk-vs-zen-planner", "zen-planner-vs-pushpress"],
    intro:
      "This draft supports Zen Planner profile and comparison pages by helping readers think through why they may need alternatives. It avoids product-specific claims that are not present in the software data.",
    sections: [
      {
        heading: "Clarify the alternative criteria",
        body:
          "A martial arts school might look beyond Zen Planner for simpler setup, different booking workflows, pricing transparency, martial-arts-specific needs, or broader fitness operations. Each reason leads to a different shortlist.",
      },
      {
        heading: "Compare alternatives by gym model",
        body:
          "Gymdesk may be a practical martial-arts-focused comparison point in this dataset, PushPress may be relevant for hybrid fitness gyms, and Mindbody may be considered by larger wellness-oriented operators. All of this requires manual source verification.",
        manualVerificationNotes: ["Check current provider positioning and packaging before publishing."],
      },
      {
        heading: "Keep the comparison pages central",
        body:
          "This article should send readers to controlled comparison pages and reviews instead of becoming a broad monetised list with unsupported claims.",
      },
    ],
    faqs: [
      {
        question: "What are Zen Planner alternatives for martial arts schools?",
        answer:
          "Potential comparison points in this data model include Gymdesk, PushPress, and Mindbody, depending on whether the school prioritizes martial arts fit, hybrid fitness operations, or broader wellness workflows.",
      },
      {
        question: "Are these alternatives verified recommendations?",
        answer: "No. This is a draft support article and needs manual review before publication.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "What Software Do Small Martial Arts Gyms Need?",
    slug: "what-software-do-small-martial-arts-gyms-need",
    metaTitle: "What Software Do Small Martial Arts Gyms Need?",
    metaDescription:
      "Draft support article for small martial arts gyms comparing essential software workflows: payments, member records, scheduling, attendance, and waivers.",
    targetKeyword: "software small martial arts gyms need",
    category: "small-gyms",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "teamup", "pushpress", "zen-planner"],
    relatedBestSoftwarePages: ["small-martial-arts-schools", "gym-payment-automation", "gym-attendance-tracking"],
    relatedComparisonPages: ["gymdesk-vs-teamup", "gymdesk-vs-pushpress"],
    intro:
      "Small gyms need software that reduces admin without creating a complicated management system. This draft supports the small-school shortlist, directory, calculator, and quiz.",
    sections: [
      {
        heading: "Start with payments and member records",
        body:
          "A small gym usually benefits first from reliable member records, membership status, and payment tracking. These basics can reduce spreadsheet dependence and make other workflows easier later.",
      },
      {
        heading: "Add scheduling and attendance when classes get harder to manage",
        body:
          "If class volume, trial sessions, or instructor handoffs are creating confusion, scheduling and attendance tracking may become a higher priority than marketing automation.",
      },
      {
        heading: "Avoid paying for complexity too early",
        body:
          "Multi-location controls, advanced marketing, and deep automation may be useful later, but small gyms should verify that any system is simple enough to run every week.",
        manualVerificationNotes: ["Use provider plan pages to confirm whether core workflows are available at entry-level tiers."],
      },
    ],
    faqs: [
      {
        question: "What is essential software for a small martial arts gym?",
        answer: "Member records, payments, basic scheduling, attendance, and waiver workflows are usually the first areas to evaluate.",
      },
      {
        question: "Should small gyms use free tools first?",
        answer:
          "Free or very low-cost tools can help at the start, but owners should compare the cost of manual admin against a dedicated system as the gym grows.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "How to Move from Spreadsheets to Gym Management Software",
    slug: "how-to-move-from-spreadsheets-to-gym-management-software",
    metaTitle: "How to Move from Spreadsheets to Gym Management Software",
    metaDescription:
      "Draft migration guide for martial arts gyms moving from spreadsheets to gym management software without overcomplicating member, billing, and attendance workflows.",
    targetKeyword: "move from spreadsheets to gym management software",
    category: "migration",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "teamup", "zen-planner", "wellnessliving"],
    relatedBestSoftwarePages: ["small-martial-arts-schools", "gym-attendance-tracking", "gym-payment-automation"],
    relatedComparisonPages: ["gymdesk-vs-teamup", "gymdesk-vs-zen-planner"],
    intro:
      "Spreadsheets often work until billing, attendance, waivers, and member communication start living in too many places. This draft supports software shortlists for owners who are ready to move to a dedicated system.",
    sections: [
      {
        heading: "Clean the data before choosing tools",
        body:
          "Before migration, owners should identify active members, membership status, payment notes, attendance history, waiver status, and contact details. This article should not recommend importing messy data without review.",
      },
      {
        heading: "Move one workflow at a time",
        body:
          "A staged move may start with member records and payments, then add attendance, booking, waivers, and communication. Trying to rebuild every process at once can create avoidable disruption.",
      },
      {
        heading: "Verify import and export options",
        body:
          "Provider import support, export options, field limits, and onboarding help should be verified directly. Do not invent migration claims for any provider.",
        manualVerificationNotes: ["Verify CSV import/export and onboarding support before publishing provider-specific notes."],
      },
    ],
    faqs: [
      {
        question: "When should a gym move away from spreadsheets?",
        answer:
          "When billing, attendance, waivers, member status, or communication become hard to keep accurate across files, dedicated software may be worth comparing.",
      },
      {
        question: "Should all data be migrated at once?",
        answer: "Not always. Many gyms should start with the cleanest and most valuable records, then add deeper history if needed.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "How to Manage Waivers for a Martial Arts Gym",
    slug: "how-to-manage-waivers-for-a-martial-arts-gym",
    metaTitle: "How to Manage Waivers for a Martial Arts Gym",
    metaDescription:
      "Draft article about martial arts gym waiver workflows, onboarding, guardian consent, document storage, and software verification caveats.",
    targetKeyword: "manage waivers martial arts gym",
    category: "waivers",
    status: "draft",
    relatedSoftwareIds: ["teamup", "wellnessliving", "mindbody", "gymdesk"],
    relatedBestSoftwarePages: ["gym-waiver-management", "small-martial-arts-schools"],
    relatedComparisonPages: ["gymdesk-vs-teamup", "mindbody-vs-gymdesk"],
    intro:
      "Waivers are an onboarding workflow, not just a form. This draft supports the waiver-management shortlist while reminding readers to verify software behavior and local legal requirements.",
    sections: [
      {
        heading: "Connect waivers to onboarding",
        body:
          "Waivers should be easy to connect to trial students, new members, minors, and event participants. Staff should be able to see whether required forms are complete before class participation.",
      },
      {
        heading: "Guardian workflows need extra care",
        body:
          "Schools with kids programs should verify parent or guardian consent flows, document storage, and staff visibility. These details vary and should not be assumed.",
        manualVerificationNotes: ["Verify guardian consent and document storage for each related provider."],
      },
      {
        heading: "Software does not replace legal review",
        body:
          "Gym software may help collect and store waiver forms, but waiver wording and legal requirements should be reviewed separately for the gym's location.",
      },
    ],
    faqs: [
      {
        question: "Can software manage martial arts waivers?",
        answer:
          "Some systems may support waivers or forms, but current provider support should be verified before relying on it.",
      },
      {
        question: "Does waiver software replace legal advice?",
        answer: "No. Software can support collection and storage, but waiver language and legal requirements should be reviewed separately.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
  {
    title: "How to Track Attendance in a BJJ or MMA Gym",
    slug: "how-to-track-attendance-in-a-bjj-or-mma-gym",
    metaTitle: "How to Track Attendance in a BJJ or MMA Gym",
    metaDescription:
      "Draft support article for BJJ and MMA gym attendance tracking, retention visibility, class participation, and rank or progression caveats.",
    targetKeyword: "track attendance BJJ MMA gym",
    category: "attendance",
    status: "draft",
    relatedSoftwareIds: ["gymdesk", "zen-planner", "wodify", "pushpress"],
    relatedBestSoftwarePages: ["gym-attendance-tracking", "bjj-gyms", "mma-gyms"],
    relatedComparisonPages: ["gymdesk-vs-zen-planner", "zen-planner-vs-pushpress"],
    intro:
      "Attendance tracking helps BJJ and MMA gyms understand training consistency, class demand, and retention risk. This draft supports attendance-focused commercial pages and should avoid unverified provider claims.",
    sections: [
      {
        heading: "Define who checks members in",
        body:
          "Attendance workflows can depend on whether coaches, front-desk staff, or members handle check-ins. The right software fit depends on what will actually happen during busy classes.",
      },
      {
        heading: "Use attendance for retention visibility",
        body:
          "Attendance records can help owners notice students who have stopped training regularly. Software should make those patterns easier to see, but the follow-up still needs a human process.",
      },
      {
        heading: "Rank progression may need verification",
        body:
          "BJJ schools may connect attendance to belt or stripe eligibility, while MMA gyms may track class participation across disciplines. Confirm whether any provider supports these workflows directly or through configuration.",
        manualVerificationNotes: ["Verify attendance history, reporting, and belt/progression support provider by provider."],
      },
    ],
    faqs: [
      {
        question: "Why track attendance in a BJJ or MMA gym?",
        answer:
          "Attendance can support retention, class planning, coaching visibility, and in some schools progression decisions.",
      },
      {
        question: "Should attendance connect to belt tracking?",
        answer:
          "For some BJJ schools, yes. If attendance affects progression, verify whether the software supports that workflow before choosing.",
      },
    ],
    lastUpdated: "2026-06-01",
    needsManualReview: true,
  },
];
