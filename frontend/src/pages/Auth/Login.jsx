import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/index";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
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
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data.user)
        setUserInfo(response.data.user);
        enqueueSnackbar("Logged In", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/");
      }
    } catch (error) {
      enqueueSnackbar("Wrong Credential", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="mt-16 flex flex-col gap-3 items-center">
      <h1 className="font-semibold text-3xl">Login</h1>
      <input
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        className="px-3 text-md w-2/4 h-9 border-2 rounded-md"
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="px-3 text-md w-2/4 h-9 border-2 rounded-md"
      ></input>
      <button
        onClick={login}
        className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
