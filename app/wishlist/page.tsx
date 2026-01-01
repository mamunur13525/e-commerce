"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon, Delete02Icon, ShoppingBasket01Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";

// Mock wishlist data - replace with actual state management
const MOCK_WISHLIST = [
    {
        _id: "1",
        name: "Organic Bananas",
        price: 4.99,
        image: { url: "/placeholder-banana.png" },
        category: "Fruits",
        quantity: 60,
        currency: "USD",
    },
];

export default function WishlistPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [wishlistItems, setWishlistItems] = useState(MOCK_WISHLIST);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, user, router]);

    if (isLoading) {
        return null;
    }

    const removeFromWishlist = (id: string) => {
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
    };

    const getCurrencySymbol = (currency?: string): string => {
        const symbols: Record<string, string> = {
            USD: "$",
            EUR: "€",
            GBP: "£",
        };
        return symbols[currency?.toUpperCase() || "USD"] || "$";
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft01Icon className="size-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="text-gray-600 mt-1">
                                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wishlist Content */}
                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                            <p className="text-gray-600 mb-6">
                                Save items you love to your wishlist and shop them later!
                            </p>
                            <Link href="/">
                                <Button className="bg-[#003d29] hover:bg-[#002d1f]">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                {/* Product Image */}
                                <Link href={`/products/${item._id}`}>
                                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                        <Image
                                            src={item.image.url}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link href={`/products/${item._id}`}>
                                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-[#003d29] transition-colors line-clamp-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl font-bold text-[#003d29]">
                                            {getCurrencySymbol(item.currency)}{item.price.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {item.quantity > 0 ? `${item.quantity} in stock` : "Out of stock"}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1 bg-[#003d29] hover:bg-[#002d1f]"
                                            disabled={item.quantity === 0}
                                        >
                                            <ShoppingBasket01Icon className="size-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                            onClick={() => removeFromWishlist(item._id)}
                                        >
                                            <Delete02Icon className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
