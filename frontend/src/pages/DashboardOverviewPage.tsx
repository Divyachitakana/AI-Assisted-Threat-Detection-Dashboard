import { Siren, ShieldAlert, Gauge, Server, Inbox } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { MetricCard } from "@/components/common/MetricCard";
import { ChartCard } from "@/components/common/ChartCard";
import { CardSkeleton, Skeleton } from "@/components/common/Skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { RecentThreatsTable } from "@/components/dashboard/RecentThreatsTable";
import { AiInsightsPanel } from "@/components/dashboard/AiInsightsPanel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SeverityPieChart } from "@/components/charts/SeverityPieChart";
import { TrendLineChart } from "@/components/charts/TrendLineChart";
import { useOverviewMetrics, useSeverityDistribution, useAttackTrend } from "@/hooks/useAnalytics";
import { useAiInsights } from "@/hooks/useAiInsights";
import { useAlerts } from "@/hooks/useAlerts";

export default function DashboardOverviewPage() {
  const metrics = useOverviewMetrics();
  const severity = useSeverityDistribution();
  const trend = useAttackTrend();
  const insights = useAiInsights();
  const recentAlerts = useAlerts({ page: 1, pageSize: 6 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Overview"
        description="Real-time risk posture across all connected data sources"
      />

      {/* Metric cards */}
      {metrics.isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : metrics.isError || !metrics.data ? (
        <ErrorState onRetry={() => metrics.refetch()} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard index={0} label="Total Threats" value={metrics.data.totalThreats} delta={metrics.data.totalThreatsDelta} icon={Siren} accent="signal" />
          <MetricCard index={1} label="Active Alerts" value={metrics.data.activeAlerts} delta={metrics.data.activeAlertsDelta} icon={ShieldAlert} accent="critical" />
          <MetricCard index={2} label="Risk Score" value={metrics.data.riskScore} delta={metrics.data.riskScoreDelta} icon={Gauge} accent="success" />
          <MetricCard index={3} label="Assets Monitored" value={metrics.data.assetsMonitored} delta={metrics.data.assetsMonitoredDelta} deltaGoodDirection="up" icon={Server} accent="neutral" />
        </div>
      )}

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Threat Trend (30 days)" description="Alert volume by severity over time" className="lg:col-span-2 h-80">
          {trend.isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : trend.isError || !trend.data ? (
            <ErrorState onRetry={() => trend.refetch()} />
          ) : (
            <TrendLineChart data={trend.data} />
          )}
        </ChartCard>

        <ChartCard title="Severity Distribution" description="Active alerts by severity" className="h-80">
          {severity.isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : severity.isError || !severity.data ? (
            <ErrorState onRetry={() => severity.refetch()} />
          ) : (
            <SeverityPieChart data={severity.data} />
          )}
        </ChartCard>
      </div>

      {/* Recent threats + AI insights + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 panel p-4">
          <h3 className="text-sm font-semibold text-ink-primary mb-3">Recent Threats</h3>
          {recentAlerts.isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : recentAlerts.isError || !recentAlerts.data ? (
            <ErrorState onRetry={() => recentAlerts.refetch()} />
          ) : recentAlerts.data.items.length === 0 ? (
            <EmptyState icon={Inbox} title="No recent threats" description="Nothing detected in the current window." />
          ) : (
            <RecentThreatsTable alerts={recentAlerts.data.items} />
          )}
        </div>

        <div className="space-y-4">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-primary mb-3">Quick Actions</h3>
            <QuickActions />
          </div>
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-primary mb-3">AI Insights</h3>
            {insights.isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : insights.isError || !insights.data ? (
              <ErrorState onRetry={() => insights.refetch()} />
            ) : (
              <AiInsightsPanel insights={insights.data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
