# DojoStack

DojoStack is a Next.js software comparison platform for martial arts gym owners. It helps BJJ, MMA, boxing, karate, taekwondo, judo, and general martial arts schools compare gym management software using static, editable data.

The site is designed to be useful without affiliate links. Provider buttons route through `/go/[slug]`, which uses verified referral URLs only when explicitly configured and otherwise falls back to the provider's normal website.

## Production URL

- Production domain: `https://dojostack.co.uk`
- Public contact email: `dojostack@protonmail.com`

Both values are configured in `data/siteConfig.ts` and can be overridden at build time with environment variables.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static data files
- No database
- No CMS
- No user accounts
- No email capture
- Vercel-compatible deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

Run these before deployment:

```bash
npm run typecheck
npm run lint
npm run seo:check
npm run build
```

## Environment Variables

The app works without environment variables because production defaults are committed in `data/siteConfig.ts`.

Optional overrides:

```bash
NEXT_PUBLIC_SITE_URL=https://dojostack.co.uk
NEXT_PUBLIC_CONTACT_EMAIL=dojostack@protonmail.com
```

See `.env.example`.

## Content And Data

- Site configuration: `data/siteConfig.ts`
- Software records: `data/software.ts`
- Managed outbound links: `data/affiliateLinks.ts`
- Curated comparison pages: `data/comparisonPages.ts`
- Best-software pages: `data/bestSoftwarePages.ts`
- Controlled article drafts: `data/articles.ts`

Do not hard-code provider URLs inside components. Use `/go/[slug]` routes and update `data/affiliateLinks.ts`.

## SEO And Indexing

- `/go/*` routes send `X-Robots-Tag: noindex, nofollow` and are disallowed in `robots.txt`.
- Draft and noindex comparison pages are excluded from the sitemap.
- Draft articles are noindexed and excluded from the sitemap.
- Placeholder-heavy software pages are noindexed and excluded from the sitemap.
- The sitemap only includes pages considered safe to index.

Current launch posture: many commercial pages remain noindexed until provider pricing, features, and sources are manually verified.

## Affiliate And Disclosure Rules

- No affiliate relationship is treated as verified unless a real link and status are provided.
- Affiliate availability does not determine recommendations.
- Recommendations should prioritize martial arts fit, feature fit, ease of use, value, transparency, and data confidence.
- No fake reviews, ratings, testimonials, or hands-on testing claims.

## Optional Analytics

Analytics are optional. The site works without analytics, a database, login, email capture, or personal data storage.

`lib/analytics.ts` dispatches lightweight browser events and can call Vercel Analytics if `@vercel/analytics` is installed later.

To enable Vercel Analytics:

```bash
npm install @vercel/analytics
```

Then render `<Analytics />` in `app/layout.tsx`.

## Vercel Deployment

Recommended setup:

```bash
npm ci
npm run typecheck
npm run lint
npm run seo:check
npm run build
```

Then deploy through Vercel Git integration or CLI:

```bash
vercel link
vercel --prod
```

If using CI, set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as secrets and use `vercel build --prod` followed by `vercel deploy --prebuilt --prod`.