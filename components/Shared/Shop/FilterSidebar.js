import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import Button from '../Button';

const FilterSidebar = ({ maxPrice, setFilterPrice, setFilterRating, setFilterCategory, queryHandler }) => {
    return (
        <div className='flex flex-col gap-5'>
            <p className='mb-6 text-xl uppercase font-semibold'>Filter:</p>
            <div>
                <PriceRange maxPrice={maxPrice} setFilterPrice={setFilterPrice}/>
            </div>
            <div>
                <ColorFilter />
            </div>
            <div>
                <RatingFilter setFilterRating={setFilterRating}/>
            </div>
            <div>
                <CategoryFilter queryHandler={queryHandler} setFilterCategory={setFilterCategory}/>
            </div>
        </div>
    );
};

export default FilterSidebar;