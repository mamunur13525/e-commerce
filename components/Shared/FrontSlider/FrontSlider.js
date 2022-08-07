import React from 'react';
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import { RiHeadphoneLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { SiLinktree } from "react-icons/si";
import Button from '../Button';


function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <MdArrowForwardIos
            className={className}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <MdOutlineArrowBackIosNew
            className={className}
            onClick={onClick}
        />
    );
}


const sliderSettings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
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
        bg_image: 'https://cdn.shopify.com/s/files/1/2179/9295/files/home1-slideshow1.jpg?v=1500372244',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!'
    },
]
const FrontSlider = () => {
    return (
        <div className='h-full  lg:h-screen w-full mx-auto relative'>
            <Slider {...sliderSettings}>
                {
                    Array.isArray(sliderInfos) && sliderInfos.map(slideInfo => (
                        <div
                            key={slideInfo.id}
                            className={`h-full md:pb-5 lg:h-screen mx-auto  shadow rounded-md relative`}>
                            <div className='  flex flex-col h-full items-center justify-center mx-auto relative z-20' >
                                <div className='w-full mb-16 text-center animate-waving-hand'>
                                    <h1 className='mt-10     font-sans font-light text-4xl md:text-6xl lg:text-7xl text-green-600 drop-shadow-2xl uppercase'>{slideInfo.title}</h1>
                                    {/* <p className=' w-7/12 mx-auto font-sans text-xl md:text-3xl mt-1 md:mt-3 capitalize'>{slideInfo.subTitle}</p> */}
                                    <p className='mx-auto w-10/12 md:w-7/12 mt-1 md:mt-10 cursor-pointer text-xl'>{slideInfo.description}</p>
                                    <Button withBck={false} classAdd='w-fit mt-10 px-10 ' >
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                            <div className='w-full  h-full  flex justify-center items-center
                            overflow-hidden absolute left-0 top-0 '>
                                <img className='flex-shrink-0 min-w-full min-h-full scale-x-[-1]' src={slideInfo?.bg_image} alt="" />
                            </div>
                        </div >
                    ))
                }
            </Slider >
            <div className='w-full lg:absolute left-0 -bottom-16 '>
                <div className='flex flex-wrap justify-center bg-white w-5/6 mx-auto lg:shadow-md rounded-sm py-1'>
                    <div className='border-r-0 sm:border-r my-3 w-1/2 md:w-1/3 lg:w-1/4 h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='p-2 rounded-full grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <FiSend className=' text-4xl text-green-600 ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Free Shipping</p>
                            <p className='uppercase text-gray-400 text-[12px]'>On Order $5000</p>
                        </div>
                    </div>
                    <div className='border-r-0  md:border-r my-3 w-1/2 md:w-1/3 lg:w-1/4 h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='p-2 rounded-full grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <BiSupport className=' text-4xl text-green-600 ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Support</p>
                            <p className='uppercase text-gray-400 text-[12px]'>LIFE TIME SUPPORT 24/7</p>
                        </div>
                    </div>
                    <div className='border-r-0 sm:border-r  lg:border-r my-3 w-1/2 md:w-1/3 lg:w-1/4 h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='p-2 rounded-full grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <SiLinktree className=' text-4xl text-green-600 ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>Help partner</p>
                            <p className='uppercase text-gray-400 text-[12px]'>HELP ALL ASPECTS</p>
                        </div>
                    </div>
                    <div className=' my-3 w-1/2 md:w-1/3 lg:w-1/4 h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group'>
                        <div className='p-2 rounded-full grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500'>
                            <RiHeadphoneLine className=' text-4xl text-green-600 ' />
                        </div>
                        <div>
                            <p className='uppercase font-semibold group-hover:text-green-600'>CONTACT WITH US</p>
                            <p className='uppercase text-gray-400 text-[12px]'>+8801935-015460</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FrontSlider;