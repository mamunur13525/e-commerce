import Head from 'next/head'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

export default function Home() {

    return (
        <div>
            <Head>
                <title>E-Commerce</title>
                <meta name="description" content="e-commerce" />
                <link rel="icon" href="https://i.pinimg.com/736x/70/c0/ba/70c0baafea00b9b892d084e7202d0c61.jpg" />
            </Head>
            <main className='h-full lg:h-screen'>
                <Navbar />
                <PageNotFound />
                <Footer />
            </main>
        </div>
    )
}



const PageNotFound = () => {    
    return (
        <section className='pb-20'>
            <div className='text-center flex  justify-center flex-col  items-center'>
                <div>
                    <img src="https://demo.alura-studio.com/orgafresh/wp-content/themes/orgafresh/assets/images/404.jpg" alt="" />
                </div>
                <h1 className='uppercase text-5xl font-bold'>Page not found</h1>
                <p className='text-2xl mt-5'>Can't find what you need? Take a moment and do a search below!</p>
            </div>
        </section>

    )
}
