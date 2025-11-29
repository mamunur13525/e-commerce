import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { BsBagPlus, BsFillBagCheckFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';
import 'react-responsive-modal/styles.css';
import Button from '../Button';
import { useRouter } from 'next/router';
import { cartStore, favoriteStore } from '../../../store/createStore';
import { toast } from 'react-hot-toast';
import CustomModal from '../CustomModal/CustomModal';
import SliderCarousel from '../Slider/SliderCarousel';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';


const ProductLists = ({ productClass = '', data, animate = false }) => {
    

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-8'>
            {
                Array.isArray(data) &&
                    data.length ? data.map(item => (
                        <Product animate={animate} productClass={productClass} key={item._id} item={item} />
                    ))
                    :
                    'No Products Found!'
            }
        </div>
    );
};

export default ProductLists;


export const Product = ({ item, productClass = '', animate }) => {
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
        setMainImageShow(item.image)
    }, [])


    const isItemOnCart = cartItems.find(itm => itm._id === item._id)
    const isItemOnFavoriteList = favoriteList.find(itm => itm._id === item._id)
    return (
        <div className={twMerge(`relative group overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer`, productClass, animate && 'animate-waving-hand')}>

            <CustomModal
                customClass='w-full  h-fit max-w-[90%!important] md:max-w-[75%!important] md:max-w-[90%!important] !rounded lg:max-w-[75%!important] h-fit  pr-4'
                isOpen={openModal} setIsOpen={setOpenModal}>
                <div className='flex flex-col md:flex-row justify-between h-full '>
                    <div className='w-full md:w-1/2 relative flex flex-col justify-between py-5'>
                        <div className='w-[70%] mx-auto'>
                            <div className='h-[265px] scale-110 flex justify-center '>
                                {
                                    mainImageShow !== null &&
                                    <Image className=' h-full' src={mainImageShow.url || ''} alt="product_image" />
                                }
                            </div>
                        </div>
                        <div className='w-[95%] h-[30%]'>
                            {
                                Array.isArray(item.images) &&
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
                                        item.images.map((img, ind) => (
                                            <div key={ind} className='w-1/4 h-fit cursor-pointer'>
                                                <Image onClick={() => setMainImageShow(img)} className='h-full' src={img.url} alt="product  image" />
                                            </div>
                                        ))
                                    }
                                </SliderCarousel>
                            }
                        </div>
                    </div>
                    <div className='pl-5 pr-1 w-full md:w-1/2 flex items-center'>
                        <div className='py-5'>
                            <h1 className='hover:text-green-600 text-4xl mb-2 leading-[50px] pb-5 uppercase font-normal cursor-pointer'>{item?.name}</h1>
                            <hr className='bg-gray-300' />
                            <p className='my-5'><span className='inline-block text-3xl font-normal line-through text-gray-600 align-bottom mr-2'>{item?.currency === 'usd' ? '$' : '৳'}{item?.price}</span> <span className='text-green-700 inline-block align-bottom m-0 text-4xl'>{item?.currency === 'usd' ? '$' : '৳'}{Math.round(item?.price - (item?.price / item?.discount))}</span></p>
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
            <div className='p-2' onClick={() => router.push(`/products/${item?._id}`)}>
                <div className='w-full aspect-square flex justify-center items-center overflow-hidden'>
                    <img className='w-full group-hover:scale-110 transition-transform duration-300' src={item?.image.url} alt="prduct_image" />
                </div>
                <div className='w-full px-2'>
                    <h1 className='text-xl font-medium group-hover:text-green-600 transition-all'>{item?.name}</h1>
                    <div className='flex gap-1 my-1'>
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < (item?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <div className='flex gap-1 items-end'>
                        <span className='text-gray-500 line-through tracking-tighter'>{item?.currency === 'usd' ? '$' : '৳'}{item?.price}</span>
                        <span className='text-green-600 text-xl font-medium tracking-tight'>{item?.currency === 'usd' ? '$' : '৳'}{Math.round(item?.price - (item?.price / item?.discount))}</span>
                    </div>
                </div>
            </div>
            <div className='absolute left-0 top-[50%] w-[96%] translate-x-[2%] translate-y-[-50%] grid place-items-center group'>
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
            </div>
        </div >
    )
}

