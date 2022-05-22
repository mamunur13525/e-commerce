import React from 'react';
import { bloglists } from '../../../FakeData/FakeData';
import Slider from "react-slick";
import { MdFavoriteBorder, MdOutlineArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';


function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <MdArrowForwardIos
            className={className}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <MdOutlineArrowBackIosNew
            className={className}
            onClick={onClick}
        />
    );
}


const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Blogs = () => {
    return (
        <div className=' mt-8'>
            <Slider {...sliderSettings}>
                {
                    bloglists && bloglists.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    ))
                }
            </Slider>
        </div>
    );
};

export default Blogs;


const Blog = ({ blog }) => {
    return (
        <div className='w-[90%] my-5 cursor-pointer'>
            <div className='h-[245px]  overflow-hidden'>
                <img className='w-full hover:scale-110 transition-transform duration-300' src={blog?.img} alt="prduct_image" />
            </div>
            <div className='w-full'>
                <p className='mt-2 text-gray-800'>{blog?.publish_date}</p>
                <h1 className='text-3xl mt-2 mb-1 text-gray-800 hover:text-green-600 font-mediuml'>{blog?.title}</h1>
                <p className='text-gray-500'>Posted by <span className='text-gray-800 font-semibold'>{blog?.posted_by}</span>- {blog?.comments?.length} comments</p>
            </div>
        </div>
    )
}