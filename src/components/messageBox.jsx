import React from "react";

const messageBox = () => {
  return (
    <div
      className="bg-gray-50 rounded-lg flex items-center py-3 px-6 mx-2 text-sm text-gray-500 mb-2"
      role="alert"
    >
      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 flex-shrink-0"></div>
      Nikky Patel liked 👍🏻 on your post - OOP unit 2
    </div>
  );
};

export default messageBox;
