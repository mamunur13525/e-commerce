import React from 'react';

const Footer = () => {
    return (
        <div className='bg-slate-800'>
            <div className='container mx-auto text-white py-4 px-10'>
                <div className='w-full flex flex-between gap-3'>
                    <div className='w-full'>
                        <h1>Title</h1>
                        <ul className='list-none flex flex-col gap-3'>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <h1>Title</h1>
                        <ul className='list-none flex flex-col gap-3'>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <h1>Other Link</h1>
                        <ul className='list-none flex flex-col gap-3'>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <h1>Social Links</h1>
                        <ul className='list-none flex flex-col gap-3'>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                            <li className='cursor-pointer'>#Link</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;