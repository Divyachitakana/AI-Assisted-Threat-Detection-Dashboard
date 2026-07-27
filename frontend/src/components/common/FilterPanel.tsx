import clsx from "clsx";
import type { Severity } from "@/types";

const SEVERITIES: Severity[] = ["critical", "high", "medium", "low", "info"];

interface FilterPanelProps {
  selectedSeverities: Severity[];
  onToggleSeverity: (severity: Severity) => void;
  onClear: () => void;
}

const SEVERITY_DOT: Record<Severity, string> = {
  critical: "bg-severity-critical",
  high: "bg-severity-high",
  medium: "bg-severity-medium",
  low: "bg-severity-low",
  info: "bg-severity-info",
};

export function FilterPanel({ selectedSeverities, onToggleSeverity, onClear }: FilterPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SEVERITIES.map((severity) => {
        const active = selectedSeverities.includes(severity);
        return (
          <button
            key={severity}
            onClick={() => onToggleSeverity(severity)}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium capitalize transition-colors",
              active
                ? "border-signal/40 bg-signal/10 text-signal"
                : "border-surface-border text-ink-secondary hover:bg-surface-2"
            )}
          >
            <span className={clsx("h-1.5 w-1.5 rounded-full", SEVERITY_DOT[severity])} />
            {severity}
          </button>
        );
      })}
      {selectedSeverities.length > 0 && (
        <button onClick={onClear} className="text-xs text-ink-tertiary hover:text-ink-primary underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
