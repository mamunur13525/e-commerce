import React from 'react';
import { useState } from 'react';

const CategoryFilter = () => {
    const [categorys, setCategorys] = useState(['Men', 'Women', 'Other'])
    const [selectCategory, setSelectCategory] = useState("")
    return (
        <div>
            <p className='flex items-center justify-between mb-2'>
                <span>Category</span>
                {
                    selectCategory ?
                        <span className='cursor-pointer' onClick={() => setSelectCategory('')}>clear</span>
                        :
                        null
                }
            </p>
            <div className='flex flex-col gap-2 pl-2'>
                {
                    categorys.map(cate => (
                        <div key={cate} className="flex items-center w-full">
                            
                            <input  id={cate} type="checkbox" value="" className="w-5 h-5 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor={cate} className="ml-2 w-full text-sm font-medium text-gray-900 cursor-pointer dark:text-gray-300">{cate}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryFilter;