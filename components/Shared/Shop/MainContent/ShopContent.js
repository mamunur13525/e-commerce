import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { itemLists } from '../../../../FakeData/FakeData';
import { Product } from '../../ProductLists/ProductLists';
import FilterSidebar from '../FilterSidebar';
import TopFilter from '../TopFilter';
import { GiSettingsKnobs } from "react-icons/gi";
import DetailedProduct from '../../DetailedProduct/DetailedProduct';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../Loader/Spinner';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Sidebar from '../../Sidebar/Sidebar';
import { twMerge } from 'tailwind-merge';


const ShopContent = ({ data, queries }) => {
    const router = useRouter()
    const [error, setError] = useState(data.message || null)

    const [productsData, setProductsData] = useState(data)
    const [sortType, setSortType] = useState('grid')
    const [offset, setOffset] = useState(0)
    const [allLoaded, setAllLoaded] = useState(data.allLoaded || false)
    const [loading, setLoading] = useState(false)
    const [newQueries, setNewQueries] = useState(queries)

    const changeSortType = () => {
        if (sortType === 'grid') {
            setSortType('detailed')
        }
        else if (sortType === 'detailed') {
            setSortType('grid')
        }
    }

    // fetch filter data 
    const fetchFilterData = async (nOffset = 0, replace = true, nQueries = newQueries) => {
        setLoading(true)
        setError(null)
        if (replace) {
            setProductsData((prevState) => {
                return { ...prevState, data: [] }
            })
            setOffset(0)
        }
        try {
            fetch('/api/filter-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ offset: nOffset, limit: 10, ...nQueries, searchFilter: nQueries?.search ? true : false })
            })
                .then(res => res.json())
                .then(result => {
                    if (!result.error) {
                        if (replace) {
                            setProductsData(result)
                        } else {
                            setProductsData((prevState) => {
                                const newData = { ...result, data: [...prevState.data, ...result.data] }
                                return newData;
                            })
                        }
                        setAllLoaded(result.allLoaded)
                        setLoading(false)
                        setError(result.message || null)
                    } else {
                        toast.error(result.error || 'Something went wrong.')
                    }
                })
        } catch (error) {
            toast.error(error.message)
        } finally {
            router.push({ pathname: router.pathname, query: nQueries }, undefined, { scroll: false });
        }
    }

    return (
        <div className='flex justify-between gap-2'>
            <div className='w-[380px] h-fit bg-white p-3 pb-8 border-r shadow hidden md:block'>
                <FilterSidebar data={productsData} queries={newQueries} fetchFilterData={fetchFilterData} setQueries={setNewQueries} />
            </div>
            <div className='w-full bg-white'>
                <TopFilter
                    loading={loading}
                    changeSortType={changeSortType}
                    sortDisplay={true}
                    queries={queries}
                    fetchFilterData={fetchFilterData}
                    setQueries={setNewQueries}
                    resultCount={productsData.data.length}
                    sortType={sortType}
                    filter={<Sidebar
                        btnName={<div className='flex text-lg items-center'>Filter <GiSettingsKnobs className='ml-2' /></div>} btnClass="text-2xl p-1 rounded-sm hover:bg-slate-200 duration-200"
                        data={<FilterSidebar data={productsData} queries={newQueries} fetchFilterData={fetchFilterData} setQueries={setNewQueries} />}
                    />}
                />

                {productsData &&
                    <InfiniteScroll
                        dataLength={productsData.data.length} //This is important field to render the next data
                        next={() => {
                            fetchFilterData(offset + 10, false, newQueries)
                            setOffset((prevState) => prevState + 10)
                        }}
                        hasMore={!allLoaded}
                    >
                        <div className={twMerge('grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mt-8', sortType !== 'grid' && '!grid-cols-1')}>
                            {
                                Array.isArray(productsData?.data) &&
                                    productsData?.data != [] ? productsData?.data.map(item => (
                                        sortType === 'grid' ?
                                            <Product productClass={'w-full'} key={item._id} item={item} />
                                            :
                                            <DetailedProduct productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={item._id} item={item} />
                                    ))
                                    :
                                    'No Products Found!'
                            }
                        </div>
                    </InfiniteScroll>
                }
                {
                    loading === true && <div className='w-full flex justify-center mt-5'><Spinner /></div>
                }
                {
                    error && <h1 className='mt-5 text-center text-lg font-medium'>{error}</h1>
                }
            </div>
        </div>
    );
};

export default ShopContent;