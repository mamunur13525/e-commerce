"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  PackageIcon,
  Logout04Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: DashboardSquare01Icon,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: PackageIcon,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: UserGroupIcon,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag01Icon,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const isAdmin = (user as any)?.role === "admin";

  // If on the login page, render children directly without auth guard
  const isLoginPage = pathname === "/admin/login";

  // useEffect(() => {
  //   if (isLoginPage) return;
  //   if (!isAuthenticated || !token) {
  //     router.replace("/admin/login");
  //     return;
  //   }
  //   if (!isAdmin) {
  //     router.replace("/admin/login");
  //     return;
  //   }
  // }, [isAuthenticated, token, isAdmin, router, isLoginPage]);

  // Don't render if not authenticated or not admin (skip for login page)
  if (!isLoginPage && (!isAuthenticated || !token || !isAdmin)) {
    return null;
  }

  // Login page gets a clean layout without the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4 px-3">
              <h2 className="text-xl font-bold text-[#003d29]">Admin</h2>
              <span className="text-xs bg-[#003d29]/10 text-[#003d29] px-2 py-0.5 rounded-full font-medium">
                Admin
              </span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium",
                      isActive
                        ? "bg-[#003d29]/5 text-[#003d29]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#003d29]"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "size-5",
                        isActive ? "text-[#003d29]" : "text-gray-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-gray-100 mt-4 pt-4 px-3">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-gray-600 hover:bg-gray-50 hover:text-[#003d29]"
              >
                <Logout04Icon className="size-5 text-gray-400" />
                Back to Store
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-614px)]">{children}</main>
      </div>
    </div>
  );
}