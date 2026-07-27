import { Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

// Cross-source search: query bar + faceted filters (source, severity, date
// range, MITRE technique) over alerts, incidents, and threat intel records.
export default function SearchPage() {
  return (
    <div>
      <PageHeader
        title="Search & Filter"
        description="Cross-source search across alerts, incidents, and threat intelligence"
      />
      <EmptyState
        icon={Search}
        title="Search index pending data wiring"
        description="Query bar and faceted filters will render here once the search/filter service contract is defined."
      />
    </div>
  );
}
