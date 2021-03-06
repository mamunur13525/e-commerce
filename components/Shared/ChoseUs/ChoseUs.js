import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

const ChoseUs = ({ image = '', titleClass = '', subtitleClass = '', descriptionClass = '', title = '', subtitle = '', description = '' }) => {
    return (
        <div className='container mx-auto py-10 lg:pt-28'>
            <SectionTitle
                descriptionClass={descriptionClass}
                subtitleClass={subtitleClass}
                titleClass={titleClass}
                title={title}
                subtitle={subtitle}
                description={description}
            />
            <div className='flex flex-col lg:flex-row items-center lg:justify-evenly lg:gap-y-10 mt-0 md:mt-16'>
                <div>
                    <div className="mb-10 lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="//cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-1_small.png?v=1500449652" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>100% Organic</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-10 lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-2_small.png?v=1501466275" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>Family healthy</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className=" lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-3_small.png?v=1501466301" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>100% Organic</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                </div>
                <div>
                    <img src={image} alt="image" />
                </div>
                <div className='text-right'>
                    <div className="mb-10 lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex  justify-center lg:justify-end items-center gap-4 mb-3'>
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-4_small.png?v=1501466320" />
                            <h3 className='text-2xl text-[#80b435]'>Always Fresh</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-right'>Suspendis text-center lg:text-leftse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-10 lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex  justify-center lg:justify-end items-center gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-5_small.png?v=1501466327" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>Family healthy</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] lg:text-right text-center '>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-10 lg:mb-20 w-10/12 lg:w-[15rem] mx-auto">
                        <div className='flex  justify-center lg:justify-end items-center gap-4 mb-3'>
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-6_small.png?v=1501466334" />
                            <h3 className='text-2xl text-[#80b435]'>Always Fresh</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-right'>Suspendis tse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoseUs;