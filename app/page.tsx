import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { CategoryRail } from "@/components/home/category-rail";
import { ProductSection } from "@/components/home/product-section";

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <CategoryRail />
      <ProductSection />
    </main>
  );
}
