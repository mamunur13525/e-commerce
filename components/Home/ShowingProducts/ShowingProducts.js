import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import ProductLists from '../../Shared/ProductLists/ProductLists';
import toast from 'react-hot-toast';

const ShowingProducts = ({ classAdd = '' }) => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [productsData, setProductsData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [allLoaded, setAllLoaded] = useState(false)

    let categoryLists = [
        {
            id: 0,
            title: 'All'
        },
        {
            id: 1,
            title: 'fruits'
        },
        {
            id: 2,
            title: 'vegetables'
        },
        {
            id: 3,
            title: 'nuts'
        },
    ]

    useEffect(() => {
        setLoading(true)
        setAllLoaded(false)
        try {
            fetch('/api/products-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({category: selectedCategory, offset: offset})
            })
            .then(res => res.json())
            .then(result => {
                if(result.error) {
                    toast.error(result.error || 'Something went wrong.')
                }
                else {
                    if(productsData === null) {
                        setProductsData(result.data)
                    }
                    else {
                        setProductsData([...productsData, ...result.data])
                    }
                    setAllLoaded(result.allLoaded)
                    setLoading(false)
                }
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [selectedCategory, offset])

    return (
        <div className={`bg-white md:mt-20 py-10 md:py-20 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Latest Products</h1>
                <ul className='flex flex-wrap justify-center gap-x-10 gap-y-5 mt-8 px-10'>
                    {
                        Array.isArray(categoryLists) && categoryLists.map(cat => (
                            <li onClick={() => {
                                setSelectedCategory(cat?.title)
                                setOffset(0)
                                setProductsData(null)
                            }} key={cat?.id} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat?.title ? 'text-green-600 after:w-full' : ''}`}>{cat?.title}</li>
                        ))
                    }
                </ul>
                {
                    loading && <span className='text-center block mt-2 mb-2 text-lg'>Loading...</span>
                }
                <div>
                    {productsData !== null && <ProductLists productClass='w-[200px] md:w-[250px] h-[250px] md:h-[265px]' selectedCategory={selectedCategory} listProducts={null} data={productsData} />}
                </div>
                {
                    !loading && (!allLoaded && <div onClick={() => setOffset(offset + 10)} className='flex justify-center mt-16'>
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