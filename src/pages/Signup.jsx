import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const name = useRef();
  const username = useRef();
  const Password = useRef();
  const cpassword = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.authReducer?.data);

  useEffect(() => {
    if (message?.message) {
      toast.warn(message.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password.current.value !== cpassword.current.value) {
      toast.warn("Password doesn't match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(
        signup(
          {
            name: name.current.value,
            username: username.current.value,
            password: Password.current.value,
          },
          navigate
        )
      );
    }
  };

  return (
    <div className="h-screen grid items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="-mt-10">
        <h1 className="text-center text-2xl">
          Apni<span className="font-bold">Class</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid bg-white mt-4 p-5 w-80 max-w-md mx-auto md:w-96"
        >
          <label htmlFor="name" className="mt-3 mb-2 text-sm">
            Name
          </label>
          <input
            type="text"
            placeholder="ex. John Doe"
            id="name"
            ref={name}
            required
            className="border-solid border-2 border-slate-100 text-sm px-3 py-3 outline-none w-full"
          />
          <label htmlFor="username" className="mt-3 mb-2 text-sm">
            Username
          </label>
          <input
            type="text"
            placeholder="ex. johndoe"
            id="username"
            ref={username}
            required
            className="border-solid border-2 border-slate-100 text-sm px-3 py-3 outline-none w-full"
          />
          <label htmlFor="password" className="mt-3 mb-2 text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="******"
            id="password"
            ref={Password}
            required
            className="border-solid border-2 border-slate-100 text-sm px-3 py-3 outline-none w-full"
          />
          <label htmlFor="cpassword" className="mt-3 mb-2 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="******"
            id="cpassword"
            ref={cpassword}
            required
            className="border-solid border-2 border-slate-100 text-sm px-3 py-3 outline-none w-full"
          />
          <button
            type="submit"
            className="mt-4 bg-indigo-500 text-white text-sm py-3 rounded-sm"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-2">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-700 underline ml-1">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
