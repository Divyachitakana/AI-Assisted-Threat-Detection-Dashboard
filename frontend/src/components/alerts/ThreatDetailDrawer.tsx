import { Drawer } from "@/components/common/Drawer";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { RiskGauge } from "@/components/common/RiskGauge";
import { formatDateTime } from "@/utils/format";
import type { Alert } from "@/types";

interface ThreatDetailDrawerProps {
  alert: Alert | null;
  onClose: () => void;
}

export function ThreatDetailDrawer({ alert, onClose }: ThreatDetailDrawerProps) {
  return (
    <Drawer open={!!alert} onClose={onClose} title={alert?.title ?? ""} subtitle={alert?.id}>
      {alert && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <SeverityBadge severity={alert.severity} />
            <StatusBadge status={alert.status} />
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed">{alert.description}</p>

          <div className="flex items-center gap-6">
            <RiskGauge score={alert.riskScore} label="Risk Score" />
            <RiskGauge score={alert.confidenceScore} label="Confidence" />
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <Field label="Source IP" value={alert.sourceIp} mono />
            <Field label="Destination IP" value={alert.destinationIp} mono />
            <Field label="Asset" value={alert.assetId} />
            <Field label="Attack Type" value={alert.attackType} />
            <Field label="Data Source" value={alert.source.replace(/_/g, " ")} />
            {alert.cveId && <Field label="CVE ID" value={alert.cveId} mono />}
            <Field label="MITRE Tactic" value={alert.mitreTactic} />
            <Field label="MITRE Technique" value={alert.mitreTechniqueId} mono />
            <Field label="Detected" value={formatDateTime(alert.detectedAt)} />
            <Field label="Assigned To" value={alert.assignedAnalyst?.name ?? "Unassigned"} />
          </dl>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 rounded-md bg-signal text-white text-xs font-medium py-2 hover:bg-signal-bright transition-colors">
              Escalate to Incident
            </button>
            <button className="flex-1 rounded-md border border-surface-border text-ink-primary text-xs font-medium py-2 hover:bg-surface-2 transition-colors">
              Mark Resolved
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function Field({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-ink-tertiary">{label}</dt>
      <dd className={`text-ink-primary mt-0.5 ${mono ? "font-mono" : ""}`}>{value ?? "—"}</dd>
    </div>
  );
}
