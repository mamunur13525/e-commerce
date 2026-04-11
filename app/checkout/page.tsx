"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit02Icon, Add01Icon, Remove01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { AddressModal } from "@/components/checkout/address-modal";
import { PromoCodeInput } from "@/components/checkout/promo-code-input";
import { useAuthStore } from "@/store/auth-store";
import { useGetCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks";
import { useGetAddresses } from "@/hooks/api/addresses";
import { toast } from "sonner";
import AddressCard from "@/components/address/AddressCard";
import AddAddressModalButton from "@/components/address/AddAddressModalButton";

export default function CheckoutPage() {
  const { isAuthenticated, token } = useAuthStore();
  const { data: cartItems = [], isLoading } = useGetCart(
    isAuthenticated ? token : null,
  );
  const { data: addressesData, isLoading: isAddressesLoading } =
    useGetAddresses(isAuthenticated ? token : null);
  const updateCartMutation = useUpdateCartItem(isAuthenticated ? token : null);
  const removeFromCartMutation = useRemoveFromCart(
    isAuthenticated ? token : null,
  );

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online",
  );
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    description?: string;
  } | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const selectedAddress = addressesData?.find((addr) => addr.isDefault);

  const storeItems =
    cartItems.length > 0
      ? [
          {
            storeName: "Main Store",
            deliveryTime: "15 minute",
            items: cartItems,
          },
        ]
      : [];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0,
  );
  const deliveryFee = 16.0;
  const promoDiscount = appliedPromo?.discount || 0;
  const taxes = (subtotal - promoDiscount) * 0.1;
  const total = subtotal + deliveryFee - promoDiscount + taxes;

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsConfirming(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems,
          deliveryAddress: selectedAddress,
          subtotal,
          deliveryFee,
          promoDiscount,
          taxes,
          totalPrice: total,
          paymentMethod: paymentMethod === "online" ? "STRIPE" : "COD",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to confirm order");
      }

      if (paymentMethod === "online" && data.url) {
        window.location.href = data.url;
      } else {
        router.push(`/checkout/success`);
      }
    } catch (error: any) {
      console.error("Order confirmation error:", error);
      toast.error(
        error.message || "Failed to process order. Please try again.",
      );
    } finally {
      setIsConfirming(false);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate(productId, {
      onSuccess: () => {
        toast.success("Item removed from cart");
      },
      onError: () => {
        toast.error("Failed to remove item");
      },
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    updateCartMutation.mutate(
      { productId, quantity: newQuantity },
      {
        onSuccess: () => {
          toast.success("Cart updated");
        },
        onError: () => {
          toast.error("Failed to update cart");
        },
      },
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 mb-4">
              Please log in to checkout
            </p>
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                "w-full bg-[#003d29] hover:bg-[#002a1c] text-white",
              )}
            >
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className={cn(
                buttonVariants(),
                "w-full bg-[#003d29] hover:bg-[#002a1c] text-white",
              )}
            >
              Continue Shopping
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <CheckoutProgress currentStep={2} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Delivery information
              </CardTitle>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="flex items-center gap-1 text-[#d48c00] text-sm font-medium hover:underline cursor-pointer"
              >
                <Edit02Icon className="size-4" />
                Change Address
              </button>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-semibold text-[#003d29] mb-2">Delivery to</p>
                <div className="w-full">
                  {selectedAddress ? (
                    <AddressCard address={selectedAddress} deleteIcon={false} />
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm mt-1 mb-2">
                        No address selected. Click "Add Address" to choose one.
                      </p>
                      <AddAddressModalButton />
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Review item by store
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {storeItems.map((store, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {store.storeName[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#003d29]">
                          {store.storeName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Delivery in {store.deliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {store.items.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      {store.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex flex-col gap-4"
                        >
                          <div className="flex gap-4">
                            {item.product?.image?.url && (
                              <div className="size-16 bg-white border rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={item.product.image.url || ""}
                                  alt={item.product.name || "Product"}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {item.product?.discount && (
                                    <span className="bg-red-100 text-red-600 text-xs p-0.5 rounded font-semibold">
                                      {item.product.discount}%
                                    </span>
                                  )}
                                  <h5 className="font-bold text-[#003d29]">
                                    {item.product?.name ||
                                      `Product ${item.productId}`}
                                  </h5>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x{" "}
                                  {item.product?.quantity || "1"}pc
                                </p>
                                <p className="text-lg font-bold text-[#003d29] mt-1">
                                  $
                                  {(
                                    (item.product?.price || 0) * item.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 bg-white rounded-full border px-2 py-1">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.productId,
                                      item.quantity - 1,
                                    )
                                  }
                                  disabled={updateCartMutation.isPending}
                                  className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
                                >
                                  <Remove01Icon className="size-5 text-[#003d29]" />
                                </button>
                                <span className="font-semibold text-[#003d29]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.productId,
                                      item.quantity + 1,
                                    )
                                  }
                                  disabled={updateCartMutation.isPending}
                                  className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
                                >
                                  <Add01Icon className="size-5 text-[#003d29]" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={removeFromCartMutation.isPending}
                            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors w-fit disabled:opacity-50"
                          >
                            <Remove01Icon className="size-4" />
                            Remove item
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Order summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod("online")}
                  className="flex items-center gap-3 cursor-pointer group w-fit"
                >
                  <div
                    className={cn(
                      "size-5 rounded-full border flex items-center justify-center",
                      paymentMethod === "online"
                        ? "border-red-400"
                        : "border-gray-300",
                    )}
                  >
                    {paymentMethod === "online" && (
                      <div className="size-2.5 bg-red-400 rounded-full" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      paymentMethod === "online"
                        ? "text-[#003d29]"
                        : "text-gray-500",
                    )}
                  >
                    Online Payment
                  </span>
                </label>
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className="flex items-center gap-3 cursor-pointer group w-fit"
                >
                  <div
                    className={cn(
                      "size-5 rounded-full border flex items-center justify-center",
                      paymentMethod === "cod"
                        ? "border-red-400"
                        : "border-gray-300",
                    )}
                  >
                    {paymentMethod === "cod" && (
                      <div className="size-2.5 bg-red-400 rounded-full" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      paymentMethod === "cod"
                        ? "text-[#003d29]"
                        : "text-gray-500",
                    )}
                  >
                    Cash on delivery
                  </span>
                </label>
              </div>

              <PromoCodeInput
                subtotal={subtotal}
                appliedPromo={appliedPromo}
                onApplyPromo={setAppliedPromo}
                onRemovePromo={() => setAppliedPromo(null)}
                productIds={cartItems.length > 0 ? cartItems.map((item) => item.productId || item.product?._id).filter((id): id is string => !!id) : undefined}
                userId={isAuthenticated ? token : undefined}
              />

              <div className="space-y-3 py-4 border-b">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#003d29] font-bold">
                    $ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Delivery fee</span>
                  <span className="text-[#003d29] font-bold">
                    $ {deliveryFee.toFixed(2)}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Promo Discount</span>
                    <span className="text-green-600 font-bold">
                      -$ {promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Taxes</span>
                  <span className="text-[#003d29] font-bold">
                    $ {taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#003d29]">
                <span>Total</span>
                <span>$ {total.toFixed(2)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {paymentMethod === "online"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </p>
              </div>

              <Button
                onClick={handleConfirmOrder}
                disabled={isConfirming}
                className={cn(
                  buttonVariants(),
                  "w-full bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full py-3.5 text-base flex justify-center items-center sm:h-auto",
                )}
              >
                {isConfirming
                  ? "Processing..."
                  : paymentMethod === "online"
                    ? "Make order"
                    : "Confirm order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        addresses={addressesData || []}
        isLoading={isAddressesLoading}
      />
    </div>
  );
}
