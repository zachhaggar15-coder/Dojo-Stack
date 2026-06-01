import { Badge } from "@/components/ui/Badge";
import type { FeatureSupport } from "@/data/software";
import { supportLabel } from "@/lib/formatting";

type StatusPillProps = {
  status: FeatureSupport | "verified" | "pending" | "uncertain_after_trial" | "not_available" | "unknown";
};

export function StatusPill({ status }: StatusPillProps) {
  if (status === "verified") {
    return <Badge tone="green">Verified</Badge>;
  }

  if (status === "pending") {
    return <Badge tone="amber">Pending</Badge>;
  }

  if (status === "uncertain_after_trial") {
    return <Badge tone="amber">Uncertain after trial</Badge>;
  }

  if (status === "not_available") {
    return <Badge tone="red">Not available</Badge>;
  }

  if (status === "unknown") {
    return <Badge tone="amber">Unknown</Badge>;
  }

  const tone = status === "yes" ? "green" : status === "partial" ? "blue" : status === "no" ? "red" : "amber";

  return <Badge tone={tone}>{supportLabel(status)}</Badge>;
}
