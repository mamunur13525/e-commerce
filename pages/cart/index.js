import Head from 'next/head'
import OrderDetails from '../../components/Cart/OrderDetails'
import Footer from '../../components/Shared/Footer/Footer'
import Navbar from '../../components/Shared/Navbar/Navbar'
import PageTitleSection from '../../components/Shared/PageTitleSection/PageTitleSection'
import CartTable from '../../components/Cart/CartTable'
import { categoryLists } from '../../FakeData/FakeData'
import ProductLists from '../../components/Shared/ProductLists/ProductLists'
import Button from '../../components/Shared/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function Home() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('Popular')

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
                    img='https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_3.jpg?v=83084458265994090391500869701'
                    title='YOUR SHOPPING CART'
                />
                <div className=" relative container mx-auto flex justify-between gap-5 mt-10 mb-20 min-h-[30rem]">
                    <div className="w-[70%]">
                        <CartTable />
                    </div>
                    <div className='w-[30%]'>
                        <OrderDetails />
                    </div>
                </div>
                <div className='container mx-auto mt-10 pb-10'>
                    <h1 className='text-4xl text-center'>Featured Products</h1>
                    <ul className='flex flex-wrap justify-center gap-10 mt-8 px-10'>
                        {
                            Array.isArray(categoryLists) && categoryLists.map(cat => (
                                <li onClick={() => setSelectedCategory(cat?.title)} key={cat?.id} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat?.title ? 'text-green-600 after:w-full' : ''}`}>{cat?.title}</li>
                            ))
                        }
                    </ul>
                    <div>
                        <ProductLists productClass='w-[200px] h-[250px] border-r ' selectedCategory={'All Products'} listProducts={null} />
                    </div>
                    <div className='flex justify-center mt-16'>
                        <Button clickFunc={() => router.push('/shop')} withBck={false} classAdd='max-w-fit px-20 uppercase'>
                            View All
                        </Button>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

