import React from 'react';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import SliderCarousel from '../../Shared/Slider/SliderCarousel';

const AboutMainSection = () => {
    const slideImages = [
        {
            id: 0,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        },
        {
            id: 1,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider3.jpg?v=66774356843097709591500868956'
        },
        {
            id: 2,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider4.jpg?v=60691645197997793391500868956'
        },
        {
            id: 3,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        },
        {
            id: 4,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        },
        {
            id: 5,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        },
        {
            id: 6,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        },
        {
            id: 7,
            img: 'https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_image_slider2.jpg?v=111811760563340453851500868956'
        }
    ]
    return (
        <div className='container mx-auto  min-h-[41.4%] mb-auto'>
            <SectionTitle
                subtitleClass={'mt-16'}
                titleClass={'titleClass'}
                title={'A LITTLE STORY ABOUT US'}
                subtitle={'Welcome To Fresh Food'}
            />
            <div className='relative flex flex-wrap justify-between pb-20'>
                <div className='w-full lg:w-1/2 px-5  bg-white'>
                    <img className='w-full' src="https://cdn.shopify.com/s/files/1/2179/9295/t/5/assets/story_large_image.jpg?v=4494118035819335651500868955" alt="image" />
                </div>
                <div className=' w-full lg:w-1/2 '  >
                    <div className='hidden lg:block border border-green-600 absolute w-[60%] top-4 right-0 h-[87%] -z-[5] '>

                    </div>
                    <div>
                        <h1 className='mt-10 lg:mt-0 text-center  px-10 lg:px-0 lg:text-left text-3xl mb-6 bg-white w-full lg:w-fit lg:pr-16'>A FRIENDLY ONLINE STORY</h1>
                        <p className='text-center  px-10 lg:px-0 lg:text-left mb-6 pr-10 text-[17px] w-full text-gray-600'>
                            Lorem ipsum dolor sit ameconsecteturadipiscingelit. Curabiturutiaculis arcu. Proin tincidunt, ipsum nec vehicula euismnequnibhpretiumlorem at ornare risus sem et risus.
                        </p>
                        <p className='text-center  px-10 lg:px-0 lg:text-left mb-6 pr-10 text-[17px] w-full text-gray-600'>
                            Lorem ipsum dolor sit ameconsecteturadipiscingelit. Curabiturutiaculis arcu. Proin tincidunt, ipsum nec vehicula euismnequnibhpretiumlorem at ornare risus sem et risus.
                        </p>
                        <div className='text-center lg:px-0 lg:text-left px-6 pb-3 mt-8'>
                            {
                                Array.isArray(slideImages) &&
                                <SliderCarousel
                                    arrowSize={'3rem'}
                                    speed={500}
                                    infinite={true}
                                    slidesToShow={3}
                                    autoplay={true}
                                    autoplaySpeed={5000}
                                    arrowMove='.0rem'
                                >
                                    {
                                        slideImages.map(item => (
                                            <div className='pr-3' key={item.id}>
                                                <img className='w-[180px]' src={item.img} alt="" />
                                            </div>
                                        ))
                                    }
                                </SliderCarousel>
                            }
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutMainSection;