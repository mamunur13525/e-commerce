import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Shared/Button";

const inputList = [
  { id: 2, name: "name", placeholder: "Name*", type: "text", required: true },
  {
    id: 3,
    name: "email",
    placeholder: "Email*",
    type: "email",
    required: true
  },
  {
    id: 1,
    name: "message",
    placeholder: "Message",
    type: "textarea",
    required: false
  }
];
const BlogCommentSection = () => {
  const { handleSubmit, register } = useForm();

  const commentSubmit = (data) => {
    console.log({ data });
  };
  return (
    <div>
      <div className="mb-5 mt-16">
        <h1 className="font-semibold text-lg mb-5">LEAVE A COMMENT</h1>
        <form onSubmit={handleSubmit(commentSubmit)}>
          <div className="flex flex-col gap-4">
            {inputList.map((input) => (
              <div key={input.id}>
                {input.type === "textarea" ? (
                  <textarea
                    {...register(input.name, { required: input.required })}
                    cols="30"
                    rows="10"
                    placeholder={input.placeholder}
                    className="border  w-full py-2 px-4 focus:outline-1 outline-blue-400 duration-300"
                  />
                ) : (
                  <input
                    {...register(input.name, { required: input.required })}
                    type={input.type}
                    placeholder={input.placeholder}
                    className="border  w-full py-2 px-4 focus:outline-1 outline-blue-400 duration-300"
                  />
                )}
              </div>
            ))}
          </div>
          <Button withBck={true} classAdd="mt-5 w-fit" type="submit">
            Post Comment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BlogCommentSection;
