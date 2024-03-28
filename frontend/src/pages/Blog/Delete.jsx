import { enqueueSnackbar } from "notistack";
import React, { useCallback, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BlogContext } from "../../contexts";

const Delete = () => {
  const navigate = useNavigate();
  const {fetchBlog} = useContext(BlogContext);
  const blog = useLocation();
  const { _id } = blog.state.blog.state.blog;
  const deleteBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9700/blog/delete/${_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
        fetchBlog()
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-16 flex flex-col gap-3 items-center">
      <h1 className="font-semibold text-3xl">Are you sure?</h1>

      <button
        onClick={deleteBlog}
        className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
      >
        Confirm
      </button>
    </div>
  );
};

export default Delete;
