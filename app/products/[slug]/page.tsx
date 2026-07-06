"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductSection } from "@/components/home/product-section";
import { ProductDetailsSkeleton } from "@/components/skeleton";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductDiscussion } from "@/components/product/product-discussion";
import { useCartAnimation } from "@/components/context/cart-animation-context";
import {
  useAddToCart,
  useProduct,
  useAddToWishlist,
  useRemoveFromWishlist,
  useGetWishlist,
} from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModalStore } from "@/store/auth-modal-store";
import { useCompareStore } from "@/store/compare-store";
import {
  ProductBreadcrumb,
  ProductImageGallery,
  ProductRating,
  ProductPriceInfo,
  ProductActions,
  ProductMetaInfo,
  DeliveryInfo,
  ProductDescription,
  ProductNotFound,
  ProductVariantSelector,
} from "@/components/product/product-details";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.slug as string;

  const { isAuthenticated, token } = useAuthStore();
  const addToCartMutation = useAddToCart(isAuthenticated ? token : null);
  const addToWishlistMutation = useAddToWishlist(
    isAuthenticated ? token : null,
  );
  const removeFromWishlistMutation = useRemoveFromWishlist(
    isAuthenticated ? token : null,
  );
  const { data: wishlist = [] } = useGetWishlist(
    isAuthenticated ? token : null,
  );

  const { startAnimation } = useCartAnimation();
  const { openAuthModal } = useAuthModalStore();
  const { addToCompare, isInCompare, removeFromCompare } = useCompareStore();
  const imageRef = useRef<HTMLDivElement>(null);

  // Fetch product using TanStack Query
  const { data: product, isLoading, error } = useProduct(productId);

  // Variant selection state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Build variant string for cart/order
  const getVariantString = (): string | undefined => {
    const parts: string[] = [];
    if (selectedSize) parts.push(`Size: ${selectedSize}`);
    if (selectedColor) parts.push(`Color: ${selectedColor}`);
    return parts.length > 0 ? parts.join(", ") : undefined;
  };

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
        variant: getVariantString(),
      });

      const targetRef = imageRef && imageRef.current;
      if (targetRef) {
        const rect = targetRef.getBoundingClientRect();
        const img = targetRef.querySelector("img");
        const originalUrl = img?.src || "/placeholder.svg";
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
    const variant = getVariantString();
    const params = new URLSearchParams();
    params.set("buyNow", productId);
    if (variant) params.set("variant", variant);
    router.push(`/checkout?${params.toString()}`);
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
      <ProductNotFound
        errorMessage={error?.message}
        message={error?.message || "Unable to load product details"}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Breadcrumb */}
        <ProductBreadcrumb productName={product.name} />

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <ProductImageGallery ref={imageRef} product={product} />

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <ProductRating rating={product.rating || 0} />

            {/* Weight info */}
            {product.weight && (
              <p className="text-sm text-gray-500">Weight: {product.weight}</p>
            )}

            {/* Price */}
            <ProductPriceInfo product={product} />

            {/* Color & Size Selector */}
            <ProductVariantSelector
              sizes={product.sizes}
              colors={product.colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />

            {/* Buttons + Additional Actions */}
            <ProductActions
              product={product}
              isWishlisted={isWishlisted}
              isCompared={isCompared}
              isPending={addToCartMutation.isPending} 
              isWishlistPending={addToWishlistMutation.isPending}
              isRemoveWishlistPending={removeFromWishlistMutation.isPending}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onWishlistToggle={handleWishlistToggle}
              onCompareToggle={handleCompareToggle}
            />

            {/* SKU and Categories */}
            <ProductMetaInfo product={product} />

            {/* Delivery & Daily Deal Info */}
            <DeliveryInfo />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <div className="border-b border-gray-200 mb-4">
            <TabsList variant="line" className="w-full sm:w-lg">
              <TabsTrigger
                className="cursor-pointer font-bold"
                value="description"
              >
                Description
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer font-bold" value="reviews">
                Reviews
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer font-bold"
                value="discussion"
              >
                Discussion
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="description">
            <ProductDescription description={product.description} />
          </TabsContent>
          <TabsContent value="reviews">
            <ProductReviews productId={product._id} />
          </TabsContent>
          <TabsContent value="discussion">
            <ProductDiscussion productId={product._id} />
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <ProductSection title="You might also like" />
      </div>
    </main>
  );
}