import Link from "next/link";
import React from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import Slider from "react-slick";
import { bloglists } from "../../../FakeData/FakeData";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <MdArrowForwardIos className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <MdOutlineArrowBackIosNew className={className} onClick={onClick} />;
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
        infinite: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    }
  ]
};

const Blogs = () => {
  return (
    <div className=" mt-8">
      {Array.isArray(bloglists) && bloglists.length ? (
        <Slider {...sliderSettings}>
          {bloglists.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Slider>
      ) : (
        <div className="flex flex-col items-center">
          <img
            className="w-20"
            src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png"
            alt=""
          />
          <p className="text-center text-2xl font-light">No Data!</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;

export const Blog = ({ blog }) => {
  return (
    <div className="w-full  my-5 cursor-pointer">
      <div className="w-[100%] px-3 cursor-pointer">
        <div className="h-fit md:h-[150px] lg:h-[245px] hover:rounded-3xl overflow-hidden transition-all duration-300">
          <Link href={`/blog/${blog.slug}`}>
            <img
              className="w-full hover:scale-110  duration-300"
              src={blog?.img}
              alt="prduct_image"
            />
          </Link>
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <div className="w-full">
            <p className="mt-2 text-gray-800">{blog?.publish_date}</p>
            <h1 className="block  text-3xl mt-2 mb-1 text-gray-800 hover:text-green-600 font-mediuml">
              {blog?.title}
            </h1>
            <p className="text-gray-500">
              Posted by{" "}
              <span className="text-gray-800 font-semibold">
                {blog?.posted_by}
              </span>
              - {blog?.comments?.length} comments
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
