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
import Link from "next/link";
import type { HeroSlider } from "@/lib/types/metadata";

interface HeroProps {
  slides: HeroSlider[];
}

export function Hero({ slides }: HeroProps) {
  const heroslides = slides || [];

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section
      style={{ backgroundColor: heroslides[0]?.bg_color || "#003d29" }}
      className="relative text-white overflow-hidden "
    >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          duration: 60, // Smooth transition
          slidesToScroll: 1,
        }}
      >
        <CarouselContent>
          {heroslides.map((slide, index) => (
            <CarouselItem key={index}>
              <div style={{ backgroundColor: slide?.bg_color || "#003d29" }} className="md:pb-12">
                <HeroSlide
                  title={slide.title}
                  subtitle={slide.description}
                  imageSrc={slide.image_url}
                  ctaBtn={slide.cta_btn}
                  ctaLink={slide.cta_btn.link}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
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

interface HeroSlideProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  ctaBtn?: {
    color: string;
    text: string;
    bg_color: string;
  };
  bgColor?: string;
  ctaLink: string;
}

function HeroSlide({
  title,
  subtitle,
  imageSrc,
  ctaBtn,
  ctaLink,
}: HeroSlideProps) {
  const btnBgColor = ctaBtn?.bg_color || "#d4e157";
  const btnTextColor = ctaBtn?.color || "#003d29";
  const btnText = ctaBtn?.text || "Shop now";

  return (
    <div className="container mx-auto px-6 md:px-12 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col md:flex-row items-center gap-12 relative">
      <div className="absolute bottom-10 right-1/3 h-20 w-20 opacity-20"><svg viewBox="0 0 100 100" fill="none" stroke="white"><path d="M0 20 Q25 0 50 20 T100 20"></path><path d="M0 40 Q25 20 50 40 T100 40"></path><path d="M0 60 Q25 40 50 60 T100 60"></path></svg></div>
      <div className="absolute top-10 right-1/3 h-20 w-20 opacity-20"><svg viewBox="0 0 100 100" fill="none" stroke="white"><path d="M0 20 Q25 0 50 20 T100 20"></path><path d="M0 40 Q25 20 50 40 T100 40"></path><path d="M0 60 Q25 40 50 60 T100 60"></path></svg></div>
      <div className="absolute top-10 left-20 h-20 w-20 opacity-20"><svg viewBox="0 0 100 100" fill="none" stroke="white"><path d="M0 20 Q25 0 50 20 T100 20"></path><path d="M0 40 Q25 20 50 40 T100 40"></path><path d="M0 60 Q25 40 50 60 T100 60"></path></svg></div>
      {/* Text Content */}
      <div className="flex-1 space-y-6 z-10 animate-in fade-in slide-in-from-left-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white">
          {title.split(" ").slice(0, 3).join(" ")} <br />
          {title.split(" ").slice(3).join(" ")}
        </h1>
        <p className="text-lg md:text-xl max-w-lg text-gray-200">{subtitle}</p>
        <Link href={ctaLink || "#"}>
          <Button
            style={{
              backgroundColor: btnBgColor,
              color: btnTextColor,
            }}
            className="font-bold text-lg px-8 py-6 rounded-md shadow-lg transition-transform hover:scale-105"
          >
            {btnText}
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="flex-1 relative z-10 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
        <div className="relative w-full aspect-square">
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
