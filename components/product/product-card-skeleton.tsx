export function ProductCardSkeleton() {
    return (
        <div className="bg-white shadow shadow-zinc-100 rounded-lg p-4 relative flex flex-col items-start h-full animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-full aspect-square mb-3 bg-gray-200 rounded-lg" />

            {/* Title Skeleton */}
            <div className="w-3/4 h-5 bg-gray-200 rounded mb-2" />

            {/* Rating Skeleton */}
            <div className="flex items-center gap-1 mb-3">
                <div className="w-24 h-4 bg-gray-200 rounded" />
            </div>

            {/* Stock Skeleton */}
            <div className="w-20 h-3 bg-gray-200 rounded mb-3" />

            {/* Price Skeleton */}
            <div className="flex items-baseline gap-2 mb-4">
                <div className="w-24 h-7 bg-gray-200 rounded" />
            </div>

            {/* Button Skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded-lg mt-auto" />
        </div>
    );
}
