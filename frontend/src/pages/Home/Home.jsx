import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../contexts";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { blog } = useContext(BlogContext);

  const openBlog = (blogItem) => {
    navigate("/view-blog", { state: { blog: blogItem } });
  };

  const shortContent = (words) => {
    words = words.split(" ");
    for (let index = 0; index < words.length; index++) {
      if (index >= 20 && words[index].endsWith(".")) {
        return words.slice(0, index + 1).join(" ");
      }
    }
    return words.slice(0, 20).join(" ") + " . . . ";
  };

  const featured = blog?.[0];
  const recentPosts = blog?.slice(1, 6);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10 max-w-screen-xl mx-auto">
        {/* Left - Featured Article */}
        <div className="md:col-span-2">
          {featured && (
            <div
              onClick={() => openBlog(featured)}
              className="relative cursor-pointer group"
            >
              <img
                src={`http://localhost:9700/${featured.img}`}
                alt="Featured"
                className="w-full h-[420px] object-fit rounded"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 rounded"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80">
                  {new Date(featured.updatedAt).toDateString()}
                </p>
                <h2 className="text-3xl font-semibold max-w-lg leading-tight">
                  {featured.title}
                </h2>
              </div>
            </div>
          )}

          {/* Recent Grid under Featured */}
          <h3 className="text-xl font-semibold mt-8 border-b pb-2 mb-4">
            Recent Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blog.slice(1).map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => openBlog(item)}
                className="cursor-pointer bg-white rounded shadow hover:shadow-md overflow-hidden"
              >
                <img
                  src={`http://localhost:9700/${item.img}`}
                  alt="Thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {shortContent(item.text)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - Sidebar */}
        <div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
            />
            <button className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-all">
              Search
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Recent Posts
            </h3>
            <ul className="space-y-2 text-sm">
              {recentPosts?.map((post, i) => (
                <li
                  key={i}
                  className="text-red-700 hover:underline cursor-pointer"
                  onClick={() => openBlog(post)}
                >
                  {post.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
