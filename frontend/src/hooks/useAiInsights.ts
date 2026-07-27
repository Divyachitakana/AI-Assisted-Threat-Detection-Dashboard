import { useQuery } from "@tanstack/react-query";
import { fetchAiInsights } from "@/services/insights.service";

export function useAiInsights() {
  return useQuery({ queryKey: ["ai-insights"], queryFn: fetchAiInsights });
}
