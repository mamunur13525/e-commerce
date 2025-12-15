import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="bg-white shadow shadow-zinc-100 rounded-lg p-4 flex flex-col items-start text-left h-full">
            {/* Image skeleton */}
            <Skeleton className="w-full aspect-square rounded-lg mb-4" />

            {/* Title skeleton */}
            <Skeleton className="h-5 w-3/4 mb-2" />

            {/* Rating skeleton */}
            <div className="flex items-center gap-1 mb-2">
                <Skeleton className="h-4 w-20" />
            </div>

            {/* Stock skeleton */}
            <Skeleton className="h-4 w-24 mb-3" />

            {/* Price skeleton */}
            <Skeleton className="h-6 w-20 mb-4" />

            {/* Button skeleton */}
            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );
}
