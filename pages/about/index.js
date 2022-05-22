import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AboutMainSection from '../../components/About/AboutMainSection/AboutMainSection'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'

export default function Home() {
    const { pathname } = useRouter()
    const [pathAr, setPathAr] = useState([])

    useEffect(() => {
        setPathAr(pathname.split('/'))
        console.log(pathname.split('/'))
    }, [])

    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='bg-slate-100 h-screen'>
                <Navbar />
                <div className={`bg-white flex flex-col items-center justify-center h-48 bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779')]`}>
                    <h1 className='text-6xl uppercase font-serif text-white '>About Us.</h1>
                    <p className='text-white font-normal mt-3 text-xl'>
                        Home {pathAr.map((item, ind) => <span key={ind}>{item ===''? null: ` / ${item}`}</span>)}
                    </p>
                </div>
                <AboutMainSection />
                <Footer />
            </main>
        </div>
    )
}
