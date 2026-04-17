"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft01Icon,
  StarIcon,
  Store04Icon,
  CallIcon,
  Location01Icon,
  GlobalIcon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useVendor, useVendorProducts } from "@/hooks";

export default function VendorDetailPage() {
  const params = useParams();
  const vendorId = params.id as string;
  const { ref, inView } = useInView();

  const { data: vendor, isLoading: vendorLoading, error: vendorError } = useVendor(vendorId);

  const {
    data: productsData,
    isLoading: productsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVendorProducts({ vendorId, limit: 12 });

  const products = productsData?.pages.flatMap((page) => page.data) || [];
  const totalProducts = productsData?.pages[0]?.pagination?.total || 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (vendorLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-48 w-full rounded-2xl mb-8" />
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96 mb-2" />
          <Skeleton className="h-4 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (vendorError || !vendor) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🏪</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Store Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {vendorError?.message || "Unable to load store details."}
          </p>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003d29] text-white rounded-lg hover:bg-[#002d1f] transition-colors"
          >
            <ArrowLeft01Icon className="size-5" />
            Browse Stores
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#003d29] to-[#006644] text-white">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft01Icon className="size-4" />
            All Stores
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-[3px] border-white/20 bg-white shadow-lg">
              <div className="flex h-full w-full items-center justify-center bg-gray-50">
                {vendor.logo?.url || vendor.logo?.display_url ? (
                  <Image
                    src={vendor.logo.url || vendor.logo.display_url || ""}
                    alt={vendor.storeName}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-gray-300 select-none">
                    {vendor.storeName[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {vendor.storeName}
              </h1>
              {vendor.description && (
                <p className="text-white/80 max-w-2xl mb-4 leading-relaxed">
                  {vendor.description}
                </p>
              )}

              {/* Rating */}
              {vendor.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`size-4 ${i < Math.floor(vendor.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/30 fill-white/30"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white/90">
                    {vendor.rating.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Store04Icon className="size-4" />
                  <span className="text-sm">{vendor.totalProducts} Products</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-sm">{vendor.totalOrders} Orders</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-sm">
                    {vendor.totalSales > 0 ? `${vendor.totalSales} Sales` : "New Store"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="container mx-auto px-4 py-8">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {vendor.phone && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CallIcon className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <a href={`tel:${vendor.phone}`} className="text-sm font-medium text-gray-900 hover:text-red-700 cursor-pointer duration-200">{vendor.phone}</a>
              </div>
            </div>
          )}
          {(vendor.address || vendor.city || vendor.country) && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Location01Icon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">
                  {[vendor.address, vendor.city, vendor.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}
          {vendor.website && (
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <GlobalIcon className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#003d29] hover:underline"
                >
                  {vendor.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#003d29]">Products</h2>
          <p className="text-gray-500 mt-1">
            {productsLoading
              ? "Loading products..."
              : `${products.length} of ${totalProducts} products`}
          </p>
        </div>

        {products.length === 0 && !productsLoading ? (
          <div className="text-center py-20 text-gray-500">
            This store has no products yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                price={product.price}
                imageSrc={
                  product.image.url ||
                  product.image.display_url ||
                  "/placeholder-product.jpg"
                }
                rating={product.rating}
                quantity={product.quantity}
                discount={product.discount}
                currency={product.currency}
              />
            ))}

            {/* Loading skeletons */}
            {(productsLoading || isFetchingNextPage) &&
              [...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {hasNextPage && <div ref={ref} className="h-10 mt-8" />}

        {!hasNextPage && products.length > 0 && (
          <div className="text-center text-gray-400 text-sm mt-12 mb-8">
            You&apos;ve seen all products from this store.
          </div>
        )}
      </div>
    </main>
  );
}
