import React from 'react';
import Slider from "react-slick";
import { RiHeadphoneLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { SiLinktree } from "react-icons/si";
import Button from '../Button';

const sliderSettings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
};

let sliderInfos = [
    {
        id: 0,
        title: 'This is First page.',
        subTitle: 'this is the subtitle',
        bg_image: 'https://images.unsplash.com/photo-1513612254505-fb553147a2e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!'
    },
    {
        id: 1,
        title: 'This is Second page.',
        subTitle: 'this is the subtitle',
        bg_image: 'https://images.unsplash.com/photo-1530983820165-35b7aa38a105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!'
    },
    {
        id: 2,
        title: 'This is Third page.',
        subTitle: 'this is the subtitle',
        bg_image: 'https://images.unsplash.com/photo-1595588232962-0cd2efdbd6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!'
    },
]
const FrontSlider = () => {

    return (
        <div className='h-screen w-full mx-auto relative'>
            <Slider {...sliderSettings}>
                {
                    sliderInfos.map(slideInfo => (
                        <div key={slideInfo.id} className='w-9/10 h-screen mx-auto  shadow rounded-md relative'>
                            <div className='h-full flex flex-col justify-center w-10/12 mx-auto relative z-20' >
                                <div className='w-2/4 -mt-40'>
                                    <h1 className='font-sans text-5xl font-bold text-green-600'>{slideInfo.title}</h1>
                                    <p className='font-sans  text-3xl mt-3'>{slideInfo.subTitle}</p>
                                    <p className='mt-10 cursor-pointer '>{slideInfo.description}</p>
                                    <Button classAdd='text-white mt-5 bg-[#80b435] hover:text-[#80b435] hover:bg-white  hover:border-[#356d20]' >
                                        Shop Now
                                    </Button>
                                </div>
                                <div className='w-2/4'>

                                </div>
                            </div>
                            <div className='absolute w-full left-0 -top-16 -z-10'>
                                <img className='w-full scale-x-[-1]' src={slideInfo.bg_image} alt="ss" />
                            </div>
                        </div>

                    ))
                }
            </Slider>
            <div className='w-full sm:absolute left-0 -bottom-16 '>
                <div className='flex flex-wrap justify-center bg-white w-fit mx-auto shadow-md rounded-sm py-5'>
                    <div className=' border-r my-3 w-[19rem] h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='bg-green-600 h-12 p-2 rounded-full w-12 grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <FiSend className=' text-2xl text-white ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Free Shipping</p>
                            <p className='uppercase text-gray-400 text-[12px]'>On Order $5000</p>
                        </div>
                    </div>
                    <div className=' border-r my-3 w-[19rem] h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='bg-green-600 h-12 p-2 rounded-full w-12 grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <BiSupport className=' text-2xl text-white ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Support</p>
                            <p className='uppercase text-gray-400 text-[12px]'>LIFE TIME SUPPORT 24/7</p>
                        </div>
                    </div>
                    <div className=' border-r my-3 w-[19rem] h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='bg-green-600 h-12 p-2 rounded-full w-12 grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <SiLinktree className=' text-2xl text-white ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Help partner</p>
                            <p className='uppercase text-gray-400 text-[12px]'>HELP ALL ASPECTS</p>
                        </div>
                    </div>
                    <div className=' my-3 w-[19rem] h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='bg-green-600 h-12 p-2 rounded-full w-12 grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <RiHeadphoneLine className=' text-2xl text-white ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>CONTACT WITH US</p>
                            <p className='uppercase text-gray-400 text-[12px]'>+8801935-015460</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontSlider;