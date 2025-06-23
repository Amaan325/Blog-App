import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:9700/user/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.log("Navbar error: ", error);
      }
    };
    fetchUser();
  }, []);

  const username = userInfo?.username;

  return (
    <div className="w-full shadow-md z-50">
      {/* Top Bar */}
      <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-extrabold tracking-widest">
          UPRIGHT
        </NavLink>
        <div className="space-x-6 text-sm">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About Me
          </NavLink>
          <NavLink to="/contact" className="hover:underline">
            Contact
          </NavLink>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-b px-6 py-3 flex justify-between items-center text-sm font-medium tracking-wide">
        {/* Categories / Pages */}
        <div className="space-x-6 text-gray-700">
          <NavLink to="/category/blogging" className="hover:text-red-600">
            Blogging
          </NavLink>
          <NavLink to="/category/design" className="hover:text-red-600">
            Design
          </NavLink>
          <NavLink to="/category/lifestyle" className="hover:text-red-600">
            Lifestyle
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4 text-sm">
          {username ? (
            <>
              <NavLink
                to="/create-blog"
                className="hover:text-red-600 text-gray-700"
              >
                Create Post
              </NavLink>
              <NavLink
                to="/logout"
                className="hover:text-red-600 text-gray-700"
              >
                Logout
              </NavLink>
              <span className="font-semibold text-red-600">
                {username}
              </span>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:text-red-600 text-gray-700"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="hover:text-red-600 text-gray-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
