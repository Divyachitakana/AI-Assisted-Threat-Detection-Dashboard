import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2, MessageSquare } from "lucide-react";
import clsx from "clsx";
import { PageHeader } from "@/components/common/PageHeader";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChatConversation, useSuggestedQuestions } from "@/hooks/useChat";

// Static list of past conversation topics — conversation persistence isn't
// implemented yet (no backend), so this illustrates the intended UI only.
const PAST_CONVERSATIONS = [
  "MITRE mapping for INC-00001",
  "Containment steps for brute-force attacks",
  "Weekly critical alert summary",
  "Risk score explanation: customer-data-bucket",
];

export default function AiAssistantPage() {
  const { messages, send, clear, isSending } = useChatConversation();
  const { data: suggestions = [], isLoading: suggestionsLoading } = useSuggestedQuestions();
  const [input, setInput] = useState("");
  const [activeConvo, setActiveConvo] = useState(0);
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
    <div className="flex flex-col h-[calc(100vh-112px)]">
      <PageHeader
        title="AI Security Assistant"
        description="Grounded in MITRE ATT&CK, internal playbooks, and live incident data via retrieval-augmented generation"
        actions={
          <button
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs font-medium text-ink-secondary hover:bg-surface-2 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear conversation
          </button>
        }
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 min-h-0">
        {/* Conversation history sidebar */}
        <div className="hidden lg:flex flex-col panel p-3">
          <p className="text-xs font-semibold text-ink-primary px-1 mb-2">Chat History</p>
          <div className="space-y-1 overflow-y-auto">
            {PAST_CONVERSATIONS.map((title, i) => (
              <button
                key={title}
                onClick={() => setActiveConvo(i)}
                className={clsx(
                  "w-full flex items-start gap-2 rounded-md px-2.5 py-2 text-left text-xs transition-colors",
                  activeConvo === i ? "bg-signal/10 text-signal" : "text-ink-secondary hover:bg-surface-2"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span className="line-clamp-2 leading-snug">{title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="panel flex flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 max-w-md mx-auto">
                <div className="h-12 w-12 rounded-full bg-signal/10 text-signal flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-primary">Ask about any alert, incident, or MITRE technique</p>
                  <p className="text-xs text-ink-tertiary mt-1">
                    Responses are grounded in your security data via retrieval-augmented generation over the
                    vector database and internal playbooks.
                  </p>
                </div>
                {!suggestionsLoading && <SuggestedQuestions questions={suggestions} onSelect={handleSend} />}
              </div>
            ) : (
              messages.map((m) => <ChatMessageBubble key={m.id} message={m} />)
            )}
            {isSending && <TypingIndicator />}
          </div>

          <div className="p-4 border-t border-surface-border shrink-0">
            <div className="flex items-center gap-2 bg-surface-2 border border-surface-border rounded-md px-3 py-2.5">
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
                className="inline-flex items-center gap-1.5 rounded-md bg-signal text-white text-xs font-medium px-3 py-1.5 hover:bg-signal-bright transition-colors disabled:bg-surface-3 disabled:text-ink-tertiary disabled:cursor-not-allowed"
              >
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
