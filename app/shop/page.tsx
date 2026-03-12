"use client";

import { useEffect } from "react";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterHorizontalIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/skeleton";
import { useInfiniteProducts, type Product } from "@/hooks";

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  const category = searchParams.get("category");
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000);
  const rating = searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined;
  console.log({ maxPrice, minPrice })

  // Fetch products using TanStack Query
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteProducts({
    category: category || undefined,
    limit: 12,
    minPrice,
    maxPrice,
    rating
  });

  const displayedProducts = data?.pages.flatMap((page) => page.data) || [];
  const totalProducts = data?.pages[0]?.pagination?.total || 0;

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center justify-between gap-3 w-full">
            <div>
              <h1 className="text-3xl font-bold text-[#003d29]">Shop</h1>
              <p className="text-gray-500 mt-1">
                Showing {displayedProducts.length} of {totalProducts} products
              </p>
            </div>
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "lg:hidden gap-2"
                )}
              >
                <FilterHorizontalIcon className="size-4" />
                Filters
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-75 sm:w-87.5 p-0 overflow-y-auto"
              >
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
            {displayedProducts.length === 0 && !isLoading ? (
              <div className="text-center py-20 text-gray-500">
                No products found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
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

                {/* Skeletons for initial loading state */}
                {isLoading && (
                  <>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <ProductCardSkeleton key={`skeleton-${i}`} />
                    ))}
                  </>
                )}

                {/* Skeletons for fetching more state */}
                {isFetchingNextPage && (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <ProductCardSkeleton key={`skeleton-more-${i}`} />
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasNextPage && (
              <div
                ref={ref}
                className="h-10 mt-8"
              />
            )}

            {!hasNextPage && displayedProducts.length > 0 && (
              <div className="text-center text-gray-400 text-sm mt-12 mb-8">
                You&apos;ve reached the end of the list.
              </div>
            )}

            {error && (
              <div className="text-center py-12 text-red-600">
                <p>Failed to load products. Please try again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
