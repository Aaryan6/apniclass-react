import React from "react";

const Sidebar = ({ showSidebar }) => {
  return (
    <div
      className={`bg-white hidden ${
        showSidebar ? "lg:flex" : "lg:hidden"
      } w-64 h-screen sticky top-0 -mt-16 pt-16 flex-col justify-between`}
    >
      <div className="grid w-full">
        <span className="hover:bg-slate-100 py-4 pl-6 text-sm cursor-pointer border-b">
          Home
        </span>
        <span className="hover:bg-slate-100 py-4 pl-6 text-sm cursor-pointer border-b">
          Users
        </span>
      </div>
      <div className="grid">
        <span className="hover:bg-slate-100 py-4 pl-6 text-sm cursor-pointer border-t">
          Profile
        </span>
        <span className="hover:bg-slate-100 py-4 pl-6 text-sm cursor-pointer border-t">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
