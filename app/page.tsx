"use client";

import { Hero } from "@/components/home/hero";
import { CategoryRail } from "@/components/home/category-rail";
import { PromoBanners } from "@/components/home/promo-banners";
import { ProductSection } from "@/components/home/product-section";
import { DiscountGrid } from "@/components/home/discount-grid";
import { ServicesSection } from "@/components/home/services-section";
import { ConnectWithUs } from "@/components/home/connect-with-us";
import { FAQSection } from "@/components/home/faq-section";
import { useMetadata } from "@/hooks";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading/animated-loading-icon";

function HomeContent() {
  // Fetch metadata using TanStack Query
  const { data: metadata, isLoading } = useMetadata();

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!metadata) {
    return null;
  }

  const categories = Array.isArray(metadata.categories)
    ? metadata?.categories
    : [];

  return (
    <main className="bg-[#f4f6f6] min-h-screen">
      <Hero
        slides={Array.isArray(metadata.hero_slider) ? metadata.hero_slider : []}
      />
      {categories && categories?.length && (
        <CategoryRail categories={categories} />
      )}
      <ProductSection title="You might need" />
      <PromoBanners offers={metadata.offers} />
      <ProductSection
        categories={categories}
        title="Weekly best selling items"
        isShowingCategoryFilter={true}
      />
      <ConnectWithUs />
      <ProductSection title="You might need" />
      <DiscountGrid discountCards={metadata.discout_cards} />
      <ProductSection title="You might need" />
      <ServicesSection />
      <FAQSection />
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
