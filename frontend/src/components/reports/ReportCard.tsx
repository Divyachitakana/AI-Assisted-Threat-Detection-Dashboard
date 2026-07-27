import { Download, FileText } from "lucide-react";
import { formatDateTime } from "@/utils/format";
import type { ReportSummary } from "@/types";

export function ReportCard({ report }: { report: ReportSummary }) {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="h-9 w-9 rounded-md bg-signal/10 text-signal flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink-primary">{report.title}</p>
            <p className="text-xs text-ink-tertiary">{report.dateRange}</p>
          </div>
        </div>
        <span className="text-[11px] text-ink-tertiary whitespace-nowrap">
          Generated {formatDateTime(report.generatedAt)}
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {report.highlights.map((h, i) => (
          <li key={i} className="text-xs text-ink-secondary flex gap-2">
            <span className="text-signal mt-1 h-1 w-1 rounded-full bg-signal shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs font-medium text-ink-primary hover:bg-surface-2 transition-colors">
          <Download className="h-3.5 w-3.5" /> Export PDF
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs font-medium text-ink-primary hover:bg-surface-2 transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>
    </div>
  );
}
