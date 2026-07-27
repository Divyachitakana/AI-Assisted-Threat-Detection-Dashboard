import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import clsx from "clsx";
import type { ChatMessage } from "@/types";
import { formatRelativeTime } from "@/utils/format";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx("flex gap-2.5", isUser && "flex-row-reverse")}
    >
      <div
        className={clsx(
          "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-surface-3 text-ink-primary" : "bg-signal/15 text-signal"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div className={clsx("max-w-[80%] flex flex-col", isUser && "items-end")}>
        <div
          className={clsx(
            "rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
            isUser ? "bg-signal text-white" : "bg-surface-2 border border-surface-border text-ink-primary"
          )}
        >
          {message.content}
        </div>
        {message.citedSources && message.citedSources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {message.citedSources.map((c) => (
              <span
                key={c.refId}
                className="text-[10px] font-mono rounded border border-surface-border bg-surface-1 px-1.5 py-0.5 text-ink-tertiary"
              >
                {c.label}
              </span>
            ))}
          </div>
        )}
        <span className="text-[10px] text-ink-tertiary mt-1">{formatRelativeTime(message.createdAt)}</span>
      </div>
    </motion.div>
  );
}
