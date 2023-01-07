import Post from "./Post";
import { useSelector } from "react-redux";

const List = ({ selectedSubject }) => {
  const Posts = useSelector((state) => state.postReducer.data?.posts);
  return (
    <div className="font-poppins px-5 pb-20 max-w-screen-xl mx-auto">
      <h2 className="mx-auto text-center text-gray-500 mb-4">Results</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Posts?.filter(
          (p) => selectedSubject === "all" || p.subject === selectedSubject
        ).map((item) => {
          return <Post item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default List;
