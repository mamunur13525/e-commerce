"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
  onClick,
}: SidebarItemProps) {
  const className = cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium",
    active
      ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
      : "text-[#7A7A7A] hover:bg-[#F2F2F2] hover:text-[#111111]",
    collapsed && "justify-center px-0"
  );

  const content = (
    <>
      <Icon
        className={cn(
          "size-5 shrink-0",
          active ? "text-[#111111]" : "text-[#7A7A7A]"
        )}
      />
      {!collapsed && <span>{label}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}