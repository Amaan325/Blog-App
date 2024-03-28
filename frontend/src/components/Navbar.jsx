import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navbar = async () => {
    try {
      const response = await axios.get("http://localhost:9700/user/profile", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  useEffect(() => {
    navbar();
  }, []);

  const username = userInfo?.username;
  return (
    <>
      <div className="w-full flex justify-between ">
        <NavLink to="/" className="font-bold text-3xl">
          MyBlog
        </NavLink>
        <div className="flex gap-6">
          {username ? (
            <>
              <div className="flex gap-6">
                {username ? (
                  <>
                    <NavLink
                      className="text-lg font-light text-black"
                      to="/create-blog"
                    >
                      Create new post
                    </NavLink>
                    <NavLink
                      className="text-lg font-light text-black"
                      to="/logout"
                    >
                      Logout
                      <span className="pl-2 font-medium ">{username}</span>
                    </NavLink>
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <NavLink className="text-lg font-light text-black" to="/login">
                Login
              </NavLink>
              <NavLink className="text-lg font-light text-black" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
