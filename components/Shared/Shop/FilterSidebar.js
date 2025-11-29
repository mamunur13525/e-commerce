import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { BiFilterAlt } from 'react-icons/bi';

const FilterSidebar = ({ data, queries, setQueries, fetchFilterData }) => {
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        rating: true,
        category: true,
        color: false
    });

    const handleFilter = (data) => {
        let newQueries = { ...queries };
        if (data.value === null) {
            delete newQueries[data.name];
        } else {
            newQueries[data.name] = data.value;
        }
        setQueries(newQueries);
        fetchFilterData(0, true, newQueries);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const hasActiveFilters = queries.price || queries.rate !== undefined || queries.cat?.length > 0;

    const clearAllFilters = () => {
        setQueries({});
        fetchFilterData(0, true, {});
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between mb-2 pb-3 border-b'>
                <div className='flex items-center gap-2'>
                    <BiFilterAlt className='text-2xl text-gray-700' />
                    <h2 className='text-xl font-bold text-gray-800'>Filters</h2>
                </div>
                {hasActiveFilters && (
                    <button onClick={clearAllFilters} className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
                        Clear All
                    </button>
                )}
            </div>

            <FilterSection title="Price Range" isExpanded={expandedSections.price} onToggle={() => toggleSection('price')}>
                <PriceRange maxPrice={data.maxPrice} handleFilter={handleFilter} defaultPrice={queries.price || data.maxPrice} />
            </FilterSection>

            <FilterSection title="Rating" isExpanded={expandedSections.rating} onToggle={() => toggleSection('rating')}>
                <RatingFilter defaultRating={queries.rate} handleFilter={handleFilter} />
            </FilterSection>

            <FilterSection title="Category" isExpanded={expandedSections.category} onToggle={() => toggleSection('category')}>
                <CategoryFilter selectedCategories={queries.cat} handleFilter={handleFilter} />
            </FilterSection>

            <FilterSection title="Color" isExpanded={expandedSections.color} onToggle={() => toggleSection('color')}>
                <ColorFilter />
            </FilterSection>
        </div>
    );
};

const FilterSection = ({ title, children, isExpanded, onToggle }) => (
    <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors'>
        <button onClick={onToggle} className='flex items-center justify-between w-full mb-3'>
            <h3 className='font-semibold text-gray-800'>{title}</h3>
            {isExpanded ? <MdExpandLess className='text-xl' /> : <MdExpandMore className='text-xl' />}
        </button>
        {isExpanded && <div className='mt-2'>{children}</div>}
    </div>
);

export default FilterSidebar;