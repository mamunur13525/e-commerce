import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { queryStore } from '../../../store/createStore';

const PriceRange = ({ maxPrice, setFilterPrice }) => {
    const [priceRange, setPriceRange] = useState(100)
    const [max, setMax] = useState(maxPrice || 100)
    const queryData = queryStore((state) => (state.data))
    const queryRef = useRef(false)

    useEffect(() => {
        if(queryData?.price && queryRef.current === false) {
            setPriceRange(queryData.price)
            queryRef.current = true
        }
    }, [queryData?.price])

    useEffect(() => {
        // setFilterPrice(parseInt(priceRange))
        searchDebounce(parseInt(priceRange))
    }, [priceRange])

    useEffect(() => {
        setMax(maxPrice)
        if(priceRange === 100) {
            setPriceRange(maxPrice)
        }
    }, [maxPrice])

    const searchDebounce = useMemo(() => {
        return debounce(e => {
            setFilterPrice(e)
        }, 500);
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