"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { ProductCard } from "@/components/product/product-card";

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

export function ProductSection() {
  return (
    <section className="container mx-auto px-6 md:px-12 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#003d29]">You might need</h2>
        <Link
          href="#"
          className="flex items-center gap-2 text-red-700 font-semibol hover:gap-3 transition-all"
        >
          See more <ArrowRight01Icon className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {PRODUCTS.map((product, idx) => (
          /* Using placeholders for now, images need generation or assets */
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
}
