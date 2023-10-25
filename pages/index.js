import Head from "next/head";
import BlogSection from "../components/BlogSection/BlogSection";
import BannerSection from "../components/Home/BannerSection/BannerSection";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";
import SalesOffer from "../components/Home/SalesOffer/SalesOffer";
import ShowingProducts from "../components/Home/ShowingProducts/ShowingProducts";
import ChoseUs from "../components/Shared/ChoseUs/ChoseUs";
import Footer from "../components/Shared/Footer/Footer";
import MainHeroSection from "../components/Shared/MainHeroSection/MainHeroSection";
import Navbar from "../components/Shared/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Garden Shop</title>
        <meta name="description" content="e-commerce" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="icon"
          href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg"
        />
      </Head>
      <main className="">
        {/* <SubscribeModal /> */}
        <Navbar />
        <MainHeroSection />

        <div className="pt-16">
          <BannerSection />
        </div>
        <ShowingProducts />
        <SalesOffer />
        <ChoseUs
          image="https://cdn.shopify.com/s/files/1/2179/9295/files/images-choose_grande.jpg?v=1500449615"
          title="Why Choose Us"
          description={`The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.`}
        />
        <FeaturedProducts />
        <BlogSection />
        <Footer />
      </main>
    </div>
  );
}
