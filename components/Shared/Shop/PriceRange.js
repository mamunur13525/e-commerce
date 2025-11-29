import React from 'react';

const PriceRange = ({ maxPrice, handleFilter, defaultPrice }) => {
    const currentPrice = defaultPrice || maxPrice;

    return (
        <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
                <span className='font-medium text-gray-700'>$0</span>
                <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold'>${currentPrice}</span>
                <span className='font-medium text-gray-700'>${maxPrice}</span>
            </div>
            <input
                onChange={(e) => handleFilter({ name: 'price', value: parseInt(e.target.value) === maxPrice ? null : e.target.value })}
                min='0'
                max={maxPrice}
                type="range"
                value={currentPrice}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
            />
        </div>
    );
};

export default PriceRange;