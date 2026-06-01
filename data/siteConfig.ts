// Update this if the final anonymous brand name changes.
const siteName = "DojoStack";

// Production domain used for canonical URLs, Open Graph URLs, robots, and sitemap output.
const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dojostack.co.uk";

// Public contact mailbox used on the contact page and Organization schema.
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dojostack@protonmail.com";

export const siteConfig = {
  siteName,
  tagline: "Find the right software for your martial arts gym",
  domain,
  contactEmail,
  defaultMetaTitle: `${siteName} | Martial Arts Gym Software Comparison`,
  defaultMetaDescription:
    "Compare gym management software for BJJ, MMA, boxing, karate, taekwondo, and martial arts schools. Find tools for payments, booking, attendance, waivers, and member management.",
  disclosureText:
    "Some outbound links may be standard provider links, and some may become affiliate or referral links if a relationship is verified. Affiliate availability does not determine recommendations.",
  targetMarket: "English-speaking martial arts gym owners globally",
  navigationLinks: [
    { href: "/software", label: "Software" },
    { href: "/compare", label: "Compare" },
    { href: "/best-software/bjj-gyms", label: "Best Software" },
    { href: "/quiz", label: "Quiz" },
    { href: "/pricing-calculator", label: "Calculator" },
    { href: "/methodology", label: "Methodology" },
  ],
  launchSafety: {
    hasPlaceholderDomain: domain === "https://example.com",
    hasPlaceholderContactEmail: contactEmail === "contact@example.com",
  },
  footerLinks: [
    { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
    { href: "/methodology", label: "Methodology" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;