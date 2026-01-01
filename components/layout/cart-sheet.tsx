"use client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket01Icon, Delete02Icon, Loading03Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useCartAnimation } from "@/components/context/cart-animation-context";
import { useAuthStore } from "@/store/auth-store";
import { useGetCart, useRemoveFromCart } from "@/hooks";
import { toast } from "sonner";
import { useState } from "react";

export function CartSheet() {
    const { registerCartIcon } = useCartAnimation();
    const { isAuthenticated, token } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch cart only if authenticated
    const { data: cartItems = [], isLoading } = useGetCart(isAuthenticated ? token : null);
    const removeFromCartMutation = useRemoveFromCart(isAuthenticated ? token : null);

    // Mock cart items for non-authenticated users
    const displayCartItems = isAuthenticated ? cartItems : [];

    // Compute subtotal based on actual product prices
    const subtotal = displayCartItems.reduce(
        (acc, item) => acc + ((item.product?.price || 0) * item.quantity),
        0
    );

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeFromCartMutation.mutateAsync(productId);
            toast.success("Item removed from cart");
        } catch {
            toast.error("Failed to remove item");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="relative p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                <div ref={registerCartIcon} className="relative flex items-center justify-center">
                    <ShoppingBasket01Icon className="size-6 text-[#003d29]" />
                    {isAuthenticated && displayCartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold size-4 flex items-center justify-center rounded-full border-2 border-white">
                            {displayCartItems.length}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0 ">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold text-[#003d29]">
                        <ShoppingBasket01Icon className="size-6" />
                        My Cart ({displayCartItems.length})
                    </SheetTitle>
                </SheetHeader>

                {!isAuthenticated ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">Sign in to view your cart</p>
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button className="bg-[#003d29] hover:bg-[#002a1c]">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loading03Icon className="size-6 animate-spin text-[#003d29]" />
                    </div>
                ) : displayCartItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div className="text-center">
                            <ShoppingBasket01Icon className="size-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Your cart is empty</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-3 pr-0">
                        <div className="flex flex-col">
                            {displayCartItems.map((item) => (
                                <div key={item.productId} className="flex gap-4 rounded-xl overflow-hidden hover:bg-green-50 px-4 py-3 transition-colors">
                                    <Link href={'/products/' + item.productId} className="size-16 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center overflow-hidden hover:border">
                                        {item.product?.image?.url ? (
                                            <Image
                                                src={item.product.image.url}
                                                alt={item.product.name}
                                                width={64}
                                                height={64}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <ShoppingBasket01Icon className="size-4 text-[#003d29]/40" />
                                        )}
                                    </Link>
                                    <div className="flex-1 flex items-center justify-between">
                                        <div>
                                            <Link href={'/products/' + item.productId} className="font-semibold text-[#003d29] line-clamp-1 hover:underline">
                                                {item.product?.name || `Product ${item.productId}`}
                                            </Link>
                                            <p className="text-sm text-gray-500">
                                                ${item.product?.price?.toFixed(2) || "0.00"} x {item.quantity}
                                            </p>
                                            <p className="font-bold text-[#003d29]">
                                                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type='button'
                                            onClick={() => handleRemoveItem(item.productId)}
                                            disabled={removeFromCartMutation.isPending}
                                            className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            {
                                                removeFromCartMutation.isPending ?
                                                    <Loading03Icon className="size-4 animate-spin" />
                                                    :
                                                    <Delete02Icon className="size-4" />
                                            }
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-6 bg-gray-50 border-t space-y-4">
                    {isAuthenticated && displayCartItems.length > 0 && (
                        <>
                            <div className="flex items-center justify-between text-lg font-bold text-[#003d29]">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        buttonVariants({ variant: "outline" }),
                                        "w-full border-[#003d29] text-[#003d29] hover:bg-[#003d29] hover:text-white"
                                    )}
                                >
                                    View Cart
                                </Link>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        buttonVariants(),
                                        "w-full bg-[#003d29] hover:bg-[#002a1c]"
                                    )}
                                >
                                    Checkout
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
