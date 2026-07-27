import { Sparkles } from "lucide-react";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { formatRelativeTime } from "@/utils/format";
import type { AiInsight } from "@/types";

export function AiInsightsPanel({ insights }: { insights: AiInsight[] }) {
  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div key={insight.id} className="rounded-md border border-surface-border bg-surface-1 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 min-w-0">
              <Sparkles className="h-3.5 w-3.5 text-signal mt-0.5 shrink-0" />
              <p className="text-sm font-medium text-ink-primary leading-snug">{insight.title}</p>
            </div>
            <SeverityBadge severity={insight.severity} />
          </div>
          <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">{insight.summary}</p>
          <p className="text-[11px] text-ink-tertiary mt-2">{formatRelativeTime(insight.generatedAt)}</p>
        </div>
      ))}
    </div>
  );
}
