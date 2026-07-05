"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAdminOrders,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Search01Icon, FilterIcon, ArrowRight01Icon } from "hugeicons-react";
import OrderDetailsDrawer from "@/components/admin/orders/OrderDetailsDrawer";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const PAYMENT_STATUSES = ["unpaid", "paid", "failed", "refunded"] as const;

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    unpaid: "bg-gray-100 text-gray-700",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-orange-100 text-orange-700",
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

export default function AdminOrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isLoading } = useAdminOrders({
    page,
    limit: 20,
    search: debouncedSearch,
    status: statusFilter,
    paymentStatus: paymentFilter,
    fromDate,
    toDate,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  };

  const openOrderDrawer = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDrawerOpen(true);
  };

  const closeOrderDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrderId(null);
  };

  const clearFilters = () => {
    setStatusFilter("");
    setPaymentFilter("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  const hasFilters = statusFilter || paymentFilter || fromDate || toDate;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
          <FilterIcon className="size-4" />
          Filters
          {hasFilters && (
            <span className="ml-1 w-2 h-2 rounded-full bg-[#003d29]" />
          )}
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID, customer name or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Order Status</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              >
                <option value="">All Statuses</option>
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Payment Status</label>
              <select
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              >
                <option value="">All Payments</option>
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              />
            </div>
          </div>
          {hasFilters && (
            <div className="mt-3">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((order) => (
                <TableRow
                  key={order._id}
                  className="cursor-pointer"
                  onClick={() => openOrderDrawer(order._id)}
                >
                  <TableCell>
                    <span className="font-mono text-xs font-medium text-gray-900">
                      {order.orderId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user
                          ? `${order.user.first_name} ${order.user.last_name}`
                          : order.guestInfo?.name || "Guest"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.user?.email || order.guestInfo?.email || ""}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {order.items?.length || 0} item(s)
                  </TableCell>
                  <TableCell className="font-medium">
                    ${order.totalPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/orders/${order._id}`);
                        }}
                        className="text-[#003d29] hover:text-[#003d29]/80"
                      >
                        <ArrowRight01Icon className="size-4" />
                        <span className="ml-1 text-xs font-medium">Details</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        {data && data.pagination.pages > 1 && (
          <Pagination
            page={page}
            totalPages={data.pagination.pages}
            total={data.pagination.total}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        orderId={selectedOrderId}
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) setSelectedOrderId(null);
        }}
      />
    </div>
  );
}