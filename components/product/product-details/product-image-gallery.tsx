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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

type ProductImageGalleryProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  product: Product;
};

const ProductImageGallery = ({ ref, product }: ProductImageGalleryProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  // Build array of all available images
  const allImages = [product.image, ...(product.images || [])].filter(
    (img): img is { url: string; display_url?: string } => !!img?.url,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [zoomApi, setZoomApi] = useState<CarouselApi | null>(null);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      mainApi?.scrollTo(index);
      zoomApi?.scrollTo(index);
    },
    [mainApi, zoomApi],
  );

  const handleSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const handleZoomImage = () => {
    setFullScreen(true);
  };

  // Sync zoom carousel when opened
  const handleZoomApi = useCallback((api: CarouselApi) => {
    if (api) {
      setZoomApi(api);
      api.scrollTo(selectedIndex, true);
      api.on("select", () => handleSelect(api));
    }
  }, [selectedIndex, handleSelect]);

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
                    src={img?.display_url || img?.url || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover cursor-zoom-in"
                    priority={index === 0}
                    onClick={handleZoomImage}
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

      {/* Zoom / Fullscreen Dialog */}
      <Dialog open={fullScreen} onOpenChange={setFullScreen}>
        <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-screen !h-screen !m-0 !p-0 !border-0 !rounded-none bg-black/95">
          {/* Close button */}
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close zoom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Zoom Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute top-4 left-4 z-50 bg-black/60 text-white text-sm font-medium px-3 py-1.5 rounded-full">
              {selectedIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Zoom Carousel - same look as main image */}
          <div className="flex items-center justify-center w-full h-full px-16">
            <Carousel
              setApi={handleZoomApi}
              className="w-full max-w-4xl"
              opts={{
                align: "start",
                loop: true,
                duration: 30,
                slidesToScroll: 1,
                startIndex: selectedIndex,
              }}
            >
              <CarouselContent className="h-full">
                {allImages.map((img, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative w-full max-h-[85vh] aspect-square mx-auto">
                      <Image
                        src={img?.display_url || img?.url || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border-0 text-white" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border-0 text-white" />
                </>
              )}
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { ProductImageGallery };