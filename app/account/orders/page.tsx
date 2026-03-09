"use client";

import { useState } from "react";
import { useGetOrders } from "@/hooks/api/orders";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { PackageIcon, ArrowRight01Icon } from "hugeicons-react";

const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const { token } = useAuthStore();
  const [activeStatus, setActiveStatus] = useState("All");
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrders(
    token,
    activeStatus === "All" ? undefined : activeStatus.toLowerCase(),
  );

  return (
    <div className="space-y-6">
      <TitleAndStatusBar
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <Orders orders={orders} isLoading={isLoading} error={error} />
    </div>
  );
}

const TitleAndStatusBar = ({
  activeStatus,
  setActiveStatus,
}: {
  activeStatus: string;
  setActiveStatus: (status: string) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-[#003d29]">My Orders</h1>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
        {statuses.map((status) => (
          <Button
            key={status}
            variant={activeStatus === status ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveStatus(status)}
            className={`rounded-full px-4 h-9 ${
              activeStatus === status
                ? "bg-[#003d29] hover:bg-[#002a1c] text-white border-[#003d29]"
                : "text-gray-600 border-gray-200 hover:border-[#003d29]/30 hover:bg-gray-50"
            }`}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  );
};

const Orders = ({
  orders,
  isLoading,
  error,
}: {
  orders: any;
  isLoading: boolean;
  error: any;
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading orders.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="size-24 shadow bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageIcon className="size-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-[#003d29] mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            When you place an order, it will appear here so you can track its
            status.
          </p>
          <Link
            href="/shop"
            className="bg-[#003d29] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#002a1c] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "shipped":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="grid gap-4">
      {orders.map((order: any) => (
        <OrderCard
          key={order._id}
          order={order}
          getStatusColor={getStatusColor}
        />
      ))}
    </div>
  );
};

const OrderCard = ({
  order,
  getStatusColor,
}: {
  order: any;
  getStatusColor: (status: string) => string;
}) => {
  return (
    <div key={order._id}>
      <Card className="hover:border-[#003d29]/30 transition-colors border-gray-200 shadow-sm cursor-pointer ">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="font-semibold text-gray-900">
                  Order #{order.orderId || order._id.slice(-8).toUpperCase()}
                </p>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="secondary"
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Placed on {format(new Date(order.createdAt), "MMM d, yyyy")}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-[#003d29]">
                ${order.totalPrice.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <Link
            href={`/account/orders/${order._id}`}
            className="flex items-center justify-between group"
          >
            {/* Image thumbnails preview */}
            <div className="flex items-center gap-2">
              {order.items.slice(0, 4).map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="size-12 rounded-md border bg-gray-50 overflow-hidden relative"
                >
                  {item.product?.image?.url ? (
                    <Image
                      src={item.product.image.url}
                      alt={item.product.name || "Product image"}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      {item.quantity}x
                    </div>
                  )}
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="size-12 rounded-md border bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  +{order.items.length - 4}
                </div>
              )}
            </div>

            <div className="text-sm font-medium text-[#003d29] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Details
              <ArrowRight01Icon className="size-4" />
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
