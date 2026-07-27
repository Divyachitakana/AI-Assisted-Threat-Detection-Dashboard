import { useState } from "react";
import { Inbox } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterPanel } from "@/components/common/FilterPanel";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Skeleton } from "@/components/common/Skeleton";
import { AlertTable } from "@/components/alerts/AlertTable";
import { AlertDetailDrawer } from "@/components/alerts/AlertDetailDrawer";
import { useAlerts } from "@/hooks/useAlerts";
import type { Alert, Severity } from "@/types";

const PAGE_SIZE = 8;

export default function AlertsPage() {
  const [search, setSearch] = useState("");
  const [severities, setSeverities] = useState<Severity[]>([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Alert | null>(null);

  const { data, isLoading, isError, refetch } = useAlerts({
    page,
    pageSize: PAGE_SIZE,
    search,
    severities: severities.length ? severities : undefined,
  });

  function toggleSeverity(s: Severity) {
    setPage(1);
    setSeverities((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Active Alerts" description="Alert queue with status, priority, and analyst assignment" />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search alerts..." />
        <FilterPanel selectedSeverities={severities} onToggleSeverity={toggleSeverity} onClear={() => setSeverities([])} />
      </div>

      <div className="panel p-2">
        {isLoading && !data ? (
          <div className="p-3 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : isError ? (
          <div className="p-4"><ErrorState onRetry={() => refetch()} /></div>
        ) : !data || data.items.length === 0 ? (
          <div className="p-4">
            <EmptyState icon={Inbox} title="No alerts match your filters" description="Try clearing the search or severity filters." />
          </div>
        ) : (
          <>
            <div className="px-2">
              <AlertTable alerts={data.items} onRowClick={setSelected} />
            </div>
            <Pagination page={page} pageSize={PAGE_SIZE} total={data.total} onPageChange={setPage} />
          </>
        )}
      </div>

      <AlertDetailDrawer alert={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
