import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

const BlogState = (props) => {
  const [blog, setBlog] = useState([]);
  const fetchBlog = async () => {
    try {
      const response = await axios.get("http://localhost:9700/blog/view", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setBlog((prev) => [...response.data.blog]);
        console.log(blog);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <BlogContext.Provider value={{ blog, setBlog, fetchBlog }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogState };
