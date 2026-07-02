"use client";

import { ArrowUp01Icon, ArrowDown01Icon } from "hugeicons-react";

export function ReorderControls({
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowUp01Icon className="size-3.5" />
      </button>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={onMoveDown}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowDown01Icon className="size-3.5" />
      </button>
    </div>
  );
}