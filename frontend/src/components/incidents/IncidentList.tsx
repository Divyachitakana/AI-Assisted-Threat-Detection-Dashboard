import { SeverityBadge } from "@/components/common/SeverityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatRelativeTime } from "@/utils/format";
import type { Incident } from "@/types";
import clsx from "clsx";

interface IncidentListProps {
  incidents: Incident[];
  selectedId: string | null;
  onSelect: (incident: Incident) => void;
}

export function IncidentList({ incidents, selectedId, onSelect }: IncidentListProps) {
  return (
    <div className="divide-y divide-surface-border">
      {incidents.map((incident) => (
        <button
          key={incident.id}
          onClick={() => onSelect(incident)}
          className={clsx(
            "w-full text-left px-4 py-3 hover:bg-surface-2/60 transition-colors",
            selectedId === incident.id && "bg-signal/5 border-l-2 border-signal"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-ink-primary leading-snug">{incident.title}</p>
            <SeverityBadge severity={incident.severity} />
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <StatusBadge status={incident.status} />
            <span className="text-[11px] text-ink-tertiary font-mono">{incident.id}</span>
          </div>
          <div className="flex items-center justify-between mt-1.5 text-[11px] text-ink-tertiary">
            <span>{incident.assignee ?? "Unassigned"}</span>
            <span>{formatRelativeTime(incident.updatedAt)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
