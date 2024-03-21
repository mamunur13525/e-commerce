import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Button from '../Shared/Button';
import Slider from "react-slick";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { cartStore } from '../../store/createStore';


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
    const [mainImageShow, setMainImageShow] = useState(productData.image)
    const [newimages, setNewimages] = useState([productData.image, ...productData.images])
    const {name: name, description, price: price, quantity, discount, rating, weight, currency} = productData
    const addToCart = cartStore((state) => (state.addToCart))
    const [newQuantity, setNewQuantity] = useState(1)

    const addProductToCart = () => {
        if(!newQuantity) {
            setNewQuantity(1)
        }
        if(parseInt(newQuantity) > parseInt(quantity)) {
            alert('Quantity can not exceed the original Quantity')
        }
        else {
            addToCart(productData, !newQuantity ? 1 : newQuantity)
        }
    }

    useEffect(() => {
        setMainImageShow(productData.image)
        setNewimages([productData.image, ...productData.images])
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
                        <img className='w-full lg:h-full object-contain' src={mainImageShow.url} alt="image" />
                    </div>
                    <div className='w-[95%] '>
                        {
                            Array.isArray(newimages) &&
                            <Slider {...sliderSettings}>
                                {
                                    newimages.map((img, ind) => (
                                        <div key={ind} className={`hover:border border-green-700 w-[150px] h-[150px] cursor-pointer p-1 ${mainImageShow === img ? 'border' : ''}`}>
                                            <img onClick={() => setMainImageShow(img)} className='h-full object-cover' src={img.url} alt="product  image" />
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
                            {currency === 'bdt' ? '৳' : '$'}{price}.00
                        </span>
                        <span className='text-[#80b435] leading-[40px] inline-block align-bottom m-0 text-4xl'>{currency === 'bdt' ? '৳' : '$'}{Math.round(parseInt(price) - (parseInt(price) / parseInt(discount)))}.00
                        </span>
                    </p>
                    <div className='flex flex-wrap justify-between '>
                        <div className='w-1/2 mt-3'>
                            <p className='font-bold text-lg text-gray-900 uppercase'>Quantity - {quantity}</p>
                            <input value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} className='w-full border-gray-200 border mt-2 bg-transparent outline-none py-4 px-2' type="number" name="" id="" min={0} max={quantity} required />
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


