"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Add01Icon,
    ArrowLeft01Icon,
    Delete02Icon,
    Remove01Icon,
    ShoppingBasket01Icon,
    Loading03Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { useAuthStore } from "@/store/auth-store";
import { useGetCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks";
import { toast } from "sonner";

export default function CartPage() {
    const { isAuthenticated, token } = useAuthStore();
    const { data: cartItems = [], isLoading } = useGetCart(isAuthenticated ? token : null);
    const updateCartMutation = useUpdateCartItem(isAuthenticated ? token : null);
    const removeFromCartMutation = useRemoveFromCart(isAuthenticated ? token : null);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + ((item.product?.price || 0) * item.quantity),
        0
    );
    const deliveryFee = 16.0;
    const taxes = 10.0;
    const total = subtotal + deliveryFee + taxes;

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeFromCartMutation.mutateAsync(productId);
            toast.success("Item removed from cart");
        } catch {
            toast.error("Failed to remove item");
        }
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (newQuantity < 0) return;
        try {
            await updateCartMutation.mutateAsync({ productId, quantity: newQuantity });
        } catch {
            toast.error("Failed to update quantity");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
                <Card className="border-none shadow-sm text-center">
                    <CardContent className="p-12 space-y-6">
                        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBasket01Icon className="size-10 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Please Sign In</h3>
                            <p className="text-gray-500 mb-6">You need to sign in to view your cart</p>
                        </div>
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants(),
                                "bg-[#003d29] hover:bg-[#002a1c] rounded-full"
                            )}
                        >
                            Sign In
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
                <Loading03Icon className="size-8 animate-spin text-[#003d29]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <CheckoutProgress currentStep={1} />
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon-sm" }),
                            "rounded-full hover:bg-gray-200"
                        )}
                    >
                        <ArrowLeft01Icon className="size-6 text-[#003d29]" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-[#003d29]">Shopping Cart</h1>
                        <p className="text-gray-500">
                            You have {cartItems.length} items in your cart
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <div className="bg-[#003d29] text-white p-4 grid-cols-12 gap-4 text-sm font-semibold uppercase tracking-wider hidden md:grid">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-center">Total</div>
                            </div>
                            <CardContent className="p-0">
                                {cartItems.map((item, index) => (
                                    <div key={item.productId}>
                                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="md:col-span-6 flex gap-4">
                                                <Link href={'/products/'+item.productId} className="size-20 md:size-24 bg-gray-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden hover:border">
                                                    {item.product?.image?.url ? (
                                                        <Image
                                                            src={item.product.image.url}
                                                            alt={item.product.name}
                                                            width={96}
                                                            height={96}
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <ShoppingBasket01Icon className="size-8 text-gray-300" />
                                                    )}
                                                </Link>
                                                <div className="flex flex-col justify-center">
                                                    <Link href={'/products/'+item.productId} className="hover:underline font-bold text-[#003d29] text-lg">
                                                        {item.product?.name || `Product ${item.productId}`}
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId)}
                                                        disabled={removeFromCartMutation.isPending}
                                                        className="text-red-500 text-sm font-medium flex items-center gap-1 mt-2 hover:underline w-fit disabled:opacity-50"
                                                    >
                                                        <Delete02Icon className="size-4" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price (Mobile Labelled) */}
                                            <div className="md:col-span-2 text-center md:text-center flex justify-between md:block">
                                                <span className="md:hidden text-gray-500 font-medium">Price:</span>
                                                <span className="font-semibold text-gray-700">
                                                    ${(item.product?.price || 0).toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Quantity Control */}
                                            <div className="md:col-span-2 flex justify-end md:justify-center">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-full border px-2 py-1">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                        disabled={updateCartMutation.isPending || item.quantity <= 1}
                                                        className="p-1 hover:bg-white rounded-full transition-shadow shadow-sm disabled:opacity-50"
                                                    >
                                                        <Remove01Icon className="size-4 text-[#003d29]" />
                                                    </button>
                                                    <span className="font-semibold text-[#003d29] w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                        disabled={updateCartMutation.isPending}
                                                        className="p-1 hover:bg-white rounded-full transition-shadow shadow-sm disabled:opacity-50"
                                                    >
                                                        <Add01Icon className="size-4 text-[#003d29]" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total Price */}
                                            <div className="md:col-span-2 text-right md:text-center flex justify-between md:block">
                                                <span className="md:hidden text-gray-500 font-medium">Total:</span>
                                                <span className="font-bold text-[#003d29] text-lg">
                                                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        {index < cartItems.length - 1 && <Separator />}
                                    </div>
                                ))}

                                {cartItems.length === 0 && (
                                    <div className="p-12 text-center flex flex-col items-center gap-4">
                                        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center">
                                            <ShoppingBasket01Icon className="size-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600">Your cart is empty</h3>
                                        <Link
                                            href="/"
                                            className={cn(
                                                buttonVariants(),
                                                "bg-[#003d29] hover:bg-[#002a1c] rounded-full"
                                            )}
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Summary */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm">
                            <CardHeader className="bg-gray-50/50 border-b">
                                <CardTitle className="text-xl font-bold text-[#003d29]">
                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 p-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-[#003d29] font-bold">
                                            $ {subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                                        <span>Shipping Estimate</span>
                                        <span className="text-[#003d29] font-bold">
                                            $ {deliveryFee.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                                        <span>Tax Estimate</span>
                                        <span className="text-[#003d29] font-bold">
                                            $ {taxes.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-xl font-bold text-[#003d29]">
                                    <span>Total</span>
                                    <span>$ {total.toFixed(2)}</span>
                                </div>

                                <Link
                                    href="/checkout"
                                    className={cn(
                                        buttonVariants(),
                                        "w-full bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full py-6 text-base shadow-sm hover:shadow-md transition-all flex justify-center items-center sm:h-auto"
                                    )}
                                >
                                    Proceed to Checkout
                                </Link>
                                <div className="text-center">
                                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#003d29] underline underline-offset-4">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
