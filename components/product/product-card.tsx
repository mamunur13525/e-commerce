"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusSignIcon, Remove01Icon } from "hugeicons-react";
import { useCartAnimation } from "@/components/context/cart-animation-context";

import { StarIcon } from "hugeicons-react";
import { getCurrencySymbol } from "@/lib/currency";

interface ProductCardProps {
  title: string;
  price: number;
  imageSrc: string;
  id: string;
  rating?: number;
  quantity?: number;
  discount?: number;
  currency?: string;
}

export function ProductCard({
  title,
  price,
  imageSrc,
  id,
  rating = 0,
  quantity = 0,
  discount = 0,
  currency = "usd",
}: ProductCardProps) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const { startAnimation } = useCartAnimation();
  const imageRef = useRef<HTMLImageElement>(null);

  const handleIncrement = () => {
    if (cartQuantity === 0 && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      startAnimation(imageSrc, rect);
    }
    setCartQuantity((p) => p + 1);
  };
  const handleDecrement = () => setCartQuantity((p) => Math.max(0, p - 1));

  // Generate a mock slug from the title
  const slug = title.toLowerCase().replace(/ /g, "-");

  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;
  const currencySymbol = getCurrencySymbol(currency || "'");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist:`, title);
  };

  return (
    <div className="bg-white shadow shadow-zinc-100 rounded-lg p-4 relative flex flex-col items-start text-left group transition-all hover:shadow-lg h-full">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${id}`} className="relative w-full aspect-square mb-3 group-hover:scale-105 transition-transform duration-300 block self-center">
        <Image ref={imageRef} src={imageSrc} alt={title} fill className="object-contain" />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 left-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${isWishlisted
              ? 'bg-red-500 text-white shadow-lg scale-110'
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
            }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>

      {/* Content */}
      <Link href={`/products/${id}`} className="block w-full mb-1">
        <h3 className="font-bold text-gray-800 text-3xl leading-tight hover:text-[#003d29] transition-colors line-clamp-2 min-h-10" title={title}>{title}</h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mb">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`size-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}</span>
      </div>

      {/* Stock Info */}
      <div className="text-xs text-gray-500 mb-3">
        {quantity > 0 ? (
          <span className="text-green-600 font-medium">{quantity} in stock</span>
        ) : (
          <span className="text-red-500 font-medium">Out of stock</span>
        )}
      </div>

      {/* Price Section */}
      <div className="flex items-baseline gap-2 mb-4">
        <div className="flex items-baseline">
          <span className="text-sm font-normal text-gray-600">{currencySymbol}</span>
          <span className="font-black text-2xl text-[#003d29] ml-0.5">
            {discountedPrice.toFixed(2)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-baseline">
            <span className="text-xs text-gray-400 line-through">
              {currencySymbol}{price.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full mt-auto">
        {cartQuantity === 0 ? (
          <Button
            onClick={handleIncrement}
            className="w-full h-10 bg-[#F2F4E9] hover:bg-[#d4e157] text-[#003d29] font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-[#d4e157] rounded-lg p-1 shadow-inner w-full overflow-hidden h-10">
            <button
              onClick={handleDecrement}
              className="px-3 h-full bg-white/30 hover:bg-white/50 text-[#003d29] transition-colors flex items-center justify-center"
            >
              <Remove01Icon className="size-4" />
            </button>
            <span className="font-bold text-sm text-[#003d29]">{cartQuantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 h-full bg-white/30 hover:bg-white/50 text-[#003d29] transition-colors flex items-center justify-center"
            >
              <PlusSignIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
