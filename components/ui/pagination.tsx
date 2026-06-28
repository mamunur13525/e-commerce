"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  total?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getVisiblePages = (): (number | "ellipsis")[] => {
    const visible: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) visible.push(i);
      return visible;
    }

    // Always show first page
    visible.push(1);

    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    if (page <= 3) {
      start = 2;
      end = Math.min(4, totalPages - 1);
    } else if (page >= totalPages - 2) {
      start = Math.max(2, totalPages - 3);
      end = totalPages - 1;
    }

    if (start > 2) visible.push("ellipsis");

    for (let i = start; i <= end; i++) {
      visible.push(i);
    }

    if (end < totalPages - 1) visible.push("ellipsis");

    // Always show last page
    visible.push(totalPages);

    return visible;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
      <p className="text-sm text-gray-500 order-2 sm:order-1">
        Page {page} of {totalPages}
        {total !== undefined && (
          <span className="hidden sm:inline"> ({total} total)</span>
        )}
      </p>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="h-8 gap-1.5 px-2.5"
        >
          <ArrowLeft01Icon className="size-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-0.5 mx-1">
          {visiblePages.map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-8 w-8 items-center justify-center text-xs text-gray-400"
              >
                &hellip;
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors",
                  p === page
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="h-8 gap-1.5 px-2.5"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight01Icon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
