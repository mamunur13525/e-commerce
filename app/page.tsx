import { Hero } from "@/components/home/hero";
import { CategoryRail } from "@/components/home/category-rail";
import { DiscountGrid } from "@/components/home/discount-grid";
import { ProductSection } from "@/components/home/product-section";
import { PromoBanners } from "@/components/home/promo-banners";
import { FeaturedStore } from "@/components/home/featured-store";
import { ServicesSection } from "@/components/home/services-section";
import { DownloadAppBanner } from "@/components/home/download-app";

export default function Page() {
  return (
    <main className="bg-[#fafaf9] min-h-screen">
      <Hero />
      <CategoryRail />
      <ProductSection title="You might need" />
      <DiscountGrid />
      <ProductSection
        title="Weekly best selling items"
        isShowingCategoryFilter={true} />
      <DownloadAppBanner />
      <ProductSection title="You might need" />
      <FeaturedStore />
      <PromoBanners />
      <ProductSection title="You might need" />
      <ServicesSection />
    </main>
  );
}
