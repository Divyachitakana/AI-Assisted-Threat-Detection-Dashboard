import { motion } from "framer-motion";
import { Cpu, MapPin, Server } from "lucide-react";
import { SeverityBadge } from "@/components/common/SeverityBadge";
import { formatRelativeTime } from "@/utils/format";
import type { Alert } from "@/types";

interface ThreatCardProps {
  alert: Alert;
  onClick: () => void;
  index?: number;
}

export function ThreatCard({ alert, onClick, index = 0 }: ThreatCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onClick}
      className="w-full text-left panel p-4 hover:border-signal/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-primary leading-snug">{alert.title}</p>
          <p className="text-[11px] font-mono text-ink-tertiary mt-0.5">{alert.id}</p>
        </div>
        <SeverityBadge severity={alert.severity} />
      </div>

      <p className="text-xs text-ink-secondary mt-2 line-clamp-2">{alert.description}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-ink-tertiary">
        <span className="flex items-center gap-1 font-mono">
          <MapPin className="h-3 w-3" /> {alert.sourceIp}
        </span>
        <span className="flex items-center gap-1">
          <Server className="h-3 w-3" /> {alert.assetId}
        </span>
        <span className="flex items-center gap-1">
          <Cpu className="h-3 w-3" /> {alert.confidenceScore}% confidence
        </span>
        <span className="ml-auto">{formatRelativeTime(alert.detectedAt)}</span>
      </div>
    </motion.button>
  );
}
