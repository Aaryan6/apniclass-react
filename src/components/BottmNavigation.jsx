import React, { useState } from "react";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const BottmNavigation = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const [page, setPage] = useState("home");
  const path = window.location.pathname;

  const switchPage = (pg) => {
    setPage(pg);
  };
  if (!User) {
    return (
      <div
        className={`${
          path === "/login" || (path === "/signup" && !User)
            ? "hidden"
            : "block"
        } fixed bottom-0 w-full md:hidden z-20`}
      >
        <div className="bg-indigo-500 rounded-t-2xl flex items-center justify-evenly h-14 text-white">
          <Link to="/" className="">
            <AiFillHome
              onClick={() => switchPage("home")}
              className={`${
                page === "home" && "scale-125"
              } transition ease-in-out delay-150 duration-300 text-2xl rounded-full`}
            />
          </Link>
          <Link to={User ? "/share" : "/login"}>
            <AiOutlinePlus className="hover:bg-indigo-600 transition ease-in-out delay-150 duration-300 text-6xl text-white bg-indigo-500 rounded-full p-3 -mt-14 border-4 border-white" />
          </Link>
          <Link to={User ? `/profile/${User?._id}` : "/login"} className="">
            {User?.profileImage ? (
              <img
                src={User.profileImage}
                alt=""
                onClick={() => switchPage("profile")}
                className={`${
                  page === "profile" && "scale-125"
                } transition ease-in-out delay-150 duration-30  w-8 h-8 object-cover rounded-full border-2 border-white`}
              />
            ) : (
              <CgProfile className={"text-3xl"} />
            )}
          </Link>
        </div>
      </div>
    );
  }
};

export default BottmNavigation;
