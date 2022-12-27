import React from "react";
import Post from "../comonents/Post";
import { data } from "../dummyData";

const Profile = () => {
  const image =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80";
  return (
    <div className="pt-2">
      <div className="p-4 bg-white max-w-lg mx-auto">
        <div className=" flex flex-col items-center">
          <img
            src={image}
            alt=""
            className="w-40 h-40 object-cover rounded-full"
          />
          <span className="text-lg mt-2 font-medium">Alina Parker</span>
        </div>
        <div className="grid grid-cols-2 justify-between text-sm px-4 pt-4">
          <div className="py-1 grid">
            <span className="text-slate-600">Year: </span>
            <span className="font-medium">2nd</span>
          </div>
          <div className="text-right py-1 grid">
            <span className="text-slate-600">Semester: </span>
            <span className="font-medium">1st</span>
          </div>
          <div className="py-1 grid">
            <span className="text-slate-600">Branch: </span>
            <span className="font-medium">IT</span>
          </div>
          <div className="text-right py-1 grid">
            <span className="text-slate-600">Email: </span>
            <span className="font-medium">alina@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="bg-white m-1 py-2 rounded-md mx-auto max-w-lg">
        <button className="text-sm mx-2 bg-slate-100 px-4 py-2 rounded-3xl cursor-pointer font-medium">
          My uploads
        </button>
        <button className="text-sm mx-2">Liked</button>
      </div>
      <div className="p-3 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-6xl">
        {data.map((item) => {
          return <Post item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
