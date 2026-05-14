"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StarIcon, ArrowLeft01Icon, Loading03Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { ProductSection } from "@/components/home/product-section";
import { FeaturedStore } from "@/components/home/featured-store";
import { useCartAnimation } from "@/components/context/cart-animation-context";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductDetailsSkeleton } from "@/components/skeleton";
import { toast } from "sonner";
import {
  useAddToCart,
  useProduct,
  useAddToWishlist,
  useRemoveFromWishlist,
  useGetWishlist,
  type Product,
} from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModalStore } from "@/store/auth-modal-store";
import { useCompareStore } from "@/store/compare-store";
import { getCurrencySymbol } from "@/lib/currency";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductDiscussion } from "@/components/product/product-discussion";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.slug as string;

  const { isAuthenticated, token } = useAuthStore();
  const addToCartMutation = useAddToCart(isAuthenticated ? token : null);
  const addToWishlistMutation = useAddToWishlist(isAuthenticated ? token : null);
  const removeFromWishlistMutation = useRemoveFromWishlist(isAuthenticated ? token : null);
  const { data: wishlist = [] } = useGetWishlist(isAuthenticated ? token : null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { startAnimation } = useCartAnimation();
  const { openAuthModal } = useAuthModalStore();
  const { addToCompare, isInCompare, removeFromCompare } = useCompareStore();
  const imageRef = useRef<HTMLImageElement>(null);

  // Fetch product using TanStack Query
  const { data: product, isLoading, error } = useProduct(productId);

  const isWishlisted = wishlist.some((item) => item._id === productId);
  const isCompared = product ? isInCompare(product._id) : false;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId,
        quantity: 1,
      });

      const targetRef = imageRef && imageRef.current;
      if (targetRef) {
        const rect = targetRef.getBoundingClientRect();
        const originalUrl = decodeURIComponent(
          targetRef.src.split("url=")[1].split("&")[0],
        );
        startAnimation(originalUrl, rect);
      }
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart",
      );
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    router.push(`/checkout?buyNow=${productId}`);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (isWishlisted) {
      removeFromWishlistMutation.mutate(productId, {
        onSuccess: () => {
          toast.success("Removed from wishlist");
        },
      });
    } else {
      addToWishlistMutation.mutate(productId, {
        onSuccess: () => {
          toast.success("Added to wishlist");
        },
      });
    }
  };

  const handleCompareToggle = () => {
    if (!product) return;

    if (isCompared) {
      removeFromCompare(product._id);
      toast.success(`${product.name} removed from compare`);
    } else {
      const { items } = useCompareStore.getState();
      if (items.length >= 4) {
        toast.error("You can compare up to 4 products at a time");
        return;
      }
      addToCompare(product);
      toast.success(`${product.name} added to compare`, {
        action: {
          label: "View Compare",
          onClick: () => router.push("/compare"),
        },
      });
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {error?.message === "Product not found"
              ? "Product Not Found"
              : "Oops! Something went wrong"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.message || "Unable to load product details"}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003d29] text-white rounded-lg hover:bg-[#002d1f] transition-colors"
          >
            <ArrowLeft01Icon className="size-5" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const finalPrice = product.final_price ?? product.price;
  const discountedPrice =
    product.discount && product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
  const displayPrice = product.final_price ?? discountedPrice;

  const allImages = [product.image, ...(product.images || [])];
  const storeName =
    typeof product.store === "string"
      ? product.store
      : product.store?.name || "Unknown Store";
  const storeId =
    typeof product.store === "object" ? product.store?.id : undefined;

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#003d29]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#003d29]">
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-square bg-[#f4f6f6] rounded-lg overflow-hidden cursor-zoom-in p-8 "
              onClick={() => setIsPreviewOpen(true)}
            >
              {product.discount && product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full z-10 shadow-md">
                  -{product.discount}% OFF
                </div>
              )}
              <Image
                ref={imageRef}
                key={selectedImage}
                src={
                  allImages[selectedImage]?.url ||
                  allImages[selectedImage]?.display_url ||
                  product.image.url
                }
                alt={product.name}
                fill
                className="object-contain animate-in fade-in duration-300  overflow-hidden"
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
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Store Name */}
            {storeId ? (
              <Link
                href={`/vendors/${storeId}`}
                className="text-sm text-[#003d29] hover:underline font-medium"
              >
                {storeName}
              </Link>
            ) : (
              <p className="text-sm text-gray-500">{storeName}</p>
            )}

            <div>
              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`size-4 ${i < Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-1">
                {product.rating?.toFixed(1)}
              </span>
            </div>

            {/* Weight info */}
            {product.weight && (
              <p className="text-sm text-gray-500">Weight: {product.weight}</p>
            )}

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

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleAddToCart}
                className="flex-1 h-14 border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold rounded-full cursor-pointer"
                disabled={addToCartMutation.isPending}
              >
                {addToCartMutation.isPending ? (
                  <Loading03Icon className="w-5 h-5 animate-spin" />
                ) : (
                  "Add to bucket"
                )}
              </Button>
              <Button
                onClick={handleBuyNow}
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
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                )}
                onClick={handleWishlistToggle}
                disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
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
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                )}
                onClick={handleCompareToggle}
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

            {/* SKU and Categories */}
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
              {storeId && (
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">Store:</span>
                  <Link
                    href={`/vendors/${storeId}`}
                    className="text-[#003d29] ml-2 hover:underline font-medium"
                  >
                    {storeName}
                  </Link>
                </div>
              )}
            </div>

            {/* Delivery & Daily Deal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-1">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Free Delivery{" "}
                    <span className="font-normal text-gray-500">Apply To</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    All Order Over $100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-1">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Great Daily Deal{" "}
                    <span className="font-normal text-gray-500">We</span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Providing Organic Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Description */}
          <div className="mb-5 w-full">
            <h4 className="font-semibold text-2xl text-gray-900 border-b py-2 mb-2 w-full">Product details</h4>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div></div>


        <div className="grid grid-cols-1 gap-4">
          <ProductReviews productId={product._id} />
          <ProductDiscussion productId={product._id} />
        </div>

        <FeaturedStore />

        {/* Related Products */}
        <ProductSection title="You might also like" />
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full bg-black/95 flex items-center justify-center rounded-xl">
            <Image
              key={selectedImage}
              src={
                allImages[selectedImage]?.url ||
                allImages[selectedImage]?.display_url ||
                product.image.url
              }
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
    </main>
  );
}
