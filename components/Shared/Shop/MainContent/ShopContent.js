import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { itemLists } from '../../../../FakeData/FakeData';
import { Product } from '../../ProductLists/ProductLists';
import FilterSidebar from '../FilterSidebar';
import TopFilter from '../TopFilter';
import Sidebar from '../../SideBar/Sidebar';
import { GiSettingsKnobs } from "react-icons/gi";
import DetailedProduct from '../../DetailedProduct/DetailedProduct';


const ShopContent = () => {
    const [filterData, setFilterData] = useState([])
    const [search, setSearch] = useState('');
    const [sortType, setSortType] = useState('grid')

    const changeSortType = () => {
        if(sortType === 'grid') {
            setSortType('detailed')
        }
        else if(sortType === 'detailed') {
            setSortType('grid')
        }
    }

    useEffect(() => {
        if (search) {
            const filter = itemLists.filter(itm => itm.item_name.toLowerCase().includes(search.toLowerCase()))
            setFilterData([...filter])
        } else {
            setFilterData([...itemLists])
        }
    }, [search])

    return (
        <div className='flex justify-between gap-2'>
            <div className='w-[380px] h-fit bg-white p-3 pb-8 border-r shadow hidden md:block'>
                <FilterSidebar products={itemLists} setFilterData={setFilterData} />
            </div>
            <div className='w-full bg-white'>
                <TopFilter sortType={sortType} changeSortType={changeSortType} sortDisplay={true} setSearch={setSearch} itemLists={filterData} filter={<Sidebar btnName={<div className='flex text-lg items-center'>Filter <GiSettingsKnobs className='ml-2' /></div>} btnClass="text-2xl p-1 rounded-sm hover:bg-slate-200 duration-200" data={<FilterSidebar products={itemLists} setFilterData={setFilterData} />}  />} />
                <div className='flex flex-wrap sm:justify-evenly justify-center mt-8'>
                    {
                        Array.isArray(filterData) &&
                            filterData.length ? filterData.map(item => (
                                sortType === 'grid' ?
                                <Product productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={Math.random()} item={item} />
                                :
                                <DetailedProduct productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={Math.random()} item={item} />
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