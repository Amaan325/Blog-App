import axios from "axios";
import React, { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { BlogContext } from "../../contexts";
import Lottie from "lottie-react";
import editAnim from "../../assets/edit-animation.json"; // 🎞 Replace with your animation
import { motion } from "framer-motion";

const Edit = () => {
  const navigate = useNavigate();
  const blog = useLocation();
  const { fetchBlog } = useContext(BlogContext);

  const { _id } = blog.state.blog.state.blog;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const editBlog = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9700/blog/update/${_id}`,
        { title, text },
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Blog Updated", { variant: "success" });
        fetchBlog();
        navigate("/");
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left - Lottie Animation */}
        <div className="flex items-center justify-center bg-white p-8">
          <Lottie animationData={editAnim} loop={true} className="w-full max-w-md" />
        </div>

        {/* Right - Edit Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8"
        >
          <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Edit Blog Post
          </h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Enter new title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />

            <textarea
              rows={10}
              placeholder="Update your blog content..."
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
            ></textarea>

            <button
              onClick={editBlog}
              className="bg-red-600 text-white py-3 rounded text-lg hover:bg-red-700 transition-all"
            >
              Update Blog
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Edit;
