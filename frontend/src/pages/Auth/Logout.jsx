import { enqueueSnackbar } from "notistack";
import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/index";
const Logout = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const deleteCookie = async () => {
    const response = await axios.get("http://localhost:9700/user/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUserInfo({});
      enqueueSnackbar("Logged Out Successfully", { variant: "success" });
      navigate("/");
    }
  };
  return (
    <div className="mt-16 flex flex-col gap-3 items-center">
      <h1 className="font-semibold text-3xl">Are you sure?</h1>

      <button
        onClick={deleteCookie}
        className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
      >
        Confirm
      </button>
    </div>
  );
};

export default Logout;
