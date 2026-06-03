import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const issues = [];
const warnings = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function walk(dir, matcher, files = []) {
  for (const entry of readdirSync(join(root, dir))) {
    const full = join(root, dir, entry);
    const rel = relative(root, full).replaceAll("\\", "/");
    const stats = statSync(full);

    if (stats.isDirectory()) {
      walk(rel, matcher, files);
    } else if (matcher(rel)) {
      files.push(rel);
    }
  }

  return files;
}

function addIssue(message) {
  issues.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

const pageFiles = walk("app", (file) => file.endsWith("/page.tsx") || file === "app/page.tsx");
const metadataDescriptions = new Map();

for (const file of pageFiles) {
  const content = read(file);
  const hasMetadata = content.includes("createPageMetadata(") || content.includes("generateMetadata(");

  if (!hasMetadata) {
    addIssue(`${file}: missing createPageMetadata or generateMetadata usage.`);
  }

  const metadataBlocks = [...content.matchAll(/createPageMetadata\(\{([\s\S]*?)\}\)/g)];
  if (metadataBlocks.length > 0) {
    for (const block of metadataBlocks) {
      const body = block[1];
      if (!/title\s*:/.test(body)) {
        addIssue(`${file}: metadata block is missing title.`);
      }
      if (!/description\s*:/.test(body)) {
        addIssue(`${file}: metadata block is missing meta description.`);
      }

      const descriptionMatch = body.match(/description\s*:\s*([`'"])([\s\S]*?)\1/);
      if (descriptionMatch) {
        const description = descriptionMatch[2].replace(/\s+/g, " ").trim();
        const existing = metadataDescriptions.get(description) ?? [];
        existing.push(file);
        metadataDescriptions.set(description, existing);
      }
    }
  }

  const visibleText = content
    .replace(/import[\s\S]*?;\n/g, "")
    .replace(/[{}<>/`$()[\].,;:=?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (visibleText.length < 900) {
    addWarning(`${file}: page may be thin; review visible content depth.`);
  }
}

for (const [description, files] of metadataDescriptions) {
  if (description && files.length > 1) {
    addIssue(`Duplicate meta description in: ${files.join(", ")}`);
  }
}

const sitemap = read("app/sitemap.ts");
if (sitemap.includes("/go")) {
  addIssue("app/sitemap.ts: /go route appears in sitemap source.");
}
for (const route of ["/pricing-calculator", "/about", "/articles"]) {
  if (!sitemap.includes(route)) {
    addIssue(`app/sitemap.ts: ${route} is missing from sitemap source.`);
  }
}

const robots = read("app/robots.ts");
if (!robots.includes('"/go/"')) {
  addIssue("app/robots.ts: /go/ is not disallowed.");
}

const affiliateLinks = read("data/affiliateLinks.ts");
const placeholderLinkCount = (affiliateLinks.match(/destinationUrl:\s*null/g) ?? []).length;
if (placeholderLinkCount > 0) {
  addWarning(`data/affiliateLinks.ts: ${placeholderLinkCount} affiliate/referral destination URLs are placeholders.`);
}

const softwareData = read("data/software.ts");
const softwareEntries = softwareData.split(/\n  \{\n    id:/).slice(1);
for (const entry of softwareEntries) {
  const id = entry.match(/"([^"]+)"/)?.[1] ?? "unknown software";
  const pricingStatus = entry.match(/pricingStatus:\s*"([^"]+)"/)?.[1];
  const startingPrice = entry.match(/startingPriceMonthly:\s*([^,\n]+)/)?.[1]?.trim();

  if ((pricingStatus === "unknown" || pricingStatus === "custom_quote") && startingPrice && startingPrice !== "null") {
    addIssue(`data/software.ts: ${id} has ${pricingStatus} pricing but also a startingPriceMonthly value.`);
  }
}

const sourceFiles = walk("app", (file) => file.endsWith(".tsx")).concat(
  walk("components", (file) => file.endsWith(".tsx")),
  walk("lib", (file) => file.endsWith(".ts")),
);

for (const file of sourceFiles) {
  const content = read(file);
  if (/aggregateRating|reviewRating|@type["']?\s*:\s*["']Review["']/i.test(content)) {
    addIssue(`${file}: possible fake review or rating schema detected.`);
  }
}

if (warnings.length > 0) {
  console.log("SEO warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (issues.length > 0) {
  console.error("SEO validation failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("SEO validation passed.");
