"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket01Icon, Delete02Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function CartSheet() {
    const cartItems = [
        {
            id: 1,
            name: "Organic Bananas",
            price: 4.99,
            quantity: 1,
            image: "/placeholder-product.jpg",
        },
        {
            id: 2,
            name: "Fresh Milk 1L",
            price: 2.50,
            quantity: 1,
            image: "/placeholder-product.jpg",
        },
        {
            id: 3,
            name: "Whole Wheat Bread",
            price: 3.25,
            quantity: 2,
            image: "/placeholder-product.jpg",
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <Sheet>
            <SheetTrigger className="relative p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer outline-none">
                <ShoppingBasket01Icon className="size-6 text-[#003d29]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold size-5 flex items-center justify-center rounded-full border-2 border-[#003d29]">
                    {cartItems.length}
                </span>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold text-[#003d29]">
                        <ShoppingBasket01Icon className="size-6" />
                        My Cart ({cartItems.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col gap-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="size-20 bg-gray-100 rounded-lg shrink-0" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-[#003d29]">{item.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-[#003d29]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button className="text-red-500 hover:text-red-700 transition-colors">
                                            <Delete02Icon className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t space-y-4">
                    <div className="flex items-center justify-between text-lg font-bold text-[#003d29]">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/cart"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full border-[#003d29] text-[#003d29] hover:bg-[#003d29] hover:text-white"
                            )}
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/checkout"
                            className={cn(
                                buttonVariants(),
                                "w-full bg-[#003d29] hover:bg-[#002a1c]"
                            )}
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
