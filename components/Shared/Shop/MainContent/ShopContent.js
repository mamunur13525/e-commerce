import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { itemLists } from '../../../../FakeData/FakeData';
import { Product } from '../../ProductLists/ProductLists';
import FilterSidebar from '../FilterSidebar';
import TopFilter from '../TopFilter';


const ShopContent = () => {
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search) {
            const filter = itemLists.filter(itm => itm.item_name.toLowerCase().includes(search.toLowerCase()))
            setFilterData([...filter])
        } else {
            setFilterData([...itemLists])
        }
    }, [search])

    return (
        <div className=' bg-green-200 flex justify-between gap-2'>
            <div className='w-[380px] h-fit bg-white p-3 pb-8 border-r shadow'>
                <p className='mb-6 text-xl uppercase'>Filter:</p>
                <FilterSidebar />
            </div>
            <div className='w-full bg-white'>
                <TopFilter setSearch={setSearch} itemLists={filterData} />
                <div className='flex flex-wrap sm:justify-evenly justify-center mt-8'>
                    {
                        Array.isArray(filterData) &&
                            filterData.length ? filterData.map(item => (
                                <Product productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={Math.random()} item={item} />
                            ))
                            :
                            'No Products Found!'
                    }
                </div>
            </div>
        </div>
    );
};

export default ShopContent;