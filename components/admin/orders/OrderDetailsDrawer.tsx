"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight01Icon } from "hugeicons-react";
import { useAdminOrder, useUpdateOrderStatus, AdminOrder } from "@/hooks/api/admin";
import { toast } from "sonner";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const PAYMENT_STATUSES = ["unpaid", "paid", "failed", "refunded"] as const;

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    shipped: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    delivered: "bg-green-50 text-green-700 ring-1 ring-green-200",
    cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
    unpaid: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
    paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    failed: "bg-red-50 text-red-700 ring-1 ring-red-200",
    refunded: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  };
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
        colors[status] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function SectionCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          {title}
        </h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value, valueClass = "" }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-gray-50 last:border-b-0">
      <span className="text-xs text-gray-500 shrink-0 min-w-[100px]">{label}</span>
      <span className={`text-sm text-gray-900 text-right font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function OrderInfoCard({ order }: { order: AdminOrder }) {
  return (
    <SectionCard title="📋 Order Information">
      <div className="space-y-1">
        <InfoRow label="Order ID" value={<span className="font-mono">{order.orderId}</span>} />
        <InfoRow label="Date" value={new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric",
        })} />
        <InfoRow label="Order Status" value={<StatusBadge status={order.status} />} />
        <InfoRow label="Payment Status" value={<StatusBadge status={order.paymentStatus} />} />
        <InfoRow label="Payment Method" value={<span className="capitalize">{order.paymentMethod}</span>} />
        {order.deliveryZoneName && (
          <InfoRow label="Delivery Zone" value={order.deliveryZoneName} />
        )}
        <InfoRow label="Delivery Fee" value={order.deliveryFee > 0 ? `$${order.deliveryFee.toFixed(2)}` : <span className="text-green-600">Free</span>} />
        {order.onlinePaymentDiscount != null && order.onlinePaymentDiscount > 0 && (
          <InfoRow label="Online Pay Discount" valueClass="text-green-600" value={`-$${order.onlinePaymentDiscount.toFixed(2)}`} />
        )}
        {order.cancelNote && (
          <InfoRow label="Cancel Note" value={<span className="text-red-600">{order.cancelNote}</span>} />
        )}
      </div>
    </SectionCard>
  );
}

function CustomerInfoCard({ order }: { order: AdminOrder }) {
  return (
    <SectionCard title="👤 Customer Information">
      <div className="space-y-1">
        <InfoRow label="Name" value={
          order.user
            ? `${order.user.first_name} ${order.user.last_name}`
            : order.guestInfo?.name || "Guest"
        } />
        <InfoRow label="Email" value={order.user?.email || order.guestInfo?.email || "—"} />
        <InfoRow label="Phone" value={order.guestInfo?.phone || "—"} />
      </div>
    </SectionCard>
  );
}

function DeliveryAddressCard({ order }: { order: AdminOrder }) {
  const addr = order.deliveryAddress as Record<string, any> | undefined;
  if (!addr) return null;

  return (
    <SectionCard title="📍 Delivery Address">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900">{addr.full_name}</p>
        {addr.phone && <InfoRow label="Phone" value={addr.phone} />}
        {addr.building && <InfoRow label="Building" value={addr.building} />}
        {addr.colony && <InfoRow label="Colony" value={addr.colony} />}
        {addr.region && <InfoRow label="Region" value={addr.region} />}
        {addr.area && <InfoRow label="Area" value={addr.area} />}
        {addr.address && <InfoRow label="Address" value={addr.address} />}
        {addr.city && <InfoRow label="City" value={addr.city} />}
        {addr.label && <InfoRow label="Label" value={addr.label} />}
        {addr.country && <InfoRow label="Country" value={addr.country} />}
      </div>
    </SectionCard>
  );
}

function OrderSummaryCard({ order }: { order: AdminOrder }) {
  return (
    <SectionCard title="💰 Order Summary">
      <div className="space-y-1">
        <div className="flex justify-between py-1.5 border-b border-gray-50">
          <span className="text-xs text-gray-500">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">${order.subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-gray-50">
          <span className="text-xs text-gray-500">Delivery Fee</span>
          <span className="text-sm font-medium text-gray-900">
            {order.deliveryFee > 0 ? `$${order.deliveryFee?.toFixed(2)}` : <span className="text-green-600">Free</span>}
          </span>
        </div>
        {order.promoDiscount > 0 && (
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-xs text-gray-500">
              Promo Discount
              {order.promoCode?.code && <span className="text-gray-400 ml-1">({order.promoCode.code})</span>}
            </span>
            <span className="text-sm font-medium text-green-600">-${order.promoDiscount?.toFixed(2)}</span>
          </div>
        )}
        {order.onlinePaymentDiscount != null && order.onlinePaymentDiscount > 0 && (
          <div className="flex justify-between py-1.5 border-b border-gray-50">
            <span className="text-xs text-gray-500">Online Payment Discount</span>
            <span className="text-sm font-medium text-green-600">-${order.onlinePaymentDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between py-1.5 border-b border-gray-50">
          <span className="text-xs text-gray-500">Taxes</span>
          <span className="text-sm font-medium text-gray-900">${order.taxes?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 mt-1">
          <span className="text-sm font-bold text-gray-900">Total</span>
          <span className="text-base font-bold text-gray-900">${order.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </SectionCard>
  );
}

function PaymentInfoCard({ order }: { order: AdminOrder }) {
  const hasOnlineDetails = order.onlinePaymentDetails?.provider;
  return (
    <SectionCard title="💳 Payment Information">
      <div className="space-y-1">
        <InfoRow label="Method" value={<span className="capitalize">{order.paymentMethod}</span>} />
        <InfoRow label="Status" value={<StatusBadge status={order.paymentStatus} />} />
        {hasOnlineDetails && (
          <>
            <InfoRow label="Provider" value={<span className="capitalize">{order.onlinePaymentDetails?.provider}</span>} />
            {order.onlinePaymentDetails?.phoneNumber && (
              <InfoRow label="Phone" value={order.onlinePaymentDetails.phoneNumber} />
            )}
            {order.onlinePaymentDetails?.transactionId && (
              <InfoRow label="Transaction ID" value={<span className="font-mono text-xs">{order.onlinePaymentDetails.transactionId}</span>} />
            )}
          </>
        )}
        {order.promoCode?.code && (
          <InfoRow label="Promo Code" value={
            <span>
              <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{order.promoCode.code}</span>
              {order.promoCode.discountValue && (
                <span className="text-xs text-gray-500 ml-1">
                  ({order.promoCode.discountType === "percentage" ? `${order.promoCode.discountValue}%` : `$${order.promoCode.discountValue}`})
                </span>
              )}
            </span>
          } />
        )}
      </div>
    </SectionCard>
  );
}

function OrderItemsList({ order }: { order: AdminOrder }) {
  return (
    <SectionCard title={`🛒 Ordered Items (${order.items?.length || 0})`}>
      <div className="divide-y divide-gray-100 -m-4">
        {order.items?.map((item: any, index: number) => {
          const productName = item.product?.name || "Unknown Product";
          const unitPrice = item.price || 0;
          const quantity = item.quantity || 1;
          const totalPrice = unitPrice * quantity;
          const product = item.product;
          return (
            <div key={index} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
              {product?.images?.[0]?.display_url ? (
                <Image
                  src={product.images[0].display_url}
                  alt={productName}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-50 shrink-0 ring-1 ring-gray-200"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 shrink-0 ring-1 ring-gray-200">
                  N/A
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm leading-tight">{productName}</p>
                {item.variant && (
                  <p className="text-xs text-gray-500 mt-0.5">Variant: {item.variant}</p>
                )}
                {product?.slug && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">SKU: {product.slug}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-gray-500">${unitPrice.toFixed(2)} × {quantity}</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function DrawerSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-36 w-full rounded-xl" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
      <Skeleton className="h-28 w-full rounded-xl" />
    </div>
  );
}

interface OrderDetailsDrawerProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderDetailsDrawer({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsDrawerProps) {
  const router = useRouter();
  const { data: order, isLoading } = useAdminOrder(orderId);

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
    } catch (error: unknown) {
      toast.error(
        error && typeof error === "object" && "response" in error
          ? (error as { response: { data: { message: string } } }).response.data.message
          : "Failed to update order"
      );
    }
  };

  const handleViewFullDetails = () => {
    if (!orderId) return;
    onOpenChange(false);
    router.push(`/admin/orders/${orderId}`);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg md:max-w-xl p-0 flex flex-col"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
            <div className="flex items-start justify-between pr-8">
              <div>
                <SheetTitle className="text-lg font-bold text-gray-900">
                  {order ? `Order #${order.orderId}` : "Order Details"}
                </SheetTitle>
                <SheetDescription className="text-xs text-gray-500 mt-0.5">
                  {order
                    ? `Created ${new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Loading order details..."}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {isLoading ? (
              <DrawerSkeleton />
            ) : !order ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Order not found.</p>
              </div>
            ) : (
              <>
                <OrderInfoCard order={order} />
                <OrderSummaryCard order={order} />
                {(order.paymentMethod === "Online" || order.promoCode?.code) && (
                  <PaymentInfoCard order={order} />
                )}
                <CustomerInfoCard order={order} />
                <DeliveryAddressCard order={order} />
                <OrderItemsList order={order} />
              </>
            )}
          </div>

          {/* Bottom actions */}
          {order && (
            <div className="border-t border-gray-200 px-5 py-4 flex items-center gap-2 shrink-0 bg-gray-50/80">
              <Button
                variant="outline"
                size="sm"
                onClick={openEditDialog}
                className="flex-1"
              >
                Edit Status
              </Button>
              <Button
                size="sm"
                onClick={handleViewFullDetails}
                className="flex-1"
              >
                <span>Full Details</span>
                <ArrowRight01Icon className="size-4 ml-1.5" />
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update status for order {order?.orderId}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {order && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium text-gray-900">
                    {order.user
                      ? `${order.user.first_name} ${order.user.last_name}`
                      : order.guestInfo?.name || "Guest"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold text-gray-900">${order.totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium capitalize">{order.paymentMethod}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Order Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
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
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
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
                  className="w-full min-h-[80px] px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] resize-none"
                />
              </div>
            )}
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={handleUpdateOrder}
              disabled={updateOrderStatus.isPending}
              className="w-full sm:w-auto"
            >
              {updateOrderStatus.isPending ? "Updating..." : "Update Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}