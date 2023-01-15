/* eslint-disable array-callback-return */
import Post from "./Post";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const List = ({ filters }) => {
  const Posts = useSelector((state) => state.postReducer.data?.posts);
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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPosts?.map((item) => {
          return <Post item={item} key={item._id} />;
        })}
      </div>
      <h6 className="text-sm text-center mt-2 text-slate-600 font-medium">
        {filteredPosts?.length === 0 && "File Not found ☹️"}
        {!filteredPosts && "Wait... 😐"}
      </h6>
    </div>
  );
};

export default List;
