import React, { useEffect } from 'react';
import { useState } from 'react';

const CategoryFilter = ({ products, setCategoryField }) => {
    const [categorys, setCategorys] = useState(['Fruits', 'Vegetables', 'Nuts'])
    const [selectCategory, setSelectCategory] = useState("")

    const [categorySelect, setCategorySelect] = useState({fruits: false, vegetables: false, nuts: false})

    const categoryChecked = (e) => {
        if(e.id === 'Fruits') {
            if(e.checked === true) {
                setCategorySelect({fruits: e.checked, vegetables: categorySelect.vegetables, nuts: categorySelect.nuts})
            }
            else {
                setCategorySelect({fruits: e.checked, vegetables: categorySelect.vegetables, nuts: categorySelect.nuts})
            }
        }
        if(e.id === 'Vegetables') {
            if(e.checked === true) {
                setCategorySelect({fruits: categorySelect.fruits, vegetables: e.checked, nuts: categorySelect.nuts})
            }
            else {
                setCategorySelect({fruits: categorySelect.fruits, vegetables: e.checked, nuts: categorySelect.nuts})
            }
        }
        if(e.id === 'Nuts') {
            if(e.checked === true) {
                setCategorySelect({fruits: categorySelect.fruits, vegetables: categorySelect.vegetables, nuts: e.checked})
            }
            else {
                setCategorySelect({fruits: categorySelect.fruits, vegetables: categorySelect.vegetables, nuts: e.checked})
            }
        }
    }

    useEffect(() => {
        setCategoryField(categorySelect)
    }, [categorySelect])
    
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
                            
                            <input onChange={(e) => categoryChecked(e.target)} id={cate} type="checkbox" className="w-5 h-5 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 outline-none" />
                            <label htmlFor={cate} className="ml-2 w-full text-sm font-medium text-gray-900 cursor-pointer">{cate}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryFilter;