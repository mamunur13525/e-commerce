import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsTelephone } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';


let categoryFoods = [
    {
        id: 0,
        name: 'Fruit',
        items: [
            { id: 0, name: 'Seatings' },
            { id: 1, name: 'Tables' },
            { id: 2, name: 'Accessories' },
            { id: 3, name: 'Series' },
        ]
    },
    {
        id: 1,
        name: 'Vegetables',
        items: [
            { id: 0, name: 'Lighting' },
            { id: 1, name: 'storage' },
            { id: 2, name: 'Accessories' },
            { id: 3, name: 'beds' },
        ]
    },
    {
        id: 2,
        name: 'nut',
        items: [
            { id: 0, name: 'cleaning' },
            { id: 1, name: 'tools' },
            { id: 2, name: 'waste bins pots & pans' },
            { id: 3, name: 'beds' },
        ]
    },
    {
        id: 3,
        name: 'Organic',
        items: [
            { id: 0, name: 'Seatings' },
            { id: 1, name: 'Tables' },
            { id: 2, name: 'Accessories' },
            { id: 3, name: 'Series' },
        ]
    },
]
const NabarNav = [
    {
        id: 0,
        path: '/',
        text: 'Home',
        content: <ul className='w-[10rem] list-disc px-5'>
            <li className='py-2 border-b cursor-pointer hover:text-green-700'>Home 1</li>
            <li className='py-2 border-b cursor-pointer hover:text-green-700'>Home 2</li>
            <li className='py-2 border-b cursor-pointer hover:text-green-700'>Home 3</li>
            <li className='py-2 border-b cursor-pointer hover:text-green-700'>Home 4</li>
            <li className='py-2 cursor-pointer hover:text-green-700'>Home 5</li>
        </ul>
    },
    {
        id: 1,
        path: '/about',
        text: 'About',
        content: <div className='w-[80vw] py-3 px-5'>
            <img className='w-full' src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/megamenu_1_image.jpg?v=114805082236215743311501465503" alt="image" />
            <div className='flex justify-between gap-5 mt-5'>
                {categoryFoods && categoryFoods.map(category => (
                    <ul className='flex flex-col w-1/4' key={category?.id}>
                        <li className='font-semibold capitalize text-xl border-b text-black pb-2'>{category?.name}</li>
                        {
                            category.items && category?.items.map(item => (
                                <li key={item?.id} className='font-light capitalize border-b py-2 hover:text-green-700 cursor-pointer'>{item?.name}</li>
                            ))
                        }
                    </ul>
                ))}
            </div>
        </div>
    },
    {
        id: 2,
        path: '/services',
        text: 'Services',
        content: <div className='w-fit flex gap-5 list-disc px-5 h-[16em] items-center' >
            <ul className='w-[10rem]'>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 1</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 2</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 3</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 4</li>
                <li className='py-3 cursor-pointer hover:text-green-700'>Services 5</li>
            </ul>
            <ul className='w-[10rem]'>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 1</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 2</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 3</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 4</li>
                <li className='py-3 cursor-pointer hover:text-green-700'>Services 5</li>
            </ul>
            <div className='w-[10rem]'>
                <img className='w-full' src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=696&q=80" alt="image" />
            </div>
        </div>
    }
]
const Navbar = () => {
    const [showingSearch, setShowingSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const cartRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (showCart && cartRef.current && !cartRef.current.contains(e.target)) {
                setShowCart(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showCart])


    return (

        <nav className="bg-white border-gray-200 h-[8.3rem]">
            <div className='absolute top-0 z-40 w-full  px-10 lg:px-20 md:px-15 py-4'>
                <div className="container flex justify-between items-center mx-auto mb-3">
                    <div className='w-1/3'>
                        <div className='flex gap-1 items-center'>
                            <CgProfile />
                            My Account
                        </div>
                        <div className='flex gap-1 items-center'>
                            <BsTelephone />
                            <span className='text-green-500'>+8801935-015460</span>
                        </div>
                    </div>
                    <Link href="/" className='w-auto '>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/h1_logo1.png?v=53464895439087604121500261105" className="h-12" alt="Flowbite Logo" />
                            {/* <span className=" whitespace-nowrap text-4xl">Fresh Food</span> */}
                        </div>
                    </Link>
                    <div className='flex justify-end gap-4 w-1/3 '>
                        <div className='relative'>
                            <input className={`absolute top-[-5px] right-8 shado px-2 py-1 text-gray-700 border border-gray-500 rounded-md focus:outline-none  ${showingSearch ? 'w-[15rem] opacity-100 visible' : 'opacity-0 w-[0rem] invisible'}  transition-all duration-500`} type="search" name="search_item" placeholder='Search..' />
                            <IoSearch onClick={() => setShowingSearch(prev => !prev)} className='text-2xl cursor-pointer' />
                        </div>
                        <div className='relative'>
                            <FiShoppingBag onClick={() => setShowCart(prev => !prev)} className='text-2xl cursor-pointer' />
                            <span className='absolute -right-2 -bottom-2 bg-green-500 text-white w-4 h-4 text-xs font-semibold grid place-items-center rounded-full'>
                                4
                            </span>
                            <DropDownItems cartRef={cartRef} visibility={showCart} classAdd=''>
                                <ul className='w-32'>
                                    <li className='py-1 px-3 hover:bg-slate-200'>Item 1</li>
                                    <li className='py-1 px-3 hover:bg-slate-200'>Item 1</li>
                                    <li className='py-1 px-3 hover:bg-slate-200'>Item 1</li>
                                </ul>
                            </DropDownItems>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='flex justify-center sticky top-0'>
                    <ul className="flex gap-4 mt-4">
                        {
                            NabarNav.map(nav => (
                                <NavItem nav={nav} key={nav.id} />
                            ))
                        }
                    </ul>
                </div>
            </div >
        </nav>

    );
};

export default Navbar;

const NavItem = ({ nav }) => {
    const [dropShow, setDropShow] = useState(false);
    let pathname = '/'
    return (
        <li
            onMouseEnter={() => setDropShow(true)}
            onMouseLeave={() => setDropShow(false)}
            className='relative group'
        >
            <span className={`block uppercase font-serif font-bold text-xl py-2 pr-4text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === nav.path ? 'text-green-700' : ''}`}><Link href={nav.path}>{nav.text}</Link></span>
            <DropDownItems visibility={dropShow} classAdd='py-3 px-1'>
                {nav.content}
            </DropDownItems>
        </li >
    )
}




const DropDownItems = ({ cartRef = null, classAdd, children, visibility = false }) => {
    return (
        <div ref={cartRef} className={`absolute z-30  top-7 left: 0
        right: 0 shadow-lg border py-2 bg-white flex translate-y-5  transition-all duration-500 translate-x-[-44%] ${visibility ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0'} ${classAdd}`}>
            {children}
        </div>
    )
}   