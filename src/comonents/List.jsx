import React from "react";
import Post from "./Post";
import { data } from "../dummyData";

const List = () => {
  return (
    <div className="font-poppins px-5 pb-5">
      <h2 className="mx-auto text-center text-gray-500 mb-4">Results</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => {
          return <Post item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default List;
