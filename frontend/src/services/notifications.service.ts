import { apiClient } from "./apiClient";
import type { NotificationItem } from "@/types";

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const { data } = await apiClient.get<NotificationItem[]>("/notifications");
  return data;
}
