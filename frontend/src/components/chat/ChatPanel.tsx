import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useChatConversation, useSuggestedQuestions } from "@/hooks/useChat";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { TypingIndicator } from "./TypingIndicator";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, send, isSending } = useChatConversation();
  const { data: suggestions = [] } = useSuggestedQuestions();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    send(trimmed);
    setInput("");
  }

  return (
    <div className="panel flex flex-col h-[520px] overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-4 h-14 border-b border-surface-border bg-surface-1 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-signal" />
          <div>
            <p className="text-sm font-semibold text-ink-primary">Security Assistant</p>
            <p className="text-[11px] text-ink-tertiary">Grounded in MITRE ATT&CK &amp; playbooks</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close assistant" className="p-1.5 rounded-md text-ink-secondary hover:bg-surface-2">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-xs text-ink-tertiary">
              Ask about an active alert, an incident's MITRE mapping, or recommended response steps.
            </p>
            <SuggestedQuestions questions={suggestions} onSelect={handleSend} />
          </div>
        ) : (
          messages.map((m) => <ChatMessageBubble key={m.id} message={m} />)
        )}
        {isSending && <TypingIndicator />}
      </div>

      <div className="p-3 border-t border-surface-border shrink-0">
        <div className="flex items-center gap-2 bg-surface-2 border border-surface-border rounded-md px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask the security assistant..."
            className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-tertiary outline-none"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isSending}
            aria-label="Send message"
            className="text-signal hover:text-signal-bright disabled:text-ink-tertiary disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
