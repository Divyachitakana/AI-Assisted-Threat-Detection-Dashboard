import { motion } from "framer-motion";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { formatDelta } from "@/utils/format";

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaGoodDirection?: "up" | "down";
  icon: LucideIcon;
  accent?: "signal" | "critical" | "success" | "neutral";
  index?: number;
}

const ACCENT_STYLES: Record<NonNullable<MetricCardProps["accent"]>, string> = {
  signal: "bg-signal/10 text-signal",
  critical: "bg-severity-critical/10 text-severity-critical",
  success: "bg-status-success/10 text-status-success",
  neutral: "bg-surface-3 text-ink-secondary",
};

export function MetricCard({
  label,
  value,
  delta,
  deltaGoodDirection = "down",
  icon: Icon,
  accent = "signal",
  index = 0,
}: MetricCardProps) {
  const isGood = delta !== undefined && (deltaGoodDirection === "down" ? delta <= 0 : delta >= 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="panel p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-ink-secondary">{label}</p>
        <div className={clsx("h-8 w-8 rounded-md flex items-center justify-center", ACCENT_STYLES[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-ink-primary tabular-nums">{value}</p>
        {delta !== undefined && (
          <span
            className={clsx(
              "text-xs font-medium tabular-nums",
              isGood ? "text-status-success" : "text-severity-critical"
            )}
          >
            {formatDelta(delta)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
