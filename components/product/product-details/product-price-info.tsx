"use client";

import { getCurrencySymbol } from "@/lib/currency";
import type { Product } from "@/hooks";

interface ProductPriceInfoProps {
  product: Product;
}

export function ProductPriceInfo({ product }: ProductPriceInfoProps) {
  const displayPrice = product.final_price ??
    (product.discount && product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price);

  return (
    <div>
      {/* Price */}
      <div className="flex items-end gap-1">
        <span className="font-black text-2xl text-gray-900 mb-1">
          {getCurrencySymbol(product.currency)}
        </span>
        <span className="font-black text-5xl text-gray-900">
          {Math.floor(displayPrice)}
        </span>
        <span className="font-black text-2xl text-gray-900 mb-1">
          .{(displayPrice % 1).toFixed(2).split(".")[1]}
        </span>
      </div>

      {/* Discount Info */}
      {product.discount && product.discount > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-base text-gray-400 line-through">
            {getCurrencySymbol(product.currency)}
            {product.price.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-red-600">
            Save {getCurrencySymbol(product.currency)}
            {(product.price - displayPrice).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}