import { useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun, RotateCcw, Check } from "lucide-react";
import clsx from "clsx";
import { PageHeader } from "@/components/common/PageHeader";
import { Toggle } from "@/components/common/Toggle";
import { NAV_ITEMS } from "@/constants/navigation";
import { useTheme } from "@/context/ThemeContext";
import { usePreferences } from "@/hooks/usePreferences";

function SettingsSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="panel p-5">
      <h3 className="text-sm font-semibold text-ink-primary">{title}</h3>
      {description && <p className="text-xs text-ink-tertiary mt-1">{description}</p>}
      <div className="mt-4 divide-y divide-surface-border">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { preferences, updateNotifications, updateDashboard, update, reset } = usePreferences();
  const [saved, setSaved] = useState(false);

  function handleReset() {
    reset();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader
        title="Settings"
        description="User preferences, notifications, and dashboard defaults"
        actions={
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs font-medium text-ink-secondary hover:bg-surface-2 transition-colors"
          >
            {saved ? <Check className="h-3.5 w-3.5 text-status-success" /> : <RotateCcw className="h-3.5 w-3.5" />}
            {saved ? "Reset to defaults" : "Reset to defaults"}
          </button>
        }
      />

      <SettingsSection title="Appearance" description="Choose how the dashboard looks on this device">
        <div className="flex items-center justify-between py-2.5">
          <div>
            <p className="text-sm text-ink-primary">Theme</p>
            <p className="text-xs text-ink-tertiary mt-0.5">
              Dark is recommended for extended monitoring sessions
            </p>
          </div>
          <div className="flex items-center gap-1 bg-surface-2 border border-surface-border rounded-md p-1">
            <button
              onClick={() => theme !== "dark" && toggleTheme()}
              className={clsx(
                "flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors",
                theme === "dark" ? "bg-surface-3 text-ink-primary" : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              <Moon className="h-3.5 w-3.5" /> Dark
            </button>
            <button
              onClick={() => theme !== "light" && toggleTheme()}
              className={clsx(
                "flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors",
                theme === "light" ? "bg-surface-3 text-ink-primary" : "text-ink-tertiary hover:text-ink-secondary"
              )}
            >
              <Sun className="h-3.5 w-3.5" /> Light
            </button>
          </div>
        </div>
        <Toggle
          checked={preferences.denseTables}
          onChange={(v) => update({ denseTables: v })}
          label="Dense table rows"
          description="Show more rows per screen in alert and incident tables"
        />
      </SettingsSection>

      <SettingsSection title="Notifications" description="Choose which events generate a notification">
        <Toggle
          checked={preferences.notifications.criticalAlerts}
          onChange={(v) => updateNotifications({ criticalAlerts: v })}
          label="Critical alerts"
          description="Immediate notification when a critical-severity alert fires"
        />
        <Toggle
          checked={preferences.notifications.incidentAssigned}
          onChange={(v) => updateNotifications({ incidentAssigned: v })}
          label="Incident assigned to me"
          description="Notify when an incident is assigned to your account"
        />
        <Toggle
          checked={preferences.notifications.weeklyDigest}
          onChange={(v) => updateNotifications({ weeklyDigest: v })}
          label="Weekly digest"
          description="Summary email of the week's security posture"
        />
        <Toggle
          checked={preferences.notifications.aiInsights}
          onChange={(v) => updateNotifications({ aiInsights: v })}
          label="AI-generated insights"
          description="Notify when the AI assistant surfaces a new proactive insight"
        />
      </SettingsSection>

      <SettingsSection title="Dashboard Preferences" description="Defaults applied when you open the dashboard">
        <div className="py-2.5">
          <p className="text-sm text-ink-primary mb-2">Default landing page</p>
          <select
            value={preferences.dashboard.defaultLandingPage}
            onChange={(e) => updateDashboard({ defaultLandingPage: e.target.value })}
            className="w-full sm:w-64 bg-surface-2 border border-surface-border rounded-md px-3 py-2 text-sm text-ink-primary focus-visible:ring-2 focus-visible:ring-signal"
          >
            {NAV_ITEMS.map((item) => (
              <option key={item.path} value={item.path}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <Toggle
          checked={preferences.dashboard.showAiInsights}
          onChange={(v) => updateDashboard({ showAiInsights: v })}
          label="Show AI Insights panel"
          description="Display the AI Insights widget on the Security Overview page"
        />
        <Toggle
          checked={preferences.dashboard.compactCards}
          onChange={(v) => updateDashboard({ compactCards: v })}
          label="Compact metric cards"
          description="Reduce padding on overview metric cards"
        />
      </SettingsSection>

      <p className="text-[11px] text-ink-tertiary text-center">
        Preferences are saved to this browser. Account-level sync will be available once authentication is added.
      </p>
    </div>
  );
}
