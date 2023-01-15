import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";

const Signup = () => {
  const name = useRef();
  const email = useRef();
  const Password = useRef();
  const cpassword = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password.current.value !== cpassword.current.value) {
      cpassword.current.setCustomValidity("Password doesn't match!");
    } else {
      dispatch(
        signup(
          {
            name: name.current.value,
            email: email.current.value,
            password: Password.current.value,
          },
          navigate
        )
      );
    }
  };

  return (
    <div className="h-screen grid items-center justify-center">
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
          <label htmlFor="email" className="mt-3 mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            placeholder="ex. john@example.com"
            id="email"
            ref={email}
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
