"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { HeroSlider } from "@/lib/types/metadata";
import { ArrowRight01Icon, Money01Icon, TruckIcon } from "hugeicons-react";
import HeroSlide from "./hero/hero-slide";
import Link from "next/dist/client/link";

interface HeroProps {
  slides: HeroSlider[];
}

export function Hero({ slides }: HeroProps) {
  const heroslides = slides || [];

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section className="relative overflow-hidden py-5 container mx-auto flex flex-col lg:flex-row gap-5">
      {/* Main Carousel - full width on mobile, flex-1 on desktop */}
      <div className="w-full lg:flex-1">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            duration: 60,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="h-full py-2">
            {heroslides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <HeroSlide imageSrc={slide.image_url} link={slide.link} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

      {/* Sidebar Promo Cards - side-by-side on mobile, stacked on desktop */}
      <div className="w-full lg:w-1/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-5 py-2">
        <CashOnDeliveryShopCard />
        <NationwideDeliveryCard />
      </div>
    </section>
  );
}

const CashOnDeliveryShopCard = () => {
  return (
    <div className="relative overflow-hidden rounded-[24px]  bg-linear-to-br from-pink-100 to-pink-200 p-4 sm:p-6 lg:p-8 shadow-xl shadow-red-700/10 border border-white/40 group">
      {/* Background Glow - hidden on mobile */}
      <div className="hidden sm:block absolute right-0 top-1/2 h-40 sm:h-56 w-40 sm:w-56 -translate-y-1/2 rounded-full bg-red-500/4c0 blur-[90px]" />

      <div className="relative z-10 flex h-full items-center justify-between gap-2 sm:gap-3">
        <div className="max-w-40 sm:max-w-60">
          <h2 className="text-sm sm:text-lg lg:text-2xl font-bold leading-5 sm:leading-6 text-gray-900">
            100% Cash on Delivery
          </h2>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
            Pay in cash when your order arrives
          </p>

          <Link href="/shop" className="w-fit mt-4 sm:mt-6 lg:mt-8 flex items-center gap-1 rounded-full bg-white px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-semibold shadow-md shadow-red-600/10 transition hover:scale-105 text-black">
            Shop now
            <ArrowRight01Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="border p-1 sm:p-1.5 border-transparent group-hover:border-red-700/30 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105 shrink-0">
          <div className="relative z-14 flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-linear-to-br from-red-500 to-red-600 shadow-[0_20px_50px_rgba(255,0,70,.45)]">
            <Money01Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const NationwideDeliveryCard = () => {
  return (
    <div className="relative overflow-hidden rounded-[24px]  bg-linear-to-br from-sky-100 to-blue-100 p-4 sm:p-6 lg:p-8 shadow-xl shadow-blue-500/10 border border-white/40 group">
      {/* Background Glow - hidden on mobile */}
      <div className="hidden sm:block absolute right-0 top-1/2 h-40 sm:h-56 w-40 sm:w-56 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[90px]" />

      <div className="relative z-10 flex h-full items-center justify-between gap-2 sm:gap-3">
        <div className="max-w-40 sm:max-w-60">
          <h2 className="text-sm sm:text-lg lg:text-2xl font-bold leading-5 sm:leading-6 text-slate-900">
            Nationwide Delivery
          </h2>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">
            Fast delivery across Bangladesh
          </p>

          <Link href="/shop" className="w-fit mt-4 sm:mt-6 lg:mt-8 flex items-center gap-1 rounded-full bg-white px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-semibold shadow-md shadow-blue-600/10 transition hover:scale-105 text-black">
            Shop now
            <ArrowRight01Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="border p-1 sm:p-1.5 border-transparent group-hover:border-blue-700/30 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105 shrink-0">
          <div className="relative rounded-xl border border-blue-400/30 bg-linear-to-br from-blue-400 to-blue-700 p-1 sm:p-2 shadow-[0_20px_50px_rgba(59,130,246,.45)]">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-[16px] sm:rounded-[24px] bg-linear-to-br from-blue-500/50 to-blue-700/40">
              <TruckIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
