import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { queryStore } from '../../../store/createStore';

const categories = ['fruits', 'vegetables', 'nuts']
const CategoryFilter = ({ selectedCategories = [], handleFilter }) => {

    const categoryHandler = (value) => {
        let newCategories = [];

        if (selectedCategories.includes(value)) {
            newCategories = selectedCategories.filter(category => category !== value);
        } else {
            newCategories = [...selectedCategories, value];
        }

        if (newCategories[0]) {
            handleFilter({ name: 'cat', value: newCategories })
        } else {
            handleFilter({ name: 'cat', value: null })
        }
    };

    return (
        <div>
            <p className='flex items-center justify-between mb-2'>
                <span>Category</span>
                {
                    selectedCategories[0] &&
                    <span className='cursor-pointer' onClick={() => handleFilter({ name: 'cat', value: null })}>clear</span>
                }
            </p>
            <div className='flex flex-col gap-2 pl-2'>
                {
                    categories.map(cate => (
                        <div key={cate} className="flex items-center w-full">

                            <input onChange={(e) => categoryHandler(e.target.name)}
                                checked={
                                    selectedCategories.includes(cate)
                                }
                                name={cate} id={cate} type="checkbox" className="w-5 h-5 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 outline-none" />
                            <label htmlFor={cate} className="ml-2 w-full text-sm font-medium text-gray-900 cursor-pointer capitalize">{cate}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryFilter;