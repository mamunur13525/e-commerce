import React from 'react';
import { TbSortDescending } from 'react-icons/tb'
import SelectList from '../SelectList/SelectList';
import { BsListTask, BsGrid3X3Gap } from 'react-icons/bs';

const TopFilter = ({ setSearch, itemLists, filter, sortDisplay, sortType, changeSortType }) => {
    
    return (
        <div className='flex flex-wrap justify-between items-center border-b bg-white p-4'>
            <p className='text-gray-500 text-lg'><span className='font-semibold text-green-500'>{itemLists?.length}</span> items found on search</p>
            {
                filter
            }
            <div className='flex items-center gap-3 '>
                <div className=' w-56'>
                    <SearchInput onChange={(e) => setSearch(e.target.value)} placeholder='Search...' type='search' name='product_name' customClass='!rounded !bg-white' />
                </div>
                {
                    sortDisplay && 
                    <div onClick={changeSortType} className='border border-slate-300 hover:bg-slate-100 duration-200 rounded cursor-pointer relative w-[43px] h-[43px]'>
                        {/* {
                            sortType === 'grid' ? <BsGrid3X3Gap className='p-2 w-10 h-10' /> : <BsListTask className='p-2 w-10 h-10' />
                        } */}
                        <BsGrid3X3Gap className={`p-2 w-[41.5px] h-[41.5px] absolute left-0 top-0 opacity-0 duration-200 ${sortType === 'grid' && 'opacity-100'}`} />
                        <BsListTask className={`p-2 w-[41.5px] h-[41.5px] absolute left-0 top-0 opacity-0 duration-200 ${sortType === 'detailed' && 'opacity-100'}`} />
                    </div>
                }
                <SelectList
                    title='Sort'
                    lists={[
                        'a-z ',
                        '1-100'
                    ]}
                />
            </div>

        </div>
    );
};

export default TopFilter;


const SearchInput = ({ onChange, placeholder = '', name = '', customClass = '', type = 'text', required = false }) => {
    return (
        <>
            <label htmlFor={name} className="mb-2 font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    onChange={onChange}
                    type={type}
                    id={name}
                    className={`block w-full px-4 py-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${customClass}`}
                    name={name}
                    placeholder={placeholder} required={required} />
            </div>
        </>

    )
}