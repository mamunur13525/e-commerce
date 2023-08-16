import React from "react";
import { bloglists } from "../../FakeData/FakeData";
import BlogCommentSection from "./BlogCommentSection";
import BlogPostSidebar from "./BlogPostSidebar";

const SingleBlogPost = ({ slug }) => {
  const findBlog = bloglists.find((blog) => blog.slug === slug);
  return (
    <div className="container mx-auto flex justify-between gap-16 py-10">
      <div className="flex-1">
        <div className="w-full ">
          <img className="w-full" src={findBlog?.img} alt="prduct_image" />
        </div>
        <h1 className="text-lg font-medium uppercase mt-6 mb-3">
          {findBlog?.title}
        </h1>
        <p className="text-gray-500 text-sm">
          Posted By{" "}
          <span className="font-medium text-gray-700">
            {findBlog?.posted_by}{" "}
          </span>{" "}
          | {findBlog?.publish_date} |
        </p>
        <p className="my-7 text-gray-600">{findBlog?.description}</p>
        <hr className="my-10" />
        <BlogCommentSection />
      </div>
      <div className="w-[350px] ">
        <BlogPostSidebar />
      </div>
    </div>
  );
};

export default SingleBlogPost;
