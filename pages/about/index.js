import { useEffect, useState } from 'react'
import Head from 'next/head'
import AboutMainSection from '../../components/About/AboutMainSection/AboutMainSection'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import ChoseUs from '../../components/Shared/ChoseUs/ChoseUs'

export default function Home() {

    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='h-full lg:h-screen'>
                <Navbar />
                <PageTitleSection />
                <AboutMainSection />
                <ChoseUs />
                <Footer />
            </main>
        </div>
    )
}
