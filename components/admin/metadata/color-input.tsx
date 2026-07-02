"use client";

import { Input } from "@/components/ui/input";

export function ColorInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-9 cursor-pointer opacity-0"
        />
        <div
          className="size-9 rounded-lg border border-gray-200 shadow-sm cursor-pointer ring-1 ring-black/5"
          style={{ backgroundColor: value || "#000000" }}
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label || "#hex"}
        className="font-mono text-xs h-9"
      />
    </div>
  );
}