import { useEffect, useState } from "react";
import type { UserPreferences } from "@/types";

const STORAGE_KEY = "atdd-preferences";

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  denseTables: false,
  autoRefreshInterval: 30,
  notifications: {
    criticalAlerts: true,
    weeklyDigest: true,
    incidentAssigned: true,
    aiInsights: false,
  },
  dashboard: {
    defaultLandingPage: "/",
    showAiInsights: true,
    compactCards: false,
  },
};

// Real, shipped application (not a Claude.ai artifact preview) — localStorage
// persistence is appropriate here and will be swapped for a user-preferences
// API call once auth/backend land.
export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  function update(patch: Partial<UserPreferences>) {
    setPreferences((prev) => ({ ...prev, ...patch }));
  }

  function updateNotifications(patch: Partial<UserPreferences["notifications"]>) {
    setPreferences((prev) => ({ ...prev, notifications: { ...prev.notifications, ...patch } }));
  }

  function updateDashboard(patch: Partial<UserPreferences["dashboard"]>) {
    setPreferences((prev) => ({ ...prev, dashboard: { ...prev.dashboard, ...patch } }));
  }

  function reset() {
    setPreferences(DEFAULT_PREFERENCES);
  }

  return { preferences, update, updateNotifications, updateDashboard, reset };
}
