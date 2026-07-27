import clsx from "clsx";
import type { IncidentStatus, AlertPriority } from "@/types";

const STATUS_STYLES: Record<IncidentStatus, string> = {
  open: "bg-severity-critical/15 text-severity-critical border-severity-critical/30",
  investigating: "bg-signal/15 text-signal border-signal/30",
  contained: "bg-severity-medium/15 text-severity-medium border-severity-medium/30",
  resolved: "bg-status-success/15 text-status-success border-status-success/30",
  false_positive: "bg-ink-tertiary/15 text-ink-tertiary border-ink-tertiary/30",
};

const STATUS_LABELS: Record<IncidentStatus, string> = {
  open: "Open",
  investigating: "Investigating",
  contained: "Contained",
  resolved: "Resolved",
  false_positive: "False Positive",
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

const PRIORITY_STYLES: Record<AlertPriority, string> = {
  p1: "bg-severity-critical/15 text-severity-critical border-severity-critical/30",
  p2: "bg-severity-high/15 text-severity-high border-severity-high/30",
  p3: "bg-severity-medium/15 text-severity-medium border-severity-medium/30",
  p4: "bg-severity-low/15 text-severity-low border-severity-low/30",
};

export function PriorityBadge({ priority }: { priority: AlertPriority }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase",
        PRIORITY_STYLES[priority]
      )}
    >
      {priority}
    </span>
  );
}
