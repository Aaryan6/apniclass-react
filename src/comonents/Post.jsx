import React, { useState } from "react";
import PDF from "../assets/pdf.svg";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";

const Post = ({ item }) => {
  const [liked, setLiked] = useState(item.category === "notes");
  const [user] = useState({
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  });
  return (
    <div className="flex flex-col justify-between bg-white border-2 border-solid border-slate-100 p-3 pb-0 rounded-sm max-w-sm w-full mx-auto">
      <div className="">
        <img src={PDF} alt="pdf" className="w-16" />
        <p className="text-md mt-2">{item.filename}</p>
        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
      </div>
      <div className="flex justify-between items-end pb-2">
        <div className="flex items-center mt-3">
          <img
            src={user.profileImage}
            alt=""
            className="w-5 h-5 mr-2 object-cover rounded-full"
          />
          <p className="text-sm text-gray-800 cursor-pointer hover:underline">
            {item.author}
          </p>
        </div>
        <div className="">
          {!liked ? (
            <AiOutlineLike
              className="text-2xl text-gray-600 mr-2 cursor-pointer"
              onClick={() => setLiked(true)}
            />
          ) : (
            <AiFillLike
              className="text-2xl text-indigo-400 mr-2 cursor-pointer"
              onClick={() => setLiked(false)}
            />
          )}
        </div>
      </div>
      <footer className="flex items-center border-t">
        <button className="text-xs py-3 w-full text-center cursor-pointer font-normal border-r">
          Open
        </button>
        <button className="text-xs py-3 w-full text-center cursor-pointer font-normal flex item-center justify-center">
          Download
          <BsDownload className="text-base ml-1" />
        </button>
      </footer>
    </div>
  );
};

export default Post;
