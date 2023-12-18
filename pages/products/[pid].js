import Head from 'next/head'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'
import ProductView from '../../components/Products/ProductView'
import Slider from "react-slick";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { itemLists } from '../../FakeData/FakeData';
import { Product } from '../../components/Shared/ProductLists/ProductLists';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Shared/Loader/Spinner';



export async function getServerSideProps({params}) {
    const res = await fetch('http://localhost:3000/api/single-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId: params.pid})
    })
    const productData = await res.json()

    const similarProductsRes = await fetch('http://localhost:3000/api/similar-products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: productData.category, offset: 0, limit: 10})
    })
    const similarProductsData = await similarProductsRes.json()
    
    return { props: { productData, pid: params.pid, similarProductsData: similarProductsData.data, allLoaded: similarProductsData.allLoaded } }
}

export default function ProductWithId({productData, pid, similarProductsData, allLoaded: primaryAllLoaded}) {
    const router = useRouter()
    const [similarProducts, setSimilarProducts] = useState(similarProductsData || [])
    const [offset, setOffset] = useState(0)
    const [loadMore, setLoadMore] = useState(false)
    const [allLoaded, setAllLoaded]= useState(primaryAllLoaded || false)
    console.log(similarProducts)

    useEffect(() => {
        if(similarProductsData) {
            setSimilarProducts(similarProductsData)
            setOffset(0)
            setAllLoaded(primaryAllLoaded)
        }
        else {
            setSimilarProducts([])
            setOffset(0)
        }
    }, [pid])

    const loadMoreHandler = (e) => {
        e.preventDefault()

        if(productData?.category) {
            setLoadMore(true)
            const newOffset = offset + 10
            try {
                fetch('/api/similar-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({category: productData.category, offset: newOffset, limit: 10})
                })
                .then(res => res.json())
                .then( result => {
                    setSimilarProducts([...similarProducts, ...result.data])
                    setAllLoaded(result.allLoaded)
                    setOffset(newOffset)
                    setLoadMore(false)
                })
            } catch (error) {
                setLoadMore(false)
                alert('Something went wrong.')
            }
        }
    }

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
                <ProductView productData={productData} />
                <div className='container mx-auto py-20'>
                    <h1 className='text-4xl text-center mb-10 underline '>Similar Products</h1>
                    {/* <Slider {...sliderSettings}>
                        {
                            Array.isArray(itemLists) && itemLists.map(item => (
                                <div key={item.id}>
                                    <Product productClass={'w-[200px] h-[250px]'} key={Math.random()} item={item} />
                                </div>
                            ))
                        }
                    </Slider> */}
                    <div className='flex flex-wrap justify-center'>
                        {
                            similarProducts?.map(product => <Product productClass={'w-[18%] h-[280px]'} key={Math.random()} item={product} />)
                        }
                    </div>
                    <div className='w-full flex justify-center mt-2'>
                        {
                            loadMore ? <Spinner/> : !allLoaded && <button onClick={loadMoreHandler} className='px-5 py-2 text-white bg-green-500 rounded-sm'>Load More</button> 
                        }
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

