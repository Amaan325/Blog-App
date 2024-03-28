import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9700/user/register",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) navigate("/login");
      enqueueSnackbar("Registration Successfull", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = error.response.data.error;
      errorMessage = errorMessage.errors ? errorMessage.errors : errorMessage;
      errorMessage = errorMessage.username
        ? errorMessage.username.message
        : errorMessage;
      errorMessage = errorMessage.password
        ? errorMessage.password.message
        : errorMessage;

      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="mt-16 flex flex-col gap-3 items-center">
      <h1 className="font-semibold text-3xl">Register</h1>
      <input
        placeholder="Username"
        className="px-3 text-md w-2/4 h-9 border-2 rounded-md"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="px-3 text-md w-2/4 h-9 border-2 rounded-md"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={register}
        className="px-3 bg-slate-800 h-9 text-white text-md w-2/4 border-2 rounded-md"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
