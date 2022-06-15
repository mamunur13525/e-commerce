import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { BsTelephone } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { IoSearch, IoCloseSharp } from 'react-icons/io5';
import { GrClose } from 'react-icons/gr';
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
// import { IoCloseSharp } from 'react-icons/ai';
import { useRouter } from 'next/router';
import SearchGlobal from '../SearchGlobal/SearchGlobal';
import CartSidebar from '../Cart/CartSidebar';

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
const NavbarNav = [
    {
        id: 0,
        path: '/',
        text: 'Home',
        content:
            <ul className='bg-white border md:border-0 w-[10rem] list-disc px-5'>
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
        content: <div className='bg-white border md:border-0 ml-32 md:ml-0 w-[80vw] py-3 px-5'>
            <img className='w-full' src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/megamenu_1_image.jpg?v=114805082236215743311501465503" alt="image" />
            <div className='flex justify-between gap-5 mt-5'>
                {Array.isArray(categoryFoods) && categoryFoods.map(category => (
                    <ul className='flex flex-col w-1/4' key={category?.id}>
                        <li className='font-semibold capitalize text-xl border-b text-black pb-2'>{category?.name}</li>
                        {
                            Array.isArray(category.items) && category?.items.map(item => (
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
        content: <div className='bg-white border md:border-0 w-[25rem] md:w-[40rem] flex gap-5 list-disc p-4 h-[16em] items-center' >
            <ul className='w-1/3'>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 1</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 2</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 3</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 4</li>
                <li className='py-3 cursor-pointer hover:text-green-700'>Services 5</li>
            </ul>
            <ul className='w-1/3'>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 1</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 2</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 3</li>
                <li className='py-3 border-b cursor-pointer hover:text-green-700'>Services 4</li>
                <li className='py-3 cursor-pointer hover:text-green-700'>Services 5</li>
            </ul>
            <div className='w-1/3'>
                <img className='w-full' src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=696&q=80" alt="image" />
            </div>
        </div>
    }
]
const Navbar = () => {
    const [showingSearch, setShowingSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [stickyClass, setStickyClass] = useState('-translate-y-20');
    const [showNavs, setShowNavs] = useState(false);
    const sideNavRef = useRef(null);



    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 200 ? setStickyClass('translate-[0!important]') : setStickyClass('-translate-y-20');
        }
    };
    useEffect(() => {
        if (showCart) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "unset";
        }
    }, [showCart])

    return (
        <nav className={`relative shadow-sm bg-white border-gray-200 h-[4.8rem] md:h-[8.3rem]`}>
            <div onClick={() => setShowCart(false)} className={`fixed left-0 top-0 w-full h-full ${showCart ? 'z-[120] opacity-50' : 'z-[-2] opacity-0'} bg-gray-900  transition-all`} >
            </div>
            <CartSidebar cart={[showCart, setShowCart]} />
            <SearchGlobal showingSearch={showingSearch} setShowingSearch={setShowingSearch} />
            <div className='absolute left-0 top-0 z-40 w-full  px-10 lg:px-20 md:px-15 py-4'>
                <div ref={sideNavRef} className={`fixed w-full ${showNavs ? "left-0" : "-left-full"} top-0 h-screen bg-gray-800 z-[150] text-white transition-all `}>
                    <p className='flex items-center justify-between  text-white text-2xl p-4 text-center font-semibold'>
                        <span>Navbar</span>
                        <IoCloseSharp onClick={() => setShowNavs(false)} className='text-xl text-white cursor-pointer' />
                    </p>
                    <NavItemAccordion setShowNavs={setShowNavs} />
                </div>
                <div className="container flex justify-between items-center mx-auto mb-3">
                    <div className='w-1/3'>
                        <div className='md:hidden'>
                            <GrClose onClick={() => setShowNavs(false)} className={`${showNavs ? '' : 'hidden'}  cursor-pointer text-[25px]`} />
                            <RiBarChartHorizontalLine onClick={() => setShowNavs(true)} className={`${showNavs ? 'hidden' : ''}  cursor-pointer text-[25px]`} />
                        </div>
                        <div className='hidden md:flex gap-1 items-center'>
                            <CgProfile />
                            My Account
                        </div>
                        <div className='hidden md:flex gap-1 items-center'>
                            <BsTelephone />
                            <span className='text-green-500'>+8801935-015460</span>
                        </div>
                    </div>
                    <Link href="/" className='w-auto' passHref>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/h1_logo1.png?v=53464895439087604121500261105" className="h-12" alt="Flowbite Logo" />
                        </div>
                    </Link>
                    <div className='flex justify-end gap-4 w-1/3 '>
                        <div className='relative'>
                            <IoSearch onClick={() => setShowingSearch(prev => !prev)} className='text-2xl cursor-pointer' />
                        </div>
                        <div className='relative'>
                            <FiShoppingBag onClick={() => setShowCart(true)} className='text-2xl cursor-pointer' />
                            <span className='absolute -right-2 -bottom-2 bg-green-500 text-white w-4 h-4 text-xs font-semibold grid place-items-center rounded-full'>
                                4
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <NavbarPosition setShowCart={setShowCart} setShowingSearch={setShowingSearch} showProfileCart={false} setShowNavs={setShowNavs} classAdd='hidden md:flex py-2 mt-2  justify-center' NavbarNav={NavbarNav} />
                <NavbarPosition setShowCart={setShowCart} setShowingSearch={setShowingSearch} showNavs={showNavs} setShowNavs={setShowNavs} showProfileCart={true} classAdd={`shadow-sm  fixed top-0 left-0 justify-between py-4  ${stickyClass}`} NavbarNav={NavbarNav} />
            </div >
        </nav>

    );
};

export default Navbar;

const NavbarPosition = ({ setShowCart, setShowingSearch, showNavs, setShowNavs, showProfileCart, NavbarNav, classAdd = '' }) => {

    return (
        <div className={`flex justify-between  w-full bg-white items-center px-10 lg:px-20 ${classAdd} duration-500  transition-transform z-50`}>
            <div className='md:hidden w-1/3'>
                <RiBarChartHorizontalLine onClick={() => setShowNavs(true)} className={`cursor-pointer text-[25px]`} />
            </div>
            {
                showProfileCart &&
                <Link href="/" passHref>
                    <div className="cursor-pointer w-1/3">
                        <img src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/h1_logo1.png?v=53464895439087604121500261105" className="h-12  w-fit md:h-10" alt="Flowbite Logo" />
                        {/* <span className=" whitespace-nowrap text-4xl">Fresh Food</span> */}
                    </div>
                </Link>
            }
            <div className='hidden w-full md:block mx-auto'>
                <ul className="flex justify-center gap-4">
                    {
                        Array.isArray(NavbarNav) && NavbarNav.map(nav => (
                            <NavItem nav={nav} key={nav.id} />
                        ))
                    }
                </ul>
            </div>
            {
                showProfileCart &&
                <div className='flex justify-end gap-4 w-1/3 '>
                    <div className='relative'>
                        <IoSearch onClick={() => setShowingSearch(prev => !prev)} className='text-2xl cursor-pointer' />
                    </div>
                    <div className='relative'>
                        <FiShoppingBag onClick={() => setShowCart(true)} className='text-2xl cursor-pointer' />
                        <span className='absolute -right-2 -bottom-2 bg-green-500 text-white w-4 h-4 text-xs font-semibold grid place-items-center rounded-full'>
                            4
                        </span>
                    </div>
                </div>
            }
        </div >
    )
}

const NavItem = ({ nav }) => {
    const [dropShow, setDropShow] = useState(false);
    let pathname = '/'
    return (
        <li
            onMouseEnter={() => setDropShow(true)}
            onMouseLeave={() => setDropShow(false)}
            className='relative group'
        >
            <span className={`block uppercase font-serif font-bold text-xl py-2 pr-4text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === nav.path ? 'text-green-700' : ''}`}>
                <Link href={`${nav.path}`} passHref>
                    {nav.text}
                </Link>
            </span>
            <DropDownItems visibility={dropShow} classAdd='py-3 px-1'>
                {nav.content}
            </DropDownItems>
        </li >
    )
}




const DropDownItems = ({ cartRef = null, classAdd, children, visibility = false }) => {
    return (
        <div ref={cartRef} className={`absolute z-30  top-10 left: 0
        right: 0 shadow-lg md:bg-white py-2  flex translate-y-5  transition-all duration-500 md:translate-x-[-44%] translate-x-[-50%] ${visibility ? 'visible translate-y-0 opacity-100' : 'invisible opacity-0'} ${classAdd}`}>
            {children}
        </div>
    )
}




const NavItemAccordion = ({ setShowNavs }) => {
    const [showAccordion, setShowAccordion] = useState(null)
    const router = useRouter();
    let data = [
        {
            id: 0,
            title: 'Home',
            content: [
                { id: 0, name: 'Home1', link: '/hom1' },
                { id: 1, name: 'Home1', link: '/hom1' },
                { id: 2, name: 'Home1', link: '/hom1' },
                { id: 3, name: 'Home1', link: '/hom1' },
                { id: 4, name: 'Home1', link: '/hom1' }
            ]
        },
        {
            id: 1,
            title: 'About',
            content: [
                { id: 0, name: 'Home1', link: '/hom1' },
                { id: 1, name: 'Home1', link: '/hom1' },
                { id: 2, name: 'Home1', link: '/hom1' },
                { id: 3, name: 'Home1', link: '/hom1' },
                { id: 4, name: 'Home1', link: '/hom1' }
            ]
        },
        {
            id: 2,
            title: 'Services',
            content: [
                { id: 0, name: 'Home1', link: '/hom1' },
                { id: 1, name: 'Home1', link: '/hom1' },
                { id: 2, name: 'Home1', link: '/hom1' },
                { id: 3, name: 'Home1', link: '/hom1' },
                { id: 4, name: 'Home1', link: '/hom1' }
            ]
        }
    ]

    return (
        <div>
            {

                Array.isArray(data) && data.map(item => (
                    <div
                        key={item.id}
                        className='flex flex-col justify-center  px-5'
                    >
                        <div className='flex justify-between gap-4 items-center cursor-pointer border-b border-gray-50'>
                            <p onClick={() => { router.push(item.title.toLowerCase()); setShowNavs(false) }} className={`${showAccordion === item.id ? 'text-[#80b435]' : ''} text-xl py-3 font-medium duration-200 w-fit`}>{item.title}</p>
                            <div
                                onClick={() => { showAccordion === item.id ? setShowAccordion(null) : setShowAccordion(item.id) }}
                                className='w-full flex justify-end'
                            >
                                <AiOutlinePlus className={`text-2xl ${showAccordion === item.id ? 'rotate-[135deg]' : ''} transition-transform duration-200`} />
                            </div>
                        </div>
                        <ul className={`${showAccordion === item.id ? 'min-h-fit mt-2 mb-3' : 'max-h-0'}  transition-all   overflow-hidden duration-200 px-3`}>
                            {
                                Array.isArray(item.content) && item.content.map(li => (
                                    <li
                                        key={li.id}
                                        className='py-2 border-b border-dashed border-gray-100'
                                    >{li.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }

        </div >
    )
}
