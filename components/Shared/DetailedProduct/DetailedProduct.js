import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { useRouter } from 'next/router';
import { cartStore, favoriteStore } from '../../../store/createStore';
import { toast } from 'react-hot-toast';
import CustomModal from '../CustomModal/CustomModal';
import SliderCarousel from '../Slider/SliderCarousel';
import Button from '../Button';
import { BsBagPlus, BsFillBagCheckFill } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { FaFacebookSquare, FaGooglePlusG, FaPinterest, FaTwitterSquare } from 'react-icons/fa';

export default function DetailedProduct({ item, productClass = '' }) {
    const [openModal, setOpenModal] = useState(false);
    const [mainImageShow, setMainImageShow] = useState(null)
    const router = useRouter()


    const cartItems = cartStore((state) => (state.items));
    const addToCart = cartStore((state) => (state.addToCart));
    const removeItemToCart = cartStore((state) => (state.removeToCart));
    const favoriteList = favoriteStore((state) => (state.items));
    const addToFavorite = favoriteStore((state) => (state.addToFavorite));
    const removeItemToFavorite = favoriteStore((state) => (state.removeToFavorite));

    const addProductToCart = () => {
        toast.success('Add to Cart ❤')
        addToCart(item)
        setOpenModal(false);
    }
    const removeItem = () => {
        toast.error('Remove to Cart!')
        removeItemToCart(item._id)
        setOpenModal(false);
    }
    const removeItemFav = () => {
        toast.error('Remove to Favorite!')
        removeItemToFavorite(item._id)
        setOpenModal(false);
    }

    const addProductToFavorite = () => {
        toast.success('Add to Favorite ❤')
        addToFavorite(item)
    }

    useEffect(() => {
        setMainImageShow(item.item_img)
    }, [])


    const isItemOnCart = cartItems.find(itm => itm._id === item._id)
    const isItemOnFavoriteList = favoriteList.find(itm => itm._id === item._id)
    return (
        <div className='m-2 mb-3 w-full animate-waving-hand'>
            <div className='hover:shadow-lg border border-white shadow-sm hover:border-slate-100 duration-200 rounded-md bg-white w-full flex flex-col items-center p-3 sm:flex-row sm:items-start'>
                <img onClick={() => router.push(`products/${item?._id}`)} className='w-80 sm:w-56 md:w-48 lg:w-56 cursor-pointer' src={item.item_img} alt="" />
                <div className='self-start'>
                    <h1 onClick={() => router.push(`products/${item?._id}`)} className='text-2xl font-semibold cursor-pointer inline-block'>{item.item_name}</h1>
                    <div className='flex items-end'>
                        <p className='text-lg font-semibold text-slate-500 line-through'>${item.base_price}</p>
                        <p className='text-2xl ml-4 font-semibold text-green-500'>${(item.base_price - (item.base_price * item.discount) / 100)}</p>
                    </div>
                    <p className='text-gray-500 mt-2 text-md sm:text-sm lg:text-[1rem]'>{item.description}</p>
                    <div className='w-[96%] grid place-items-center group mt-5 mb-6'>
                        <div className='w-5/6 flex justify-center border rounded-full shadow-md bg-white py-3 transition-all duration-300 cursor-pointer'>
                            {
                                isItemOnCart ?
                                    <BsFillBagCheckFill onClick={removeItem} className='border-r py-1 w-1/3 flex justify-center text-[29px]  text-green-600' title='already add on cart' />
                                    :
                                    <BsBagPlus onClick={addProductToCart} className='border-r py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
                            }
                            {
                                isItemOnFavoriteList ?
                                    <MdFavorite onClick={removeItemFav} className='border-r py-1 w-1/3 flex justify-center text-[32px]  text-red-600' title='already add on cart' />
                                    :
                                    <MdFavoriteBorder onClick={addProductToFavorite} className='border-r py-1 w-1/3 flex justify-center text-[32px] hover:text-red-600' />
                            }

                            <IoSearch onClick={() => setOpenModal(true)} className=' py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
                        </div>
                    </div>
                    <div className='flex font-semibold items-center'>
                        <p>SHARE THIS:</p>
                        <FaFacebookSquare className='ml-2 w-6 h-6 cursor-pointer text-blue-600' />
                        <FaTwitterSquare className='ml-2 w-6 h-6 cursor-pointer text-blue-400' />
                        <FaGooglePlusG className='ml-2 w-6 h-6 cursor-pointer text-pink-500' />
                        <FaPinterest className='ml-2 w-6 h-6 cursor-pointer text-red-500' />
                    </div>
                </div>
            </div>

            <CustomModal
                customClass='w-full  h-fit max-w-[90%!important] md:max-w-[75%!important] md:max-w-[90%!important] !rounded lg:max-w-[75%!important] h-fit  pr-4'
                isOpen={openModal} setIsOpen={setOpenModal}>
                <div className='flex flex-col md:flex-row justify-between h-full '>
                    <div className='w-full md:w-1/2 relative flex flex-col justify-between py-5'>
                        <div className='w-[70%] mx-auto'>
                            <div className='h-[265px] scale-110 flex justify-center '>
                                {
                                    mainImageShow !== null &&
                                    <img className=' h-full' src={mainImageShow || ''} alt="product_image" />
                                }
                            </div>
                        </div>
                        <div className='w-[95%] h-[30%]'>
                            {
                                Array.isArray(item.nestedImages) &&
                                <SliderCarousel
                                    arrowSize={'3rem'}
                                    speed={500}
                                    infinite={true}
                                    slidesToShow={3}
                                    autoplay={true}
                                    autoplaySpeed={5000}
                                    arrowMove='.5rem'
                                >
                                    {
                                        item.nestedImages.map((img, ind) => (
                                            <div key={ind} className='w-1/4 h-fit cursor-pointer'>
                                                <img onClick={() => setMainImageShow(img)} className='h-full' src={img} alt="product  image" />
                                            </div>
                                        ))
                                    }
                                </SliderCarousel>
                            }
                        </div>
                    </div>
                    <div className='pl-5 pr-1 w-full md:w-1/2 flex items-center'>
                        <div className='py-5'>
                            <h1 className='hover:text-green-600 text-4xl mb-2 leading-[50px] pb-5 uppercase font-normal cursor-pointer'>{item?.item_name}</h1>
                            <hr className='bg-gray-300' />
                            <p className='my-5'><span className='inline-block text-3xl font-normal line-through text-gray-600 align-bottom mr-2'>{item?.currency === 'usd' && '$'}{item?.base_price}.00</span> <span className='text-green-700 inline-block align-bottom m-0 text-4xl'>{item?.currency === 'usd' && '$'}{item?.base_price - (item?.base_price / item?.discount)}.00</span></p>
                            <p className='text-gray-700 mt-5 mb-5'>{item?.description}</p>
                            <div className='flex justify-between gap-3'>
                                <div className='w-1/2'>
                                    <p className='font-bold text-lg text-gray-900 uppercase'>Size</p>
                                    <select className='w-full border-gray-400 border mt-2 bg-transparent h-11 outline-none cursor-pointer py-2 px-2' name="" id="">
                                        <option className='cursor-pointer' defaultValue="1.5">1.5</option>
                                        <option className='cursor-pointer' defaultValue="2.3">2.3</option>
                                        <option className='cursor-pointer' defaultValue="3.2">3.2</option>
                                        <option className='cursor-pointer' defaultValue="6.3">6.3</option>
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <p className='font-bold text-lg text-gray-900 uppercase'>Quantity</p>
                                    <input className='w-full border-gray-400 border mt-2 bg-transparent h-11 outline-none py-2 px-2' type="number" name="" id="" defaultValue='1' />
                                </div>
                            </div>
                            <Button clickFunc={addProductToCart} classAdd='w-1/2 ml-auto mt-8' >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}

{/* <div className='absolute left-0 top-[50%] w-[96%] translate-x-[2%] translate-y-[-50%] grid place-items-center group'>
<div className='w-5/6 flex justify-center border rounded-full shadow-md bg-white py-3 translate-y-10 invisible  opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
    {
        isItemOnCart ?
            <BsFillBagCheckFill onClick={removeItem} className='border-r py-1 w-1/3 flex justify-center text-[29px]  text-green-600' title='already add on cart' />
            :
            <BsBagPlus onClick={addProductToCart} className='border-r py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
    }
    {
        isItemOnFavoriteList ?
            <MdFavorite onClick={removeItemFav} className='border-r py-1 w-1/3 flex justify-center text-[32px]  text-red-600' title='already add on cart' />
            :
            <MdFavoriteBorder onClick={addProductToFavorite} className='border-r py-1 w-1/3 flex justify-center text-[32px] hover:text-red-600' />
    }

    <IoSearch onClick={() => setOpenModal(true)} className=' py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
</div>
</div> */}