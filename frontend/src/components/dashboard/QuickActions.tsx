import { Link } from "react-router-dom";
import { ShieldAlert, Siren, FileBarChart, Sparkles } from "lucide-react";

const ACTIONS = [
  { label: "Triage active threats", to: "/threats", icon: Siren },
  { label: "Review open incidents", to: "/incidents", icon: ShieldAlert },
  { label: "Ask the AI assistant", to: "/assistant", icon: Sparkles },
  { label: "Generate weekly report", to: "/reports", icon: FileBarChart },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ACTIONS.map((action) => (
        <Link
          key={action.label}
          to={action.to}
          className="flex flex-col gap-2 rounded-md border border-surface-border bg-surface-1 p-3 hover:border-signal/40 hover:bg-surface-2 transition-colors"
        >
          <action.icon className="h-4 w-4 text-signal" />
          <span className="text-xs font-medium text-ink-primary leading-snug">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
