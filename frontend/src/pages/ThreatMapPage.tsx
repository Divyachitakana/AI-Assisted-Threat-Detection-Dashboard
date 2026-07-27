import { PageHeader } from "@/components/common/PageHeader";
import { ChartCard } from "@/components/common/ChartCard";
import { Skeleton } from "@/components/common/Skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { WorldThreatMap } from "@/components/charts/WorldThreatMap";
import { CountryStatsTable } from "@/components/threatmap/CountryStatsTable";
import { useCountryThreatStats, useThreatMapPoints } from "@/hooks/useThreatMap";

export default function ThreatMapPage() {
  const points = useThreatMapPoints();
  const stats = useCountryThreatStats();

  return (
    <div className="space-y-4">
      <PageHeader title="Threat Map" description="Geographic distribution of external attack sources" />

      <ChartCard title="Global Threat Origins" description="Marker size reflects event volume, color reflects severity" className="h-[420px]">
        {points.isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : points.isError || !points.data ? (
          <ErrorState onRetry={() => points.refetch()} />
        ) : (
          <WorldThreatMap data={points.data} />
        )}
      </ChartCard>

      <div className="panel p-4">
        <h3 className="text-sm font-semibold text-ink-primary mb-3">Country Statistics</h3>
        {stats.isLoading ? (
          <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
        ) : stats.isError || !stats.data ? (
          <ErrorState onRetry={() => stats.refetch()} />
        ) : (
          <CountryStatsTable stats={stats.data} />
        )}
      </div>
    </div>
  );
}
