import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";
import SliderCarousel from "../Slider/SliderCarousel";

let sliderInfos = [
  {
    id: 0,
    title: "This is First page.",
    subTitle: "this is the subtitle",
    bg_image:
      "https://groca.myshopify.com/cdn/shop/files/slider-3.jpg?v=1614918563",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!"
  },
  {
    id: 1,
    title: "This is Second page.",
    subTitle: "this is the subtitle",
    bg_image:
      "https://groca.myshopify.com/cdn/shop/files/slider-2.jpg?v=1614918563",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!"
  },
  {
    id: 2,
    title: "This is Third page.",
    subTitle: "this is the subtitle",
    bg_image:
      "https://groca.myshopify.com/cdn/shop/files/slider-1.jpg?v=1614918563",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit neque earum veniam quis deleniti aperiam mollitia voluptatibus iusto exercitationem explicabo!"
  }
];
const HeroSlider = () => {
  const router = useRouter();

  return (
    <SliderCarousel
      speed={500}
      infinite={true}
      slidesToScroll={1}
      slidesToShow={1}
      autoplay={true}
      autoplaySpeed={5000}
      arrowSize="4rem"
    >
      {Array.isArray(sliderInfos) &&
        sliderInfos.map((slideInfo) => (
          <div
            key={slideInfo.id}
            className={`h-full md:pb-5 lg:h-screen mx-auto  shadow rounded-md relative`}
          >
            <div className="  flex flex-col h-full items-center justify-center mx-auto relative z-20">
              <div className="w-full mb-16 text-center animate-waving-hand">
                <h1 className="mt-10     font-sans font-light text-4xl md:text-6xl lg:text-7xl text-green-600 drop-shadow-2xl uppercase">
                  {slideInfo.title}
                </h1>
                <p className=' w-7/12 mx-auto font-sans text-xl md:text-3xl mt-1 md:mt-3 capitalize'>{slideInfo.subTitle}</p>
                <p className="mx-auto w-10/12 md:w-7/12 mt-1 md:mt-10 cursor-pointer text-xl">
                  {slideInfo.description}
                </p>
                <Button
                  clickFunc={() => router.push("/shop")}
                  withBck={false}
                  classAdd="max-w-fit mt-10 px-10 "
                >
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="w-full  h-full  flex justify-center items-center overflow-hidden absolute left-0 top-0">
              <img
                className="flex-shrink-0 min-w-full min-h-full scale-x-[-1]"
                src={slideInfo?.bg_image}
                alt=""
              />
            </div>
          </div>
        ))}
    </SliderCarousel>
  );
};

export default HeroSlider;
