import React from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';

const FilterSidebar = () => {

    return (
        <div className='flex flex-col gap-5'>
            <div>
                <PriceRange />
            </div>
            <div>
                <ColorFilter />
            </div>
            <div>
                <RatingFilter />
            </div>
            <div>
                <CategoryFilter />
            </div>
        </div>
    );
};

export default FilterSidebar;