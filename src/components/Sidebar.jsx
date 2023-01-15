import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../assets/noavatar.png";

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer?.user);

  const handleLogoout = () => {
    localStorage.removeItem("ac_user");
    navigate("/login");
  };

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div
      className={`bg-white ${
        showSidebar ? "hidden lg:flex" : "lg:hidden flex"
      } lg:w-64 lg:sticky lg:h-screen lg:-mt-16 absolute border-2 w-48 z-20 top-0 pt-16 flex-col justify-between`}
    >
      <div className="grid w-full">
        <span
          onClick={() => navigateTo("/")}
          className="hover:bg-slate-100 py-4 px-4 text-sm cursor-pointer border-b"
        >
          Home
        </span>
      </div>
      <div className="grid">
        <div
          onClick={() => navigateTo("/profile/" + User?._id)}
          className="hover:bg-slate-100 flex items-center py-3 px-4 text-sm cursor-pointer border-t"
        >
          <img
            src={User?.profileImage ? User?.profileImage : Avatar}
            alt=""
            className={`w-7 h-7 object-cover rounded-full mr-3`}
          />
          <span>{User?.name}</span>
        </div>
        <div
          className="hover:bg-slate-100 flex items-center justify-between py-3.5 px-4 text-sm cursor-pointer border-t"
          onClick={handleLogoout}
        >
          <span>Logout</span>
          <IoLogOutOutline className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
