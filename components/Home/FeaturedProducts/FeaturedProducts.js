import React, { useState } from 'react';
import { categoryLists } from '../../../FakeData/FakeData';
import Button from '../../Shared/Button';
import ProductLists from '../../Shared/ProductLists/ProductLists';

const FeaturedProducts = ({ classAdd = '' }) => {
    const [selectedCategory, setSelectedCategory] = useState('Popular')

    return (
        <div className={`bg-white lg:py-10 ${classAdd}`}>
            <div className='container mx-auto'>
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
                    <Button withBck={false} classAdd='max-w-fit px-20 uppercase'>
                        View All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;