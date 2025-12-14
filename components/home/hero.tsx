"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative bg-[#003d29] text-white overflow-hidden pb-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          duration: 60, // Smooth transition
        }}
      >
        <CarouselContent>
          {/* ID 1 */}
          <CarouselItem>
            <HeroSlide
              title="We bring the store to your door"
              subtitle="Get organic produce and sustainably sourced groceries delivery at up to 4% off grocery."
              imageSrc="/hero_grocery_bag.png"
            />
          </CarouselItem>
          {/* ID 2 - Duplicate for demo effect */}
          <CarouselItem>
            <HeroSlide
              title="Fresh Vegetables Every Day"
              subtitle="Farm fresh vegetables delivered directly to your doorstep within minutes."
              imageSrc="/hero_grocery_bag.png" // Reusing image for now, typically would change
            />
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" /> */}
      </Carousel>

      {/* Curved Divider */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C240 80 1200 80 1440 0V120H0V0Z"
            fill="#FAFAF9" // match body bg (neutral-50)
          />
        </svg>
      </div>
    </section>
  );
}

function HeroSlide({
  title,
  subtitle,
  imageSrc,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
}) {
  return (
    <div className="container mx-auto px-6 md:px-12 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col md:flex-row items-center gap-12">
      {/* Text Content */}
      <div className="flex-1 space-y-6 z-10 animate-in fade-in slide-in-from-left-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
          {title.split(" ").slice(0, 3).join(" ")} <br />
          {title.split(" ").slice(3).join(" ")}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-lg">{subtitle}</p>
        <Button className="bg-[#d4e157] hover:bg-[#c0cc4b] text-[#003d29] font-bold text-lg px-8 py-6 rounded-md shadow-lg transition-transform hover:scale-105">
          Shop now
        </Button>
      </div>

      {/* Hero Image */}
      <div className="flex-1 relative z-10 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src={imageSrc}
            alt="Fresh Groceries"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
