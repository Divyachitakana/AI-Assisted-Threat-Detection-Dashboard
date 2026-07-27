import { apiClient } from "./apiClient";
import type { ChatMessage } from "@/types";

// Generative AI Assistant Agent: Vertex AI / Gemini + RAG over the vector
// database (semantic context) and internal security playbooks / MITRE
// ATT&CK knowledge base, per the architecture diagram's layer 3B.
// Today POST /api/assistant/chat returns pattern-matched canned responses
// from the backend (see app/services/assistant_service.py) — swapping in
// real Gemini calls there won't require any frontend change.
export async function fetchSuggestedQuestions(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>("/assistant/suggested-questions");
  return data;
}

export async function sendChatMessage(message: string): Promise<ChatMessage> {
  const { data } = await apiClient.post<ChatMessage>("/assistant/chat", { message });
  return data;
}
