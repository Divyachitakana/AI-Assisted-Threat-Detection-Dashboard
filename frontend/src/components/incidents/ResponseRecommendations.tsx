import { CheckCircle2, Zap } from "lucide-react";
import clsx from "clsx";
import type { ResponseRecommendation } from "@/types";

const PRIORITY_STYLES: Record<ResponseRecommendation["priority"], string> = {
  immediate: "text-severity-critical",
  high: "text-severity-high",
  recommended: "text-ink-secondary",
};

export function ResponseRecommendations({ items }: { items: ResponseRecommendation[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-2.5 rounded-md border border-surface-border bg-surface-1 p-2.5">
          <CheckCircle2 className={clsx("h-4 w-4 mt-0.5 shrink-0", PRIORITY_STYLES[item.priority])} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-primary leading-snug">{item.action}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={clsx("text-[10px] font-semibold uppercase", PRIORITY_STYLES[item.priority])}>
                {item.priority}
              </span>
              {item.automatable && (
                <span className="inline-flex items-center gap-1 text-[10px] text-signal">
                  <Zap className="h-3 w-3" /> Automatable
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
