"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusSignIcon, Remove01Icon } from "hugeicons-react";

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

  const handleIncrement = () => setQuantity((p) => p + 1);
  const handleDecrement = () => setQuantity((p) => Math.max(0, p - 1));

  return (
    <div className="bg-white p-6 relative flex flex-col items-center text-center group border">
      {/* Badge or Tag area if needed */}

      {/* Image */}
      <div className="relative w-32 h-32 mb-4 group-hover:scale-105 transition-transform duration-300">
        <Image src={imageSrc} alt={title} fill className="object-contain" />
      </div>

      {/* Content */}
      <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
      <p className="text-sm text-gray-500 my-1">{subtitle}</p>
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
            className="w-full bg-gray-100 hover:bg-[#d4e157] text-gray-900 hover:text-[#003d29] font-bold py-6 rounded-xl transition-colors text-2xl"
          >
            <PlusSignIcon className="size-6" />
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-[#d4e157] rounded-xl p-1 shadow-inner">
            <button
              onClick={handleDecrement}
              className="p-3 bg-white/30 rounded-lg hover:bg-white/50 text-[#003d29] transition-colors"
            >
              <Remove01Icon className="size-5" />
            </button>
            <span className="font-bold text-xl text-[#003d29]">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-3 bg-white/30 rounded-lg hover:bg-white/50 text-[#003d29] transition-colors"
            >
              <PlusSignIcon className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
