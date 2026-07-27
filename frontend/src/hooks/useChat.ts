import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { fetchSuggestedQuestions, sendChatMessage } from "@/services/chat.service";
import type { ChatMessage } from "@/types";

export function useSuggestedQuestions() {
  return useQuery({ queryKey: ["suggested-questions"], queryFn: fetchSuggestedQuestions });
}

// Chat history is kept in local component state (in-memory only, per
// artifact/browser-storage constraints) while the send action goes through
// React Query's mutation lifecycle so loading/error states are consistent
// with the rest of the app.
export function useChatConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (assistantMessage) => {
      setMessages((prev) => [...prev, assistantMessage]);
    },
  });

  const send = useCallback(
    (text: string) => {
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-u`,
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      mutation.mutate(text);
    },
    [mutation]
  );

  const clear = useCallback(() => {
    setMessages([]);
    queryClient.removeQueries({ queryKey: ["chat"] });
  }, [queryClient]);

  return { messages, send, clear, isSending: mutation.isPending };
}
