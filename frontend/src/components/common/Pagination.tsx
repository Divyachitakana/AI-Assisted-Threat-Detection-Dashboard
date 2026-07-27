import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="flex items-center justify-between px-1 py-3 text-xs text-ink-secondary">
      <span>
        Showing <span className="text-ink-primary font-medium">{start}-{end}</span> of{" "}
        <span className="text-ink-primary font-medium">{total}</span>
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={clsx(
            "p-1.5 rounded-md border border-surface-border",
            page <= 1 ? "text-ink-tertiary cursor-not-allowed" : "text-ink-primary hover:bg-surface-2"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="px-2 tabular-nums">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={clsx(
            "p-1.5 rounded-md border border-surface-border",
            page >= totalPages ? "text-ink-tertiary cursor-not-allowed" : "text-ink-primary hover:bg-surface-2"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
