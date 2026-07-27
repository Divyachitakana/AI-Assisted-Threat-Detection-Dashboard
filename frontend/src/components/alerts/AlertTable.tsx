import { SeverityBadge } from "@/components/common/SeverityBadge";
import { StatusBadge, PriorityBadge } from "@/components/common/StatusBadge";
import { formatRelativeTime } from "@/utils/format";
import type { Alert } from "@/types";

interface AlertTableProps {
  alerts: Alert[];
  onRowClick: (alert: Alert) => void;
}

export function AlertTable({ alerts, onRowClick }: AlertTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-ink-tertiary border-b border-surface-border">
            <th className="py-2.5 pr-4 font-medium">Alert</th>
            <th className="py-2.5 pr-4 font-medium">Priority</th>
            <th className="py-2.5 pr-4 font-medium">Severity</th>
            <th className="py-2.5 pr-4 font-medium">Status</th>
            <th className="py-2.5 pr-4 font-medium">Assigned Analyst</th>
            <th className="py-2.5 pr-4 font-medium">Detected</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              onClick={() => onRowClick(alert)}
              className="border-b border-surface-border/60 last:border-0 hover:bg-surface-2/60 cursor-pointer"
            >
              <td className="py-2.5 pr-4">
                <p className="text-ink-primary font-medium">{alert.title}</p>
                <p className="text-[11px] text-ink-tertiary font-mono">{alert.id}</p>
              </td>
              <td className="py-2.5 pr-4">
                <PriorityBadge priority={alert.priority} />
              </td>
              <td className="py-2.5 pr-4">
                <SeverityBadge severity={alert.severity} />
              </td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={alert.status} />
              </td>
              <td className="py-2.5 pr-4">
                {alert.assignedAnalyst ? (
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-surface-3 border border-surface-border flex items-center justify-center text-[10px] font-medium text-ink-primary">
                      {alert.assignedAnalyst.initials}
                    </span>
                    <span className="text-xs text-ink-secondary">{alert.assignedAnalyst.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-ink-tertiary">Unassigned</span>
                )}
              </td>
              <td className="py-2.5 pr-4 text-xs text-ink-secondary whitespace-nowrap">
                {formatRelativeTime(alert.detectedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
