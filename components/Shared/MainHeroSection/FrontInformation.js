import React from "react";
import { BiSupport } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { RiHeadphoneLine } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";

const list = [
  {
    id: 1,
    title: "Free Shipping",
    sub_title: "On Order $5000",
    icon: <FiSend className=" text-4xl text-green-600 " />
  },
  {
    id: 2,
    title: "Support",
    sub_title: "LIFE TIME SUPPORT 24/7",
    icon: <BiSupport className=" text-4xl text-green-600 " />
  },
  {
    id: 3,
    title: "Help partner",
    sub_title: "HELP ALL ASPECTS",
    icon: <SiLinktree className=" text-4xl text-green-600 " />
  },
  {
    id: 4,
    title: "CONTACT WITH US",
    sub_title: "+8801935-015460",
    icon: <RiHeadphoneLine className=" text-4xl text-green-600 " />
  }
];

const FrontInformation = () => {
  return (
    <div className="w-full lg:absolute left-0 -bottom-16 ">
      <div className="flex flex-wrap justify-center bg-white w-5/6 mx-auto lg:shadow-md rounded-sm py-1">
        {list?.map((item) => (
          <div
            key={item.id}
            className="border-r-0 sm:border-r my-3 w-1/2 md:w-1/3 lg:w-1/4 h-full text-center flex flex-col  gap-5 items-center px-3 py-2 cursor-pointer group"
          >
            <div className="p-2 rounded-full grid place-items-center group-hover:rotate-[360deg] transition-transform duration-500">
              {item?.icon}
            </div>
            <div>
              <p className="uppercase font-semibold group-hover:text-green-600">
                {item?.title}
              </p>
              <p className="uppercase text-gray-400 text-[12px]">
                {item?.sub_title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontInformation;
