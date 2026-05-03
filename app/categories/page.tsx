"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { Suspense } from "react";
import { CategoriesSkeleton } from "@/components/skeleton";
import { useCategories } from "@/hooks";

function CategoriesContent() {
  // Fetch categories using TanStack Query
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  const displayCategories = categories && categories.length > 0 ? categories : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayCategories.map((category) => (
        <Link
          key={category.slug || category.name}
          href={`/shop?category=${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
          className={`group relative flex items-center justify-between p-8 rounded-3xl transition-all duration-300 shadow-md`}
          style={{ backgroundColor: category.color }}
        >
          <div className="flex flex-col z-10">
            <h3 className="text-2xl font-bold text-[#003d29] mb-2 group-hover:translate-x-1 transition-transform">
              {category.name}
            </h3>
            <p className="text-gray-600 font-medium mb-1">
              {category.subtitle}
            </p>
            <span className="text-sm text-gray-400">
              {category.count || 0} Products
            </span>
          </div>

          <div className="absolute right-6 bottom-4 text-[80px] leading-none group-hover:scale-110 group-hover:-rotate-3 transition-transform opacity-90 select-none">
            {category.icon}
          </div>

          <div className="absolute top-8 right-8 text-[#003d29] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
            <ArrowRight01Icon className="size-6" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="bg-white pt-12 pb-48">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[#003d29] mb-4">Browse Categories</h1>
          <p className="text-gray-500">
            Explore our wide selection of plants, tools, and accessories.
            Find exactly what you need to create your perfect green space.
          </p>
        </div>

        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesContent />
        </Suspense>
      </div>
    </div>
  );
}
