import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

// Floating entry point for the LLM Agent (Vertex AI / Gemini + RAG over
// MITRE ATT&CK and internal playbooks). Kept as a self-contained component
// so it can be mounted once in MainLayout and stay open across route changes.
export function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)]">
          <ChatPanel onClose={() => setOpen(false)} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Security Assistant"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-signal text-white shadow-glow flex items-center justify-center hover:bg-signal-bright transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>
    </>
  );
}
