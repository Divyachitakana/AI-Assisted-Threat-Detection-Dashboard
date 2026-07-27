import { formatDistanceToNow, format } from "date-fns";

export function formatRelativeTime(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true });
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), "MMM d, yyyy HH:mm");
}

export function formatDelta(value: number, suffix = ""): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}${suffix}`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}
