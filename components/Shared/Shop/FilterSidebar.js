import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import { useRouter } from 'next/navigation';

const FilterSidebar = ({ data, queries, setQueries, fetchFilterData }) => {

    const handleFilter = (data) => {
        let newQueries = { ...queries };

        if (data.value === null) {
            delete newQueries[data.name];
        } else {
            newQueries[data.name] = data.value;
        }

        setQueries(newQueries)
        fetchFilterData(0, true, newQueries)
    };
    return (
        <div className='flex flex-col gap-5'>
            <p className='mb-6 text-xl uppercase font-semibold'>Filter:</p>
            <div>
                <PriceRange maxPrice={data.maxPrice} handleFilter={handleFilter} defaultPrice={queries.price || data.maxPrice} />
            </div>
            <div>
                <ColorFilter />
            </div>
            <div>
                <RatingFilter defaultRating={queries.rate} handleFilter={handleFilter}/>
            </div>
            <div>
                <CategoryFilter selectedCategories={queries.cat} handleFilter={handleFilter}/>
            </div>
        </div>
    );
};

export default FilterSidebar;