"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Product } from "@/hooks";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProductImageGalleryProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  product: Product;
};

const ProductImageGallery = ({ ref, product }: ProductImageGalleryProps) => {
  // Build array of all available images
  const allImages = [
    product.image,
    ...(product.images || []),
  ].filter((img): img is { url: string; display_url?: string } => !!img?.url);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      mainApi?.scrollTo(index);
    },
    [mainApi],
  );

  const handleSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {/* Main Image Carousel */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
        
        <Carousel
          setApi={(api) => {
            setMainApi(api);
            api?.on("select", () => handleSelect(api));
          }}
          className="w-full h-full"
          opts={{
            align: "start",
            loop: true,
            duration: 30,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="h-full">
            {allImages.map((img, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full aspect-square">
                  <Image
                    src={
                      img?.display_url || img?.url || "/placeholder.svg"
                    }
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {allImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md border-0" />
              <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md border-0" />
            </>
          )}
        </Carousel>

        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            -{product.discount}%
          </div>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {allImages.length > 1 && (
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: false,
            duration: 20,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-2">
            {allImages.map((img, index) => (
              <CarouselItem key={index} className="pl-2 basis-auto">
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    index === selectedIndex
                      ? "border-blue-600 ring-2 ring-blue-600/20"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img?.display_url || img?.url || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md border-0" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white shadow-md border-0" />
        </Carousel>
      )}
    </div>
  );
};

export { ProductImageGallery };
