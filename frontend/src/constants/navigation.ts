import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShieldAlert,
  Siren,
  Map,
  LineChart,
  FileBarChart,
  Search,
  BellRing,
  Sparkles,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

// Single source of truth for sidebar links AND route registration,
// so the two never drift apart as pages are added.
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    path: "/",
    icon: LayoutDashboard,
    description: "Real-time security posture and key risk indicators",
  },
  {
    label: "Threat Monitor",
    path: "/threats",
    icon: Siren,
    description: "Live threat feed with search, filters, and drill-down",
  },
  {
    label: "Active Alerts",
    path: "/alerts",
    icon: BellRing,
    description: "Alert queue with status, priority, and assignment",
  },
  {
    label: "Incidents",
    path: "/incidents",
    icon: ShieldAlert,
    description: "Correlated incidents and response workflow",
  },
  {
    label: "Threat Analytics",
    path: "/analytics",
    icon: LineChart,
    description: "Attack trends, risk distribution, top sources",
  },
  {
    label: "Threat Map",
    path: "/threat-map",
    icon: Map,
    description: "Geographic distribution of attack sources",
  },
  {
    label: "AI Assistant",
    path: "/assistant",
    icon: Sparkles,
    description: "Ask the security assistant about alerts and incidents",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileBarChart,
    description: "Executive and compliance reporting",
  },
  {
    label: "Search",
    path: "/search",
    icon: Search,
    description: "Cross-source search and filtering",
  },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    description: "Preferences, notifications, and dashboard defaults",
  },
];
