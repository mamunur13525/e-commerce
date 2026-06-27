"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  PackageIcon,
  DeliveryTruck01Icon,
  Tick02Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  Copy01Icon,
} from "hugeicons-react";
import { toast } from "sonner";

interface OrderDetailsSheetProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getPaymentColor = (status: string) => {
  switch (status) {
    case "paid":
      return "border-green-500 text-green-600 bg-green-50";
    case "refunded":
      return "border-amber-500 text-amber-600 bg-amber-50";
    default:
      return "text-yellow-600 border-yellow-500 bg-yellow-50";
  }
};

export default function OrderDetailsSheet({
  order,
  open,
  onOpenChange,
}: OrderDetailsSheetProps) {
  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId || order._id);
    toast.success("Order ID copied to clipboard");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-5 pt-6 pb-4 border-b shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-bold text-[#003d29] flex items-center gap-2">
                Order Details
                <Badge
                  className={`${getStatusColor(order.status)} border-0 text-xs px-2 py-0.5`}
                  variant="secondary"
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </SheetTitle>
              <SheetDescription className="text-sm flex items-center gap-1 mt-1">
                <span>
                  Order #{order.orderId || order._id.slice(-8).toUpperCase()}
                </span>
                <button
                  onClick={copyOrderId}
                  className="hover:text-[#003d29] transition-colors focus:outline-none"
                >
                  <Copy01Icon className="size-3.5 text-gray-400 hover:text-[#003d29]" />
                </button>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Order Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Placed on</span>
              <span className="font-medium">
                {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <Badge
                variant="outline"
                className={getPaymentColor(order.paymentStatus)}
              >
                {order.paymentStatus.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Method</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">
              Items ({order.items.length})
            </h4>
            <div className="space-y-3">
              {order.items.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className="size-14 bg-gray-50 border rounded-lg shrink-0 flex items-center justify-center overflow-hidden relative">
                    {item.product?.image?.url ? (
                      <Image
                        src={item.product.image.url}
                        alt={item.product.name || "Product"}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <PackageIcon className="size-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product?.name || `Product ID: ${item.product}`}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-500">{item.variant}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        ৳{item.price.toFixed(2)} x {item.quantity}
                      </span>
                      <span className="text-sm font-semibold text-[#003d29]">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {order.items.length > 3 && (
                <p className="text-xs text-gray-400 text-center pt-1">
                  +{order.items.length - 3} more item
                  {order.items.length - 3 !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">৳{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-medium">
                ৳{order.deliveryFee.toFixed(2)}
              </span>
            </div>
            {order.promoDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-green-600">
                  -৳{order.promoDiscount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Taxes</span>
              <span className="font-medium">৳{order.taxes.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-base font-bold text-[#003d29] pt-1">
              <span>Total</span>
              <span>৳{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          {order.deliveryAddress && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  Delivery Address
                </h4>
                <div className="bg-gray-50 rounded-xl p-3 border text-sm">
                  <p className="font-medium text-gray-900">
                    {order.deliveryAddress.full_name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {order.deliveryAddress.street}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {order.deliveryAddress.city},{" "}
                    {order.deliveryAddress.state}{" "}
                    {order.deliveryAddress.zip}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {order.deliveryAddress.country}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Status Timeline (compact) */}
          {order.status !== "cancelled" && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Order Progress
                </h4>
                <div className="flex flex-col gap-4 pl-3 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                  <div
                    className="absolute left-[11px] top-2 w-0.5 bg-[#beef63] transition-all duration-500"
                    style={{
                      height:
                        order.status === "delivered"
                          ? "calc(100% - 16px)"
                          : order.status === "shipped"
                            ? "calc(66.66% - 10px)"
                            : order.status === "processing"
                              ? "calc(33.33% - 5px)"
                              : "0%",
                    }}
                  ></div>

                  {[
                    { key: "pending", label: "Pending" },
                    { key: "processing", label: "Processing" },
                    { key: "shipped", label: "Shipped" },
                    { key: "delivered", label: "Delivered" },
                  ].map((step) => {
                    const statusOrder = [
                      "pending",
                      "processing",
                      "shipped",
                      "delivered",
                    ];
                    const stepIndex = statusOrder.indexOf(step.key);
                    const isCompleted =
                      stepIndex <= statusOrder.indexOf(order.status);

                    return (
                      <div
                        key={step.key}
                        className="flex items-center gap-3 relative z-10"
                      >
                        <div
                          className={`size-5 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? "bg-[#beef63]"
                              : "bg-white border-2 border-gray-100"
                          }`}
                        >
                          <div
                            className={`size-2 rounded-full ${
                              isCompleted ? "bg-[#003d29]" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            isCompleted ? "text-[#003d29]" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with full details button */}
        <div className="px-5 py-4 border-t shrink-0">
          <Link href={`/account/orders/${order._id}`} onClick={() => onOpenChange(false)}>
            <Button className="w-full bg-[#003d29] hover:bg-[#002a1c] text-white rounded-full h-11 gap-2">
              View Full Details
              <ArrowRight01Icon className="size-4" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}