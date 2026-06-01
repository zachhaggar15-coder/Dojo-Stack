export type AnalyticsPrimitive = string | number | boolean | null;
export type AnalyticsProperties = Record<string, AnalyticsPrimitive | AnalyticsPrimitive[]>;

type VercelAnalyticsWindow = Window & {
  // Vercel Web Analytics exposes this queue when @vercel/analytics is installed and <Analytics /> is mounted.
  // Setup location: app/layout.tsx can import { Analytics } from "@vercel/analytics/react" and render <Analytics />.
  va?: (command: "event", eventName: string, properties?: AnalyticsProperties) => void;
  dojoStackAnalytics?: {
    track?: (eventName: string, properties?: AnalyticsProperties) => void;
  };
};

function sanitizeProperties(properties: AnalyticsProperties = {}): AnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean" || item === null);
      }

      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null;
    }),
  );
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const safeProperties = sanitizeProperties(properties);
  const analyticsWindow = window as VercelAnalyticsWindow;

  window.dispatchEvent(
    new CustomEvent("dojostack:analytics", {
      detail: {
        event: eventName,
        properties: safeProperties,
        timestamp: new Date().toISOString(),
      },
    }),
  );

  analyticsWindow.va?.("event", eventName, safeProperties);
  analyticsWindow.dojoStackAnalytics?.track?.(eventName, safeProperties);
}

export function trackAffiliateClick(softwareId: string, sourcePage: string, ctaLocation: string) {
  trackEvent("affiliate_link_click", {
    softwareId,
    sourcePage,
    ctaLocation,
  });
}

export function trackQuizStarted() {
  trackEvent("quiz_started");
}

export function trackQuizCompleted(resultIds: string[]) {
  trackEvent("quiz_completed", {
    resultIds,
  });
}

export function trackCalculatorCompleted(summary: AnalyticsProperties) {
  trackEvent("calculator_completed", summary);
}

export function trackDirectoryFilterUsed(filterType: string, value: string) {
  trackEvent("directory_filter_used", {
    filterType,
    value,
  });
}

export function trackComparisonCtaClick(comparisonSlug: string, softwareId: string) {
  trackEvent("comparison_cta_click", {
    comparisonSlug,
    softwareId,
  });
}

export function trackReviewCtaClick(softwareId: string) {
  trackEvent("review_cta_click", {
    softwareId,
  });
}
