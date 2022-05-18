import React, { useState } from 'react';
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
    return (
        <div className={`bg-white py-20 ${classAdd}`}>
            <div className='container mx-auto'>
                <h1 className='text-4xl text-center'>Latest Products</h1>
                <ul className='flex justify-center gap-10 mt-8'>
                    {
                        categoryLists && categoryLists.map(cat => (
                            <li onClick={() => setSelectedCategory(cat?.title)} key={cat?.id} className={`text-base hover:text-green-600 uppercase cursor-pointer after:h-[1.8px] after:block after:bg-green-600 after:w-[0] hover:after:w-full after:transition-all ${selectedCategory === cat?.title ? 'text-green-600 after:w-full' : ''}`}>{cat?.title}</li>
                        ))
                    }
                </ul>
                <div>
                    <ProductLists />
                </div>
            </div>
        </div>
    );
};

export default ShowingProducts;