import React from 'react';

const ChoseUs = () => {
    return (
        <div className='container mx-auto'>
            <div className='w-full lg:w-[760px] mx-auto text-center mb-16 '>
                <h1 className='text-5xl mb-5'>Why Choose Us</h1>
                <p className='text-[1rem] text-gray-500'>{`The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.`}</p>
                <div className={`mt-5 flex justify-center bg-repeat-x bg-center bg-scroll bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/bg-border-choose.png')]`}>
                    <div className='w-[70px]  bg-white flex  justify-center'>
                        <img src="//cdn.shopify.com/s/files/1/2179/9295/files/bg-border-center_small.png?v=1500449557" alt="icon" />
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center lg:justify-evenly gap-y-10 mt-16'>
                <div>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="//cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-1_small.png?v=1500449652" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>100% Organic</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-2_small.png?v=1501466275" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>Family healthy</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
                        <div className='flex items-center justify-center lg:justify-start gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-3_small.png?v=1501466301" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>100% Organic</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-left'>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                </div>
                <div>
                    <img src="https://cdn.shopify.com/s/files/1/2179/9295/files/images-choose_grande.jpg?v=1500449615" alt="image" />
                </div>
                <div className='text-right'>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
                        <div className='flex  justify-center lg:justify-end items-center gap-4 mb-3'>
                            <img src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-4_small.png?v=1501466320" />
                            <h3 className='text-2xl text-[#80b435]'>Always Fresh</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] text-center lg:text-right'>Suspendis text-center lg:text-leftse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
                        <div className='flex  justify-center lg:justify-end items-center gap-4 mb-3'>
                            <img className="icon-choose" src="https://cdn.shopify.com/s/files/1/2179/9295/files/icon-choose-5_small.png?v=1501466327" alt="icon-choose" />
                            <h3 className='text-2xl text-[#80b435]'>Family healthy</h3>
                        </div>
                        <p className='text-gray-500 text-[14px] lg:text-right text-center '>Suspendisse ultricies nisi vel quam suscipit, et rutrum odio porttitor. </p>
                    </div>
                    <div className="mb-20 w-10/12 lg:w-[15rem]">
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