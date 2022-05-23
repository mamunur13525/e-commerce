import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { BsBagPlus } from 'react-icons/bs';
import { MdFavoriteBorder, MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import cogoToast from 'cogo-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '../Button';
import { itemLists } from '../../../FakeData/FakeData';
import Slider from "react-slick";


const ProductLists = ({ productClass = '', searchValue, selectedCategory = '', listProducts = null }) => {
    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        if (!searchValue === '') {
            categorFilterFunc();
        } else {
            categorFilterFunc();
        }
    }, [selectedCategory])


    const categorFilterFunc = () => {
        let filterProducts = [];
        if (selectedCategory === 'All Products') {
            filterProducts = itemLists;
        } else {
            filterProducts = itemLists.filter(item => item.category === selectedCategory)
        }
        setFilterProducts([...filterProducts])
    }

    return (
        <div className='flex flex-wrap sm:justify-evenly justify-center mt-8'>
            {
                filterProducts.length ? filterProducts.map(item => (
                    <Product productClass={productClass} key={Math.random()} item={item} />
                ))
                    :
                    'No Products Found!'
            }   
        </div>
    );
};

export default ProductLists;



const sliderSettings = {
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeToSlide: true,
    Infinity: true,
    prevArrow: <MdOutlineArrowBackIosNew className='text-red-500' />,
    nextArrow: <MdArrowForwardIos className='text-red-500' />,
};

const Product = ({ item, productClass = '' }) => {
    const [openModal, setOpenModal] = useState(false);
    const [mainImageShow, setMainImageShow] = useState(null)
    const addProductToCart = () => {
        cogoToast.success('Item Added to Cart.')
        setOpenModal(false);
    }

    const addProductToFavorite = () => {
        cogoToast.success('Item Added to Favorites')
    }

    useEffect(() => {
        setMainImageShow(item.item_img)
    }, [])
    return (
        <div className={`animate-waving-hand my-2 relative group overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${productClass}`
        }>
            <Modal classNames={{
                overlay: 'customOverlay',
                modal: 'w-full max-w-[75%!important] md:max-w-[90%!important] lg:max-w-[75%!important] h-fit transition-all duration-1000',
            }} open={openModal} onClose={() => setOpenModal(false)} center>
                <div className='flex flex-col md:flex-row justify-between h-full'>
                    <div className='w-full md:w-1/2 relative h-full'>
                        <div className='w-[70%] mx-auto'>
                            {
                                mainImageShow !== null &&
                                <img className='w-full' src={mainImageShow || ''} alt="product  image" />
                            }
                        </div>
                        <div className='w-[95%] '>
                            <Slider {...sliderSettings}>
                                {
                                    item.nestedImages.map((img, ind) => (
                                        <div key={ind} className='w-1/4 h-fit cursor-pointer'>
                                            <img onClick={() => setMainImageShow(img)} className='h-full' src={img} alt="product  image" />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex items-center'>
                        <div className='py-5'>
                            <h1 className='hover:text-green-600 text-4xl mb-2 leading-[50px] pb-5 uppercase font-normal cursor-pointer'>{item?.item_name}</h1>
                            <hr className='bg-gray-300' />
                            <p className='my-5'><span className='inline-block text-3xl font-normal line-through text-gray-600 align-bottom mr-2'>{item?.currency === 'usd' && '$'}{item?.base_price}.00</span> <span className='text-green-700 inline-block align-bottom m-0 text-4xl'>{item?.currency === 'usd' && '$'}{item?.base_price - (item?.base_price / item?.discount)}.00</span></p>
                            <p className='text-gray-700 mt-5 mb-5'>{item?.description}</p>
                            <div className='flex justify-between gap-3'>
                                <div className='w-1/2'>
                                    <p className='font-bold text-lg text-gray-900 uppercase'>Size</p>
                                    <select className='w-full border-gray-400 border mt-2 bg-transparent h-11 outline-none cursor-pointer py-2 px-2' name="" id="">
                                        <option className='cursor-pointer' value="1.5" selected>1.5</option>
                                        <option className='cursor-pointer' value="2.3">2.3</option>
                                        <option className='cursor-pointer' value="3.2">3.2</option>
                                        <option className='cursor-pointer' value="6.3">6.3</option>
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <p className='font-bold text-lg text-gray-900 uppercase'>Quantity</p>
                                    <input className='w-full border-gray-400 border mt-2 bg-transparent h-11 outline-none py-2 px-2' type="number" name="" id="" defaultValue={1} />
                                </div>
                            </div>
                            <Button clickFunc={addProductToCart} classAdd='text-white inline-block mb-0 font-normal text-center align-middle cursor-pointer whitespace-no-wrap text-sm rounded bg-[#80b435] hover:bg-[#356d20] select-none rounded-none py-3 w-[10rem] mt-8' >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <img className='w-full group-hover:scale-110 transition-transform duration-300' src={item?.item_img} alt="prduct_image" />
            <div className='absolute bottom-4 h-12  w-full px-4'>
                <h1 className='text-xl font-medium group-hover:text-green-600 transition-all'>{item?.item_name}</h1>
                <div className='flex gap-1 items-end'>
                    <span className='text-gray-500 line-through tracking-tighter'>{item?.currency === 'usd' && '$'}{item?.base_price}.00</span>
                    <span className='text-green-600 text-xl font-medium tracking-tight'>{item?.currency === 'usd' && '$'}{item?.base_price - (item?.base_price / item?.discount)}.00</span>
                </div>
            </div>
            <div className='absolute left-0 top-0 w-full h-full grid place-items-center group'>
                <div className='w-5/6 flex justify-center border rounded-full shadow-md bg-white py-3 translate-y-10 invisible  opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                    <BsBagPlus onClick={addProductToCart} className='border-r py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
                    <MdFavoriteBorder onClick={addProductToFavorite} className='border-r py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
                    <IoSearch onClick={() => setOpenModal(true)} className=' py-1 w-1/3 flex justify-center text-[29px] hover:text-green-600' />
                </div>
            </div>
        </div >
    )
}

