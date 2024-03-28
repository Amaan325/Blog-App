import axios from "axios";
import { createContext, useState, useEffect } from "react";

const CommentContext = createContext();

const CommentState = (props) => {
  const [commentInfo, setCommentInfo] = useState([]);
  const fetchComments = async () => {
    const response = await axios.get(
      "http://localhost:9700/api/blog/comments",
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      setCommentInfo((prev) => [...response.data.comment]);
    }
  };
  const refresh = () => fetchComments();
  useEffect(() => fetchComments , []);
  return (
    <CommentContext.Provider value={{ commentInfo, setCommentInfo, refresh }}>
      {props.children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentState };
