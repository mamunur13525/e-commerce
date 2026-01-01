import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton() {
  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-20 bg-gray-200" />
        <Skeleton className="h-4 w-16 bg-gray-200" />
      </div>

      {/* Applied Filters Skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-32 bg-gray-200 rounded-full" />
        ))}
      </div>

      {/* Accordion Items Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-10 w-full bg-gray-200 rounded-lg mb-3" />
            <div className="space-y-2 pl-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                  </div>
                  <Skeleton className="h-5 w-8 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <Skeleton className="h-px w-full bg-gray-200 my-6" />

      {/* Benefits Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-6 w-6 rounded bg-gray-200 shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 bg-gray-200 mb-1" />
              <Skeleton className="h-3 w-32 bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
