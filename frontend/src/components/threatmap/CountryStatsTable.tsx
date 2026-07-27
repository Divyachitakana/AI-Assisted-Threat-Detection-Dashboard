import { SeverityBadge } from "@/components/common/SeverityBadge";
import type { CountryThreatStat } from "@/types";

export function CountryStatsTable({ stats }: { stats: CountryThreatStat[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-ink-tertiary border-b border-surface-border">
            <th className="py-2.5 pr-4 font-medium">Country</th>
            <th className="py-2.5 pr-4 font-medium">Threat Count</th>
            <th className="py-2.5 pr-4 font-medium">Top Severity</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.countryCode} className="border-b border-surface-border/60 last:border-0 hover:bg-surface-2/60">
              <td className="py-2.5 pr-4">
                <span className="text-ink-primary font-medium">{s.country}</span>
                <span className="text-[11px] text-ink-tertiary font-mono ml-2">{s.countryCode}</span>
              </td>
              <td className="py-2.5 pr-4 tabular-nums text-ink-secondary">{s.threatCount}</td>
              <td className="py-2.5 pr-4">
                <SeverityBadge severity={s.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
