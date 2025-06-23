import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/index";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnim from "../../assets/login.json"; // 👈 Your Lottie file here

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username || !password) {
      enqueueSnackbar("Fill Both Fields", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9700/user/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserInfo(response.data.user);
        enqueueSnackbar("Logged In", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Wrong Credentials", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Side - Animation */}
        <div className="flex items-center justify-center bg-white p-8">
          <Lottie animationData={loginAnim} loop={true} className="w-full max-w-md" />
        </div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Login</h1>

          <div className="flex flex-col gap-5">
            <input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <button
              onClick={login}
              className="bg-red-600 text-white py-3 rounded text-lg hover:bg-red-700 transition-all"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
