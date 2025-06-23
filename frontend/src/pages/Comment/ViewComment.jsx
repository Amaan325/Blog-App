import React, { useContext } from "react";
import { CommentContext } from "../../contexts/index";
import { FaUserCircle } from "react-icons/fa";

const ViewComment = ({ blogId }) => {
  const { commentInfo } = useContext(CommentContext);

  const filteredComments = commentInfo.filter((c) => c.blogId === blogId);

  if (filteredComments.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic mt-4">No comments yet. Be the first to add one!</p>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {filteredComments.map((c, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaUserCircle className="text-red-500" size={20} />
            <p className="text-sm font-semibold text-gray-700">{c.user}</p>
          </div>
          <p className="text-gray-800 text-sm pl-6 leading-relaxed">{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewComment;
