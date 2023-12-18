import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { queryStore } from '../../../store/createStore';

const CategoryFilter = ({ setFilterCategory, queryHandler }) => {
    const queryRef = useRef(false)
    const queryData = queryStore((state) => (state.data))
    const [categorys, setCategorys] = useState(['fruits', 'vegetables', 'nuts'])

    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        if(queryData?.cat && queryRef.current === false) {
            if(Array.isArray(queryData.cat)) {
                setSelectedCategory([...queryData.cat])
            }
            else {
                setSelectedCategory([queryData.cat])
            }
            queryRef.current = true
        }
    }, [queryData?.cat])

    const categoryChecked = (e) => {
        const name = e.name
        const index = selectedCategory.findIndex(cat => cat === name)
        if(index === -1) {
            setSelectedCategory([...selectedCategory, name])
        }
        else {
            const newData = [...selectedCategory]
            newData.splice(index, 1)
            setSelectedCategory(newData)
        }
    }

    useEffect(() => {
        if(selectedCategory[0]) {
            queryHandler({name: 'cat', value: [...selectedCategory]})
            setFilterCategory(selectedCategory)
        }
        else {
            queryHandler({name: 'cat', value: null})
            setFilterCategory(categorys)
        }
    }, [selectedCategory])
    
    return (
        <div>
            <p className='flex items-center justify-between mb-2'>
                <span>Category</span>
                {
                    selectedCategory[0] &&
                        <span className='cursor-pointer' onClick={() => setSelectedCategory([])}>clear</span>
                }
            </p>
            <div className='flex flex-col gap-2 pl-2'>
                {
                    categorys.map(cate => (
                        <div key={cate} className="flex items-center w-full">
                            
                            <input onChange={(e) => categoryChecked(e.target)} 
                            checked={
                                selectedCategory.includes(cate)
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