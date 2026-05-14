"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight01Icon } from "hugeicons-react";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ProductCardSkeleton } from "@/components/skeleton";
import { useProducts } from "@/hooks";
import { Category } from "@/lib/types/metadata";
// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  },
};

interface SortByCategoryProductsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[]
}


function SortByCategoryProducts({ categories, activeCategory, onCategoryChange }: SortByCategoryProductsProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 mb-5">
      {categories.map((category) => (
        <Button
          key={category.slug}
          onClick={() => onCategoryChange(category.slug)}
          className={cn(
            "cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border duration-200",
            activeCategory === category.slug
              ? "hover:bg-[#003d29] bg-[#003d29] text-white   border-[#003d29]"
              : "shadow shadow-zinc-300/10 bg-white text-gray-600 hover:bg-gray-50  border-gray-100/50"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export function ProductSection({ categories, title, isShowingCategoryFilter = false }: { categories?: Category[]; title: string; isShowingCategoryFilter?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch products using TanStack Query
  const { data: allProducts = [], isLoading, error, refetch } = useProducts({
    category: activeCategory === "All" ? undefined : activeCategory,
    limit: 10
  });

  // Memoize filtered products to avoid unnecessary recalculations
  const products = useMemo(() => allProducts.slice(0, 10), [allProducts]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="container mx-auto px-4 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#003d29]">{title}</h2>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-red-700 font-semibol hover:gap-3 transition-all"
        >
          See more <ArrowRight01Icon className="size-4" />
        </Link>
      </div>
      <div>
        {
          isShowingCategoryFilter &&
          <SortByCategoryProducts categories={categories || []} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        }

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error.message || 'Failed to load products'}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-[#003d29] text-white rounded-lg hover:bg-[#002d1f] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {products.length > 0 ? (
                products.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                  >
                    <ProductCard
                      title={product.name}
                      price={product.price}
                      imageSrc={product.image.url}
                      rating={product.rating}
                      discount={product.discount}
                      quantity={product.quantity}
                      currency={product.currency}
                      id={product._id}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600">
                    {activeCategory !== "All"
                      ? `No products available in "${activeCategory}" category.`
                      : "No products available at the moment."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
