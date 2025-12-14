import { OtherStores } from "@/components/product/other-stores";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { SaleBanner } from "@/components/product/sale-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ProductPage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-white">

            <div className="container mx-auto px-4 md:px-8 py-8 space-y-8">
                {/* Breadcrumb / Title placeholder */}
                <h1 className="text-2xl font-bold text-[#092929]">
                    All category / Bobs Red
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductGallery />
                    <ProductInfo />
                </div>

                <OtherStores />

                <SaleBanner />
            </div>
        </main>
    );
}
