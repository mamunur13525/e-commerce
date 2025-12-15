"use client";

import { useState } from "react";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    FilterHorizontalIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/skeleton";


interface Product {
    _id: string;
    name: string;
    price: number;
    rating?: number;
    image: {
        url: string;
        display_url?: string;
    };
    store?: {
        id?: string;
        name?: string;
    } | string;
    category: string;
    quantity?: number;
    discount?: number;
    currency?: string;
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <ShopPageContent />
        </Suspense>
    );
}

function ShopPageContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    // Reset when filters change
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        setIsLoading(true);
        fetchProducts(1, true);
    }, [searchParams]);

    // Load more when scrolling
    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            setPage(prev => prev + 1);
            fetchProducts(page + 1, false);
        }
    }, [inView]);

    const fetchProducts = async (pageNum: number, isNewFilter: boolean) => {
        setIsLoading(true);

        try {
            // Build query parameters
            const params = new URLSearchParams();

            const category = searchParams.get("category");
            if (category) {
                params.append("category", category);
            }

            // Note: The current API doesn't support pagination or price filtering
            // You may need to extend the API to support these features
            const limit = searchParams.get("limit") || "20";
            params.append("limit", limit);

            const response = await fetch(`/api/products?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                const fetchedProducts = data.data;

                // Client-side price filtering (ideally this should be done on the backend)
                const minPrice = Number(searchParams.get("minPrice") || 0);
                const maxPrice = Number(searchParams.get("maxPrice") || 10000);
                const filtered = fetchedProducts.filter((p: Product) =>
                    p.price >= minPrice && p.price <= maxPrice
                );

                if (isNewFilter) {
                    setProducts(filtered);
                } else {
                    setProducts(prev => [...prev, ...filtered]);
                }

                // For now, disable infinite scroll since API doesn't support pagination
                setHasMore(false);
            } else {
                console.error("Failed to fetch products:", data.message);
                setProducts([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrencySymbol = (currency?: string): string => {
        const symbols: Record<string, string> = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
        };
        return symbols[currency?.toUpperCase() || 'USD'] || '$';
    };

    const getStoreName = (store?: { id?: string; name?: string } | string): string => {
        if (typeof store === 'string') return store;
        return store?.name || 'Unknown Store';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">


                    <div className="flex items-center justify-between gap-3 w-full">
                        <div>
                            <h1 className="text-3xl font-bold text-[#003d29]">Shop</h1>
                            <p className="text-gray-500 mt-1">
                                Showing {products.length} products
                            </p>
                        </div>
                        {/* Mobile Filter Trigger */}
                        <Sheet>
                            <SheetTrigger className={cn(buttonVariants({ variant: "outline" }), "lg:hidden gap-2")}>
                                <FilterHorizontalIcon className="size-4" />
                                Filters
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 overflow-y-auto">
                                <div className="p-4">
                                    <FilterSidebar />
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-1/5 shrink-0 top-24 sticky">
                        <FilterSidebar />
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">


                        {products.length === 0 && !isLoading ? (
                            <div className="text-center py-20 text-gray-500">
                                No products found matching your filters.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        title={product.name}
                                        price={product.price}
                                        imageSrc={product.image.url || product.image.display_url || "/placeholder-product.jpg"}
                                        rating={product.rating}
                                        quantity={product.quantity}
                                        discount={product.discount}
                                        currency={product.currency}
                                    />
                                ))}

                                {/* Skeletons for loading state */}
                                {isLoading && (
                                    <>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <ProductCardSkeleton key={`skeleton-${i}`} />
                                        ))}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Infinite Scroll Trigger */}
                        {hasMore && (
                            <div ref={ref} className="h-20 flex items-center justify-center mt-8">
                                {isLoading ? null : <div className="text-gray-400 text-sm">Scroll to load more...</div>}
                            </div>
                        )}

                        {!hasMore && products.length > 0 && (
                            <div className="text-center text-gray-400 text-sm mt-12 mb-8">
                                You've reached the end of the list.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
