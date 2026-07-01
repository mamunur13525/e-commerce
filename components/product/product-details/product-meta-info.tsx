"use client";

import type { Product } from "@/hooks";

interface ProductMetaInfoProps {
  product: Product;
}

export function ProductMetaInfo({ product }: ProductMetaInfoProps) {
  return (
    <div className="space-y-2 pt-4 border-t">
      <div className="text-sm">
        <span className="font-semibold text-gray-900">SKU:</span>
        <span className="text-gray-600 ml-2">
          {product._id.slice(-8).toUpperCase()}
        </span>
      </div>
      <div className="text-sm">
        <span className="font-semibold text-gray-900">Categories:</span>
        <span className="text-gray-600 ml-2">{product.category}</span>
      </div>
      {product.weight && (
        <div className="text-sm">
          <span className="font-semibold text-gray-900">Weight:</span>
          <span className="text-gray-600 ml-2">{product.weight}</span>
        </div>
      )}
    </div>
  );
}