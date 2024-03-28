import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../contexts/index";

const Home = () => {
  const date = new Date();
  const navigate = useNavigate();
  const { blog } = useContext(BlogContext);
  const openBlog = (blogItem) => {
    // console.log(blogItem);
    navigate("/view-blog", { state: { blog: blogItem } });
  };

  const shortContent = (words) => {
    words = words.split(" ");
    for (let index = 0; index < words.length; index++) {
      if (index >= 12 && words[index].endsWith(".")) {
        const extractedWords = words.slice(0, index + 1).join(" ");
        return extractedWords;
      }
    }
    return words.join(" ") + " . . . ";
  };

  return (
    <div className="mt-12 ">
      {blog.map((blogItem, index) => (
        <div
          key={index}
          className="cursor-pointer mb-8"
          onClick={() => openBlog(blogItem)}
        >
          <div className="flex gap-6 items-start">
            <div className="">
              <img
                className="w-[370px] rounded-lg h-56"
                src={`http://localhost:9700/${blogItem.img}`}
                alt="Blog Image"
              />
            </div>
            <div className="w-8/12 flex flex-col gap-3">
              <h1 className="font-semibold text-3xl mb-4 mt-0">
                {blogItem.title}
              </h1>
              <p className="-mt-[21px] font-light text-[15px] text-gray-600 mb-2">
                <span className="mr-3 font-medium text-black">
                  {blogItem.user}
                </span>
                {new Date(blogItem.updatedAt).toLocaleString("PST")}
              </p>

              <p className=" font-normal text-black-800">
                {shortContent(blogItem.text)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
