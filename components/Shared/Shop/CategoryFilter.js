import React from 'react';
import { GiFruitBowl, GiCarrot, GiPeanut } from 'react-icons/gi';

const categories = [
    { name: 'fruits', icon: GiFruitBowl },
    { name: 'vegetables', icon: GiCarrot },
    { name: 'nuts', icon: GiPeanut }
];

const CategoryFilter = ({ selectedCategories = [], handleFilter }) => {
    const categoryHandler = (value) => {
        const newCategories = selectedCategories.includes(value)
            ? selectedCategories.filter(category => category !== value)
            : [...selectedCategories, value];

        handleFilter({ name: 'cat', value: newCategories.length ? newCategories : null });
    };

    return (
        <div className='flex flex-col gap-2'>
            {categories.map(({ name, icon: Icon }) => (
                <label key={name} className="flex items-center p-2 rounded-md hover:bg-white cursor-pointer transition-colors group">
                    <input
                        onChange={() => categoryHandler(name)}
                        checked={selectedCategories.includes(name)}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 cursor-pointer bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <Icon className='ml-2 text-lg text-gray-600 group-hover:text-gray-800' />
                    <span className="ml-2 text-sm font-medium text-gray-700 capitalize group-hover:text-gray-900">{name}</span>
                </label>
            ))}
        </div>
    );
};

export default CategoryFilter;