import { apiClient } from "./apiClient";
import type { AiInsight } from "@/types";

// Generative AI Assistant Agent (Vertex AI / Gemini) — proactive insights feed.
export async function fetchAiInsights(): Promise<AiInsight[]> {
  const { data } = await apiClient.get<AiInsight[]>("/assistant/insights");
  return data;
}
