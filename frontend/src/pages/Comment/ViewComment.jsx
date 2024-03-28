import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../contexts/index";
import { FaUserCircle } from "react-icons/fa";

const ViewComment = ({ blogId }) => {
  const { commentInfo } = useContext(CommentContext);
  // useEffect(() => console.log(commentInfo), [commentInfo]);
  return (
    <>
      {commentInfo.map((c) =>
        c.blogId === blogId ? (
          <div className="mt-9 flex flex-col gap-3">
            <div className="flex gap-1 items-center">
              <FaUserCircle size={20} />
              <p className="text-[14px] font-medium">{c.user}</p>
            </div>
            <p className="pl-9 ">{c.text}</p>
            <p className="mt-9 border-t-2 border-gray-200"></p>
          </div>
        ) : null
      )}
    </>
  );
};

export default ViewComment;
