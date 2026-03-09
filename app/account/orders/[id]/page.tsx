"use client";

import { useGetOrderDetails } from "@/hooks/api/orders";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  ArrowLeft01Icon,
  PackageIcon,
  Copy01Icon,
  DeliveryTruck01Icon,
  Tick02Icon,
  Cancel01Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { use } from "react";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { token } = useAuthStore();
  const { data: order, isLoading, error } = useGetOrderDetails(id, token);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-red-500 mb-4">
          {error ? "Error loading order details." : "Order not found."}
        </p>
        <Link href="/account/orders">
          <Button variant="outline" className="border-[#003d29] text-[#003d29]">
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId || order._id);
    toast.success("Order ID copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/account/orders"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft01Icon className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#003d29] flex items-center gap-2">
            Order Details
            <Badge
              className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)} border-0 text-xs px-2 py-0.5 ml-2`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            Order #{order.orderId || order._id.slice(-8).toUpperCase()}
            <button
              onClick={copyOrderId}
              className="hover:text-[#003d29] transition-colors ml-1 focus:outline-none"
            >
              <Copy01Icon className="size-3.5" />
            </button>
          </p>
        </div>
      </div>

      {/* Order Status Timeline */}
      <Card className="border-none shadow-sm overflow-hidden mb-6">
        <CardContent className="p-6 sm:p-8">
          {order.status === "cancelled" ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Cancel01Icon className="size-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-700">
                Order Cancelled
              </h3>
              <p className="text-gray-500 max-w-sm text-center mt-2">
                This order was cancelled on{" "}
                {format(new Date(order.updatedAt), "MMM d, yyyy")}. If you have
                any questions, please contact support.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Desktop Timeline */}
              <div className="hidden sm:flex justify-between items-start pt-4 relative">
                {/* Background line */}
                <div className="absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-gray-100 z-0"></div>

                {/* Dynamic progress line */}
                <div
                  className="absolute top-10 left-[16.66%] h-0.5 bg-[#beef63] transition-all duration-500 ease-in-out z-0"
                  style={{
                    width:
                      order.status === "delivered"
                        ? "66.66%"
                        : order.status === "shipped"
                          ? "33.33%"
                          : "0%",
                  }}
                ></div>

                {/* Steps */}
                {[
                  { key: "processing", label: "Processing", icon: PackageIcon },
                  {
                    key: "shipped",
                    label: "Shipped",
                    icon: DeliveryTruck01Icon,
                  },
                  { key: "delivered", label: "Delivered", icon: Tick02Icon },
                ].map((step, idx) => {
                  const statusOrder = ["processing", "shipped", "delivered"];
                  const currentIndex = statusOrder.indexOf(order.status);
                  const stepIndex = statusOrder.indexOf(step.key);
                  const isCompleted = stepIndex <= currentIndex;
                  const isActive = stepIndex === currentIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center relative z-10 w-1/3"
                    >
                      <div
                        className={`size-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isCompleted
                            ? "bg-[#beef63] text-[#003d29]"
                            : "bg-white border-2 border-gray-100 text-gray-300"
                        }`}
                      >
                        <step.icon
                          className={`size-6 ${isActive ? "animate-pulse" : ""}`}
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <p
                          className={`text-sm font-bold ${isCompleted ? "text-[#003d29]" : "text-gray-400"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {isCompleted
                            ? idx === 0
                              ? format(new Date(order.createdAt), "MMM d")
                              : format(new Date(order.updatedAt), "MMM d")
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Timeline (Vertical) */}
              <div className="sm:hidden flex flex-col gap-8 pl-4 relative">
                <div className="absolute left-[32px] top-4 bottom-4 w-0.5 bg-gray-100"></div>
                <div
                  className="absolute left-[32px] top-4 w-0.5 bg-[#beef63] transition-all duration-500"
                  style={{
                    height:
                      order.status === "delivered"
                        ? "calc(100% - 32px)"
                        : order.status === "shipped"
                          ? "calc(50% - 16px)"
                          : "0%",
                  }}
                ></div>

                {[
                  {
                    key: "processing",
                    label: "Processing",
                    icon: PackageIcon,
                    desc: "Quality checked and packed",
                  },
                  {
                    key: "shipped",
                    label: "Shipped",
                    icon: DeliveryTruck01Icon,
                    desc: "On its way to you",
                  },
                  {
                    key: "delivered",
                    label: "Delivered",
                    icon: Tick02Icon,
                    desc: "Order received successfully",
                  },
                ].map((step) => {
                  const statusOrder = ["processing", "shipped", "delivered"];
                  const stepIndex = statusOrder.indexOf(step.key);
                  const isCompleted =
                    stepIndex <= statusOrder.indexOf(order.status);

                  return (
                    <div
                      key={step.key}
                      className="flex items-start gap-4 relative z-10"
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-[#beef63] text-[#003d29]"
                            : "bg-white border-2 border-gray-100 text-gray-300"
                        }`}
                      >
                        <step.icon className="size-4" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-bold text-sm ${isCompleted ? "text-[#003d29]" : "text-gray-400"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg font-bold text-[#003d29]">
                Items requested
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="size-20 bg-gray-50 border rounded-lg shrink-0 flex items-center justify-center overflow-hidden relative">
                    {item.product?.image?.url ? (
                      <Image
                        src={item.product.image.url}
                        alt={item.product.name || "Product image"}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <PackageIcon className="size-8 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">
                      {item.product?.name || `Product ID: ${item.product}`}
                    </h4>
                    {item.variant && (
                      <p className="text-sm text-gray-500">{item.variant}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium text-[#003d29]">
                        ${item.price.toFixed(2)}{" "}
                        <span className="text-gray-400 text-sm font-normal ml-1">
                          x {item.quantity}
                        </span>
                      </p>
                      <p className="font-bold text-[#003d29]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Info */}
        <div className="space-y-6 flex flex-col h-full">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg font-bold text-[#003d29]">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">
                    {format(new Date(order.createdAt), "MMMM d, yyyy h:mm a")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium">
                    {order.paymentMethod === "STRIPE"
                      ? "Online Payment"
                      : "Cash on Delivery"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status</span>
                  <Badge
                    variant="outline"
                    className={
                      order.paymentStatus === "paid"
                        ? "border-green-500 text-green-600 bg-green-50"
                        : "text-yellow-600 border-yellow-500 bg-yellow-50"
                    }
                  >
                    {order.paymentStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    ${order.deliveryFee.toFixed(2)}
                  </span>
                </div>
                {order.promoDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-green-600">
                      -${order.promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxes</span>
                  <span className="font-medium text-gray-900">
                    ${order.taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg font-bold text-[#003d29]">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm flex-1">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg font-bold text-[#003d29]">
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="font-semibold text-gray-900 mb-1">
                  {order.deliveryAddress.full_name}
                </p>
                <div className="text-sm text-gray-600 space-y-0.5">
                  <p>{order.deliveryAddress.street}</p>
                  <p>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                    {order.deliveryAddress.zip}
                  </p>
                  <p>{order.deliveryAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
