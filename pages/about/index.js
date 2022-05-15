import Head from 'next/head'
import AboutMainSection from '../../components/About/AboutMainSection/AboutMainSection'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'


export default function Home() {

    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='bg-slate-100 h-screen'>
                <Navbar />
                <div className='bg-white grid place-items-center h-36 my-6'>
                    <h1 className='text-3xl font-bold '>About Us.</h1>
                </div>
                <AboutMainSection />
                <Footer />
            </main>
        </div>
    )
}
