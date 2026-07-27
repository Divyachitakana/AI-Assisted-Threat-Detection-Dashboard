import { apiClient } from "./apiClient";
import type { UserPreferences } from "@/types";

// Backend-persisted user preferences (GET/PUT /api/settings). Not yet wired
// into hooks/usePreferences.ts, which still persists to localStorage —
// switching that hook to call these functions instead is a drop-in change
// once account-level sync (post-authentication) is needed, since the
// UserPreferences shape is identical either way.
export async function fetchSettings(): Promise<UserPreferences> {
  const { data } = await apiClient.get<UserPreferences>("/settings");
  return data;
}

export async function updateSettings(preferences: UserPreferences): Promise<UserPreferences> {
  const { data } = await apiClient.put<UserPreferences>("/settings", preferences);
  return data;
}
