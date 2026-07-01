"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Product } from "@/hooks";

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery = forwardRef<HTMLImageElement, ProductImageGalleryProps>(
  function ProductImageGallery({ product }, imageRef) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const allImages = [product.image, ...(product.images || [])];

  const getImageUrl = (idx: number) => {
    return (
      allImages[idx]?.url ||
      allImages[idx]?.display_url ||
      product.image.url
    );
  };

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square bg-[#f4f6f6] rounded-lg overflow-hidden cursor-zoom-in p-8"
        onClick={() => setIsPreviewOpen(true)}
      >
        {product.discount && product.discount > 0 ? (
          <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full z-10 shadow-md">
            -{product.discount}% OFF
          </div>
        ) : null}
        <Image
          ref={imageRef}
          key={selectedImage}
          src={getImageUrl(selectedImage)}
          alt={product.name}
          fill
          className="object-contain animate-in fade-in duration-300 overflow-hidden"
        />

        {/* Navigation Buttons - Bottom Right */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <Button
              type="button"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1,
                );
              }}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1,
                );
              }}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {allImages.map((img, idx) => (
            <Button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "relative w-20 h-20 shrink-0 rounded-lg overflow-hidden transition-all bg-[#f4f6f6] cursor-pointer border-2 hover:bg-[#f4f6f6]",
                selectedImage === idx
                  ? "border-[#0c762e]"
                  : "border-transparent",
              )}
            >
              <Image
                src={img?.url || img?.display_url || product.image.url}
                alt={`${product.name} ${idx + 1}`}
                fill
                className="object-contain p-2"
              />
            </Button>
          ))}
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full bg-black/95 flex items-center justify-center rounded-xl">
            <Image
              key={selectedImage}
              src={getImageUrl(selectedImage)}
              alt={product.name}
              fill
              className="object-contain animate-in fade-in duration-300"
            />

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev === 0 ? allImages.length - 1 : prev - 1,
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all z-50"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev === allImages.length - 1 ? 0 : prev + 1,
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all z-50"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-50">
                  {selectedImage + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});
