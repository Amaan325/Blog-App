import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BlogContext, UserContext } from "../../contexts";
import { enqueueSnackbar } from "notistack";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddComment from "../Comment/AddComment";

const View = () => {
  const { userInfo } = useContext(UserContext);
  const { fetchBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const blog = useLocation();

  useEffect(() => {
    fetchBlog();
  }, []);

  const editBlog = () => {
    if (userInfo.username === blog.state.blog.user) {
      navigate("/update-blog", { state: { blog: blog } });
    } else {
      enqueueSnackbar("You cannot edit this blog", { variant: "error" });
    }
  };

  const deleteBlog = () => {
    if (userInfo.username === blog.state.blog.user) {
      navigate("/delete-blog", { state: { blog: blog } });
    } else {
      enqueueSnackbar("You cannot delete this blog", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-snug">
            {blog.state.blog.title}
          </h1>
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
            <p>{new Date(blog.state.blog.updatedAt).toLocaleString("en-US", { timeZone: "Asia/Karachi" })}</p>
            <p className="font-medium text-black">{`by ${blog.state.blog.user}`}</p>
          </div>
        </div>

        {/* Image */}
        <div className="mb-6">
          <img
            src={`http://localhost:9700/${blog.state.blog.img}`}
            alt="Blog Visual"
            className="rounded-lg w-full h-[400px] object-fit"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={editBlog}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-all text-sm"
          >
            Edit this post
          </button>
          <RiDeleteBin5Line
            onClick={deleteBlog}
            className="text-red-700 hover:text-red-900 cursor-pointer"
            size={22}
            title="Delete"
          />
        </div>

        {/* Content */}
        <div className="prose max-w-none text-gray-800 text-[16px] leading-relaxed">
          <p>{blog.state.blog.text}</p>
        </div>
      </div>

      {/* Comments */}
      <div className="max-w-4xl mx-auto mt-8">
        <AddComment blogId={blog.state.blog._id} />
      </div>
    </div>
  );
};

export default View;
