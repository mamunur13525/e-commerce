"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

// Categories Data
const CATEGORIES = [
  "Frozen food",
  "Vegetables",
  "Snacks",
  "Chicken",
  "Meat & Ball",
  "Dairy & Milk",
  "Chocolate",
  "Fruits",
];

function SortByCategoryProducts() {
  const [activeCategory, setActiveCategory] = useState("Frozen food");

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
      {CATEGORIES.map((category) => (
        <Button

          key={category}
          onClick={() => setActiveCategory(category)}
          className={cn(
            "cursor-pointer px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border duration-200",
            activeCategory === category
              ? "hover:bg-[#003d29] bg-[#003d29] text-white   border-[#003d29]"
              : "shadow shadow-zinc-300/10 bg-white text-gray-600 hover:bg-gray-50  border-gray-100/50"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

// Mock Data
const PRODUCTS = [
  {
    title: "Beetroot",
    subtitle: "(Local shop)",
    weight: "500 gm.",
    price: 17.29,
    imageSrc: "/placeholder-beet.png",
  },
  {
    title: "Italian Avocado",
    subtitle: "(Local shop)",
    weight: "500 gm.",
    price: 12.29,
    imageSrc: "/placeholder-avocado.png",
  },
  {
    title: "Szam amm",
    subtitle: "(Process food)",
    weight: "500 gm.",
    price: 14.29,
    imageSrc: "/placeholder-dumplings.png",
  },
  {
    title: "Beef Mixed",
    subtitle: "(Cut Bone)",
    weight: "500 gm.",
    price: 16.29,
    imageSrc: "/placeholder-meat.png",
  },
  {
    title: "Cold drinks",
    subtitle: "(Sprite)",
    weight: "500 gm.",
    price: 18.29,
    imageSrc: "/placeholder-sprite.png",
  },
];

export function ProductSection({ title, isShowingCategoryFilter = false }: { title: string; isShowingCategoryFilter?: boolean }) {
  return (
    <section className="container mx-auto px-6 md:px-12 pb-24">
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
          <SortByCategoryProducts />
        }

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {PRODUCTS.map((product, idx) => (
            /* Using placeholders for now, images need generation or assets */
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
