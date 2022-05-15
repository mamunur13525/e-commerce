import Head from 'next/head'
import Footer from '../components/Shared/Footer/Footer'
import FrontSlider from '../components/Shared/FrontSlider/FrontSlider'
import Navbar from '../components/Shared/Navbar/Navbar'
import ServicesSection from '../components/Home/ServicesSection/ServicesSection'

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="e-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-slate-100'>
        <Navbar />
        <FrontSlider />
        <ServicesSection />
        <Footer />
      </main>
    </div>
  )
}
