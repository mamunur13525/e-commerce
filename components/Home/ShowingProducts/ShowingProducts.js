import React, { useState } from 'react';
import Button from '../../Shared/Button';
import ProductLists from '../../Shared/ProductLists/ProductLists';

const ShowingProducts = ({ classAdd = '' }) => {
    const [selectedCategory, setSelectedCategory] = useState('All Products')
    let categoryLists = [
        {
            id: 0,
            title: 'All Products'
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
        {
            id: 4,
            title: 'Other products'
        }
    ]

    console.log('render  the  components')
    return (
        <div className={`bg-white md:mt-20 py-10 md:py-20 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Latest Products</h1>
                <ul className='flex flex-wrap justify-center gap-x-10 gap-y-5 mt-8 px-10'>
                    {
                        Array.isArray(categoryLists) && categoryLists.map(cat => (
                            <li onClick={() => setSelectedCategory(cat?.title)} key={cat?.id} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat?.title ? 'text-green-600 after:w-full' : ''}`}>{cat?.title}</li>
                        ))
                    }
                </ul>
                <div>
                    <ProductLists productClass='w-[200px] md:w-[250px] h-[250px] md:h-[265px]' selectedCategory={selectedCategory} listProducts={null} />
                </div>
                <div className='flex justify-center mt-16'>
                    <Button classAdd='max-w-fit px-20 uppercase' >
                        View All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowingProducts;