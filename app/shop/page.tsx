"use client";

import { useState } from "react";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    FilterHorizontalIcon,
    ShoppingBasket01Icon,
    StarIcon,
} from "hugeicons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Product Data
const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        price: 45.99,
        rating: 4.8,
        reviews: 120,
        image: "/placeholder-product.jpg",
        store: "Indoor Jungle",
        category: "indoor-plants",
        tags: ["Pet Friendly", "Low Light"]
    },
    {
        id: 2,
        name: "Fiddle Leaf Fig",
        price: 85.00,
        rating: 4.5,
        reviews: 85,
        image: "/placeholder-product.jpg",
        store: "Green Corner",
        category: "indoor-plants",
        tags: ["High Light"]
    },
    {
        id: 3,
        name: "Snake Plant (Sansevieria)",
        price: 25.99,
        rating: 4.9,
        reviews: 200,
        image: "/placeholder-product.jpg",
        store: "Desert Vibes",
        category: "succulents",
        tags: ["Low Light", "Air Purifying"]
    },
    {
        id: 4,
        name: "Ceramic Pot - Matte White",
        price: 18.50,
        rating: 4.7,
        reviews: 50,
        image: "/placeholder-product.jpg",
        store: "Pottery Barn",
        category: "pots-planters",
        tags: []
    },
    {
        id: 5,
        name: "Organic Potting Mix 10L",
        price: 12.99,
        rating: 4.6,
        reviews: 90,
        image: "/placeholder-product.jpg",
        store: "Soil & Earth",
        category: "fertilizers",
        tags: []
    },
    {
        id: 6,
        name: "Pruning Shears",
        price: 22.99,
        rating: 4.8,
        reviews: 156,
        image: "/placeholder-product.jpg",
        store: "Garden Tools Co.",
        category: "garden-tools",
        tags: []
    },
    // Duplicates for demo purposes to show scrolling
    { id: 7, name: "Rubber Plant", price: 35.00, rating: 4.4, reviews: 45, image: "/placeholder-product.jpg", store: "Indoor Jungle", category: "indoor-plants", tags: [] },
    { id: 8, name: "Aloe Vera", price: 15.00, rating: 4.7, reviews: 30, image: "/placeholder-product.jpg", store: "Desert Vibes", category: "succulents", tags: ["Air Purifying"] },
    { id: 9, name: "Peace Lily", price: 28.00, rating: 4.6, reviews: 110, image: "/placeholder-product.jpg", store: "Green Corner", category: "indoor-plants", tags: ["Air Purifying"] },
    { id: 10, name: "ZZ Plant", price: 32.00, rating: 4.8, reviews: 95, image: "/placeholder-product.jpg", store: "Indoor Jungle", category: "indoor-plants", tags: ["Low Light"] },
];

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <ShopPageContent />
        </Suspense>
    );
}

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";

function ShopPageContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<typeof ALL_PRODUCTS>([]);
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
        setIsLoading(true); // Show local loading state if needed, mostly for initial load

        // Simulate network delay
        setTimeout(() => {
            // Filter logic (simulating backend)
            let filtered = ALL_PRODUCTS;

            const category = searchParams.get("category");
            if (category) {
                filtered = filtered.filter(p => p.category === category);
            }

            const minPrice = Number(searchParams.get("minPrice") || 0);
            const maxPrice = Number(searchParams.get("maxPrice") || 1000);
            filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

            // Pagination logic (simulating backend)
            const PER_PAGE = 6;
            const start = (pageNum - 1) * PER_PAGE;
            const end = start + PER_PAGE;
            const newSlice = filtered.slice(start, end);

            if (isNewFilter) {
                setProducts(newSlice);
            } else {
                setProducts(prev => [...prev, ...newSlice]);
            }

            setHasMore(end < filtered.length);
            setIsLoading(false);
        }, 1000); // 1 second delay
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#003d29]">Shop</h1>
                        <p className="text-gray-500 mt-1">
                            Showing products
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                {products.map((product) => (
                                    <div
                                        key={`${product.id}-${Math.random()}`} // Random key for demo duplicates if any
                                        className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                                            {/* Placeholder Image */}
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                <ShoppingBasket01Icon className="size-12 opacity-50" />
                                            </div>
                                            <button className="absolute top-3 right-3 size-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-500 hover:text-red-500">
                                                <StarIcon className="size-4" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-bold text-[#003d29] line-clamp-1 group-hover:text-[#aedf4d] transition-colors">{product.name}</h3>
                                                    <p className="text-xs text-gray-500">{product.store}</p>
                                                </div>
                                                <span className="font-bold text-[#003d29]">${product.price.toFixed(2)}</span>
                                            </div>

                                            <div className="flex items-center gap-1 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <StarIcon
                                                        key={star}
                                                        className={cn("size-3", star <= Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200")}
                                                    />
                                                ))}
                                                <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-dashed border-gray-100">
                                                <Button className="w-full bg-[#003d29] hover:bg-[#002a1c] text-white rounded-full font-semibold h-10 transition-transform group-hover:scale-105">
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Skeletons for loading state */}
                                {isLoading && (
                                    <>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={`skeleton-${i}`} className="bg-white rounded-2xl p-4 border border-gray-100 space-y-4">
                                                <Skeleton className="aspect-square w-full rounded-xl" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-4 w-1/2" />
                                                </div>
                                                <Skeleton className="h-10 w-full rounded-full" />
                                            </div>
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
