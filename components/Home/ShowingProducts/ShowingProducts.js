import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import ProductLists from '../../Shared/ProductLists/ProductLists';
import toast from 'react-hot-toast';
import { Metadata } from '../../../store/createStore';
import Spinner from '../../Shared/Loader/Spinner';

const ShowingProducts = ({ classAdd = '', initialMetadata, initialProductsData }) => {
    const metadata = Metadata()
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [productsData, setProductsData] = useState(initialProductsData?.data || null)
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [allLoaded, setAllLoaded] = useState(initialProductsData?.allLoaded || false)
    const [limit, setLimit] = useState(10)
    const [categoryLists, setCategoryLists] = useState(initialMetadata?.categories ? ['all', ...initialMetadata.categories] : null)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if (metadata?.data) {
            setCategoryLists(['all', ...metadata?.data?.categories])
        }
    }, [metadata.data])

    useEffect(() => {
        // Only fetch if we don't have initial data OR if the user has interacted (changed category or offset)
        // We check if productsData matches initialProductsData to know if it's the first render with SSR data
        const isInitialRender = productsData === initialProductsData?.data && selectedCategory === 'all' && offset === 0;

        if (limit && !isInitialRender) {
            setLoading(true)
            setAllLoaded(false)
            try {
                setAnimate(false)
                fetch('/api/products-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ category: selectedCategory, offset: offset, limit: limit })
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result)
                        if (result.error) {
                            toast.error(result.error || 'Something went wrong.')
                        }
                        else {
                            if (productsData === null || offset === 0) {
                                setProductsData(result.data)
                            }
                            else {
                                setProductsData([...productsData, ...result.data])
                            }
                            setAnimate(true)
                            setAllLoaded(result.allLoaded)
                            setLoading(false)
                        }
                    })
            } catch (error) {
                toast.error(error.message)
            }
        }
    }, [selectedCategory, offset, limit, metadata?.data])

    return (
        <div className={`bg-white pt-10 lg:pt-28 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Latest Products</h1>
                <ul className='flex flex-wrap justify-center gap-x-5 sm:gap-x-10 gap-y-5 mt-8 px-10'>
                    {
                        Array.isArray(categoryLists) && categoryLists.map((cat, index) => (
                            <li onClick={() => {
                                if (selectedCategory !== cat) {
                                    setSelectedCategory(cat)
                                    setOffset(0)
                                    setProductsData(null)
                                }
                            }} key={index} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat ? 'text-green-600 after:w-full' : ''}`}>{cat}</li>
                        ))
                    }
                </ul>
                <div>
                    {productsData !== null && <ProductLists productClass='rounded-md' selectedCategory={selectedCategory} listProducts={null} data={productsData} animate={animate} />}
                </div>
                {
                    loading && <div className='flex justify-center mt-8 mb-8'><Spinner /></div>
                }
                {
                    !loading && (!allLoaded && <div onClick={() => setOffset(offset + limit || 0)} className='flex justify-center mt-16'>
                        <Button classAdd='max-w-fit px-20 uppercase' >
                            Show More
                        </Button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ShowingProducts;