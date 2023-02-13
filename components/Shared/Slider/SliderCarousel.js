import React from 'react';
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


function SampleNextArrow(props) {
    const { className, arrowSize, arrowMove, onClick } = props;
    return (
        <IoIosArrowForward
            style={{ height: arrowSize, width: arrowSize, right: arrowMove }}
            className={`${className}`}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, arrowSize, arrowMove, onClick } = props;

    return (
        <IoIosArrowBack
            style={{ height: arrowSize, width: arrowSize, left: arrowMove }}
            className={`${className}`}
            onClick={onClick}
        />
    );
}

const SliderCarousel = ({ children, speed = 500, fade = false, infinite = true, slidesToScroll = 2, slidesToShow = 2, arrowMove = '2rem', arrowSize }) => {

    const sliderSettings = {
        infinite,
        fade,
        speed,
        slidesToShow,
        slidesToScroll,
        prevArrow: <SamplePrevArrow arrowSize={arrowSize} arrowMove={arrowMove} />,
        nextArrow: <SampleNextArrow arrowSize={arrowSize} arrowMove={arrowMove} />,
    };

    return (
        <Slider {...sliderSettings}>
            {children}
        </Slider>
    );
};

export default SliderCarousel;