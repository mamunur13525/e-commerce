"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "hugeicons-react";

interface UserProfileProps {
  collapsed?: boolean;
}

export function UserProfile({ collapsed }: UserProfileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[18px] p-2 transition-colors hover:bg-[#F2F2F2] cursor-pointer",
        collapsed && "justify-center"
      )}
    >
      <Avatar className="size-9 shrink-0">
        <AvatarImage src="" alt="Jacob Farrel" />
        <AvatarFallback className="bg-[#2E8B57]/10 text-[#2E8B57] text-xs font-medium">
          JF
        </AvatarFallback>
      </Avatar>
      {!collapsed && (
        <>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-[#111111] leading-tight truncate">
              Jacob Farrel
            </span>
            <span className="text-xs text-[#7A7A7A] leading-tight truncate">
              jacobfarrel@gmail.com
            </span>
          </div>
          <ArrowDown01Icon className="size-4 text-[#7A7A7A] shrink-0" />
        </>
      )}
    </div>
  );
}