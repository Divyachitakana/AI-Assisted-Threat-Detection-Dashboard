import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChartCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, actions, children, className }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`panel p-4 flex flex-col ${className ?? ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-ink-primary">{title}</h3>
          {description && <p className="text-xs text-ink-tertiary mt-0.5">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </motion.div>
  );
}
