import { Bot, Cpu, User } from "lucide-react";
import type { IncidentTimelineEvent } from "@/types";
import { formatDateTime } from "@/utils/format";

const ACTOR_ICON = { system: Cpu, analyst: User, ai_assistant: Bot } as const;
const ACTOR_LABEL = { system: "System", analyst: "Analyst", ai_assistant: "AI Assistant" } as const;

export function Timeline({ events }: { events: IncidentTimelineEvent[] }) {
  return (
    <ol className="relative border-l border-surface-border ml-3 space-y-5">
      {events.map((event) => {
        const Icon = ACTOR_ICON[event.actor];
        return (
          <li key={event.id} className="ml-5">
            <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 border border-surface-border">
              <Icon className="h-3 w-3 text-signal" />
            </span>
            <p className="text-sm text-ink-primary">{event.label}</p>
            {event.detail && <p className="text-xs text-ink-tertiary mt-0.5">{event.detail}</p>}
            <p className="text-[11px] text-ink-tertiary mt-1">
              {ACTOR_LABEL[event.actor]} · {formatDateTime(event.timestamp)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
