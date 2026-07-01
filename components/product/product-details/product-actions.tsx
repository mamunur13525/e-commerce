"use client";

import { Loading03Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/hooks";

interface ProductActionsProps {
  product: Product;
  isWishlisted: boolean;
  isCompared: boolean;
  isPending: boolean;
  isWishlistPending: boolean;
  isRemoveWishlistPending: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onWishlistToggle: () => void;
  onCompareToggle: () => void;
}

export function ProductActions({
  product,
  isWishlisted,
  isCompared,
  isPending,
  isWishlistPending,
  isRemoveWishlistPending,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  onCompareToggle,
}: ProductActionsProps) {
  return (
    <>
      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onAddToCart}
          className="flex-1 h-14 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold rounded-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <Loading03Icon className="w-5 h-5 animate-spin" />
          ) : (
            "Add to bucket"
          )}
        </Button>
        <Button
          onClick={onBuyNow}
          className="flex-1 h-14 bg-[#003d29] hover:bg-[#003d29] text-white font-semibold rounded-full cursor-pointer"
          disabled={(product.quantity || 0) === 0}
        >
          {(product.quantity || 0) === 0 ? "Out of Stock" : "Buy now"}
        </Button>
      </div>

      {/* Additional Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg",
            isWishlisted
              ? "text-red-600 bg-red-50 hover:text-red-700 hover:bg-red-100"
              : "text-gray-700 hover:text-red-600 hover:bg-red-50",
          )}
          onClick={onWishlistToggle}
          disabled={isWishlistPending || isRemoveWishlistPending}
        >
          <svg
            className="w-5 h-5"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg",
            isCompared
              ? "text-blue-600 bg-blue-50 hover:text-blue-700 hover:bg-blue-100"
              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50",
          )}
          onClick={onCompareToggle}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>{isCompared ? "In Compare" : "Compare"}</span>
        </Button>
      </div>

      {/* Stock Status */}
      {(product.quantity || 0) > 0 && (
        <div className="flex items-center gap-2 text-sm pt-2">
          <span className="text-red-600">🔥</span>
          <span className="text-red-600 font-medium">
            {product.quantity} items left in stock
          </span>
        </div>
      )}
    </>
  );
}