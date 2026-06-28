"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useAdminOrder,
  useUpdateOrderStatus,
  AdminOrder,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft01Icon } from "hugeicons-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

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

function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

function OrderInfoCard({ order }: { order: AdminOrder }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Information</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Order ID</span>
          <p className="font-mono font-medium text-gray-900 mt-0.5">{order.orderId}</p>
        </div>
        <div>
          <span className="text-gray-500">Date</span>
          <p className="font-medium text-gray-900 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Order Status</span>
          <div className="mt-0.5">
            <StatusBadge status={order.status} />
          </div>
        </div>
        <div>
          <span className="text-gray-500">Payment Status</span>
          <div className="mt-0.5">
            <StatusBadge status={order.paymentStatus} />
          </div>
        </div>
        <div>
          <span className="text-gray-500">Payment Method</span>
          <p className="font-medium text-gray-900 mt-0.5 capitalize">{order.paymentMethod}</p>
        </div>
        {order.cancelNote && (
          <div className="col-span-2">
            <span className="text-gray-500">Cancel Note</span>
            <p className="font-medium text-red-600 mt-0.5">{order.cancelNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomerInfoCard({ order }: { order: AdminOrder }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Information</h3>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-gray-500">Name</span>
          <p className="font-medium text-gray-900 mt-0.5">
            {order.user
              ? `${order.user.first_name} ${order.user.last_name}`
              : order.guestInfo?.name || "Guest"}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Email</span>
          <p className="font-medium text-gray-900 mt-0.5">
            {order.user?.email || order.guestInfo?.email || "—"}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Phone</span>
          <p className="font-medium text-gray-900 mt-0.5">
            {order.guestInfo?.phone || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DeliveryAddressCard({ order }: { order: AdminOrder }) {
  const addr = order.deliveryAddress as any;
  if (!addr) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Delivery Address</h3>
      <div className="text-sm space-y-1">
        <p className="font-medium text-gray-900">{addr.full_name}</p>
        <p className="text-gray-600">{addr.street}</p>
        <p className="text-gray-600">
          {addr.city}, {addr.state} {addr.zip}
        </p>
        <p className="text-gray-600">{addr.country}</p>
      </div>
    </div>
  );
}

function OrderItemsTable({ order }: { order: AdminOrder }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">
          Ordered Items ({order.items?.length || 0})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50">
              <th className="text-left py-3 px-6 font-medium text-gray-500">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500">Quantity</th>
              <th className="text-right py-3 px-6 font-medium text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item: any, index: number) => {
              const productName = item.product?.name || "Unknown Product";
              const unitPrice = item.price || 0;
              const quantity = item.quantity || 1;
              const totalPrice = unitPrice * quantity;

              return (
                <tr key={index} className="border-b border-gray-50">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      {item.product?.images?.[0] ? (
                        <Image
                          src={item.product.images[0]||""}
                          alt={productName}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-50"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                          N/A
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                          {productName}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-gray-500">Variant: {item.variant}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">${unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center text-gray-900">{quantity}</td>
                  <td className="py-3 px-6 text-right font-medium text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrderSummaryCard({ order }: { order: AdminOrder }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">${order.subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="font-medium text-gray-900">
            {order.deliveryFee > 0 ? `$${order.deliveryFee?.toFixed(2)}` : "Free"}
          </span>
        </div>
        {order.promoDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">Promo Discount</span>
            <span className="font-medium text-green-600">-${order.promoDiscount?.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500">Taxes</span>
          <span className="font-medium text-gray-900">${order.taxes?.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">${order.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: order, isLoading } = useAdminOrder(id || null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");
  const [editCancelNote, setEditCancelNote] = useState("");

  const updateOrderStatus = useUpdateOrderStatus();

  const openEditDialog = () => {
    if (!order) return;
    setEditStatus(order.status);
    setEditPaymentStatus(order.paymentStatus);
    setEditCancelNote(order.cancelNote || "");
    setEditDialogOpen(true);
  };

  const handleUpdateOrder = async () => {
    if (!order) return;
    try {
      await updateOrderStatus.mutateAsync({
        id: order._id,
        status: editStatus,
        paymentStatus: editPaymentStatus,
        cancelNote: editCancelNote,
      });
      toast.success("Order updated successfully");
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update order");
    }
  };

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-semibold text-gray-900">Order not found</h2>
        <p className="text-gray-500 mt-1">The order you&#39;re looking for doesn&#39;t exist.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/admin/orders")}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/orders")}
          >
            <ArrowLeft01Icon className="size-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Order #{order.orderId}
            </h1>
            <p className="text-sm text-gray-500">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <Button onClick={openEditDialog}>Edit Status</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order & Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          <OrderInfoCard order={order} />

          <OrderItemsTable order={order} />
        </div>

        {/* Right Column - Summary & Customer */}
        <div className="space-y-6">
          <OrderSummaryCard order={order} />

          <CustomerInfoCard order={order} />

          <DeliveryAddressCard order={order} />
        </div>
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update status for order {order.orderId}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
              <p>
                <span className="text-gray-500">Customer:</span>{" "}
                <span className="font-medium">
                  {order.user
                    ? `${order.user.first_name} ${order.user.last_name}`
                    : order.guestInfo?.name || "Guest"}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Total:</span>{" "}
                <span className="font-medium">
                  ${order.totalPrice?.toFixed(2)}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Payment:</span>{" "}
                <span className="font-medium capitalize">
                  {order.paymentMethod}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Order Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Payment Status
              </label>
              <select
                value={editPaymentStatus}
                onChange={(e) => setEditPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              >
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {editStatus === "cancelled" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Cancel Note
                </label>
                <textarea
                  value={editCancelNote}
                  onChange={(e) => setEditCancelNote(e.target.value)}
                  placeholder="Reason for cancellation..."
                  className="w-full min-h-[60px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateOrder}
              disabled={updateOrderStatus.isPending}
            >
              {updateOrderStatus.isPending ? "Updating..." : "Update Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}