import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../../contexts";
import { enqueueSnackbar } from "notistack";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddComment from "../Comment/AddComment";

const View = () => {
  const { userInfo } = useContext(UserContext);
  const { fetchBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const blog = useLocation();

  const viewBlog = () => {
    fetchBlog();
  };
  const editBlog = () => {
    if (userInfo.username === blog.state.blog.user)
      navigate("/update-blog", { state: { blog: blog } });
    else {
      enqueueSnackbar("You cannot edit this blog", { variant: "error" });
    }
  };

  const deleteBlog = () => {
    if (userInfo.username === blog.state.blog.user)
      navigate("/delete-blog", { state: { blog: blog } });
    else {
      enqueueSnackbar("You cannot delete this blog", { variant: "error" });
    }
  };

  useEffect(() => viewBlog(), []);
  return (
    <>
      <div className="mt-9 flex flex-col justify-center items-center gap-2">
        <span className="flex gap-3 items-center justify-around">
          <h1 className="font-semibold text-[28px]">{blog.state.blog.title}</h1>
          <RiDeleteBin5Line
            onClick={deleteBlog}
            className="text-red-700 cursor-pointer"
            size={22}
          />
        </span>
        <p className="font-extralight text-[13px] text-gray">
          {new Date(blog.state.blog.updatedAt).toLocaleString("PST")}
        </p>
        <p className="text-[13px] font-medium text-black">{`by ${blog.state.blog.user}`}</p>
        <button
          onClick={editBlog}
          className="w-44 h-9 rounded-md border-2 mb-3 text-white bg-black text-[15px]"
        >
          Edit this post
        </button>
        <div className="w-full">
          <img
            className=" w-full h-[400px] "
            src={`http://localhost:9700/${blog.state.blog.img}`}
            ></img>
        </div>
        <p className="mt-6">{blog.state.blog.text}</p>
      </div>
      <AddComment blogId={blog.state.blog._id} />
    </>
  );
};
export default View;
