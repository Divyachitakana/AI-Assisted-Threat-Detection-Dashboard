import type { MitreMapping } from "@/types";
import { Crosshair } from "lucide-react";

export function MitreMappingCard({ mapping }: { mapping?: MitreMapping }) {
  if (!mapping) return null;
  return (
    <div className="rounded-md border border-surface-border bg-surface-1 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Crosshair className="h-3.5 w-3.5 text-signal" />
        <p className="text-xs font-semibold text-ink-primary">MITRE ATT&CK Mapping</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">Tactic</p>
          <p className="text-ink-primary mt-0.5">{mapping.tacticName}</p>
          <p className="text-ink-tertiary font-mono text-[11px]">{mapping.tacticId}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">Technique</p>
          <p className="text-ink-primary mt-0.5">{mapping.techniqueName}</p>
          <p className="text-ink-tertiary font-mono text-[11px]">{mapping.techniqueId}</p>
        </div>
      </div>
    </div>
  );
}
