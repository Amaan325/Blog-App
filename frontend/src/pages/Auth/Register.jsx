import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import registerAnim from "../../assets/register.json"; // 🎞 Your animation JSON

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9700/user/register",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar("Registration Successful", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      let errorMessage = error.response?.data?.error;
      errorMessage = errorMessage?.errors || errorMessage;
      errorMessage = errorMessage?.username?.message || errorMessage;
      errorMessage = errorMessage?.password?.message || errorMessage;

      enqueueSnackbar(errorMessage || "Registration failed", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left - Animation */}
        <div className="flex items-center justify-center bg-white p-8">
          <Lottie animationData={registerAnim} loop={true} className="w-full max-w-md" style={{color:'red'}} />
        </div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Register
          </h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />

            <button
              onClick={register}
              className="bg-red-600 text-white py-3 rounded text-lg hover:bg-red-700 transition-all"
            >
              Register
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
