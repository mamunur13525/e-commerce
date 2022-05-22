import React, { useState } from 'react';
import Button from '../../Shared/Button';
import ProductLists from '../../Shared/ProductLists/ProductLists';

const FeaturedProducts = ({ classAdd = '' }) => {
    const [selectedCategory, setSelectedCategory] = useState('All Products')
    let categoryLists = [
        {
            id: 0,
            title: 'Popular'
        },
        {
            id: 1,
            title: 'New Arrival'
        },
        {
            id: 2,
            title: 'Special'
        },
        {
            id: 3,
            title: 'on Sale'
        },
        {
            id: 4,
            title: 'Top Rated'
        }
    ]
    return (
        <div className={`bg-white py-20 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Featured Products</h1>
                <ul className='flex justify-center gap-10 mt-8'>
                    {
                        categoryLists && categoryLists.map(cat => (
                            <li onClick={() => setSelectedCategory(cat?.title)} key={cat?.id} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat?.title ? 'text-green-600 after:w-full' : ''}`}>{cat?.title}</li>
                        ))
                    }
                </ul>
                <div>
                    <ProductLists productClass='w-[200px] h-[250px] border-r ' selectedCategory={selectedCategory} listProducts={null} />
                </div>
                <div className='flex justify-center mt-16'>
                    <Button classAdd='text-green-600 border border-[#80b435]  bg-white hover:bg-[#80b435] hover:text-white text-xl font-light py-2 w-[10rem]' >
                        View All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;