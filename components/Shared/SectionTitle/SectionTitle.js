import React from 'react';

const SectionTitle = ({ titleClass = '', subtitleClass = '', descriptionClass = '', title = '', subtitle = '', description = '' }) => {
    return (
        <div className='w-full lg:w-[760px] px-5 mx-auto text-center mb-10 lg:mb-16 '>
            {
                subtitle !== '' &&
                <h1 className={`text-[#80b435] text-3xl mb-6  ${subtitleClass}`}>{subtitle}</h1>
            }
            <h1 className={`text-5xl mb-5 ${titleClass}`}>{title}</h1>
            <p className={`text-[1rem] text-gray-500 ${descriptionClass}`}>
                {
                    description !== '' &&
                    `The fact of the matter is that you really know something's organic when you find bugs! they obviously wouldn't have made it that far in a non-organic growing environment, so better than any certification or seal on a package, the presence of creatures let you know the plant was healthy and.`
                }
            </p>
            <div className={`mt-5 flex justify-center bg-repeat-x bg-center bg-scroll bg-[url('https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/bg-border-choose.png')]`}>
                <div className='w-[70px]  bg-white flex  justify-center'>
                    <img src="//cdn.shopify.com/s/files/1/2179/9295/files/bg-border-center_small.png?v=1500449557" alt="icon" />
                </div>
            </div>
        </div>
    );
};

export default SectionTitle;