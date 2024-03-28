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
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("text", text);
      formData.append("image", image);
      formData.append("username", username);

      const response = await axios.post(
        "http://localhost:9700/blog/add",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Blog Added", { variant: "success" });
        fetchBlog();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 flex flex-col gap-3 items-center">
      <form encType="multipart/form-data">
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 text-md w-full h-9 border-2 rounded-md"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 text-md w-full h-9 border-2 rounded-md"
        />
        <input
          onChange={handleImageChange}
          type="file"
          className="p-2 w-full text-md  border-2 rounded-md"
        />
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className="p-2 w-full h-[300px] text-md  border-2 rounded-md"
        />
        <button
          onClick={addBlog}
          className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
