import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";

const Navbar = ({ setShowSidebar, showSidebar }) => {
  const User = useSelector((state) => state.currentUserReducer?.user);
  const dispatch = useDispatch();
  const path = window.location.pathname;

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("ac_user"))));
  }, []);

  return (
    <div
      className={`${
        path === "/login" || path === "/signup" ? "hidden" : "flex"
      } px-4 h-16 items-center justify-between bg-white shadow-sm sticky top-0 z-30 xl:px-6
        `}
    >
      <div className="flex items-center">
        <HiBars3BottomLeft
          className="text-2xl mr-5 cursor-pointer lg:inline-block"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/" className="md:inline-block hidden">
          <h1 className="text-xl font-poppins">
            Apni<span className="font-bold">Class</span>
          </h1>
        </Link>
      </div>
      <Link to="/" className="md:hidden">
        <h1 className="text-xl font-poppins">
          Apni<span className="font-bold">Class</span>
        </h1>
      </Link>
      <ul className="flex">
        {!User ? (
          <>
            <Link to="/login">
              <li className="mr-1">Login</li>
            </Link>
            {"|"}
            <Link to="signup">
              <li className="ml-1">Sign Up</li>
            </Link>
          </>
        ) : (
          <div className="flex items-center">
            <Link to="/share" className="hidden md:flex">
              <AiOutlinePlus className="transition ease-in-out delay-150 duration-300 text-4xl p-1.5 mr-5 text-gray-600 bg-slate-200 rounded-full border-white" />
            </Link>
            <Link to="/profile" className="relative mr-2">
              <div className="absolute -top-2 -right-1.5 bg-red-500 text-white rounded-full grid place-items-center text-xs w-5 h-5">
                <span className="mt-0.5">2</span>
              </div>
              <IoNotificationsOutline className="text-2xl" />
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
