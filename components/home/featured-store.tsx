"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight01Icon, StarIcon, FlashIcon, Store04Icon } from "hugeicons-react";
import { useVendors, type Vendor } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const colorClasses = [
  "bg-orange-500",
  "bg-blue-600",
  "bg-emerald-500",
  "bg-red-400",
  "bg-purple-500",
  "bg-yellow-400",
  "bg-pink-500",
  "bg-teal-500",
];

function getColorClass(vendorId: string) {
  const index =
    vendorId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colorClasses.length;
  return colorClasses[index];
}

function FeaturedStoreCard({ vendor }: { vendor: Vendor }) {
  const colorClass = getColorClass(vendor.vendorId);

  return (
    <Link href={`/vendors/${vendor.vendorId}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 h-full">
        <div className={cn("relative h-28 w-full overflow-hidden transition-colors duration-300", colorClass)}>
          <div className="absolute -bottom-6 left-0 right-0 h-10 bg-white rounded-t-[50%] scale-x-110" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-12 h-20 w-20">
          <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-white shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="flex h-full w-full items-center justify-center bg-gray-50">
              {vendor.logo?.url || vendor.logo?.display_url ? (
                <Image
                  src={vendor.logo.url || vendor.logo.display_url || ""}
                  alt={vendor.storeName}
                  unoptimized={true}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-gray-300 select-none">
                  {vendor.storeName[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 pb-8 pt-12 text-center flex-1">
          <h3 className="mb-1 text-xl font-bold text-[#003d29] tracking-tight group-hover:text-emerald-700 transition-colors">
            {vendor.storeName}
          </h3>

          {vendor.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <StarIcon className="size-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-600">
                {vendor.rating.toFixed(1)}
              </span>
            </div>
          )}

          <p className="text-sm text-gray-500 mb-4 line-clamp-2 max-w-[200px]">
            {vendor.description || "Visit this store for great products."}
          </p>

          <div className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
            <FlashIcon className="size-3.5 fill-orange-500 text-orange-500" />
            <span>{vendor.totalProducts} products</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FeaturedStoreSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 h-full">
      <Skeleton className="h-28 w-full rounded-none" />
      <div className="flex flex-col items-center px-6 pb-8 pt-12 text-center flex-1">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function FeaturedStore() {
  const { data, isLoading } = useVendors({ limit: 3 });
  const vendors = data?.data || [];
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Featured store
        </h2>
        <Link
          href="/vendors"
          className="group flex items-center text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
        >
          Visit all stores
          <ArrowRight01Icon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {isLoading
          ? [...Array(3)].map((_, i) => <FeaturedStoreSkeleton key={`skeleton-${i}`} />)
          : vendors.map((vendor) => (
            <FeaturedStoreCard key={vendor._id} vendor={vendor} />
          ))}
        {!isLoading && vendors.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 py-8">
            No stores available yet.
          </p>
        )}
      </div>
    </section>
  );
}
