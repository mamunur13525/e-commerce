import Link from "next/link";
import React from "react";

const list = [
  {
    id: 1,
    title: "Veggies",
    sub_title: (
      <span>
        <strong>100%</strong> Organic Products
      </span>
    ),
    path: "",
    image:
      "https://groca.myshopify.com/cdn/shop/files/img-1.jpg?v=1614917996&width=1500",
    color: "#f0b0ae"
  },
  {
    id: 2,
    title: "Fruits",
    sub_title: (
      <span>
        <strong>100%</strong> Fresh Products
      </span>
    ),
    path: "",
    image:
      "https://groca.myshopify.com/cdn/shop/files/img-2.jpg?v=1614917996&width=1500",
    color: "#fddb4f"
  }
];
const BannerSection = () => {
  return (
    <div>
      <div className="container mx-auto h-full flex items-center gap-8 mt-20">
        {list?.map((item) => (
          <div
            key={item.id}
            className={`flex-1 relative group rounded-lg overflow-hidden`}
          >
            <div className="h-60">
              <img src={item?.image} alt="banner_image" className="h-full" />
            </div>

            <div
              style={{ backgroundColor: item?.color }}
              className="pl-12 pr-10 rounded-l-full h-full bg-transparent absolute right-0 top-0 gap-2  flex items-start justify-center flex-col group-hover:pl-16 duration-500"
            >
              <h4 className="text-2xl font-bold font-serif italic">
                {item?.title}
              </h4>
              <div>{item?.sub_title}</div>
              <Link href="/shop" >
                <span className="block !bg-[#e8601c] rounded-full text-sm font-semibold text-white px-3 py-1.5 hover:shadow-lg cursor-pointer">
                  Buy Now
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
