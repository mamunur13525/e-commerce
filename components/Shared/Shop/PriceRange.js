import React from 'react';
import { useState } from 'react';

const PriceRange = () => {
    const [priceRange, setPriceRange] = useState(0)
    const [minMax, setMinMax] = useState({ low: 0, high: 100 })


    console.log({ priceRange })
    return (
        <>
            <p className='flex items-center justify-between'>
                <span>Price Range</span>
                {
                    priceRange ?
                        <span className='cursor-pointer' onClick={() => setPriceRange(0)}>clear</span>
                        :
                        null
                }
            </p>
            <div className='mt-2 flex items-center w-full gap-2 pl-2'>
                <span>{minMax.low}</span>
                <input onChange={(e) => setPriceRange(e.target.value)} min={priceRange?.low} max={minMax?.high} type="range" name="" id="" value={priceRange} className='bg-green-500 cursor-pointer' />
                <span>{minMax?.high}</span>
            </div>
        </>
    );
};

export default PriceRange;