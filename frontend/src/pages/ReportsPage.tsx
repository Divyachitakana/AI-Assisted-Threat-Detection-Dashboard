import { useState } from "react";
import { FileBarChart } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Skeleton } from "@/components/common/Skeleton";
import { ReportCard } from "@/components/reports/ReportCard";
import { ExecutiveSummaryCard } from "@/components/reports/ExecutiveSummaryCard";
import { useReports } from "@/hooks/useReports";
import { useOverviewMetrics } from "@/hooks/useAnalytics";
import clsx from "clsx";

type PeriodFilter = "all" | "weekly" | "monthly";

export default function ReportsPage() {
  const { data: reports, isLoading, isError, refetch } = useReports();
  const metrics = useOverviewMetrics();
  const [period, setPeriod] = useState<PeriodFilter>("all");

  const filtered = reports?.filter((r) => period === "all" || r.period === period) ?? [];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Security Reports"
        description="Executive summaries, security metrics, and compliance reporting"
      />

      <div>
        <h3 className="text-sm font-semibold text-ink-primary mb-3">Executive Summary — Current Period</h3>
        {metrics.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        ) : metrics.isError || !metrics.data ? (
          <ErrorState onRetry={() => metrics.refetch()} />
        ) : (
          <ExecutiveSummaryCard metrics={metrics.data} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-primary">Generated Reports</h3>
        <div className="flex items-center gap-1 bg-surface-2 border border-surface-border rounded-md p-1">
          {(["all", "weekly", "monthly"] as PeriodFilter[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={clsx(
                "rounded px-2.5 py-1.5 text-xs font-medium capitalize transition-colors",
                period === p ? "bg-surface-3 text-ink-primary" : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
        </div>
      ) : isError || !reports ? (
        <ErrorState onRetry={() => refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={FileBarChart} title="No reports for this period" description="Try a different period filter." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
