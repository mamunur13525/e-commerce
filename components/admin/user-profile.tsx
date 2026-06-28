"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout01Icon, UserIcon, ArrowDown01Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const displayName = "Admin";
  const displayEmail = "admin@example.com";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-xl p-2.5 transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
              collapsed && "justify-center p-2"
            )}
          />
        }
      >
        <Avatar className="size-9 shrink-0 ring-2 ring-sidebar-border/50">
          <AvatarImage src="" alt={displayName} />
          <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="flex flex-col min-w-0 flex-1 text-left">
              <span className="text-sm font-semibold text-sidebar-foreground leading-tight truncate">
                {displayName}
              </span>
              <span className="text-[11px] text-sidebar-foreground/50 leading-tight truncate">
                {displayEmail}
              </span>
            </div>
            <ArrowDown01Icon className="size-3.5 text-sidebar-foreground/40 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="w-56 rounded-xl p-1.5 shadow-lg">
        <div className="px-2 py-2 border-b border-gray-100 mb-1">
          <p className="text-sm font-semibold text-gray-900">{displayName}</p>
          <p className="text-xs text-gray-500">{displayEmail}</p>
        </div>
        <DropdownMenuItem className="rounded-lg text-sm gap-2 py-2">
          <UserIcon className="size-4" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="rounded-lg text-sm gap-2 py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Logout01Icon className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


