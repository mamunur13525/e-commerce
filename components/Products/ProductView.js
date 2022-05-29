import React, { useState } from 'react';
import { BsStar } from 'react-icons/bs';
import Button from '../Shared/Button';
import Slider from "react-slick";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';


const sliderSettings = {
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    Infinity: true,
    prevArrow: <MdOutlineArrowBackIosNew className='text-red-500' />,
    nextArrow: <MdArrowForwardIos className='text-red-500' />,
};

let item = {
    id: 0,
    item_name: 'Stayberry',
    description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment...',
    item_img: 'https://cdn.shopify.com/s/files/1/2179/9295/products/11_bfd2aa7c-4b01-448f-adcd-d621336fdea5_grande.jpg?v=1500460099',
    nestedImages: [
        'https://cdn.shopify.com/s/files/1/2179/9295/products/11_bfd2aa7c-4b01-448f-adcd-d621336fdea5_grande.jpg?v=1500460099',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/14_c2b85c63-76e4-441b-9cf4-6af58ef57974_grande.jpg?v=1500460080',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/7_131028d3-ab5d-4f57-9720-f4409cff4ded_grande.jpg?v=1500459572',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/10_a909a839-7e86-43e2-a8e0-40ba8cb04496_grande.jpg?v=1500459734',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/4_f313a82a-af68-47fa-873d-36c8c94a3de5_grande.jpg?v=1500459484',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/15_8fdea367-f778-4836-b1cb-54ef3e0c6f3b_grande.jpg?v=1500460099',
        'https://cdn.shopify.com/s/files/1/2179/9295/products/7_131028d3-ab5d-4f57-9720-f4409cff4ded_grande.jpg?v=1500459572'
    ],
    base_price: 400.00,
    weight_category: 'kg',
    category: 'fruits',
    discount: 10,
    currency: 'usd',
}
const ProductView = () => {
    const [mainImageShow, setMainImageShow] = useState('https://cdn.shopify.com/s/files/1/2179/9295/products/11_bfd2aa7c-4b01-448f-adcd-d621336fdea5_grande.jpg?v=1500460099')
    const addProductToCart = () => {
        console.log('add to cart')
    }
    return (
        <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row '>
                <div className='w-full lg:w-1/2'>
                    <div className='lg:h-[40rem] relative '>
                        <img className='w-full lg:h-full' src={mainImageShow} alt="image" />
                    </div>
                    <div className='w-[95%] '>
                        <Slider {...sliderSettings}>
                            {
                                item.nestedImages.map((img, ind) => (
                                    <div key={ind} className={`hover:border border-green-700 w-1/4 h-fit cursor-pointer ${mainImageShow === img ? 'border' : ''}`}>
                                        <img onClick={() => setMainImageShow(img)} className='h-full' src={img} alt="product  image" />
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>
                <div className='px-10 w-full lg:w-1/2 mt-10'>
                    <h1 className='text-[48px] pb-5'>UNION BED</h1>
                    <div className='flex gap-2'>
                        <BsStar className='text-3xl' />
                        <BsStar className='text-3xl' />
                        <BsStar className='text-3xl' />
                        <BsStar className='text-3xl' />
                        <BsStar className='text-3xl' />
                    </div>
                    <p className='my-5 mb-8'>
                        <span className='inline-block text-3xl font-normal line-through text-gray-600 align-bottom mr-5'>
                            {item?.currency === 'usd' && '$'}{item?.base_price}.00
                        </span>
                        <span className='text-[#80b435] leading-[40px] inline-block align-bottom m-0 text-4xl'>{item?.currency === 'usd' && '$'}{item?.base_price - (item?.base_price / item?.discount)}.00
                        </span>
                    </p>
                    <div className='flex flex-wrap justify-between '>
                        <div className='w-1/2 pr-2'>
                            <p className='font-bold text-lg text-gray-900 uppercase'>Size</p>
                            <select className='w-full border-gray-200 border mt-3 bg-transparent outline-none cursor-pointer py-4 px-2' name="" id="">
                                <option className='cursor-pointer' defaultValue="1.5" selected>1.5</option>
                                <option className='cursor-pointer' defaultValue="2.3">2.3</option>
                                <option className='cursor-pointer' defaultValue="3.2">3.2</option>
                                <option className='cursor-pointer' defaultValue="6.3">6.3</option>
                            </select>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <p className='font-bold text-lg text-gray-900 uppercase'>Color</p>
                            <select className='w-full border-gray-200 border mt-3 bg-transparent outline-none cursor-pointer py-4 px-2' name="" id="">
                                <option className='cursor-pointer' defaultValue="1.5" selected>Red</option>
                                <option className='cursor-pointer' defaultValue="2.3">Yellow</option>
                                <option className='cursor-pointer' defaultValue="3.2">Orange</option>
                                <option className='cursor-pointer' defaultValue="6.3">Green</option>
                            </select>
                        </div>
                        <div className='w-1/2 mt-3'>
                            <p className='font-bold text-lg text-gray-900 uppercase'>Quantity</p>
                            <input className='w-full border-gray-200 border mt-2 bg-transparent outline-none py-4 px-2' type="number" name="" id="" defaultValue='1' />
                        </div>

                    </div>
                    <Button clickFunc={addProductToCart} classAdd='text-white inline-block border-white mb-0 font-normal text-center align-middle cursor-pointer whitespace-no-wrap text-lg font-semibold rounded bg-[#80b435] hover:border hover:border-[#80b435] select-none rounded-none py-3 w-[13rem] mt-8 uppercase mb-10 hover:bg-white hover:text-[#80b435] ' >
                        Add to Cart
                    </Button>
                    <DetailAccordion />
                </div>
            </div >
        </div >
    );
};

export default ProductView;


const DetailAccordion = () => {
    const [showAccordion, setShowAccordion] = useState(null)
    let data = [
        {
            id: 0,
            title: 'Description',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        },
        {
            id: 1,
            title: 'Custom Tab',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        },
        {
            id: 2,
            title: 'Review',
            description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
        }
    ]
    console.log(showAccordion)
    return (
        <div>
            {
                data.map(item => (
                    <div
                        key={item.id}
                        className='flex flex-col justify-center  px-2'
                        onClick={() => { showAccordion === item.id ? setShowAccordion(null) : setShowAccordion(item.id) }}
                    >
                        <div className='flex justify-between items-center cursor-pointer border-b'>
                            <p className={`${showAccordion === item.id ? 'text-[#80b435]' : ''} py-3 font-semibold duration-200`}>Description</p>
                            <AiOutlinePlus className={`text-2xl ${showAccordion === item.id ? 'rotate-[135deg]' : ''} transition-transform duration-200`} />
                        </div>
                        <p className={`${showAccordion === item.id ? 'h-[5rem] mt-5' : 'h-0'}  transition-all   overflow-hidden duration-200`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque delectus totam eligendi eos necessitatibus? Harum, vitae? Cumque velit illo similique.</p>
                    </div>
                ))
            }

        </div>
    )
}


