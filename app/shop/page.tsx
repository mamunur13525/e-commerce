"use client";

import { useEffect, useRef, useState } from "react";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Cancel01Icon, FilterHorizontalIcon, Search01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardSkeleton } from "@/components/skeleton";
import { useInfiniteProducts } from "@/hooks";
import ShoppingPageSkeleton from "@/components/skeleton/shoping-page";

export default function ShopPage() {
  return (
    <Suspense fallback={<ShoppingPageSkeleton />}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { ref, inView } = useInView();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000);
  const rating = searchParams.get("rating")
    ? Number(searchParams.get("rating"))
    : undefined;

  const [searchInput, setSearchInput] = useState(search || "");

  useEffect(() => {
    setSearchInput(search || "");
  }, [search]);

  // Debounced search handler
  const handleSearchInput = (value: string) => {
    setSearchInput(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);
  };

  const clearSearch = () => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Fetch products using TanStack Query
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({
    category: category || undefined,
    search: search || undefined,
    limit: 12,
    minPrice,
    maxPrice,
    rating,
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
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center justify-between gap-3 w-full">
            <div>
              {search ? (
                <h1 className="text-3xl font-bold text-[#003d29]">
                  Search: "{search}"
                </h1>
              ) : (
                <h1 className="text-3xl font-bold text-[#003d29]">Shop</h1>
              )}
              <p className="text-gray-500 mt-1">
                Showing {displayedProducts.length} of {totalProducts} products
              </p>
            </div>
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "lg:hidden gap-2",
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
          <div className="flex-1">
            {/* Active Filters & Search Bar */}
            <div className="w-full flex flex-col sm:flex-row items-start  justify-between gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-100">
              {/* Active Filters - only show when there are active filters */}
              {category ||
                search ||
                minPrice > 0 ||
                maxPrice < 1000 ||
                rating ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Filters:
                  </span>
                  {search && (
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full border border-gray-200">
                      Search: "{search}"
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("search");
                          router.replace(`${pathname}?${params.toString()}`, {
                            scroll: false,
                          });
                        }}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {category && (
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full border border-gray-200">
                      Category: {category}
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("category");
                          router.replace(`${pathname}?${params.toString()}`, {
                            scroll: false,
                          });
                        }}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(minPrice > 0 || maxPrice < 1000) && (
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full border border-gray-200">
                      Price: ${minPrice} - ${maxPrice}
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("minPrice");
                          params.delete("maxPrice");
                          router.replace(`${pathname}?${params.toString()}`, {
                            scroll: false,
                          });
                        }}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {rating && (
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full border border-gray-200">
                      Rating: {rating}★
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString(),
                          );
                          params.delete("rating");
                          router.replace(`${pathname}?${params.toString()}`, {
                            scroll: false,
                          });
                        }}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => router.push(pathname)}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              ) : (
                <div />
              )}

              {/* Search Bar */}
              <div className="w-full sm:w-auto sm:min-w-[350px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    className="w-full h-10 pl-10 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4e157] text-sm"
                  />
                  <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  {searchInput && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <Cancel01Icon className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Product Grid */}
            <div className="w-full">
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
              {hasNextPage && <div ref={ref} className="h-10 mt-8" />}

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
    </div>
  );
}
