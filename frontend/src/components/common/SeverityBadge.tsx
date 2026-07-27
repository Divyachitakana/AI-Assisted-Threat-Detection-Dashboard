import clsx from "clsx";
import type { Severity } from "@/types";

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-severity-critical/15 text-severity-critical border-severity-critical/30",
  high: "bg-severity-high/15 text-severity-high border-severity-high/30",
  medium: "bg-severity-medium/15 text-severity-medium border-severity-medium/30",
  low: "bg-severity-low/15 text-severity-low border-severity-low/30",
  info: "bg-severity-info/15 text-severity-info border-severity-info/30",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        SEVERITY_STYLES[severity]
      )}
    >
      {severity}
    </span>
  );
}
