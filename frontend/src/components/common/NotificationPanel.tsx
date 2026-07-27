import { AnimatePresence, motion } from "framer-motion";
import { SeverityBadge } from "./SeverityBadge";
import { formatRelativeTime } from "@/utils/format";
import type { NotificationItem } from "@/types";
import { Bell } from "lucide-react";

interface NotificationPanelProps {
  open: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
}

export function NotificationPanel({ open, notifications, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-80 panel p-2"
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-xs font-semibold text-ink-primary">Notifications</p>
              <span className="text-[11px] text-ink-tertiary">{notifications.filter((n) => !n.read).length} unread</span>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Bell className="h-5 w-5 text-ink-tertiary mb-2" />
                  <p className="text-xs text-ink-tertiary">You're all caught up</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-2 rounded-md px-2 py-2 hover:bg-surface-2 cursor-default"
                  >
                    <div className={n.read ? "opacity-50 mt-0.5" : "mt-0.5"}>
                      <SeverityBadge severity={n.severity} />
                    </div>
                    <div className="min-w-0">
                      <p className={clsxRead(n.read)}>{n.title}</p>
                      <p className="text-[11px] text-ink-tertiary truncate">{n.message}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{formatRelativeTime(n.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function clsxRead(read: boolean) {
  return read ? "text-xs text-ink-secondary" : "text-xs font-medium text-ink-primary";
}
