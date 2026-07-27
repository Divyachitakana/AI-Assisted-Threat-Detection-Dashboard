import { SeverityBadge } from "@/components/common/SeverityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RiskGauge } from "@/components/common/RiskGauge";
import { Timeline } from "@/components/common/Timeline";
import { MitreMappingCard } from "./MitreMappingCard";
import { ResponseRecommendations } from "./ResponseRecommendations";
import { useIncidentMitreMapping, useResponseRecommendations } from "@/hooks/useIncidents";
import { EmptyState } from "@/components/common/EmptyState";
import { ShieldAlert } from "lucide-react";
import { formatDateTime } from "@/utils/format";
import type { Incident } from "@/types";

export function IncidentDetailPanel({ incident }: { incident: Incident | null }) {
  const { data: mitreMapping } = useIncidentMitreMapping(incident?.id ?? null);
  const { data: recommendations = [] } = useResponseRecommendations(incident?.id ?? null);

  if (!incident) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Select an incident"
        description="Choose an incident from the list to view its timeline, MITRE mapping, and recommended response."
      />
    );
  }

  return (
    <div className="panel p-5 space-y-6">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-ink-primary">{incident.title}</h2>
            <p className="text-xs font-mono text-ink-tertiary mt-1">{incident.id}</p>
          </div>
          <RiskGauge score={incident.riskScore} size={64} label="" />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <SeverityBadge severity={incident.severity} />
          <StatusBadge status={incident.status} />
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs">
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-ink-tertiary">Assignee</dt>
            <dd className="text-ink-primary mt-0.5">{incident.assignee ?? "Unassigned"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-ink-tertiary">Created</dt>
            <dd className="text-ink-primary mt-0.5">{formatDateTime(incident.createdAt)}</dd>
          </div>
        </dl>
      </div>

      <MitreMappingCard mapping={mitreMapping} />

      <div>
        <p className="text-xs font-semibold text-ink-primary mb-3">Recommended Response</p>
        <ResponseRecommendations items={recommendations} />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink-primary mb-3">Incident Timeline</p>
        <Timeline events={incident.timeline} />
      </div>
    </div>
  );
}
