import { OtherStores } from "@/components/product/other-stores";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { SaleBanner } from "@/components/product/sale-banner";
import { ProductSection } from "@/components/home/product-section";

export default function ProductPage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
                <h1 className="text-2xl font-bold text-[#092929]">
                    All category / Bobs Red
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductGallery />
                    <ProductInfo />
                </div>
                <OtherStores />
                <SaleBanner />
                <ProductSection title="You might need" />
            </div>
        </main>
    );
}
