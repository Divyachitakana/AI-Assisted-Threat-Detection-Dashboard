import { PageHeader } from "@/components/common/PageHeader";
import { ChartCard } from "@/components/common/ChartCard";
import { Skeleton } from "@/components/common/Skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { TrendLineChart } from "@/components/charts/TrendLineChart";
import { SeverityPieChart } from "@/components/charts/SeverityPieChart";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { TopAttackSourcesChart } from "@/components/charts/TopAttackSourcesChart";
import { RiskDistributionChart } from "@/components/charts/RiskDistributionChart";
import {
  useAttackTrend,
  useSeverityDistribution,
  useThreatCategories,
  useTopAttackSources,
} from "@/hooks/useAnalytics";
import { useAssets } from "@/hooks/useAssets";

export default function AnalyticsPage() {
  const trend = useAttackTrend();
  const severity = useSeverityDistribution();
  const categories = useThreatCategories();
  const sources = useTopAttackSources();
  const assets = useAssets();

  return (
    <div className="space-y-4">
      <PageHeader title="Threat Analytics" description="Attack trends, risk distribution, and top attack sources" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Attack Trend" description="30-day alert volume by severity" className="lg:col-span-2 h-80">
          {trend.isLoading ? <Skeleton className="h-full w-full" /> : trend.isError || !trend.data ? <ErrorState onRetry={() => trend.refetch()} /> : <TrendLineChart data={trend.data} />}
        </ChartCard>
        <ChartCard title="Severity Distribution" className="h-80">
          {severity.isLoading ? <Skeleton className="h-full w-full" /> : severity.isError || !severity.data ? <ErrorState onRetry={() => severity.refetch()} /> : <SeverityPieChart data={severity.data} />}
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Threat Categories" description="Detections by attack category" className="h-80">
          {categories.isLoading ? <Skeleton className="h-full w-full" /> : categories.isError || !categories.data ? <ErrorState onRetry={() => categories.refetch()} /> : <CategoryBarChart data={categories.data} />}
        </ChartCard>
        <ChartCard title="Top Attack Sources" description="External IPs by attack volume" className="h-80">
          {sources.isLoading ? <Skeleton className="h-full w-full" /> : sources.isError || !sources.data ? <ErrorState onRetry={() => sources.refetch()} /> : <TopAttackSourcesChart data={sources.data} />}
        </ChartCard>
      </div>

      <ChartCard title="Asset Risk Distribution" description="Monitored assets grouped by risk score band" className="h-72">
        {assets.isLoading ? <Skeleton className="h-full w-full" /> : assets.isError || !assets.data ? <ErrorState onRetry={() => assets.refetch()} /> : <RiskDistributionChart data={assets.data} />}
      </ChartCard>
    </div>
  );
}
