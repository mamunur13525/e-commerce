import Head from 'next/head'
import Footer from '../components/Shared/Footer/Footer'
import FrontSlider from '../components/Shared/FrontSlider/FrontSlider'
import Navbar from '../components/Shared/Navbar/Navbar'
import ShowingProducts from '../components/Home/ShowingProducts/ShowingProducts'
import BlogSection from '../components/BlogSection/BlogSection'
import ChoseUs from '../components/Shared/ChoseUs/ChoseUs'
import SalesOffer from '../components/Home/SalesOffer/SalesOffer'
import FeaturedProducts from '../components/Home/FeaturedProducts/FeaturedProducts'

export default function Home({ initialMetadata, initialProductsData }) {
  return (
    <div>
      <Head>
        <title>Garden Shop</title>
        <meta name="description" content="e-commerce" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
      </Head>
      <main className=''>
        {/* <SubscribeModal /> */}
        <Navbar />
        <FrontSlider />
        <ShowingProducts initialMetadata={initialMetadata} initialProductsData={initialProductsData} />
        <SalesOffer />
        <ChoseUs
          image='https://cdn.shopify.com/s/files/1/2179/9295/files/images-choose_grande.jpg?v=1500449615'
          title='Why Choose Us'
          description={`The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.`}
        />
        <FeaturedProducts />
        <BlogSection />
        <Footer />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const { connectMongoDB } = require('../lib/mongodb');
  const Metadata = require('../models/metadata').default;
  const Product = require('../models/product').default;

  await connectMongoDB();

  let initialMetadata = null;
  let initialProductsData = null;

  try {
    const metadataResult = await Metadata.find();
    if (metadataResult && metadataResult.length > 0) {
      initialMetadata = JSON.parse(JSON.stringify(metadataResult[0]));
    }

    const limit = 10;

    const productsResult = await Product.find()
      .sort({ updatedAt: -1 })
      .limit(limit);

    const allLoaded = productsResult.length < limit;

    initialProductsData = {
      data: JSON.parse(JSON.stringify(productsResult)),
      allLoaded: allLoaded
    };

  } catch (error) {
    console.error("Error fetching initial data:", error);
  }

  return {
    props: {
      initialMetadata: initialMetadata || {},
      initialProductsData: initialProductsData || { data: [], allLoaded: false },
    },
  };
}

