"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft01Icon, StarIcon, Delete02Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compare-store";
import { toast } from "sonner";
import { getCurrencySymbol } from "@/lib/currency";

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No Products to Compare
          </h1>
          <p className="text-gray-600 mb-6">
            Add products to compare by clicking the &quot;Compare&quot; button on any product page.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003d29] text-white rounded-lg hover:bg-[#002d1f] transition-colors"
          >
            <ArrowLeft01Icon className="size-5" />
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  // Define comparison rows
  const comparisonRows = [
    {
      label: "Image",
      render: (product: (typeof items)[0]) => (
        <div className="relative  items-center aspect-square bg-[#f4f6f6] rounded-lg overflow-hidden">
          <Image
            src={product.image.url || product.image.display_url || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
      ),
    },
    {
      label: "Name",
      render: (product: (typeof items)[0]) => (
        <Link
          href={`/products/${product._id}`}
          className="font-semibold text-gray-900 hover:text-[#003d29] transition-colors line-clamp-2"
        >
          {product.name}
        </Link>
      ),
    },
    {
      label: "Price",
      render: (product: (typeof items)[0]) => {
        const finalPrice = product.final_price ?? product.price;
        return (
          <div>
            <span className="text-lg font-bold text-gray-900">
              {getCurrencySymbol(product.currency)}{finalPrice.toFixed(2)}
            </span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                {getCurrencySymbol(product.currency)}{product.price.toFixed(2)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      label: "Rating",
      render: (product: (typeof items)[0]) => (
        <div className="flex items-center justify-center gap-1">
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
          <span className="text-sm text-gray-600 ml-1">
            {product.rating?.toFixed(1) || "N/A"}
          </span>
        </div>
      ),
    },
    {
      label: "Category",
      render: (product: (typeof items)[0]) => (
        <span className="text-sm text-gray-700 capitalize">{product.category}</span>
      ),
    },
    {
      label: "Weight",
      render: (product: (typeof items)[0]) => (
        <span className="text-sm text-gray-700">{product.weight || "N/A"}</span>
      ),
    },
    {
      label: "Discount",
      render: (product: (typeof items)[0]) => (
        <span className="text-sm text-gray-700">
          {product.discount && product.discount > 0
            ? `${product.discount}% OFF`
            : "No discount"}
        </span>
      ),
    },
    {
      label: "Stock",
      render: (product: (typeof items)[0]) => (
        <span
          className={`text-sm font-medium ${(product.quantity || 0) > 0 ? "text-green-600" : "text-red-600"
            }`}
        >
          {(product.quantity || 0) > 0
            ? `${product.quantity} in stock`
            : "Out of stock"}
        </span>
      ),
    },
    {
      label: "Store",
      render: (product: (typeof items)[0]) => {
        const storeName =
          typeof product.store === "string"
            ? product.store
            : product.store?.name || "N/A";
        const storeId =
          typeof product.store === "object" ? product.store?.id : undefined;
        return storeId ? (
          <Link
            href={`/vendors/${storeId}`}
            className="text-sm text-[#003d29] hover:underline font-medium"
          >
            {storeName}
          </Link>
        ) : (
          <span className="text-sm text-gray-700">{storeName}</span>
        );
      },
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#003d29]">
              Compare Products
            </h1>
            <p className="text-gray-500 mt-1">
              Comparing {items.length} product{items.length > 1 ? "s" : ""} (max 4)
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              clearCompare();
              toast.success("Compare list cleared");
            }}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Clear All
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-32 p-4 text-left text-sm font-semibold text-gray-500 bg-gray-50 rounded-tl-lg">
                  Feature
                </th>
                {items.map((product) => (
                  <th
                    key={product._id}
                    className="p-4 text-center min-w-[200px] bg-gray-50 last:rounded-tr-lg"
                  >
                    <div className="max-w-[200px]">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          removeFromCompare(product._id);
                          toast.success(`${product.name} removed from compare`);
                        }}
                        className="ml-auto text-gray-400 hover:text-red-500 hover:bg-red-50"
                        aria-label={`Remove ${product.name} from compare`}
                      >
                        <Delete02Icon className="size-4" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-gray-500 align-top">
                    {row.label}
                  </td>
                  {items.map((product) => (
                    <td
                      key={product._id}
                      className="p-4 text-center align-top justify-center "
                    >
                      <div className="max-w-[200px]">

                        {row.render(product)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {/* Action Row */}
              <tr>
                <td className="p-4"></td>
                {items.map((product) => (
                  <td key={product._id} className="p-4 text-center">
                    <div className="max-w-[200px]">
                      <Link
                        href={`/products/${product._id}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#003d29] text-white rounded-full text-sm font-semibold hover:bg-[#002d1f] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
