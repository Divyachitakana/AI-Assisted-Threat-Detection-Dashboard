import { useState } from "react";
import { Search, Sun, Moon, Bell, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationPanel } from "@/components/common/NotificationPanel";

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: notifications = [] } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-surface-border bg-surface-1/80 backdrop-blur px-4 md:px-6 flex items-center justify-between gap-3">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onOpenMobileMenu}
        className="p-2 -ml-2 rounded-md text-ink-secondary hover:bg-surface-2 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-tertiary" />
          <input
            type="text"
            placeholder="Search alerts, incidents, IPs, MITRE techniques..."
            className="w-full bg-surface-2 border border-surface-border rounded-md pl-9 pr-3 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary focus-visible:ring-2 focus-visible:ring-signal"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs text-status-success">
          <span className="h-2 w-2 rounded-full bg-status-success animate-pulse-ring" />
          Live monitoring active
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative p-2 rounded-md text-ink-secondary hover:bg-surface-2 hover:text-ink-primary transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-severity-critical" />
            )}
          </button>
          <NotificationPanel
            open={notifOpen}
            notifications={notifications}
            onClose={() => setNotifOpen(false)}
          />
        </div>

        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="p-2 rounded-md text-ink-secondary hover:bg-surface-2 hover:text-ink-primary transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="h-8 w-8 rounded-full bg-surface-3 border border-surface-border flex items-center justify-center text-xs font-medium text-ink-primary">
          SA
        </div>
      </div>
    </header>
  );
}
