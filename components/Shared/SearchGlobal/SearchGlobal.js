import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { itemLists } from '../../../FakeData/FakeData';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';

const products = [
    {
        id: 0,
        name: 'Tomato'
    },
    {
        id: 2,
        name: 'potato'
    },
    {
        id: 3,
        name: 'mango'
    },
    {
        id: 4,
        name: 'jinger'
    },
    {
        id: 5,
        name: 'apple'
    },
    {
        id: 6,
        name: 'water-melon'
    },
    {
        id: 7,
        name: 'other'
    },
]
const SearchGlobal = ({ showingSearch, setShowingSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (showingSearch && searchRef.current && !searchRef.current.contains(e.target)) {
                setShowingSearch(false)
                setSearchValue('')
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showingSearch, searchRef])

    const productClick = (id) => {
        setShowingSearch(false);
        setSearchValue('');
        router.push(`/products/${id}`)

    }

    useEffect(() => {
        if(searchValue) {
            setLoading(true)
            try {
                fetch('/api/search-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({searchValue})
                })
                .then(res => res.json())
                .then(result => {
                    if (!result.error) {
                        setSearchedProducts(result)
                        setLoading(false)
                    }
                    else {
                        toast.error(result.error || 'Something went wrong.')
                    }
                })
            } catch (error) {
                toast.error(error.message)
                setLoading(false)
            }
        }
        else {
            setSearchedProducts([])
        }
    }, [searchValue])

    const searchDebounce = useMemo(() => {
        return debounce(e => {setSearchValue(e)}, 500);
    }, []);
    return (
        <div className={`fixed flex justify-center items-start h-screen z-50 bg-[#00000080] px-5 py-3 w-full ${showingSearch ? "visible" : "invisible"} `}>
            <div style={{background:'radial-gradient(white, #d9d9d9)'}} ref={searchRef} className={` w-11/12 md:w-5/6 lg:w-1/2 mt-10 py-4 rounded translate-y-5 transition-all  ${showingSearch ? "translate-y-0 opacity-100" : "opacity-0"}`}>

                <div className='flex items-center gap-2 pt-2  pb-5  px-4'>
                    <input ref={inputRef} onChange={(e) => searchDebounce(e.target.value)} className='text-xl px-2 w-full py-1 border border-gray-200 rounded focus:outline-none shadow' type="text" name="" id="" autoFocus />
                </div>
              

                <hr className='shadow' />
                <div>
                    <ul className='list-none max-h-[70vh] overflow-auto'>
                        {
                            loading && <li className='text-xl text-gray-500 text-center py-6'>Loading results for <span className='text-black'>{`"${searchValue}"`}</span></li>
                        }
                        {
                            searchValue === '' && !searchedProducts.length && <li className='text-xl text-gray-500 text-center py-6'>Search Products</li>
                        }
                        {
                            Array.isArray(searchedProducts) && searchedProducts.map(item => {
                                let newRating = []
                                for (let i = 1; i < 6; i++) {
                                    if(i > parseInt(item?.rating)) {
                                        newRating.push(<BsStar className='text-sm' />)
                                    }
                                    else {
                                        newRating.push(<BsStarFill className='text-sm' />)
                                    }
                                }

                                return (<li onClick={() => productClick(item._id)} key={item.id} className=' px-4 cursor-pointer my-2 py-3 text-xl hover:bg-gray-100 flex  gap-3'>
                                    <span className='w-16'>
                                        <img className='w-full' src={item?.image.url} alt="" />
                                    </span>
                                    <div className='flex flex-col'>
                                        <span className='capitalize font-medium'>
                                            {item?.name}
                                        </span>
                                        <span className='text-sm font-normal'>
                                            <span className='inline-block  font-normal line-through text-gray-600 align-bottom mr-2'>
                                                {item?.currency === 'bdt' ? '৳' : '$'}{item?.price}
                                            </span>
                                            <span className='text-[#80b435] inline-block align-bottom m-0'>
                                                {item?.currency === 'bdt' ? '৳' : '$'}{Math.round(item?.price - (item?.price / item?.discount))}
                                            </span>
                                        </span>
                                        <div className='flex gap-[1px]'>
                                            {
                                                newRating
                                            }
                                        </div>
                                    </div>
                                </li>
                            )})
                        }
                        {
                            searchValue !== '' && !loading && !searchedProducts.length && <li className='text-xl text-gray-500 text-center py-6'>No results for <span className='text-black'>{`"${searchValue}"`}</span></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchGlobal;