import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
const Navbar = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("ac_user")));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ac_user");
    navigate("/login");
  };

  return (
    <div
      className={`px-5 h-16 flex items-center justify-between bg-white shadow-sm sticky top-0 z-30 xl:px-10
          ${!user && "hidden"}`}
    >
      <Link to="/">
        <h1 className="text-xl font-bold font-poppins">ApniClass</h1>
      </Link>
      <ul className="flex">
        {!user ? (
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
            <Link to="/profile">
              <img
                src={user?.profileImage}
                alt=""
                className="w-9 h-9 object-cover rounded-full"
              />
            </Link>
            <AiOutlineLogout
              className="text-2xl ml-3 text-gray-700 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
