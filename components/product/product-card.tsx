"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusSignIcon, Remove01Icon } from "hugeicons-react";
import { useCartAnimation } from "@/components/context/cart-animation-context";

interface ProductCardProps {
  title: string;
  subtitle: string;
  weight: string;
  price: number;
  imageSrc: string;
}

export function ProductCard({
  title,
  subtitle,
  weight,
  price,
  imageSrc,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const { startAnimation } = useCartAnimation();
  const imageRef = useRef<HTMLImageElement>(null);

  const handleIncrement = () => {
    if (quantity === 0 && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      startAnimation(imageSrc, rect);
    }
    setQuantity((p) => p + 1);
  };
  const handleDecrement = () => setQuantity((p) => Math.max(0, p - 1));

  // Generate a mock slug from the title
  const slug = title.toLowerCase().replace(/ /g, "-");

  return (
    <div className="bg-white shadow shadow-zinc-100 rounded-lg p-6 relative flex flex-col items-center text-center group ">
      {/* Badge or Tag area if needed */}

      {/* Image */}
      <Link href={`/products/${slug}`} className="relative w-52 h-52 mb-4 group-hover:scale-110 transition-transform duration-300 block">
        <Image ref={imageRef} src={imageSrc} alt={title} fill className="object-contain" />
      </Link>

      {/* Content */}
      <Link href={`/products/${slug}`} className="block">
        <h3 className="font-bold text-emerald-800 text-xl leading-tight hover:text-[#003d29] transition-colors">{title}</h3>
      </Link>
      <p className="font-semibold text-emerald-900 text-lg leading-tight hover:text-[#003d29] transition-colors my-1">{subtitle}</p>
      <p className="text-xs text-gray-400 mb-3">{weight}</p>

      <div className="font-black text-2xl text-[#003d29] mb-4">
        {price.toFixed(2)}
        <span className="text-sm font-normal text-gray-500">$</span>
      </div>

      {/* Action Button */}
      <div className="w-full mt-auto">
        {quantity === 0 ? (
          <Button
            onClick={handleIncrement}
            className="w-full h-14 bg-[#F2F4E9] hover:bg-[#d4e157] text-[#003d29] font-bold rounded-b-[50%] rounded-t-2xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <PlusSignIcon className="size-6" />
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-[#d4e157] rounded-xl p-1 shadow-inner w-full overflow-hidden">
            <button
              onClick={handleDecrement}
              className="p-3 bg-white/30 rounded-lg hover:bg-white/50 text-[#003d29] transition-colors animate-slide-out-left"
            >
              <Remove01Icon className="size-5" />
            </button>
            <span className="font-bold text-xl text-[#003d29] animate-in fade-in zoom-in duration-300">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-3 bg-white/30 rounded-lg hover:bg-white/50 text-[#003d29] transition-colors animate-slide-out-right"
            >
              <PlusSignIcon className="size-5" />
            </button>
          </div>

        )}
      </div>
    </div>
  );
}
