"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon, Delete02Icon, ShoppingBasket01Icon, FavouriteIcon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import { useGetWishlist, useRemoveFromWishlist, useAddToCart, Product } from "@/hooks";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrencySymbol } from "@/lib/currency";

export default function WishlistPage() {
    const router = useRouter();
    const { isAuthenticated, user, token } = useAuthStore();

    const { data: wishlistItems = [], isLoading, error } = useGetWishlist(isAuthenticated ? token : null);
    const removeFromWishlistMutation = useRemoveFromWishlist(isAuthenticated ? token : null);
    const addToCartMutation = useAddToCart(isAuthenticated ? token : null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/wishlist");
        }
    }, [isAuthenticated, router]);

    const removeFromWishlist = (id: string, name: string) => {
        removeFromWishlistMutation.mutate(id, {
            onSuccess: () => {
                toast.success(`${name} removed from wishlist.`);
            },
            onError: () => {
                toast.error("Failed to remove item. Please try again.");
            }
        });
    };

    const addToCart = (id: string, name: string) => {
        addToCartMutation.mutate({ productId: id, quantity: 1 }, {
            onSuccess: () => {
                toast.success(`${name} added to cart!`);
            },
            onError: () => {
                toast.error("Failed to add to cart.");
            }
        });
    }

    if (!isAuthenticated) return null; // Let the useEffect redirect handle this gracefully

    return (
        <main className="min-h-screen bg-gray-50 pb-16">
            <div className="bg-[#003d29] py-12 px-4 mb-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 hover:text-white">
                                <ArrowLeft01Icon className="size-6" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                                My Wishlist
                                <FavouriteIcon className="size-8 text-[#beef63]" />
                            </h1>
                            {!isLoading && !error && (
                                <p className="text-white/80 mt-2 text-lg">
                                    You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="bg-white rounded-2xl shadow-sm p-4 h-[380px] flex flex-col gap-4">
                                <Skeleton className="w-full h-48 rounded-xl" />
                                <Skeleton className="w-3/4 h-6 rounded" />
                                <Skeleton className="w-1/2 h-4 rounded" />
                                <Skeleton className="w-full h-10 mt-auto rounded-full" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center shadow-sm">
                        <p className="font-semibold text-lg">Oops! Something went wrong.</p>
                        <p className="mt-2 text-sm">Failed to load your wishlist. Please try refreshing the page.</p>
                    </div>
                ) : wishlistItems.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-2xl border border-gray-100 p-12 md:p-20 text-center max-w-3xl mx-auto mt-8">
                        <div className="w-32 h-32 bg-[#beef63]/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                            <FavouriteIcon className="size-16 text-[#003d29]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#003d29] mb-4">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-10 text-lg max-w-md mx-auto">
                            Add items that you find inspiring and build the shopping list of your dreams!
                        </p>
                        <Link href="/shop">
                            <Button className="bg-[#beef63] text-[#003d29] hover:bg-[#aedf4d] font-bold px-10 py-6 text-lg rounded-full shadow-md transition-transform hover:scale-105">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    /* Grid Layout */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item: Product) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col relative"
                            >
                                {/* Remove button floating top-right */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(item._id, item.name);
                                    }}
                                    disabled={removeFromWishlistMutation.isPending}
                                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                                    aria-label="Remove from wishlist"
                                >
                                    <Delete02Icon className="size-5" />
                                </button>

                                {/* Product Image */}
                                <Link href={`/products/${item._id}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden p-4">
                                    <Image
                                        src={item.image?.url || item.image?.display_url || "/placeholder-product.jpg"}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {item.discount && item.discount > 0 && (
                                        <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                            {item.discount}% OFF
                                        </div>
                                    )}
                                </Link>

                                {/* Product Info */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-auto">
                                        <Link href={`/products/${item._id}`}>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#003d29] transition-colors line-clamp-2 leading-tight">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                                    </div>

                                    <div className="flex items-end justify-between mb-5 mt-2">
                                        <div className="flex flex-col">
                                            {item.discount && item.discount > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl font-bold text-[#003d29]">
                                                        {getCurrencySymbol(item.currency)}{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                                    </span>
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {getCurrencySymbol(item.currency)}{item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xl font-bold text-[#003d29]">
                                                    {getCurrencySymbol(item.currency)}{item.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${item.quantity && item.quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {item.quantity && item.quantity > 0 ? "In Stock" : "Out of stock"}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        className="w-full rounded-full bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                        disabled={(item.quantity || 0) <= 0 || addToCartMutation.isPending}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(item._id, item.name);
                                        }}
                                    >
                                        <ShoppingBasket01Icon className="size-5 mr-2" />
                                        {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
