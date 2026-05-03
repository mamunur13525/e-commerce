import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 bg-gray-200 mb-2" />
        <Skeleton className="h-5 w-80 bg-gray-200" />
      </div>

      <div className="space-y-8">
        {/* Personal Information Section Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48 bg-gray-200" />
            <Skeleton className="h-9 w-20 bg-gray-200 rounded-md" />
          </div>
          <Skeleton className="h-px w-full bg-gray-200" />
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-14 w-full bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Addresses Section Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-gray-200" />
            <Skeleton className="h-10 w-36 bg-gray-200 rounded-md" />
          </div>
          <Skeleton className="h-px w-full bg-gray-200" />
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-32 bg-gray-200" />
                      <Skeleton className="h-5 w-16 bg-gray-200 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                    <Skeleton className="h-4 w-64 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24 bg-gray-200 rounded-md" />
                    <Skeleton className="h-8 w-8 bg-gray-200 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 bg-gray-200" />
            <Skeleton className="h-9 w-20 bg-gray-200 rounded-md" />
          </div>
          <Skeleton className="h-px w-full bg-gray-200" />
          <div className="grid gap-6 max-w-md">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-14 w-full bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

