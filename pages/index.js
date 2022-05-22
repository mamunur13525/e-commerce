import Head from 'next/head'
import Footer from '../components/Shared/Footer/Footer'
import FrontSlider from '../components/Shared/FrontSlider/FrontSlider'
import Navbar from '../components/Shared/Navbar/Navbar'
import ShowingProducts from '../components/Home/ShowingProducts/ShowingProducts'
import BlogSection from '../components/BlogSection/BlogSection'
import SubscribeModal from '../components/Shared/SubscribeModal/SubscribeModal'
import ChoseUs from '../components/Shared/ChoseUs/ChoseUs'
import SalesOffer from '../components/Home/SalesOffer/SalesOffer'
import FeaturedProducts from '../components/Home/FeaturedProducts/FeaturedProducts'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Garden Shop</title>
        <meta name="description" content="e-commerce" />
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
      </Head>
      <main className=''>
        <SubscribeModal />
        <Navbar />
        <FrontSlider />
        <ShowingProducts classAdd='mt-20' />
        <SalesOffer />
        <ChoseUs />
        <FeaturedProducts  classAdd='mt-20' />
        <BlogSection />
        <Footer />
      </main>
    </div>
  )
}

