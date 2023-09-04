import React, { useEffect } from 'react';
import { useState } from 'react';

const PriceRange = ({ maxPrice, products, setPriceData }) => {
    const [priceRange, setPriceRange] = useState(maxPrice)
    const [minMax, setMinMax] = useState({ low: 0, high: 100 })

    useEffect(() => {
        if(maxPrice && products) {
            const filteredData = products.filter(product => parseInt(product.base_price) <= parseInt(priceRange))
            setPriceData(filteredData)
        }
    }, [priceRange])

    useEffect(() => {
        if(maxPrice) {
            setMinMax({ low: 0, high: maxPrice })
            setPriceRange(maxPrice)
        }
    }, [maxPrice])
    return (
        <>
            <p className='flex items-center justify-between'>
                <span>Price Range</span>
                {
                    priceRange != maxPrice ?
                        <span className='cursor-pointer' onClick={() => setPriceRange(maxPrice)}>clear</span>
                        :
                        null
                }
            </p>
            <div className='mt-2 flex items-center w-full gap-2 pl-2'>
                <span>${minMax.low}</span>
                <input onChange={(e) => setPriceRange(e.target.value)} min={priceRange?.low} max={minMax?.high} type="range" name="" id="" value={priceRange} className='bg-green-500 cursor-pointer' />
                <span>${priceRange}</span>
            </div>
        </>
    );
};

export default PriceRange;