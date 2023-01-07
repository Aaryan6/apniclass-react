import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  // const postData = async (id, data) => {
  //   if (id) {
  //     const comparePass = await bcrypt.compare(
  //       password.current.value,
  //       data.password
  //     );
  //     if (comparePass) {
  //       const { password, ...other } = data;
  //       other["id"] = id;
  //       localStorage.setItem("ac_user", JSON.stringify(other));
  //       alert("Successfully logged in!");
  //       console.log(other);
  //     } else {
  //       alert("password don't match");
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const q = query(
  //     collection(db, "users"),
  //     where("email", "==", email.current.value)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   if (querySnapshot.docs.length < 1) alert("User doesn't exists!");
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //     postData(doc.id, doc.data());
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login(
        {
          email: email.current.value,
          password: password.current.value,
        },
        navigate
      )
    );
  };

  return (
    <div className="h-screen grid items-center justify-center">
      <div className="-mt-10">
        <h1 className="text-center text-2xl">
          Apni<span className="font-bold">Class</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid bg-white mt-4 p-5 w-80 max-w-md mx-auto  md:w-96"
        >
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
            ref={password}
            required
            className="border-solid border-2 border-slate-100 text-sm px-3 py-3 outline-none w-full"
          />
          <button
            type="submit"
            className="mt-4 bg-indigo-500 text-white text-sm py-3 rounded-sm"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-2">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-700 underline ml-1">Sing Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
