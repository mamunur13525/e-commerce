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
import { queryStore } from '../../../../store/createStore';
import toast from 'react-hot-toast';
import Sidebar from '../../Sidebar/Sidebar';

const ShopContent = () => {
    const router = useRouter()
    const [firstRender, setFirstRender] = useState(false)
    const queryData = queryStore((state) => (state.data))

    const [productsData, setProductsData] = useState([])
    const [sortType, setSortType] = useState('grid')
    const [offset, setOffset] = useState(0)
    const [allLoaded, setAllLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)
    const [searchValue, setSearchValue] = useState('')
    const [searchQuery, setSearchQuery] = useState({name: 'search', value: null})
    
    // filters
    const [filterPrice, setFilterPrice] = useState(100)
    const [filterRating, setFilterRating] = useState(5)
    const [filterCategory, setFilterCategory] = useState(['vegetables', 'fruits', 'nuts'])


    const changeSortType = () => {
        if(sortType === 'grid') {
            setSortType('detailed')
        }
        else if(sortType === 'detailed') {
            setSortType('grid')
        }
    }

    // handling querys
    useEffect(() => {
        queryHandler({name: 'search', value: searchQuery.value || null})
    }, [searchQuery])

    useEffect(() => {
        if(parseInt(maxPrice) === parseInt(filterPrice)) {
            queryHandler({name: 'price', value: null})
        }
        else {
            queryHandler({name: 'price', value: filterPrice})
        }
    }, [filterPrice])

    const queryHandler = (data) => {
        if(firstRender === true) {
            const newRouter = {...router}
            if(data.value === null) {
                delete newRouter.query[data.name]
                router.push(newRouter)
            }
            else {
                newRouter.query[data.name] = data.value
                router.push(newRouter)
            }
        }
    }
    useEffect(() => {
        setFirstRender(true)
    }, [])

    // search handler
    const searchValueHandler = (data) => {
        setOffset(0)
        setProductsData([])
        setSearchValue(data)
        setReloadData(Math.random())
    }

    // filter handler
    useEffect(() => {
        if(!searchValue) {
            setOffset(0)
            setProductsData([])
            setReloadData(Math.random())
        }
    }, [filterPrice, filterRating, filterCategory])


    // getting products data
    useEffect(() => {
        setLoading(true)
        try {
            fetch('/api/filter-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({offset, limit: 10, search: searchValue ? true : false, searchValue, filterPrice, filterRating, filterCategory})
            })
            .then(res => res.json())
            .then(result => {
                if (!result.error) {
                    setProductsData([...productsData, ...result.data])
                    setAllLoaded(result.allLoaded)
                    setMaxPrice(result.maxPrice)
                    setLoading(false)
                } else {
                    toast.error(result.error || 'Something went wrong.')
                }
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [offset, reloadData, searchValue])

    const reloadDataHandler = (e) => {
        e.preventDefault()
        setOffset(0)
        setProductsData([])
        setAllLoaded(false)
        setLoading(true)
        setReloadData(Math.random())
    }

    return (
        <div className='flex justify-between gap-2'>
            <div className='w-[380px] h-fit bg-white p-3 pb-8 border-r shadow hidden md:block'>
                <FilterSidebar queryHandler={queryHandler} maxPrice={maxPrice} setFilterPrice={setFilterPrice} setFilterRating={setFilterRating} setFilterCategory={setFilterCategory} />
            </div>
            <div className='w-full bg-white'>
                <TopFilter setSearchQuery={setSearchQuery} reloadDataHandler={reloadDataHandler} resultText={`Products Loaded: ${productsData?.length}`} loading={loading} sortType={sortType} changeSortType={changeSortType} sortDisplay={true} setSearchValue={searchValueHandler} itemLists={productsData} filter={<Sidebar btnName={<div className='flex text-lg items-center'>Filter <GiSettingsKnobs className='ml-2' /></div>} btnClass="text-2xl p-1 rounded-sm hover:bg-slate-200 duration-200" data={<FilterSidebar queryHandler={queryHandler} maxPrice={maxPrice} setFilterPrice={setFilterPrice} setFilterRating={setFilterRating} setFilterCategory={setFilterCategory} />} />} />

                {   productsData &&
                    <InfiniteScroll
                        dataLength={productsData.length} //This is important field to render the next data
                        next={() => setOffset(offset + 10)}
                        hasMore={!allLoaded}
                    >
                        <div className='flex flex-wrap sm:justify-evenly justify-center mt-8'>
                            {
                                Array.isArray(productsData) &&
                                    productsData != [] ? productsData.map(item => (
                                        sortType === 'grid' ?
                                        <Product productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={Math.random()} item={item} />
                                        :
                                        <DetailedProduct productClass={'w-[200px] md:w-[250px] h-[250px] md:h-[265px]'} key={Math.random()} item={item} />
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
                    loading === false && allLoaded && <h1 className='mt-5 text-center text-lg font-medium'>There is no product left to show.</h1>
                }
            </div>
        </div>
    );
};

export default ShopContent;