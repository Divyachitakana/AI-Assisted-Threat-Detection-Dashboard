import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Couldn't load this data",
  description = "Something went wrong reaching the security data service. Try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="panel flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-12 w-12 rounded-full bg-severity-critical/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-5 w-5 text-severity-critical" />
      </div>
      <p className="text-sm font-medium text-ink-primary">{title}</p>
      <p className="text-xs text-ink-tertiary mt-1 max-w-sm">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-signal hover:text-signal-bright"
        >
          <RotateCw className="h-3.5 w-3.5" />
          Retry
        </button>
      )}
    </div>
  );
}
