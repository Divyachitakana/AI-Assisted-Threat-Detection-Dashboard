import { MetricCard } from "@/components/common/MetricCard";
import { Siren, ShieldAlert, Gauge, Server } from "lucide-react";
import type { SecurityOverviewMetrics } from "@/types";

export function ExecutiveSummaryCard({ metrics }: { metrics: SecurityOverviewMetrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard label="Total Threats" value={metrics.totalThreats} delta={metrics.totalThreatsDelta} icon={Siren} accent="signal" />
      <MetricCard label="Active Alerts" value={metrics.activeAlerts} delta={metrics.activeAlertsDelta} icon={ShieldAlert} accent="critical" />
      <MetricCard label="Risk Score" value={metrics.riskScore} delta={metrics.riskScoreDelta} icon={Gauge} accent="success" />
      <MetricCard label="Assets Monitored" value={metrics.assetsMonitored} delta={metrics.assetsMonitoredDelta} deltaGoodDirection="up" icon={Server} accent="neutral" />
    </div>
  );
}
