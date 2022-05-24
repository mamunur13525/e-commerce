import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const PageTitleSection = () => {
    const { pathname } = useRouter()
    const [pathAr, setPathAr] = useState([])

    useEffect(() => {
        setPathAr(pathname.split('/'))
        console.log(pathname.split('/'))
    }, [])

    return (
        <div className={`bg-white flex flex-col items-center justify-center h-48 bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/breadcrumb_image_5.jpg?v=26308687731726529481500869779')]`}>
            <h1 className='text-6xl uppercase font-serif text-white '>About Us.</h1>
            <p className='text-white font-light mt-3 text-base'>
                Home {pathAr.map((item, ind) => <span key={ind}>{item === '' ? null : ` / ${item}`}</span>)}
            </p>
        </div>
    );
};

export default PageTitleSection;