import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import AboutMainSection from '../../components/About/AboutMainSection/AboutMainSection'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import ChoseUs from '../../components/Shared/ChoseUs/ChoseUs'
import Farmer from '../../components/About/Farmers/Farmer'
import { CartItemsContext } from '../_app'

export default function Home() {
    const [cartItems,setCartItems] =  useContext(CartItemsContext);
    console.log({cartItems})
    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <main className='h-full lg:h-screen'>
                <Navbar />
                <PageTitleSection
                    img='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779'
                    title='About Us.'
                />
                <AboutMainSection />
                <div className='bg-gray-50'>
                    <ChoseUs
                        title='Why Choose Us'
                        image='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/choose_us_image.png?v=170831453923618876001500869385'
                    />
                </div>
                <Farmer />
                <Footer />
            </main>
        </div>
    )
}
