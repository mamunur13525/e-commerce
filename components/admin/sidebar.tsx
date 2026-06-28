"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserProfile } from "./user-profile";
import {
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  PackageIcon,
  CouponPercentIcon,
  Layers01Icon,
  Database01Icon,
} from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo2.png";
import { cn } from "@/lib/utils";

const managementItems = [
  { icon: DashboardSquare01Icon, label: "Dashboard", href: "/admin" },
  { icon: PackageIcon, label: "Product", href: "/admin/products" },
  { icon: Layers01Icon, label: "Category", href: "/admin/categories" },
  { icon: UserGroupIcon, label: "Customer", href: "/admin/users" },
  { icon: ShoppingBag01Icon, label: "My Order", href: "/admin/orders" },
  { icon: CouponPercentIcon, label: "Promo", href: "/admin/promos" },
  { icon: Database01Icon, label: "Metadata", href: "/admin/metadata" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Logo Header */}
      <SidebarHeader className="py-2">
        <div className="flex items-center justify-between gap-2 px-3">
          {!collapsed && (
            <Link href="/admin">
              <div className="h-12">
                <Image
                  src={logo}
                  alt="Logo"
                  className="h-full w-fit object-contain"
                />
              </div>
            </Link>
          )}
          <SidebarTrigger className="hidden md:block cursor-pointer" />
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className={cn(
                        "relative group/menu-button py-4 h-10",
                        active && "font-semibold bg-white! shadow-sm shadow-[#003d29]/20",
                      )}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#003d29] shadow-sm shadow-[#003d29]/30" />
                      )}
                      <item.icon
                        className={cn(
                          "size-[24px] shrink-0",
                          active
                            ? "text-[#003d29]"
                            : "text-sidebar-foreground/60 group-hover/menu-button:text-sidebar-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-base",
                          active ? "text-[#003d29]" : "",
                        )}
                      >
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Profile */}
      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <UserProfile />
      </SidebarFooter>

      {/* Desktop collapse rail */}
      <SidebarRail />
    </Sidebar>
  );
}
