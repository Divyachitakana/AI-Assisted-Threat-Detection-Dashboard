import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-12 w-12 rounded-full bg-surface-3 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-ink-tertiary" />
      </div>
      <p className="text-sm font-medium text-ink-primary">{title}</p>
      <p className="text-xs text-ink-tertiary mt-1 max-w-sm">{description}</p>
    </div>
  );
}
