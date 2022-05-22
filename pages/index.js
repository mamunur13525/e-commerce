import Head from 'next/head'
import Footer from '../components/Shared/Footer/Footer'
import FrontSlider from '../components/Shared/FrontSlider/FrontSlider'
import Navbar from '../components/Shared/Navbar/Navbar'
import ShowingProducts from '../components/Home/ShowingProducts/ShowingProducts'
import BlogSection from '../components/BlogSection/BlogSection'
import SubscribeModal from '../components/Shared/SubscribeModal/SubscribeModal'
import ChoseUs from '../components/Shared/ChoseUs/ChoseUs'


export default function Home() {

  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="e-commerce" />
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <SubscribeModal />
        <Navbar />
        <FrontSlider />
        <ShowingProducts classAdd='mt-20' />
        <ChoseUs />
        <BlogSection />
        <Footer />
      </main>
    </div>
  )
}

