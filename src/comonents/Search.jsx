// import React, { useState } from "react";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";

const Search = () => {
  return (
    <div className="mx-5 mt-5 font-poppins">
      <div className="flex relative border-x border-y border-solid border-slate-200 lg:max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search here..."
          className=" pr-5 py-4 pl-10 outline-none w-full text-sm"
        />
        <AiOutlineSearch className="absolute left-3 top-4 text-indigo-500 text-xl" />
      </div>
      {/* options box */}
      <div
        className={`hidden absolute  z-20 justify-center items-center p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg drop-shadow-xs border-solid border-2 border-zinc-100 w-72`}
      >
        <ul className="flex flex-col items-start">
          <button className="p-4 border-b hover:bg-slate-50 text-left w-full">
            EEES
          </button>
          <button className="p-4 border-b hover:bg-slate-50 text-left w-full">
            Digital System
          </button>
          <button className="p-4 border-b hover:bg-slate-50 text-left w-full">
            Data Structure
          </button>
          <button className="p-4 border-b hover:bg-slate-50 text-left w-full">
            Object oriented programming
          </button>
          <button className="p-4 hover:bg-slate-50 text-left w-full">
            Discrete Structure
          </button>
        </ul>
      </div>
      {/* end */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 sm:grid-cols-4 sm:max-w-2xl mx-auto">
        {/* selection div */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white py-2 px-3 w-full">
            <span className="text-sm text-gray-500 mr-1">Year</span>
            <AiFillCaretDown className="text-sm text-gray-500" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">2nd</span>
          </div>
        </div>
        {/* selection div */}

        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white py-2 px-3 w-full">
            <span className="text-sm text-gray-500 mr-1">Semester</span>
            <AiFillCaretDown className="text-sm text-gray-500" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">1st</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white  py-2 px-3 w-full">
            <span className="text-sm text-gray-500 mr-1">Subject</span>
            <AiFillCaretDown className="text-sm text-gray-500" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">DSA</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center cursor-pointer border-2 border-solid border-gray-100 bg-white  py-2 px-3 w-full">
            <span className="text-sm text-gray-500 mr-1">Stuff</span>
            <AiFillCaretDown className="text-sm text-gray-500" />
          </div>
          {/* option */}
          <div className="mt-2 bg-indigo-50 border-2 border-solid border-indigo-200 h-9 flex items-center justify-center rounded-sm w-full">
            <span className="text-indigo-600 text-sm">Notes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
