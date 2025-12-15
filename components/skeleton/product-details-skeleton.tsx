import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumb skeleton */}
                <div className="flex items-center gap-2 mb-8">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery Skeleton */}
                    <div className="space-y-4">
                        {/* Main image */}
                        <Skeleton className="aspect-square rounded-lg" />

                        {/* Thumbnails */}
                        <div className="flex gap-2">
                            <Skeleton className="w-20 h-20 rounded-lg" />
                            <Skeleton className="w-20 h-20 rounded-lg" />
                            <Skeleton className="w-20 h-20 rounded-lg" />
                            <Skeleton className="w-20 h-20 rounded-lg" />
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="space-y-5">
                        {/* Store name */}
                        <Skeleton className="h-4 w-32" />

                        {/* Product title */}
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-3/4" />

                        {/* Description */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-1">
                            <Skeleton className="h-14 w-32" />
                            <Skeleton className="h-8 w-8" />
                        </div>

                        {/* Discount info */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Skeleton className="flex-1 h-14 rounded-full" />
                            <Skeleton className="flex-1 h-14 rounded-full" />
                        </div>

                        {/* Additional actions */}
                        <div className="flex items-center gap-6 pt-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        {/* Stock status */}
                        <Skeleton className="h-4 w-48" />

                        {/* SKU and Categories */}
                        <div className="space-y-2 pt-4 border-t">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-56" />
                        </div>

                        {/* Delivery & Daily Deal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                            <div className="flex items-start gap-3">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
