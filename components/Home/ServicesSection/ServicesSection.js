import React from 'react';

const ServicesSection = () => {
    return (
        <div className='bg-white'>
            <div className='container mx-auto py-12'>
                <div className='flex flex-wrap gap-5 justify-center h-full'>
                    <div className='border  rounded-xl w-[19rem] h-full text-center shadow-lg bg-red-600 grid place-items-center px-3 py-3 cursor-pointer'>
                        <h2 className='text-2xl font-semibold '>Heading</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptate cupiditate a suscipit quia esse!</p>
                    </div>
                    <div className='border  rounded-xl w-[19rem] h-full text-center shadow-lg bg-yellow-500 grid place-items-center px-3 py-3 cursor-pointer'>
                        <h2 className='text-2xl font-semibold '>Heading</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptate cupiditate a suscipit quia esse!</p>
                    </div>
                    <div className='border  rounded-xl w-[19rem] h-full text-center shadow-lg bg-orange-600 grid place-items-center px-3 py-3 cursor-pointer'>
                        <h2 className='text-2xl font-semibold '>Heading</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptate cupiditate a suscipit quia esse!</p>
                    </div>
                    <div className='border  rounded-xl w-[19rem] h-full text-center shadow-lg bg-lime-600 grid place-items-center px-3 py-3 cursor-pointer'>
                        <h2 className='text-2xl font-semibold '>Heading</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam voluptate cupiditate a suscipit quia esse!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;