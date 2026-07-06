"use client";

import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  code: string;
}

interface ProductVariantSelectorProps {
  sizes?: string[];
  colors?: ColorOption[];
  selectedSize: string | null;
  selectedColor: string | null;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export function ProductVariantSelector({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductVariantSelectorProps) {
  if ((!sizes || sizes.length === 0) && (!colors || colors.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Size Selector */}
      {sizes && sizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Size
            {selectedSize && (
              <span className="text-gray-500 font-normal ml-1">
                — {selectedSize}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onSizeChange(size)}
                className={cn(
                  "min-w-[44px] h-10 px-4 rounded-lg border-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  selectedSize === size
                    ? "border-[#003d29] bg-[#003d29] text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colors && colors.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Color
            {selectedColor && (
              <span className="text-gray-500 font-normal ml-1">
                — {selectedColor}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorChange(color.name)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  selectedColor === color.name
                    ? "border-[#003d29] bg-[#003d29]/5 shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400",
                )}
              >
                <span
                  className="inline-block w-5 h-5 rounded-full border border-gray-300 shrink-0"
                  style={{ backgroundColor: color.code }}
                  aria-hidden="true"
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}