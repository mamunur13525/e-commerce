"use client";

import { StarIcon } from "hugeicons-react";

interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`size-4 ${
              i < Math.floor(rating || 0)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700 ml-1">
        {rating?.toFixed(1)}
      </span>
    </div>
  );
}