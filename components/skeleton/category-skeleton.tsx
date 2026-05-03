import { Skeleton } from "../ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative flex items-center justify-between p-8 rounded-3xl bg-gray-100 h-40">
          <div className="flex flex-col z-10 gap-3 flex-1">
            <Skeleton className="h-8 w-32 bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-3 w-16 bg-gray-200" />
          </div>
          <Skeleton className="h-20 w-20 rounded-lg bg-gray-200 absolute right-6 bottom-4" />
        </div>
      ))}
    </div>
  );
}
