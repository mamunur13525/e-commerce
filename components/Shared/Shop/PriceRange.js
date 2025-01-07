import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { queryStore } from '../../../store/createStore';

const PriceRange = ({ maxPrice, handleFilter, defaultPrice }) => {

    return (
        <>
            <p className='flex items-center justify-between'>
                <span>Price Range</span>
                {
                    defaultPrice != maxPrice ?
                        <span className='cursor-pointer' onClick={() => handleFilter({ name: 'price', value: null })}>clear</span>
                        :
                        null
                }
            </p>
            <div className='mt-2 flex items-center w-full gap-2 pl-2'>
                <span>$0</span>
                <input onChange={(e) => handleFilter({ name: 'price', value: parseInt(e.target.value) === maxPrice ? null : e.target.value })} min='1' max={maxPrice} type="range" name="rating" value={defaultPrice || maxPrice} className='bg-green-500 cursor-pointer' />
                <span>${defaultPrice}</span>
            </div>
        </>
    );
};

export default PriceRange;