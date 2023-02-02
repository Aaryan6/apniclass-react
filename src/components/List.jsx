/* eslint-disable array-callback-return */
import Post from "./Post";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

const List = ({ filters }) => {
  const Posts = useSelector((state) => state.postReducer.data?.posts);
  const Subjects = useSelector((state) => state.subjectReducer);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setFilteredPosts(
      Posts?.filter((file) => {
        return (
          (filters.year === "all" || filters.year === file.ofYear) &&
          (filters.stuff === "all" || filters.stuff === file.category) &&
          (filters.branch === "all" || filters.branch === file.ofBranch) &&
          (filters.subject === "all" || file.subject === filters.subject) &&
          (filters.searchValue === undefined ||
            file.fileName
              .toLowerCase()
              .includes(filters.searchValue?.toLowerCase()))
        );
      })
    );
  }, [Posts, filters]);
  return (
    <div className="font-poppins px-5 pb-20 max-w-screen-xl mx-auto">
      <h2 className="mx-auto text-center text-gray-500 mb-4">Results</h2>
      {Boolean(Subjects.data?.length) && Boolean(Posts?.length) ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPosts?.map((item) => {
            return <Post item={item} key={item._id} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      )}
      <h6 className="text-sm text-center mt-2 text-slate-600 font-medium">
        {filteredPosts?.length === 0 && "File Not found ☹️"}
      </h6>
    </div>
  );
};

export default List;

export const SkeletonPost = () => {
  return (
    <div className="relative flex flex-col justify-between bg-white dark:bg-slate-600 dark:border-slate-600 border-2 border-solid border-slate-100 p-3 pb-0 rounded-sm max-w-sm w-full mx-auto">
      <div className="">
        <div
          src=""
          alt=""
          className="w-16 h-16 m-2 bg-gray-300 animate-pulse"
        />
        <p className="bg-gray-300 animate-pulse h-4 w-1/2 mb-2 mt-2"></p>
        <p className="mt-1 bg-gray-300 animate-pulse h-3 w-1/4"></p>
      </div>
      <div className="flex justify-between items-end pb-2">
        <div className="flex items-center mt-3">
          <div className="h-6 w-6 rounded-full bg-gray-300 animate-pulse" />
          <p className="ml-2 bg-gray-300 animate-pulse h-3 w-16"></p>
        </div>
        <div className="flex items-center mr-2">
          <AiOutlineLike className="text-2xl text-gray-300 cursor-pointer" />
        </div>
      </div>
      <footer className="flex items-center border-t gap-4 py-3">
        <button className="py-3 w-full bg-gray-300 animate-pulse"></button>
        <button className="py-3 w-full bg-gray-300 animate-pulse"></button>
      </footer>
    </div>
  );
};
