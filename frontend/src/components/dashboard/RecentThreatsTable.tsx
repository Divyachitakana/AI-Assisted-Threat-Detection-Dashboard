import { Link } from "react-router-dom";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { formatRelativeTime } from "@/utils/format";
import type { Alert } from "@/types";

export function RecentThreatsTable({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-ink-tertiary border-b border-surface-border">
            <th className="py-2 pr-4 font-medium">Threat</th>
            <th className="py-2 pr-4 font-medium">Severity</th>
            <th className="py-2 pr-4 font-medium">Source IP</th>
            <th className="py-2 pr-4 font-medium">Detected</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-b border-surface-border/60 last:border-0 hover:bg-surface-2/60">
              <td className="py-2.5 pr-4">
                <p className="text-ink-primary font-medium">{alert.title}</p>
                <p className="text-[11px] text-ink-tertiary font-mono">{alert.id}</p>
              </td>
              <td className="py-2.5 pr-4">
                <SeverityBadge severity={alert.severity} />
              </td>
              <td className="py-2.5 pr-4 font-mono text-xs text-ink-secondary">{alert.sourceIp}</td>
              <td className="py-2.5 pr-4 text-xs text-ink-secondary whitespace-nowrap">
                {formatRelativeTime(alert.detectedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-3 text-right">
        <Link to="/threats" className="text-xs font-medium text-signal hover:text-signal-bright">
          View all active threats →
        </Link>
      </div>
    </div>
  );
}
