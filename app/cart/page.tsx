"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAuthStore } from "@/store/auth-store";
import { useGetCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks";
import { toast } from "sonner";

export default function CartPage() {
    const router = useRouter();
    const { isAuthenticated, token } = useAuthStore();
    const { data: cartItems = [], isLoading } = useGetCart(isAuthenticated ? token : null);
    const updateCartMutation = useUpdateCartItem(isAuthenticated ? token : null);
    const removeFromCartMutation = useRemoveFromCart(isAuthenticated ? token : null);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Select all items by default when cart data loads
    useEffect(() => {
        if (cartItems.length > 0) {
            setSelectedIds(new Set(cartItems.map((item) => item.productId)));
        }
    }, [cartItems]);

    const allSelected = cartItems.length > 0 && selectedIds.size === cartItems.length;

    const toggleSelect = (productId: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) {
                next.delete(productId);
            } else {
                next.add(productId);
            }
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(cartItems.map((item) => item.productId)));
        }
    };

    const handleProceedToCheckout = () => {
        if (selectedIds.size === 0) {
            toast.error("Please select at least one item to checkout.");
            return;
        }
        const params = new URLSearchParams();
        params.set("items", Array.from(selectedIds).join(","));
        router.push(`/checkout?${params.toString()}`);
    };

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeFromCartMutation.mutateAsync(productId);
            setSelectedIds((prev) => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            });
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
                            href="/login?callbackUrl=%2Fcart"
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

    const selectedSubtotal = cartItems
        .filter((item) => selectedIds.has(item.productId))
        .reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
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

                <Card className="border-none shadow-sm overflow-hidden pt-0">
                    {/* Table Header */}
                    <div className="bg-[#003d29] text-white p-4 grid-cols-12 gap-4 text-sm font-semibold uppercase tracking-wider hidden md:grid items-center">
                        <div className="col-span-1 flex justify-center">
                            <Checkbox
                                checked={allSelected}
                                onCheckedChange={toggleSelectAll}
                                className="border-white data-[state=checked]:bg-[#beef63] data-[state=checked]:text-[#003d29] data-[state=checked]:border-[#beef63]"
                                aria-label="Select all items"
                            />
                        </div>
                        <div className="col-span-5">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-center">Total</div>
                    </div>
                    <CardContent className="p-0">
                        {cartItems.map((item, index) => (
                            <div key={item.productId}>
                                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    {/* Checkbox */}
                                    <div className="hidden md:flex md:col-span-1 justify-center">
                                        <Checkbox
                                            checked={selectedIds.has(item.productId)}
                                            onCheckedChange={() => toggleSelect(item.productId)}
                                            className="data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                                            aria-label={`Select ${item.product?.name || "product"}`}
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="md:col-span-5 flex gap-4">
                                        {/* Mobile checkbox */}
                                        <div className="flex items-center md:hidden">
                                            <Checkbox
                                                checked={selectedIds.has(item.productId)}
                                                onCheckedChange={() => toggleSelect(item.productId)}
                                                className="data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                                                aria-label={`Select ${item.product?.name || "product"}`}
                                            />
                                        </div>
                                        <Link href={'/products/' + item.productId} className="size-20 md:size-24 bg-gray-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden hover:border">
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
                                            <Link href={'/products/' + item.productId} className="hover:underline font-bold text-[#003d29] text-lg">
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

                {/* Bottom bar: selection info + checkout button */}
                {cartItems.length > 0 && (
                    <div className="sticky bottom-4 bg-white border shadow-lg rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleSelectAll}
                                className="text-sm font-medium text-[#003d29] hover:underline"
                            >
                                {allSelected ? "Deselect All" : "Select All"}
                            </button>
                            <Separator orientation="vertical" className="h-6" />
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-[#003d29]">{selectedIds.size}</span>{" "}
                                {selectedIds.size === 1 ? "item" : "items"} selected
                            </p>
                            {selectedIds.size > 0 && (
                                <>
                                    <Separator orientation="vertical" className="h-6 hidden sm:block" />
                                    <p className="text-sm text-gray-500 hidden sm:block">
                                        Subtotal:{" "}
                                        <span className="font-bold text-[#003d29]">
                                            ${selectedSubtotal.toFixed(2)}
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                        <button
                            onClick={handleProceedToCheckout}
                            disabled={selectedIds.size === 0}
                            className={cn(
                                "bg-[#beef63] hover:bg-[#aedf4d] text-[#003d29] font-bold rounded-full px-8 py-3 text-base shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            )}
                        >
                            Proceed to Checkout ({selectedIds.size})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
