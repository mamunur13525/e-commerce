"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { DashboardLayout } from "@/components/admin/dashboard-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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

  // Login page gets a clean layout without the dashboard layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}