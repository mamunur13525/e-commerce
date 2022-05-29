import Head from 'next/head'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import ProductView from '../../components/Products/ProductView'
import Slider from "react-slick";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { itemLists } from '../../FakeData/FakeData';
import { Product } from '../../components/Shared/ProductLists/ProductLists';

export default function ProductWithId() {
    const sliderSettings = {
        lazyLoad: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        Infinity: true,
        prevArrow: <MdOutlineArrowBackIosNew className='text-red-500' />,
        nextArrow: <MdArrowForwardIos className='text-red-500' />,
        responsive: [
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }

        ]
    };
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
                <Navbar />
                <ProductView />
                <div className='container mx-auto py-20'>
                    <h1 className='text-4xl text-center mb-10 '>Upsell Products</h1>
                    <Slider {...sliderSettings}>
                        {
                            itemLists.map(item => (
                                <div key={item.id}>
                                    <Product productClass={'w-[200px] h-[250px]'} key={Math.random()} item={item} />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <Footer />
            </main>
        </div>
    )
}

