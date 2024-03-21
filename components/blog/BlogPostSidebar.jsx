import Link from "next/link";
import React from "react";
import { itemLists } from "../../FakeData/FakeData";

const BlogPostSidebar = () => {
  return (
    <div>
      <div className="border  shadow-lg px-5 py-4">
        <h1 className="font-semibold text-lg mb-5 uppercase">Category</h1>
        <ul className="flex flex-col gap-3 text-sm text-gray-600">
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item}>list {item}</li>
          ))}
        </ul>
      </div>
      <div className="my-7">
        <img
          src="https://demo.posthemes.com/pos_greenfarm/layout2/modules/ps_advertising/img/advertising-s2.jpg"
          alt="poster_image"
          className="w-full"
        />
      </div>
      <div className="border bg-white">
        <h1 className="font-semibold text-lg mb-5 uppercase px-5 py-5">
          Recommended
        </h1>
        <ul className="flex flex-col text-sm text-gray-600">
          {itemLists.slice(0, 5).map((item) => (
            <li key={item.id} className="w-full border-b">
              <Link href="/item">
                <div className="group flex items-start gap-5  last:border-b-0 h-[150px] py-5 px-4">
                  <div className="w-4/12">
                    <img
                      className="group-hover:-translate-y-2 duration-300"
                      src={item.image}
                      alt="product_image"
                    />
                  </div>
                  <div className="flex-1 flex flex-col h-full pt-2 gap-1 cursor-pointer">
                    <p className="hover:text-[#80BB01] duration-300 ">
                      {item.name}
                    </p>
                    <p className="font-medium text-lg text-black uppercase hover:text-[#80BB01] duration-300 ">
                      {item.name}
                    </p>
                    <p className="text-lg font-medium text-[#80BB01] mt-3">
                      {item.price ? "$" : ""}
                      {item.price}.00
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h1 className="font-semibold text-lg mb-2 uppercase mt-5 py-5">
        Hot Tags
      </h1>
      <hr className=" mb-6" />
      <div className="flex flex-wrap gap-3">
        {["Bags", "Seatshirts", "Man", "suits", "hoodies", "women"].map(
          (item) => (
            <span
              key={item}
              className="bg-[#EBEBEB] hover:bg-[#80BB01] hover:text-white py-1 px-4 duration-300 cursor-pointer rounded-lg text-sm text-gray-600"
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPostSidebar;
