import React, { useContext, useState } from "react";
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
    if (!userInfo?.username) {
      enqueueSnackbar("User must be logged in", { variant: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:9700/api/blog/comment", {
        user: userInfo.username,
        text: text,
        blogId: blogId,
      });

      if (response.status === 200) {
        enqueueSnackbar("Comment Added", { variant: "success" });
        setText("");
        refresh();
      } else {
        enqueueSnackbar("Comment Not Added", { variant: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 bg-white shadow-md rounded-xl p-6">
      {/* Comments Header */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <FaUserCircle className="text-red-500" />
        Comments
      </h2>

      {/* Existing Comments */}
      <ViewComment blogId={blogId} />

      {/* Add Comment Section */}
      <div className="mt-8">
        <p className="text-[16px] font-medium mb-2 text-gray-700">Add your comment</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[120px] border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          placeholder="Write your thoughts..."
        />

        <div className="mt-4">
          <button
            onClick={addComment}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all text-sm"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
