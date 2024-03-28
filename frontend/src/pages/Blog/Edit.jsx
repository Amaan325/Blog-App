import axios from "axios";
import React, { useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { BlogContext } from "../../contexts";

const Edit = () => {
  const navigate = useNavigate();
  const blog = useLocation();
  const { fetchBlog } = useContext(BlogContext);
  const { _id } = blog.state.blog.state.blog;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const editBlog = async () => {
    console.log(_id);
    try {
      const response = await axios.post(
        `http://localhost:9700/blog/update/${_id}`,
        {
          title,
          text,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
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
    <div className="mt-16 flex flex-col gap-3 items-center">
      <h1 className="font-semibold text-3xl">Edit</h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="px-3 text-md w-[600px] h-9 border-2 rounded-md"
      ></input>
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
        className="p-2 w-[600px] h-[300px] text-md  border-2 rounded-md"
      ></textarea>
      <button
        onClick={editBlog}
        className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
      >
        Edit
      </button>
    </div>
  );
};

export default Edit;
