"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon, Store04Icon, FlashIcon } from "hugeicons-react";
import { useVendors, type Vendor } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";

function VendorCard({ vendor }: { vendor: Vendor }) {
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

  // Deterministic color based on vendorId
  const colorIndex =
    vendor.vendorId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colorClasses.length;
  const colorClass = colorClasses[colorIndex];

  return (
    <Link href={`/vendors/${vendor.vendorId}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 h-full">
        {/* Top header color */}
        <div className={`relative h-28 w-full overflow-hidden transition-colors duration-300 ${colorClass}`}>
          <div className="absolute -bottom-6 left-0 right-0 h-10 bg-white rounded-t-[50%] scale-x-110" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
        </div>

        {/* Logo */}
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

        {/* Content */}
        <div className="flex flex-col items-center px-6 pb-8 pt-12 text-center flex-1">
          <h3 className="mb-1 text-xl font-bold text-[#003d29] tracking-tight group-hover:text-emerald-700 transition-colors">
            {vendor.storeName}
          </h3>

          {/* Rating */}
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

          {/* Stats */}
          <div className="mt-auto flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Store04Icon className="size-3.5" />
              <span>{vendor.totalProducts} products</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-700">
              <FlashIcon className="size-3.5 fill-orange-500 text-orange-500" />
              <span>{vendor.totalOrders} orders</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function VendorCardSkeleton() {
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

export default function VendorsPage() {
  const { data, isLoading, error } = useVendors({ limit: 50 });

  const vendors = data?.data || [];

  return (
    <main className="bg-[#fafaf9] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#003d29]">All Stores</h1>
          <p className="text-gray-500 mt-1">
            {isLoading
              ? "Loading stores..."
              : `${vendors.length} stores available`}
          </p>
        </div>

        {error && (
          <div className="text-center py-12 text-red-600">
            <p>Failed to load stores. Please try again.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [...Array(8)].map((_, i) => (
              <VendorCardSkeleton key={`skeleton-${i}`} />
            ))
            : vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} />
            ))}
        </div>

        {!isLoading && vendors.length === 0 && !error && (
          <div className="text-center py-20 text-gray-500">
            No stores found.
          </div>
        )}
      </div>
    </main>
  );
}
