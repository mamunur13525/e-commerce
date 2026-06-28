"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AdminProduct } from "@/hooks/api/admin";
import { Calendar01Icon, DollarCircleIcon, PackageIcon, RulerIcon, SwatchIcon, Tag01Icon } from "hugeicons-react";

interface ProductDetailsDrawerProps {
  product: AdminProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDrawer({
  product,
  open,
  onOpenChange,
}: ProductDetailsDrawerProps) {
  if (!product) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className=" w-full min-w-full sm:min-w-lg overflow-y-auto px-5 pb-5">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">{product.name}</SheetTitle>
          <SheetDescription>Product details and information</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
         <div className="space-y-4">
           {/* Main Image */}
          {product.image?.url && (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          )}

          {/* Additional Images */}
          {product.images && product.images.length > 0 && (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Gallery</h4>
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, idx) => (
                    img?.url && (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-gray-50">
                        <Image
                          src={img.url}
                          alt={`${product.name} image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 150px"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            </>
          )}

         </div>
          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ৳{product.final_price?.toFixed(2)}
              </span>
              {product.price > product.final_price && (
                <span className="text-lg text-gray-400 line-through">
                  ৳{product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description || "No description provided."}
            </p>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Tag01Icon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Category</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.category}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <PackageIcon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Stock</span>
              </div>
              <p className={`text-sm font-medium ${product.quantity <= 5 ? "text-red-500" : "text-gray-900"}`}>
                {product.quantity} units
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <DollarCircleIcon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Currency</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.currency}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <PackageIcon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Weight</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.weight || "N/A"}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar01Icon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Created</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatDate(product.createdAt)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar01Icon className="size-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Updated</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatDate(product.updatedAt)}</p>
            </div>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-1.5 text-gray-400 mb-2">
                  <RulerIcon className="size-3.5" />
                  <span className="text-xs font-medium uppercase tracking-wider">Sizes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="text-xs">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-1.5 text-gray-400 mb-2">
                  <SwatchIcon className="size-3.5" />
                  <span className="text-xs font-medium uppercase tracking-wider">Colors</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="size-5 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                      <span className="text-sm text-gray-700">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}