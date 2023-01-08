import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Avatar from "../assets/noavatar.png";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";
// https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80

const Navbar = ({ setShowSidebar, showSidebar }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const docRef = doc(db, "users", "lj6X4D1B1aeGmRhkIRlg");
  const User = useSelector((state) => state.currentUserReducer?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("ac_user"))));
  }, []);

  return (
    <div
      className={`px-4 h-16 flex items-center justify-between bg-white shadow-sm sticky top-0 z-30 xl:px-5
        `}
    >
      <div className="flex items-center">
        <HiBars3BottomLeft
          className="text-2xl mr-5 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/">
          <h1 className="text-xl font-bold font-poppins">ApniClass</h1>
        </Link>
      </div>
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
              <AiOutlinePlus className="transition ease-in-out delay-150 duration-300 text-4xl p-1.5 mr-3 text-gray-600 bg-slate-200 rounded-full border-white" />
            </Link>
            <Link to="/profile" className="relative">
              <div className="absolute -top-2 -right-1.5 bg-red-500 text-white rounded-full grid place-items-center text-xs w-5 h-5">
                <span className="mt-0.5">2</span>
              </div>
              <IoNotificationsOutline className="text-2xl" />
            </Link>
            <Link to={`/profile/${User?._id}`} className="hidden md:flex">
              <img
                src={User?.profileImage ? User?.profileImage : Avatar}
                alt=""
                className={`ml-4 transition ease-in-out delay-150 duration-30 w-9 h-9 object-cover rounded-full border-2 border-white`}
              />
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
