import { StatusPill } from "@/components/ui/StatusPill";
import { featureLabels, type Software, type SoftwareFeatureKey } from "@/data/software";

type FeatureMatrixProps = {
  items: Software[];
  features?: SoftwareFeatureKey[];
};

export function FeatureMatrix({ items, features = Object.keys(featureLabels) as SoftwareFeatureKey[] }: FeatureMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <table className="min-w-full divide-y divide-zinc-200 text-sm">
        <thead className="bg-zinc-100 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
          <tr>
            <th className="px-4 py-3">Feature</th>
            {items.map((item) => (
              <th key={item.slug} className="px-4 py-3">
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {features.map((feature) => (
            <tr key={feature}>
              <th className="px-4 py-3 text-left font-medium text-zinc-800">{featureLabels[feature]}</th>
              {items.map((item) => (
                <td key={`${item.slug}-${feature}`} className="px-4 py-3">
                  <StatusPill status={item.features[feature]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
