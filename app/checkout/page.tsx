"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Edit02Icon,
    Location01Icon,
    Tick02Icon,
    Add01Icon,
    Remove01Icon,
    ArrowRight01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";

// Mock Data
const deliveryAddress = {
    phone: "(+62) 854-2645-1999",
    address: "Dhaka, Banasree, Block B, Road: 3 , California, USA",
};

const storeItems = [
    {
        storeName: "Shoppers grocery market",
        deliveryTime: "15 minute",
        items: [
            {
                id: 1,
                name: "Bobs Red Mill Whole Wheat",
                weight: "500 gm",
                price: 29.12,
                quantity: 1,
                image: "/placeholder-product.jpg",
            },
        ],
    },
    {
        storeName: "Loblaws market",
        deliveryTime: "12 minute",
        items: [], // Collapsed state example
    },
];

const orderSummary = {
    subtotal: 37.65,
    deliveryFee: 16.0,
    couponDiscount: 48.0,
    taxes: 10.0,
};

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cod" | "pos">(
        "online"
    );
    const total =
        orderSummary.subtotal +
        orderSummary.deliveryFee -
        orderSummary.couponDiscount +
        orderSummary.taxes;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <CheckoutProgress currentStep={2} />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Delivery & Items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Information */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xl font-bold text-[#003d29]">
                                Delivery information
                            </CardTitle>
                            <button className="flex items-center gap-1 text-[#d48c00] text-sm font-medium hover:underline">
                                <Edit02Icon className="size-4" />
                                Edit
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className="size-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                    <Location01Icon className="size-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#003d29]">Delivery to</p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Address: {deliveryAddress.phone}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {deliveryAddress.address}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Review Items */}
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-[#003d29]">
                                Review item by store
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {storeItems.map((store, index) => (
                                <div key={index} className="space-y-4">
                                    {/* Store Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                                {/* Placeholder Logo */}
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
                                        {/* Collapsible Icon placeholder */}
                                    </div>

                                    {/* Items */}
                                    {store.items.length > 0 && (
                                        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                                            {store.items.map((item) => (
                                                <div key={item.id} className="flex flex-col gap-4">
                                                    <div className="flex gap-4">
                                                        <div className="size-16 bg-white border rounded-lg shrink-0 flex items-center justify-center">
                                                            {/* Placeholder Image */}
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg opacity-80" />
                                                        </div>
                                                        <div className="flex-1 flex items-center justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="bg-purple-100 text-purple-600 p-0.5 rounded">⚡</span>
                                                                    <h5 className="font-bold text-[#003d29]">{item.name}</h5>
                                                                </div>
                                                                <p className="text-sm text-gray-500">{item.weight}</p>
                                                                <p className="text-lg font-bold text-[#003d29] mt-1">{item.price.toFixed(2)}$</p>
                                                            </div>
                                                            <div className="flex items-center gap-3 bg-white rounded-full border px-2 py-1">
                                                                <button className="p-1 hover:bg-gray-100 rounded-full">
                                                                    <Remove01Icon className="size-5 text-[#003d29]" />
                                                                </button>
                                                                <span className="font-semibold text-[#003d29]">{item.quantity}</span>
                                                                <button className="p-1 hover:bg-gray-100 rounded-full">
                                                                    <Add01Icon className="size-5 text-[#003d29]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#003d29] transition-colors w-fit">
                                                        <span className="rotate-180"><ArrowRight01Icon className="size-4" /></span>
                                                        Replace with <span className="text-red-500 font-bold">Loblaws</span>
                                                        <ArrowRight01Icon className="size-4" />
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

                {/* Right Column: Order Summary */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm h-fit">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-[#003d29]">
                                Order summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Payment Methods */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div
                                        className={cn(
                                            "size-5 rounded-full border flex items-center justify-center",
                                            paymentMethod === "online"
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        )}
                                        onClick={() => setPaymentMethod("online")}
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
                                                : "text-gray-500"
                                        )}
                                    >
                                        Online Payment
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div
                                        className={cn(
                                            "size-5 rounded-full border flex items-center justify-center",
                                            paymentMethod === "cod"
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        )}
                                        onClick={() => setPaymentMethod("cod")}
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
                                                : "text-gray-500"
                                        )}
                                    >
                                        Cash on delivery
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div
                                        className={cn(
                                            "size-5 rounded-full border flex items-center justify-center",
                                            paymentMethod === "pos"
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        )}
                                        onClick={() => setPaymentMethod("pos")}
                                    >
                                        {paymentMethod === "pos" && (
                                            <div className="size-2.5 bg-red-400 rounded-full" />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            "font-medium",
                                            paymentMethod === "pos"
                                                ? "text-[#003d29]"
                                                : "text-gray-500"
                                        )}
                                    >
                                        Pos on delivery
                                    </span>
                                </label>
                            </div>

                            {/* Promo Code */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Add Promo"
                                    className="w-full bg-gray-100 rounded-full py-3 px-5 text-sm outline-none focus:ring-2 focus:ring-[#003d29]/20"
                                />
                                <Button
                                    className="absolute right-1 top-1 rounded-full bg-[#003d29] hover:bg-[#002a1c] h-auto py-2 px-6"
                                >
                                    Apply
                                </Button>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-3 py-4 border-b">
                                <div className="flex justify-between text-sm text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-[#003d29] font-bold">
                                        $ {orderSummary.subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 font-medium">
                                    <span>Delivery fee</span>
                                    <span className="text-[#003d29] font-bold">
                                        $ {orderSummary.deliveryFee.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 font-medium">
                                    <span>Coupon Discount</span>
                                    <span className="text-[#003d29] font-bold">
                                        -$ {orderSummary.couponDiscount.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 font-medium">
                                    <span>Taxes</span>
                                    <span className="text-[#003d29] font-bold">
                                        $ {orderSummary.taxes.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between text-lg font-bold text-[#003d29]">
                                <span>Total</span>
                                <span>$ {total.toFixed(2)}</span>
                            </div>

                            {/* Continue with Klarna */}
                            <Button variant="outline" className="w-full rounded-full py-6 border-[#003d29] text-[#003d29] font-bold flex items-center justify-center gap-2">
                                Continue with <span className="bg-pink-300 px-2 rounded text-black font-serif italic">Klarna.</span>
                            </Button>

                            {/* Confirm Order */}
                            <Link
                                href="/order-confirmation"
                                className={cn(
                                    buttonVariants(),
                                    "w-full bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full py-6 text-base flex justify-center items-center sm:h-auto"
                                )}
                            >
                                Confirm order
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
