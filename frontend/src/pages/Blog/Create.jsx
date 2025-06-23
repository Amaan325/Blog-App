import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext, BlogContext } from "../../contexts/index";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { fetchBlog } = useContext(BlogContext);
  const username = userInfo?.username;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const addBlog = async (e) => {
    e.preventDefault();

    if (!title || !description || !text || !image) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("text", text);
      formData.append("image", image);
      formData.append("username", username);

      const response = await axios.post("http://localhost:9700/blog/add", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        enqueueSnackbar("Blog Added", { variant: "success" });
        fetchBlog();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog</h1>
        <form onSubmit={addBlog} encType="multipart/form-data" className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Short Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm"
          />
          <textarea
            placeholder="Write your blog content here..."
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[200px] border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all font-medium"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
