import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
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

const ProductView = ({ productData }) => {
    const [mainImageShow, setMainImageShow] = useState(productData.item_img)
    const [newNestedImages, setNewNestedImages] = useState([productData.item_img, ...productData.nestedImages])
    const {item_name: name, description, base_price: price, quantity, discount, rating, weight_category, currency} = productData

    const addProductToCart = () => {

    }

    useEffect(() => {
        setMainImageShow(productData.item_img)
        setNewNestedImages([productData.item_img, ...productData.nestedImages])
    }, [productData])

    const [ratingStar, setRatingStar] = useState([])
    useEffect(() => {
        let newData = []
        for (let i = 1; i < 6; i++) {
            if(i > parseInt(rating)) {
                newData.push(<BsStar className='text-3xl' />)
            }
            else {
                newData.push(<BsStarFill className='text-3xl' />)
            }
        }
        setRatingStar(newData)
    }, [rating])
    return (
        <div className='container mx-auto mt-1'>
            <div className='flex flex-col lg:flex-row '>
                <div className='w-full lg:w-1/2'>
                    <div className='lg:h-[40rem] relative '>
                        <img className='w-full lg:h-full object-contain' src={mainImageShow} alt="image" />
                    </div>
                    <div className='w-[95%] '>
                        {
                            Array.isArray(newNestedImages) &&
                            <Slider {...sliderSettings}>
                                {
                                    newNestedImages.map((img, ind) => (
                                        <div key={ind} className={`hover:border border-green-700 w-[150px] h-[150px] cursor-pointer p-1 ${mainImageShow === img ? 'border' : ''}`}>
                                            <img onClick={() => setMainImageShow(img)} className='h-full object-cover' src={img} alt="product  image" />
                                        </div>
                                    ))
                                }
                            </Slider>
                        }
                    </div>
                </div>
                <div className='px-10 w-full lg:w-1/2 mt-10'>
                    <h1 className='text-[48px] pb-5'>{name}</h1>
                    <div className='flex gap-2'>
                        {
                            ratingStar
                        }
                    </div>
                    <p className='my-5 mb-8'>
                        <span className='inline-block text-3xl font-normal line-through text-gray-600 align-bottom mr-5'>
                            {currency === 'taka' ? '৳' : '$'}{price}.00
                        </span>
                        <span className='text-[#80b435] leading-[40px] inline-block align-bottom m-0 text-4xl'>{currency === 'taka' ? '৳' : '$'}{Math.round(parseInt(price) - (parseInt(price) / parseInt(discount)))}.00
                        </span>
                    </p>
                    <div className='flex flex-wrap justify-between '>
                        <div className='w-1/2 mt-3'>
                            <p className='font-bold text-lg text-gray-900 uppercase'>Quantity</p>
                            <input className='w-full border-gray-200 border mt-2 bg-transparent outline-none py-4 px-2' type="number" name="" id="" defaultValue='1' />
                        </div>

                    </div>
                    <Button clickFunc={addProductToCart} classAdd='uppercase mt-8 max-w-fit  px-10 ' >
                        Add to Cart
                    </Button>
                    <div>
                        <h1 className='mt-4 underline text-lg font-medium mb-1'>Description</h1>
                        <p className='text-slate-600'>{description}</p>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ProductView;


// const DetailAccordion = () => {
//     const [showAccordion, setShowAccordion] = useState(null)
//     let data = [
//         {
//             id: 0,
//             title: 'Description',
//             description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
//         },
//         {
//             id: 1,
//             title: 'Custom Tab',
//             description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
//         },
//         {
//             id: 2,
//             title: 'Review',
//             description: 'Yes, absolutely. You can accept mailed cheques or money orders, direct bank transfers, or perhaps have an option to pay for an order in-store. Just give your manual payment method a name and an optional set of instructions for your customers, and they can select it like any other payment option.'
//         }
//     ]

//     return (
//         <div>
//             {
//                 Array.isArray(data) &&
//                 data.map(item => (
//                     <div
//                         key={item.id}
//                         className='flex flex-col justify-center  px-2'
//                         onClick={() => { showAccordion === item.id ? setShowAccordion(null) : setShowAccordion(item.id) }}
//                     >
//                         <div className='flex justify-between items-center cursor-pointer border-b'>
//                             <p className={`${showAccordion === item.id ? 'text-[#80b435]' : ''} py-3 font-semibold duration-200`}>Description</p>
//                             <AiOutlinePlus className={`text-2xl ${showAccordion === item.id ? 'rotate-[135deg]' : ''} transition-transform duration-200`} />
//                         </div>
//                         <p className={`${showAccordion === item.id ? 'h-[5rem] mt-5' : 'h-0'}  transition-all   overflow-hidden duration-200`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque delectus totam eligendi eos necessitatibus? Harum, vitae? Cumque velit illo similique.</p>
//                     </div>
//                 ))
//             }

//         </div>
//     )
// }


