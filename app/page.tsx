"use client";

import { Hero } from "@/components/home/hero";
import { CategoryRail } from "@/components/home/category-rail";
import { PromoBanners } from "@/components/home/promo-banners";
import { ProductSection } from "@/components/home/product-section";
import { DiscountGrid } from "@/components/home/discount-grid";
import { ServicesSection } from "@/components/home/services-section";
import { DownloadAppBanner } from "@/components/home/download-app";
import { useMetadata } from "@/hooks";
import { LoadingScreen } from "@/components/loading";
import { Suspense } from "react";

function HomeContent() {
  // Fetch metadata using TanStack Query
  const { data: metadata, isLoading } = useMetadata();

  console.log({ Categories: metadata?.categories })
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!metadata) {
    return null;
  }

  const categories = Array.isArray(metadata.categories) ? metadata?.categories : [];
  console.log({categories})
  return (
    <main className="bg-[#f4f6f6] min-h-screen">
      <Hero
        slides={Array.isArray(metadata.hero_slider) ? metadata.hero_slider : []}
      />
      {
        categories && categories?.length &&
        <CategoryRail
          categories={categories}
        />
      }
      <ProductSection title="You might need" />
      <PromoBanners offers={metadata.offers} />
      <ProductSection
        title="Weekly best selling items"
        isShowingCategoryFilter={true}
      />
      <DownloadAppBanner />
      <ProductSection title="You might need" />
      <DiscountGrid discountCards={metadata.discout_cards} />
      <ProductSection title="You might need" />
      <ServicesSection />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  );
}
