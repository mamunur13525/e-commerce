import debounce from 'lodash.debounce';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';

const PriceRange = ({ maxPrice, setFilterPrice }) => {
    const [priceRange, setPriceRange] = useState(maxPrice || 0)
    const [max, setMax] = useState(maxPrice || 100)

    useEffect(() => {
        // setFilterPrice(parseInt(priceRange))
        searchDebounce(parseInt(priceRange))
    }, [priceRange])

    useEffect(() => {
        setMax(maxPrice)
        setPriceRange(maxPrice)
    }, [maxPrice])

    const searchDebounce = useMemo(() => {
        return debounce(e => {setFilterPrice(e)}, 500);
    }, []);
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
                <span>$0</span>
                <input onChange={(e) => setPriceRange(e.target.value)} min='1' max={max} type="range" name="" id="" value={priceRange} className='bg-green-500 cursor-pointer' />
                <span>${priceRange}</span>
            </div>
        </>
    );
};

export default PriceRange;