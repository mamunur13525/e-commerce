"use client";

import { useAdminDashboard } from "@/hooks/api/admin";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PackageIcon,
  UserGroupIcon,
  ShoppingBag01Icon,
  MoneyBag01Icon,
  Clock01Icon,
  RefreshIcon,
} from "hugeicons-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#ECECEC] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7A7A7A] font-medium">{title}</p>
          <p className="text-2xl font-bold text-[#111111] mt-1">{value}</p>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon className="size-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  const { stats, recentOrders } = data;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={PackageIcon}
          color="#003d29"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UserGroupIcon}
          color="#2563eb"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag01Icon}
          color="#7c3aed"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={MoneyBag01Icon}
          color="#059669"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock01Icon}
          color="#d97706"
        />
        <StatCard
          title="Processing Orders"
          value={stats.processingOrders}
          icon={RefreshIcon}
          color="#2563eb"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-[#ECECEC] p-6">
        <h2 className="text-lg font-bold text-[#111111] mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-[#7A7A7A] text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ECECEC]">
                  <th className="text-left py-3 px-2 font-medium text-[#7A7A7A]">Order ID</th>
                  <th className="text-left py-3 px-2 font-medium text-[#7A7A7A]">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-[#7A7A7A]">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-[#7A7A7A]">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-[#7A7A7A]">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order._id} className="border-b border-[#ECECEC]/50 hover:bg-[#F6F6F6]">
                    <td className="py-3 px-2 font-medium text-[#111111]">
                      {order.orderId}
                    </td>
                    <td className="py-3 px-2 text-[#7A7A7A]">
                      {order.user
                        ? `${order.user.first_name} ${order.user.last_name}`
                        : order.guestInfo?.name || "Guest"}
                    </td>
                    <td className="py-3 px-2 text-[#111111] font-medium">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-2 text-[#7A7A7A]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}