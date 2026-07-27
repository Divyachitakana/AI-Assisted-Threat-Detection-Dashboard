import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/common/Skeleton";
import { IncidentList } from "@/components/incidents/IncidentList";
import { IncidentDetailPanel } from "@/components/incidents/IncidentDetailPanel";
import { useIncidents } from "@/hooks/useIncidents";
import type { Incident } from "@/types";

export default function IncidentsPage() {
  const { data: incidents, isLoading, isError, refetch } = useIncidents();
  const [selected, setSelected] = useState<Incident | null>(null);

  useEffect(() => {
    if (!selected && incidents && incidents.length > 0) {
      setSelected(incidents[0]);
    }
  }, [incidents, selected]);

  return (
    <div className="space-y-5">
      <PageHeader title="Incident Management" description="Correlated incidents with response workflow and risk prioritization" />

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
          <div className="panel p-3 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      ) : isError || !incidents ? (
        <ErrorState onRetry={() => refetch()} />
      ) : incidents.length === 0 ? (
        <EmptyState icon={ShieldAlert} title="No incidents" description="No correlated incidents right now — nice work." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
          <div className="panel overflow-hidden max-h-[calc(100vh-220px)] overflow-y-auto">
            <IncidentList incidents={incidents} selectedId={selected?.id ?? null} onSelect={setSelected} />
          </div>
          <IncidentDetailPanel incident={selected} />
        </div>
      )}
    </div>
  );
}
