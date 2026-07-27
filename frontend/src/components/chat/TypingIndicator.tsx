import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="h-7 w-7 rounded-full bg-signal/15 text-signal flex items-center justify-center shrink-0">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="rounded-lg px-3.5 py-3 bg-surface-2 border border-surface-border flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-tertiary animate-pulse [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-tertiary animate-pulse [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-tertiary animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  );
}
