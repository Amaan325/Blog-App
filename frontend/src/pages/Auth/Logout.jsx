import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/index";

const Logout = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteCookie = async () => {
    try {
      const response = await axios.get("http://localhost:9700/user/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo({});
        enqueueSnackbar("Logged Out Successfully", { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Logout failed", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-100 via-white to-red-50 px-4">
      <div className="bg-white shadow-md rounded-xl mt-12 p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Are you sure?</h1>

        <p className="text-gray-600 text-sm mb-6">
          You are about to log out from your account. This will end your session.
        </p>

        <button
          onClick={deleteCookie}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all w-full"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
