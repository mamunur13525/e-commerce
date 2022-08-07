import React, { useState, useEffect } from 'react';
import Button from '../Button';
import { FaPinterestP } from 'react-icons/fa';
import { IoLogoTwitter, IoLogoInstagram } from 'react-icons/io5';
import { ImFacebook } from 'react-icons/im';
import { BsArrow90DegUp, BsArrowRight } from 'react-icons/bs';

const Footer = () => {
    const [scrollUpShow, setScrollUpShow] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 200 ? setScrollUpShow(true) : setScrollUpShow(false
            );
        }
    };


    return (
        <div className='relative mt-40'>
            <div className='navImage'>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto pb-8 pt-12 px-10">
                    <div className="w-full flex flex-wrap flex-between">
                        <div className="w-full md:w-1/2 lg:w-3/12 mb-3">
                            <h1 className="text-[#80b435] text-xl mb-5">About  Us</h1>
                            <p className="text-[#2b2b2b] text-[15px]">With more than 15 years of experience we can proudly say that we are one of the best in business, a trusted supplier for more than 1000 companies...</p>
                            <p className="flex  items-center gap-1 text-[#80b435] hover:text-[#558512] text-xs mt-5 cursor-pointer">READ MORE <BsArrowRight /></p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/12 md:pl-5 lg:pl-5 mb-3">
                            <h1 className="text-[#80b435] text-xl mb-5">
                                Infomation</h1>
                            <ul className="list-none flex flex-col gap-3 text-gray-600">
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">Delivery</li>
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">Legal Notice</li>
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">Terms &amp; Conditions</li>
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">About Us</li>
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">Secure Payment</li>
                                <li className="cursor-pointer text-sm hover:text-[#80b435]">Our Stores</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/12  mb-3">
                            <h1 className="text-[#80b435] text-xl mb-5">Get It Touch</h1>
                            <ul className="list-none flex items-center gap-4">
                                <li className="cursor-pointer"><IoLogoTwitter className='text-xl text-[#80b435] hover:text-[#2b2b2b]' /></li>
                                <li className="cursor-pointer"><ImFacebook className='text-xl text-[#80b435] hover:text-[#2b2b2b]' /></li>
                                <li className="cursor-pointer"><IoLogoInstagram className='text-xl text-[#80b435] hover:text-[#2b2b2b]' /></li>
                                <li className="cursor-pointer"><FaPinterestP className='text-xl text-[#80b435] hover:text-[#2b2b2b]' /></li>
                            </ul>
                            <h1 className="mt-10  text-[#80b435] text-xl mb-5">Payment Accept</h1>
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/f1_payment1_img.png?v=169920717840467018591501466879" alt="" />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/12 md:pl-5 lg:pl-0  mb-3">
                            <h1 className="mt-4 md:mt-0 text-[#80b435] text-xl mb-5">
                                Get Newsletter</h1>
                            <p className="text-[#2b2b2b] text-[15px]">
                                Sed ut perpiciatis  unde omnix  iste  natus error sit voluptatem  accusantium</p>
                            <div className="w-full my-4">
                                <input type="email" placeholder="Place enter your email" name="" id="" className="w-full border bg-white py-3 px-2 text-sm text-gray-400 font-light focus:outline-none" />
                            </div>
                            <div>
                                <Button classAdd="flex  items-center gap-2 w-fit px-10">
                                    Subscribe  <BsArrowRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container py-4 px-10 mx-auto flex flex-wrap justify-between items-center text-sm font-light mb-3">
                    <span className="text-gray-500 mb-3 md:mb-0">
                        Copyright ©2017 Fresh Food-All Rights  Reserved
                    </span>
                    <div className="flex flex-wrap gap-4">
                        <ul className="flex items-center gap-3 text-gray-500 ">
                            <li>Contact us</li>
                            <li>Term of Use Privacy</li>
                            <li>Policy</li>
                            <li>Site Map</li>
                        </ul>
                        <span className="hidden  md:block w-1 mx-3 border-r border-gray-400">
                        </span>
                        <ul className="flex items-center gap-3 text-gray-500">
                            <li>Language: <span className="text-[#80b435] font-medium">
                                ENG</span>
                            </li>
                            <li>Price: <span className="text-[#80b435] font-medium">
                                USD</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className={`animate-bounce grid place-items-center shadow-2xl border border-gray-300 bg-gray-100 h-10 w-10 cursor-pointer fixed bottom-10 ${scrollUpShow ? 'right-0' : "-right-full"} transition-all duration-1000`}>
                <BsArrow90DegUp className='text-xl' />
            </div>

        </div >

    );
};

export default Footer;


