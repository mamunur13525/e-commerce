import Head from 'next/head'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import WishList from '../../components/WishList/WishList'


export default function Home() {
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
                <Navbar />
                <PageTitleSection
                    img='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779'
                    title='WISH LIST'
                />
                <div className="container mx-auto">
                    <div className="container mx-auto">
                        <WishList />
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

