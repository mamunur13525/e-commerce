"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit02Icon, Add01Icon, Remove01Icon, Loading03Icon, SmartPhone01Icon } from "hugeicons-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { AddressModal } from "@/components/checkout/address-modal";
import { PromoCodeInput } from "@/components/checkout/promo-code-input";
import { useAuthStore } from "@/store/auth-store";
import { useGetCart, useUpdateCartItem, useRemoveFromCart, useProduct } from "@/hooks";
import { useGetAddresses } from "@/hooks/api/addresses";
import { toast } from "sonner";
import AddressCard from "@/components/address/AddressCard";
import AddAddressModalButton from "@/components/address/AddAddressModalButton";
import { FloatingInput } from "@/components/ui/floating-input";
import { UserIcon, Mail01Icon, TelephoneIcon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRegions, getCitiesByRegion } from "@/lib/locations";

type PaymentMethod = "cod" | "online";
type OnlineProvider = "bkash" | "nagad" | "rocket";

const ONLINE_PROVIDERS: { key: OnlineProvider; label: string; color: string; bg: string }[] = [
  { key: "bkash", label: "bKash", color: "text-pink-600", bg: "bg-pink-50 border-pink-200 hover:bg-pink-100" },
  { key: "nagad", label: "Nagad", color: "text-orange-600", bg: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
  { key: "rocket", label: "Rocket", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100" },
];

const is11DigitPhone = (value: string) => /^\d{11}$/.test(value);
const is10DigitTransactionId = (value: string) => /^.{10}$/.test(value);

function CheckoutContent() {
  const { isAuthenticated, token } = useAuthStore();
  const searchParams = useSearchParams();

  // Parse selected item IDs from query params
  const selectedItemIds = useMemo(() => {
    const itemsParam = searchParams.get("items");
    if (!itemsParam) return null;
    return itemsParam.split(",").filter(Boolean);
  }, [searchParams]);

  // Handle direct buy ("buyNow")
  const buyNowProductId = searchParams.get("buyNow");
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);

  // Guest info form state
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [guestAddress, setGuestAddress] = useState({
    full_name: "",
    building: "",
    colony: "",
    region: "",
    city: "",
    area: "",
    address: "",
  });

  // Queries
  const { data: cartItems = [], isLoading: isCartLoading } = useGetCart(
    isAuthenticated ? token : null,
  );
  const { data: addressesData, isLoading: isAddressesLoading } =
    useGetAddresses(isAuthenticated ? token : null);
  const { data: productData, isLoading: isProductLoading } = useProduct(buyNowProductId || "");

  const updateCartMutation = useUpdateCartItem(isAuthenticated ? token : null);
  const removeFromCartMutation = useRemoveFromCart(
    isAuthenticated ? token : null,
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [onlineProvider, setOnlineProvider] = useState<OnlineProvider | null>(null);
  const [onlinePhone, setOnlinePhone] = useState("");
  const [onlineTransactionId, setOnlineTransactionId] = useState("");

  // Settings from server
  const [onlinePaymentDiscountSettings, setOnlinePaymentDiscountSettings] = useState<{
    type: "percentage" | "fixed";
    value: number;
  } | null>(null);
  const [taxSettings, setTaxSettings] = useState<{
    type: "percentage" | "fixed";
    value: number;
  } | null>(null);

  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    description?: string;
  } | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const router = useRouter();

  const selectedAddress = addressesData?.find((addr) => addr.isDefault);

  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/public/settings");
        const data = await res.json();
        if (data.success) {
          if (data.data?.onlinePaymentDiscount) {
            setOnlinePaymentDiscountSettings(data.data.onlinePaymentDiscount);
          }
          if (data.data?.tax) {
            setTaxSettings(data.data.tax);
          }
        }
      } catch {
        // silently fail
      }
    };
    fetchSettings();
  }, []);

  // Fetch delivery fee based on selected address region/city
  useEffect(() => {
    const fetchDeliveryFee = async () => {
      let region = "";
      let city = "";

      if (isAuthenticated && selectedAddress) {
        region = selectedAddress.region || "";
        city = selectedAddress.city || "";
      } else if (!isAuthenticated) {
        region = guestAddress.region;
        city = guestAddress.city;
      }

      if (!city) {
        setDeliveryFee(0);
        return;
      }

      try {
        const res = await fetch(`/api/public/delivery-fee?city=${encodeURIComponent(city)}`);
        const data = await res.json();
        if (data.success && data.data) {
          setDeliveryFee(data.data.fee);
        } else {
          setDeliveryFee(0);
        }
      } catch {
        setDeliveryFee(0);
      }
    };

    fetchDeliveryFee();
  }, [isAuthenticated, selectedAddress, guestAddress.region, guestAddress.city]);

  const isDirectBuy = !!buyNowProductId;

  // Filter cart items to only selected ones, or construct single item array if direct buy
  const checkoutItems = useMemo(() => {
    if (isDirectBuy && productData) {
      return [{
        productId: productData._id,
        quantity: buyNowQuantity,
        product: productData
      }];
    }
    if (!selectedItemIds) return cartItems;
    return cartItems.filter((item) => selectedItemIds.includes(item.productId));
  }, [cartItems, selectedItemIds, isDirectBuy, productData, buyNowQuantity]);

  const storeItems =
    checkoutItems.length > 0
      ? [
        {
          storeName: "Main Store",
          deliveryTime: "15 minute",
          items: checkoutItems,
        },
      ]
      : [];

  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + (item.product?.final_price || 0) * item.quantity,
    0,
  );

  const promoDiscount = appliedPromo?.discount || 0;

  // Validate online payment fields
  const isOnlinePaymentValid = useMemo(() => {
    if (paymentMethod !== "online") return true;
    if (!onlineProvider) return false;
    if (!is11DigitPhone(onlinePhone)) return false;
    if (!is10DigitTransactionId(onlineTransactionId)) return false;
    return true;
  }, [paymentMethod, onlineProvider, onlinePhone, onlineTransactionId]);

  // Calculate online payment discount (only when payment details are valid)
  const onlinePaymentDiscount = useMemo(() => {
    if (paymentMethod !== "online") return 0;
    if (!isOnlinePaymentValid) return 0;
    if (!onlinePaymentDiscountSettings || onlinePaymentDiscountSettings.value <= 0) return 0;

    const { type, value } = onlinePaymentDiscountSettings;
    let discount = 0;
    if (type === "percentage") {
      discount = (subtotal * value) / 100;
    } else {
      discount = value;
    }
    return parseFloat(discount.toFixed(2));
  }, [paymentMethod, isOnlinePaymentValid, onlinePaymentDiscountSettings, subtotal]);

  // Calculate tax from settings
  const taxes = useMemo(() => {
    if (!taxSettings || taxSettings.value <= 0) return 0;
    const taxableAmount = subtotal - promoDiscount;
    let taxAmount = 0;
    if (taxSettings.type === "percentage") {
      taxAmount = (taxableAmount * taxSettings.value) / 100;
    } else {
      taxAmount = taxSettings.value;
    }
    return parseFloat(taxAmount.toFixed(2));
  }, [taxSettings, subtotal, promoDiscount]);
  const total = subtotal + deliveryFee - promoDiscount + taxes - onlinePaymentDiscount;

  const handleConfirmOrder = async () => {
    if (checkoutItems.length === 0) {
      toast.error("No items selected for checkout.");
      return;
    }

    if (isAuthenticated) {
      if (!selectedAddress) {
        toast.error("Please select a delivery address.");
        return;
      }
    } else {
      // Validate guest info
      if (!guestInfo.name.trim()) {
        toast.error("Please enter your name.");
        return;
      }
      if (!guestInfo.email.trim()) {
        toast.error("Please enter your email.");
        return;
      }
      if (!guestInfo.phone.trim()) {
        toast.error("Please enter your phone number.");
        return;
      }
      // Validate guest address
      if (!guestAddress.full_name.trim() || !guestAddress.building.trim() || !guestAddress.colony.trim() || !guestAddress.region.trim() || !guestAddress.city.trim() || !guestAddress.address.trim()) {
        toast.error("Please fill in all delivery address fields.");
        return;
      }
    }

    if (paymentMethod === "online") {
      if (!onlineProvider) {
        toast.error("Please select an online payment provider.");
        return;
      }
      if (!is11DigitPhone(onlinePhone)) {
        toast.error("Please enter a valid 11-digit phone number.");
        return;
      }
      if (!is10DigitTransactionId(onlineTransactionId)) {
        toast.error("Transaction ID must be exactly 10 characters.");
        return;
      }
    }

    setIsConfirming(true);

    try {
      const body: Record<string, unknown> = {
        paymentMethod: paymentMethod === "online" ? "Online" : "COD",
        ...(appliedPromo?.code && { promoCode: appliedPromo.code }),
        ...(isDirectBuy && { buyNowProductId, buyNowQuantity }),
        ...(!isDirectBuy && selectedItemIds && { itemIds: selectedItemIds }),
      };

      if (paymentMethod === "online" && onlineProvider) {
        body.onlinePaymentDetails = {
          provider: onlineProvider,
          phoneNumber: onlinePhone,
          transactionId: onlineTransactionId,
        };
      }

      if (isAuthenticated) {
        body.addressId = selectedAddress!._id;
      } else {
        body.guestInfo = guestInfo;
        body.guestAddress = guestAddress;
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to confirm order");
      }

      router.push(`/checkout/success`);
    } catch (error: unknown) {
      console.error("Order confirmation error:", error);
      const message = error instanceof Error ? error.message : "Failed to process order. Please try again.";
      toast.error(message);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (isDirectBuy) {
      toast.error("Cannot remove items from direct purchase. Cancel and go back.");
      return;
    }
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

    if (isDirectBuy) {
      setBuyNowQuantity(newQuantity);
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

  const isLoading = (!isDirectBuy && isCartLoading) || (isDirectBuy && isProductLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 mb-4">No items selected for checkout</p>
            <Link
              href="/cart"
              className={cn(
                buttonVariants(),
                "w-full bg-[#003d29] hover:bg-[#002a1c] text-white",
              )}
            >
              Go to Cart
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
          {/* Guest Info Form - only for non-authenticated users */}
          {!isAuthenticated && (
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#003d29]">
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FloatingInput
                  id="guest-name"
                  label="Full Name"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                  startIcon={<UserIcon className="size-5" />}
                  required
                />
                <FloatingInput
                  id="guest-email"
                  label="Email Address"
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                  startIcon={<Mail01Icon className="size-5" />}
                  required
                />
                <FloatingInput
                  id="guest-phone"
                  label="Phone Number"
                  type="tel"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                  startIcon={<TelephoneIcon className="size-5" />}
                  required
                />
              </CardContent>
            </Card>
          )}

          {/* Delivery Address Section */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Delivery information
              </CardTitle>
              {isAuthenticated && (
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="flex items-center gap-1 text-[#d48c00] text-sm font-medium hover:underline cursor-pointer"
                >
                  <Edit02Icon className="size-4" />
                  Change Address
                </button>
              )}
            </CardHeader>
            <CardContent>
              {isAuthenticated ? (
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
              ) : (
                <div className="space-y-4">
                  <p className="font-semibold text-[#003d29] mb-2">Delivery Address</p>
                  <FloatingInput
                    id="delivery-full-name"
                    label="Full Name"
                    value={guestAddress.full_name}
                    onChange={(e) => setGuestAddress({ ...guestAddress, full_name: e.target.value })}
                    startIcon={<UserIcon className="size-5" />}
                    required
                  />
                  <FloatingInput
                    id="delivery-building"
                    label="Building / House No / Floor / Street"
                    value={guestAddress.building}
                    onChange={(e) => setGuestAddress({ ...guestAddress, building: e.target.value })}
                    startIcon={<Edit02Icon className="size-5" />}
                    required
                  />
                  <FloatingInput
                    id="delivery-colony"
                    label="Colony / Suburb / Locality / Landmark"
                    value={guestAddress.colony}
                    onChange={(e) => setGuestAddress({ ...guestAddress, colony: e.target.value })}
                    required
                  />
                  {/* Region & City - Cascading Selects */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                     
                      <Select
                        value={guestAddress.region}
                        onValueChange={(value: string | null) =>
                          setGuestAddress({ ...guestAddress, region: value ?? "", city: "" })
                        }
                      >
                        <SelectTrigger className="w-full h-14! bg-white border-gray-200">
                          <span className={!guestAddress.region ? "text-muted-foreground" : ""}>
                            {guestAddress.region || "Select region"}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {getRegions().map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                    
                      <Select
                        value={guestAddress.city}
                        onValueChange={(value: string | null) =>
                          setGuestAddress({ ...guestAddress, city: value ?? "" })
                        }
                        disabled={!guestAddress.region}
                      >
                        <SelectTrigger className="w-full h-14! bg-white border-gray-200">
                          <span className={!guestAddress.city ? "text-muted-foreground" : ""}>
                            {guestAddress.city || (guestAddress.region ? "Select city" : "Select region first")}
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {getCitiesByRegion(guestAddress.region).map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <FloatingInput
                    id="delivery-address"
                    label="Address"
                    value={guestAddress.address}
                    onChange={(e) => setGuestAddress({ ...guestAddress, address: e.target.value })}
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* COD option */}
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("cod");
                  setOnlineProvider(null);
                  setOnlinePhone("");
                  setOnlineTransactionId("");
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer",
                  paymentMethod === "cod"
                    ? "border-[#003d29] bg-[#003d29]/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                )}
              >
                <div className={cn(
                  "size-6 rounded-full border-2 flex items-center justify-center shrink-0",
                  paymentMethod === "cod" ? "border-[#003d29]" : "border-gray-300"
                )}>
                  {paymentMethod === "cod" && (
                    <div className="size-3 bg-[#003d29] rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-[#003d29]">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when you receive your order</p>
                </div>
                <div className="text-2xl">💵</div>
              </button>

              {/* Online Payment option */}
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("online");
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer",
                  paymentMethod === "online"
                    ? "border-[#003d29] bg-[#003d29]/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                )}
              >
                <div className={cn(
                  "size-6 rounded-full border-2 flex items-center justify-center shrink-0",
                  paymentMethod === "online" ? "border-[#003d29]" : "border-gray-300"
                )}>
                  {paymentMethod === "online" && (
                    <div className="size-3 bg-[#003d29] rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-[#003d29]">Online Payment</p>
                  <p className="text-sm text-gray-500">Pay via bKash, Nagad, or Rocket</p>
                </div>
                <div className="text-2xl">📱</div>
              </button>

              {/* Online Payment Details */}
              {paymentMethod === "online" && (
                <div className="space-y-5 pl-10 border-l-2 border-[#003d29]/20 ml-3">
                  {/* Provider selection */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Select your payment provider
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {ONLINE_PROVIDERS.map((provider) => (
                        <button
                          key={provider.key}
                          type="button"
                          onClick={() => {
                            setOnlineProvider(provider.key);
                          }}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer",
                            onlineProvider === provider.key
                              ? "border-[#003d29] bg-[#003d29]/5"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          )}
                        >
                          <span className={cn(
                            "text-lg font-bold",
                            provider.color
                          )}>
                            {provider.key === "bkash" ? "bKash" : provider.key === "nagad" ? "Nagad" : "Rocket"}
                          </span>
                          {onlineProvider === provider.key && (
                            <svg className="size-4 text-[#003d29]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone number input */}
                  {onlineProvider && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FloatingInput
                        id="online-phone"
                        label="Send Money To (Phone Number)"
                        type="tel"
                        value={onlinePhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                          setOnlinePhone(val);
                        }}
                        startIcon={<SmartPhone01Icon className="size-5" />}
                        placeholder="01XXXXXXXXX"
                        required
                      />
                      {onlinePhone.length > 0 && !is11DigitPhone(onlinePhone) && (
                        <p className="text-xs text-red-500 -mt-3">
                          Phone number must be exactly 11 digits
                        </p>
                      )}

                      <FloatingInput
                        id="online-transaction-id"
                        label="Transaction ID"
                        value={onlineTransactionId}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 10);
                          setOnlineTransactionId(val);
                        }}
                        placeholder="Enter 10-digit transaction ID"
                        required
                      />
                      {onlineTransactionId.length > 0 && !is10DigitTransactionId(onlineTransactionId) && (
                        <p className="text-xs text-red-500 -mt-3">
                          Transaction ID must be exactly 10 characters
                        </p>
                      )}

                      {/* Online payment discount info */}
                      {onlinePaymentDiscountSettings && onlinePaymentDiscountSettings.value > 0 && (
                        <div className={cn(
                          "p-4 rounded-xl border",
                          isOnlinePaymentValid
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-gray-50 border-gray-200"
                        )}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🎉</span>
                            <div>
                              <p className="text-sm font-semibold text-emerald-700">
                                Online Payment Discount Available!
                              </p>
                              <p className="text-sm text-gray-600">
                                {onlinePaymentDiscountSettings.type === "percentage"
                                  ? `Get ${onlinePaymentDiscountSettings.value}% off`
                                  : `Get ৳${onlinePaymentDiscountSettings.value.toFixed(2)} off`}
                                {" "}when you pay online. Fill in the details above to apply.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {isOnlinePaymentValid && onlinePaymentDiscount > 0 && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
                          <svg className="size-5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <p className="text-sm text-emerald-700 font-medium">
                            Online payment verified! You save ৳{onlinePaymentDiscount.toFixed(2)} on this order.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Items Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#003d29]">
                Review item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {storeItems.map((store, index) => (
                <div key={index} className="space-y-4">
                  {store.items.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                      {store.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex flex-col gap-4"
                        >
                          <div className="flex gap-4">
                            {item.product?.image?.url && (
                              <Link href={`/products/${item.product._id}`} className="size-16 bg-white border rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={item.product.image.url || ""}
                                  alt={item.product.name || "Product"}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </Link>
                            )}
                            <div className="flex-1 flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {item.product?.discount && (
                                    <span className="bg-red-100 text-red-600 text-xs p-0.5 rounded font-semibold">
                                      {item.product.discount}%
                                    </span>
                                  )}
                                  <Link href={`/products/${item.product?._id}`} className="font-bold text-[#003d29] hover:text-red-700 cursor-pointer duration-200">
                                    {item.product?.name ||
                                      `Product ${item.productId}`}
                                  </Link>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x{" "}
                                  {item.product?.quantity || "1"}pc
                                </p>
                                <p className="text-lg font-bold text-[#003d29] mt-1">
                                  ৳
                                  {(
                                    (item.product?.final_price || 0) * item.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex items-center flex-col gap-4 justify-end">
                                <div className="flex items-center gap-3 bg-white rounded-full border px-2 py-1">
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.productId,
                                        item.quantity - 1,
                                      )
                                    }
                                    disabled={(!isDirectBuy && updateCartMutation.isPending) || item.quantity <= 1}
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
                                    disabled={!isDirectBuy && updateCartMutation.isPending}
                                    className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
                                  >
                                    <Add01Icon className="size-5 text-[#003d29]" />
                                  </button>

                                </div>
                                {!isDirectBuy && (
                                  <div>
                                    <button
                                      onClick={() => handleRemoveItem(item.productId)}
                                      disabled={removeFromCartMutation.isPending}
                                      className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors w-fit disabled:opacity-50"
                                    >
                                      <Remove01Icon className="size-4" />
                                      Remove item
                                    </button>
                                  </div>
                                )}

                              </div>
                            </div>
                          </div>
                          <Separator />
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
              {/* Payment method indicator - moved inline */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className={cn(
                  "size-2.5 rounded-full",
                  paymentMethod === "cod" ? "bg-red-400" : "bg-emerald-400"
                )} />
                <span className="text-sm font-semibold text-[#003d29]">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>
                {paymentMethod === "online" && onlineProvider && (
                  <span className="text-xs text-gray-500 ml-1">
                    · {onlineProvider === "bkash" ? "bKash" : onlineProvider === "nagad" ? "Nagad" : "Rocket"}
                  </span>
                )}
              </div>

              <PromoCodeInput
                subtotal={subtotal}
                appliedPromo={appliedPromo}
                onApplyPromo={setAppliedPromo}
                onRemovePromo={() => setAppliedPromo(null)}
                productIds={checkoutItems.length > 0 ? checkoutItems.map((item) => item.productId || item.product?._id).filter((id): id is string => !!id) : undefined}
                userId={isAuthenticated ? token : undefined}
              />

              <div className="space-y-3 py-4 border-b">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#003d29] font-bold">
                    ৳{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Delivery fee</span>
                  <span className="text-[#003d29] font-bold">
                    ৳{deliveryFee.toFixed(2)}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Promo Discount</span>
                    <span className="text-green-600 font-bold">
                      -৳{promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                {onlinePaymentDiscount > 0 && (
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Online Payment Discount</span>
                    <span className="text-emerald-600 font-bold">
                      -৳{onlinePaymentDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Taxes</span>
                  <span className="text-[#003d29] font-bold">
                    ৳{taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#003d29]">
                <span>Total</span>
                <span>৳{total.toFixed(2)}</span>
              </div>

              {paymentMethod === "online" && onlineProvider && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Payment Method:</span>{" "}
                    {onlineProvider === "bkash" ? "bKash" : onlineProvider === "nagad" ? "Nagad" : "Rocket"}
                  </p>
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Phone:</span> {onlinePhone}
                  </p>
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Transaction ID:</span> {onlineTransactionId}
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Payment Method:</span> Cash on Delivery
                  </p>
                </div>
              )}

              <Button
                onClick={handleConfirmOrder}
                disabled={isConfirming || (paymentMethod === "online" && !isOnlinePaymentValid)}
                className={cn(
                  buttonVariants(),
                  "w-full bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full py-3.5 text-base flex justify-center items-center sm:h-auto",
                  (isConfirming || (paymentMethod === "online" && !isOnlinePaymentValid)) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isConfirming
                  ? "Processing..."
                  : "Confirm order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {isAuthenticated && (
        <AddressModal
          open={isAddressModalOpen}
          onOpenChange={setIsAddressModalOpen}
          addresses={addressesData || []}
          isLoading={isAddressesLoading}
        />
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <Loading03Icon className="size-8 animate-spin text-[#003d29]" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
