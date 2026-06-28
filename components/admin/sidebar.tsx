"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { UserProfile } from "./user-profile";
import {
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  PackageIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CouponPercentIcon,
  Layers01Icon,
  SlidersHorizontal01Icon,
  Database01Icon,
} from "hugeicons-react";
import Image from "next/image";
import logo from '@/public/assets/logo2.png';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const managementItems = [
  { icon: DashboardSquare01Icon, label: "Dashboard", href: "/admin" },
  { icon: PackageIcon, label: "Product", href: "/admin/products" },
  { icon: Layers01Icon, label: "Category", href: "/admin/categories" },
  { icon: UserGroupIcon, label: "Customer", href: "/admin/users" },
  { icon: ShoppingBag01Icon, label: "My Order", href: "/admin/orders" },  
  { icon: CouponPercentIcon, label: "Promo", href: "/admin/promos" },
  { icon: Database01Icon, label: "Metadata", href: "/admin/metadata" },

];



export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "h-full p-6 flex flex-col transition-all duration-300 ease-in-out relative ",
        collapsed ? "w-22" : "w-70"
      )}
    >
      {/* Logo */}
      <div className="mb-8 flex ">          
          <Image src={logo} alt="Logo" className={cn("h-12 w-fit ", collapsed && "h-fit w-fit")} />

      </div>


     
        <div className="space-y-1">
          {managementItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={isActive(item.href)}
              collapsed={collapsed}
            />
          ))}
        </div>

      {/* Spacer */}
      <div className="flex-1" />
      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-16 -right-3 flex items-center justify-center  mb-3 p-1.5 text-[#3e3e3e] hover:text-[#111111] hover:bg-[#F2F2F2] rounded-xl transition-colors bg-gray-300"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ArrowRight01Icon className="size-4" />
        ) : (
          <ArrowLeft01Icon className="size-4" />
        )}
      </button>

      {/* User Profile */}
      <UserProfile collapsed={collapsed} />
    </aside>
  );
}