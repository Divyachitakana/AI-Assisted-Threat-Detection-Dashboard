import { NavLink } from "react-router-dom";
import { ShieldHalf, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/constants/navigation";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-signal/10 text-signal"
                  : "text-ink-secondary hover:bg-surface-2 hover:text-ink-primary"
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-surface-border space-y-1">
        {SECONDARY_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-signal/10 text-signal"
                  : "text-ink-secondary hover:bg-surface-2 hover:text-ink-primary"
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-surface-border text-[11px] text-ink-tertiary">
        Data sources: Cloud Audit Logs · VPC Flow Logs · SCC · External Intel
      </div>
    </>
  );
}

function Brand({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 px-5 h-16 border-b border-surface-border shrink-0">
      <div className="flex items-center gap-2">
        <ShieldHalf className="h-6 w-6 text-signal" strokeWidth={2} />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink-primary">Threat Detection</p>
          <p className="text-[11px] text-ink-tertiary">AI-Assisted Dashboard</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Close menu" className="p-1.5 rounded-md text-ink-secondary hover:bg-surface-2 md:hidden">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Desktop, always visible */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-surface-border bg-surface-1 shrink-0">
        <Brand />
        <SidebarContent />
      </aside>

      {/* Mobile off-canvas overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 h-full w-72 max-w-[80vw] bg-surface-1 border-r border-surface-border z-50 flex flex-col md:hidden"
            >
              <Brand onClose={onCloseMobile} />
              <SidebarContent onNavigate={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
