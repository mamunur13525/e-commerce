"use client";

import { useState, useMemo } from "react";
import { StarIcon, Loading03Icon, Sorting05Icon, FilterIcon, Tick02Icon } from "hugeicons-react";
import { useReviews } from "@/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [filterRating, setFilterRating] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("relevance");
  const [page, setPage] = useState(1);
  const limit = 5; // Smaller limit for better visibility of pagination

  // Fetch all reviews for summary
  const { data: allReviewsData } = useReviews(productId, "all", "recent", 1, 1000);
  const allReviews = allReviewsData?.data || [];

  // Fetch filtered/sorted reviews for list
  const { data: reviewsData, isLoading } = useReviews(productId, filterRating, sortOption, page, limit);
  const displayedReviews = reviewsData?.data || [];
  const pagination = reviewsData?.pagination;

  const handleFilterChange = (value: string) => {
    setFilterRating(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setPage(1);
  };

  const stats = useMemo(() => {
    if (allReviews.length === 0) return null;

    const total = allReviews.length;
    const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);

    const distribution = [5, 4, 3, 2, 1].map(star => {
      const count = allReviews.filter(r => r.rating === star).length;
      const percentage = (count / total) * 100;
      return { star, count, percentage };
    });

    return { total, average, distribution };
  }, [allReviews]);

  if (!stats) return null;

  return (
    <div className="space-y-8 py-8 border-t">
      {/* Rating Summary Header */}
      <div className="flex flex-col md:flex-row gap-12 items-start md:items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="space-y-2 text-center md:text-left min-w-[150px]">
          <div className="flex items-baseline justify-center md:justify-start gap-1">
            <span className="text-6xl font-black text-gray-900">{stats.average}</span>
            <span className="text-2xl text-gray-400 font-medium">/5</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 py-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-6",
                  i < Math.floor(parseFloat(stats.average))
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200 fill-gray-200"
                )}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-500">{stats.total} Ratings</p>
        </div>

        <div className="flex-1 w-full space-y-3">
          {stats.distribution.map((item) => (
            <div key={item.star} className="flex items-center gap-4 group">
              <div className="flex items-center gap-1 w-16">
                {[...Array(item.star)].map((_, i) => (
                  <StarIcon key={i} className="size-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-400 w-10 text-right group-hover:text-gray-900 transition-colors">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900">Product Reviews</h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Sorting05Icon className="size-4 text-gray-500" />
            <span className="text-sm text-gray-500 hidden sm:inline">Sort:</span>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px] h-9 border-none bg-transparent hover:bg-gray-50 font-semibold focus:ring-0 shadow-none px-2 text-[#003d29]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <FilterIcon className="size-4 text-gray-500" />
            <span className="text-sm text-gray-500 hidden sm:inline">Filter:</span>
            <Select value={filterRating} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[120px] h-9 border-none bg-transparent hover:bg-gray-50 font-semibold focus:ring-0 shadow-none px-2 text-[#003d29]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">All star</SelectItem>
                <SelectItem value="5">5 star</SelectItem>
                <SelectItem value="4">4 star</SelectItem>
                <SelectItem value="3">3 star</SelectItem>
                <SelectItem value="2">2 star</SelectItem>
                <SelectItem value="1">1 star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading03Icon className="size-8 animate-spin text-[#003d29]" />
          </div>
        ) : displayedReviews.length > 0 ? (
          <>
            <div className="space-y-8">
              {displayedReviews.map((review) => (
                <div key={review._id} className="space-y-4 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={cn(
                            "size-4",
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{review.user.first_name}{review.user.last_name ? ` ${review.user.last_name}` : ''}</span>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <Tick02Icon className="size-3" />
                        Verified Purchase
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 pt-2">
                      {review.images.map((img, i) => (
                        <div key={i} className="relative size-20 rounded-lg overflow-hidden border bg-gray-50">
                          <Image
                            src={img.url}
                            alt="Review attachment"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-full px-4 border-gray-200 text-[#003d29] font-semibold disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPage(i + 1)}
                      className={cn(
                        "size-8 rounded-full p-0 text-sm font-bold",
                        page === i + 1 ? "bg-[#003d29] text-white hover:bg-[#003d29]" : "text-gray-500 hover:text-[#003d29]"
                      )}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="rounded-full px-4 border-gray-200 text-[#003d29] font-semibold disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
