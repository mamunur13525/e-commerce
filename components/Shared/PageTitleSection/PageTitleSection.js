import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const PageTitleSection = ({ title, img }) => {
    const { pathname } = useRouter()
    const [pathAr, setPathAr] = useState([])

    useEffect(() => {
        setPathAr(pathname.split('/'))
        console.log(pathname.split('/'))
    }, [])

    return (
        <div style={{ backgroundImage: `url(${img})` }} className={`bg-white flex flex-col items-center justify-center h-48`}>
            <h1 className='text-4xl md:text-5xl lg:text-6xl uppercase font-serif text-white '>{title}</h1>
            <p className='text-white font-light mt-3 text-base'>
                Home {pathAr.map((item, ind) => <span key={ind}>{item === '' ? null : ` / ${item}`}</span>)}
            </p>
        </div>
    );
};

export default PageTitleSection;