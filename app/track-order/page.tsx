"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import {
  DeliveryTruck01Icon,
  PackageIcon,
  Tick02Icon,
  Cancel01Icon,
} from "hugeicons-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useTrackOrder } from "@/hooks/api/orders";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const trackOrderMutation = useTrackOrder();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) {
      toast.error("Please enter both Order ID and Billing Email.");
      return;
    }
    trackOrderMutation.mutate(
      { orderId, email },
      {
        onSuccess: (data) => {
          setTrackingResult(data);
          toast.success("Order found!");
        },
        onError: (error: any) => {
          setTrackingResult(null);
          toast.error(
            error.response?.data?.message || "Order not found or invalid details."
          );
        },
      }
    );
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#003d29]">
          Track Your Order
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Enter your order details below to see the current status and estimated delivery of your package.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Track Form */}
        <Card className="border-2 border-[#003d29]/10">
          <CardHeader>
            <CardTitle>Track via Order ID</CardTitle>
            <CardDescription>
              Check the status of your order using your Order ID and billing email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <FloatingInput
                  id="order-id"
                  label="Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <FloatingInput
                  id="billing-email"
                  label="Billing Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={trackOrderMutation.isPending}
                className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20 disabled:opacity-50"
              >
                {trackOrderMutation.isPending ? "Tracking..." : "Track Status"}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* How it works */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-[#003d29]">How Tracking Works</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-amber-100 p-3 rounded-full h-fit">
                <PackageIcon className="size-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Order Placed</h3>
                <p className="text-muted-foreground">Once your order is confirmed, we begin preparing your items for shipment.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-amber-100 p-3 rounded-full h-fit">
                <DeliveryTruck01Icon className="size-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Shipped</h3>
                <p className="text-muted-foreground">When your package leaves our warehouse, you'll receive a tracking number via email.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-amber-100 p-3 rounded-full h-fit">
                <PackageIcon className="size-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Delivered</h3>
                <p className="text-muted-foreground">Your order has arrived at your destination. Enjoy your purchase!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {trackingResult && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#003d29] mb-6">
            Order Status: #{trackingResult.orderId}
          </h2>
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              {trackingResult.status === "cancelled" ? (
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-2">
                  <div className="size-16 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 border border-red-100">
                    <Cancel01Icon className="size-8 text-red-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Order Cancelled
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This order was cancelled on{" "}
                      {format(new Date(trackingResult.updatedAt), "MMMM d, yyyy")}.
                    </p>

                    {trackingResult.cancelNote && (
                      <div className="bg-red-50/30 border border-red-100/50 rounded-2xl p-4 inline-block w-full max-w-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-400/50"></div>
                        <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1.5 opacity-70">
                          Reason for cancellation
                        </p>
                        <p className="text-gray-700 font-medium italic leading-relaxed">
                          "{trackingResult.cancelNote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* Desktop Timeline */}
                  <div className="hidden sm:flex justify-between items-start pt-4 relative">
                    {/* Background line */}
                    <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100 z-0"></div>

                    {/* Dynamic progress line */}
                    <div
                      className="absolute top-10 left-[12.5%] h-0.5 bg-[#beef63] transition-all duration-500 ease-in-out z-0"
                      style={{
                        width:
                          trackingResult.status === "delivered"
                            ? "75%"
                            : trackingResult.status === "shipped"
                              ? "50%"
                              : trackingResult.status === "processing"
                                ? "25%"
                                : "0%",
                      }}
                    ></div>

                    {/* Steps */}
                    {[
                      { key: "pending", label: "Pending", icon: PackageIcon },
                      { key: "processing", label: "Processing", icon: PackageIcon },
                      {
                        key: "shipped",
                        label: "Shipped",
                        icon: DeliveryTruck01Icon,
                      },
                      { key: "delivered", label: "Delivered", icon: Tick02Icon },
                    ].map((step, idx) => {
                      const statusOrder = [
                        "pending",
                        "processing",
                        "shipped",
                        "delivered",
                      ];
                      const currentIndex = statusOrder.indexOf(trackingResult.status);
                      const stepIndex = statusOrder.indexOf(step.key);
                      const isCompleted = stepIndex <= currentIndex;
                      const isActive = stepIndex === currentIndex;

                      return (
                        <div
                          key={step.key}
                          className="flex flex-col items-center relative z-10 w-1/4"
                        >
                          <div
                            className={`size-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isCompleted
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
                                  ? format(new Date(trackingResult.createdAt), "MMM d")
                                  : format(new Date(trackingResult.updatedAt), "MMM d")
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
                          trackingResult.status === "delivered"
                            ? "calc(100% - 32px)"
                            : trackingResult.status === "shipped"
                              ? "calc(66.66% - 21px)"
                              : trackingResult.status === "processing"
                                ? "calc(33.33% - 10px)"
                                : "0%",
                      }}
                    ></div>

                    {[
                      {
                        key: "pending",
                        label: "Pending",
                        icon: PackageIcon,
                        desc: "Order received",
                      },
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
                      const statusOrder = [
                        "pending",
                        "processing",
                        "shipped",
                        "delivered",
                      ];
                      const stepIndex = statusOrder.indexOf(step.key);
                      const isCompleted =
                        stepIndex <= statusOrder.indexOf(trackingResult.status);

                      return (
                        <div
                          key={step.key}
                          className="flex items-start gap-4 relative z-10"
                        >
                          <div
                            className={`size-8 rounded-full flex items-center justify-center ${isCompleted
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

              {/* Order Details Section */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                {/* Shipping & Payment Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Delivery Address</h3>
                    {trackingResult.deliveryAddress ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium text-gray-900">{trackingResult.deliveryAddress.full_name}</p>
                        <p>{trackingResult.deliveryAddress.street}</p>
                        <p>{trackingResult.deliveryAddress.city}, {trackingResult.deliveryAddress.state} {trackingResult.deliveryAddress.zip}</p>
                        <p>{trackingResult.deliveryAddress.country}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Address not available.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Payment Details</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Method: <span className="font-medium text-gray-900">{trackingResult.paymentMethod === 'STRIPE' ? 'Credit Card' : 'Cash on Delivery'}</span></p>
                      <p>Status: <span className="font-medium text-gray-900 capitalize">{trackingResult.paymentStatus || 'unpaid'}</span></p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-gray-900">Order Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">${trackingResult.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-gray-900">{trackingResult.deliveryFee === 0 ? "Free" : `$${trackingResult.deliveryFee?.toFixed(2)}`}</span>
                    </div>
                    {trackingResult.promoDiscount > 0 && (
                      <div className="flex justify-between text-[#003d29]">
                        <span>Discount</span>
                        <span className="font-medium">-${trackingResult.promoDiscount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span className="font-medium text-gray-900">${trackingResult.taxes?.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-lg text-gray-900">
                      <span>Total</span>
                      <span>${trackingResult.totalPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              {trackingResult.subOrders && trackingResult.subOrders.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
                  <div className="space-y-4">
                    {trackingResult.subOrders.map((subOrder: any, index: number) => (
                      <div key={index} className="space-y-4">
                        {subOrder.products?.map((product: any, pIndex: number) => (
                          <div key={pIndex} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                            <div className="size-16 bg-white rounded-lg border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={product.images?.display_url || "/placeholder-image.png"} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                              <p className="text-sm text-gray-500">Qty: {product.quantity} {product.variant && `• ${product.variant}`}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">${product.finalPrice?.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
