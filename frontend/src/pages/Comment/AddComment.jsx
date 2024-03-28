import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { BlogContext, CommentContext, UserContext } from "../../contexts/index";
import { enqueueSnackbar } from "notistack";
import ViewComment from "./ViewComment";
import { useNavigate } from "react-router-dom";

const AddComment = ({ blogId }) => {
  const navigate = useNavigate();
  const { refresh } = useContext(CommentContext);
  const { userInfo } = useContext(UserContext);
  const [text, setText] = useState("");
  const addComment = async () => {
    setText("");
    if (!userInfo.username)
      enqueueSnackbar("User must be logged in", { variant: "error" });
    try {
      const response = await axios.post(
        "http://localhost:9700/api/blog/comment",
        {
          user: userInfo.username,
          text: text,
          blogId: blogId,
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Comment Added", { variant: "success" });
        refresh();
      } else enqueueSnackbar("Comment Not Added", { variant: "error" });
    } catch (error) {
      console.log(error);
    }
  };
  //   useEffect(() => console.log(blog));
  return (
    <>
      <div className="mt-12 flex flex-col gap-3">
        <p className="flex items-center mt-6 rounded-xl pl-2 h-12 w-full bg-gray-100  text-[19px] font-medium">
          Comments
        </p>
        <ViewComment blogId={blogId} />

        <p className="mt-12 text-[14px] font-medium">Add your comment</p>
        <textarea
          onChange={(e) => setText(e.target.value)}
          className=" p-3 border-2 bg-gray-50 rounded-xl"
        ></textarea>
        <button
          onClick={addComment}
          className="border-2 w-20 h-8 bg-black text-white rounded-xl text-[14px]"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default AddComment;
