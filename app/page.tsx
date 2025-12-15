import { Hero } from "@/components/home/hero";
import { CategoryRail } from "@/components/home/category-rail";
import { DiscountGrid } from "@/components/home/discount-grid";
import { ProductSection } from "@/components/home/product-section";
import { PromoBanners } from "@/components/home/promo-banners";
import { FeaturedStore } from "@/components/home/featured-store";
import { ServicesSection } from "@/components/home/services-section";
import { DownloadAppBanner } from "@/components/home/download-app";
import type { Metadata as MetadataType } from "@/lib/types/metadata";

async function fetchMetadata(): Promise<MetadataType> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/metadata`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch metadata: ${res.status}`);
    }
    const data = await res.json();
    console.log("Fetched metadata:", data);
    return data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
}

export default async function Page() {
  const metadata = await fetchMetadata();
console.log({metadata})
  return (
    <main className="bg-[#f4f6f6] min-h-screen">
      <Hero
        slides={[metadata.hero_slider]}
      />
      <CategoryRail />
      <ProductSection title="You might need" />
      <DiscountGrid
        offers={metadata.offers}
      />
      <ProductSection
        title="Weekly best selling items"
        isShowingCategoryFilter={true}
      />
      <DownloadAppBanner />
      <ProductSection title="You might need" />
      <FeaturedStore />
      <PromoBanners
        discountCards={metadata.discout_cards}
      />
      <ProductSection title="You might need" />
      <ServicesSection />
    </main>
  );
}
