// Update this if the final anonymous brand name changes.
const siteName = "DojoStack";

// Production domain used for canonical URLs, Open Graph URLs, robots, and sitemap output.
const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dojostack.co.uk";

// Public contact mailbox used on the contact page and Organization schema.
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dojostack@protonmail.com";

// Impact.com site verification token. Update if Impact issues a replacement token.
const impactSiteVerification = "acecb91c-ece9-4e07-a885-c0eaf54fc8b3";

// Logo and icon assets. Update these paths if the final logo files change.
const brandAssets = {
  logo: "/dojostack-logo.png",
  mark: "/dojostack-mark.png",
  favicon: "/favicon-48x48.png",
  icon192: "/icon-192.png",
  icon512: "/icon-512.png",
  appleTouchIcon: "/apple-touch-icon.png",
  openGraphImage: "/og-image.png",
} as const;

export const siteConfig = {
  siteName,
  tagline: "Find the right software for your martial arts gym",
  domain,
  contactEmail,
  brandAssets,
  verification: {
    impactSiteVerification,
  },
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
