import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BlogContext } from "../../contexts";

const Delete = () => {
  const navigate = useNavigate();
  const { fetchBlog } = useContext(BlogContext);
  const blog = useLocation();
  const { _id } = blog.state.blog.state.blog;

  const deleteBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:9700/blog/delete/${_id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
        fetchBlog();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Confirm Deletion</h1>
        <p className="text-gray-700 mb-6 text-sm">
          Are you sure you want to permanently delete this blog post? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={deleteBlog}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-black px-5 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
