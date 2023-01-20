import React, { useEffect, useState } from "react";
import PDF from "../assets/pdf.svg";
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, dislikePost, likePost } from "../actions/post";
import Avatar from "../assets/noavatar.png";
import { sendNotification } from "../actions/notification";

const Post = ({ item }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.userReducer.data);
  const [postUser, setPostUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState(item.likes.includes(currentUser?._id));
  const [likesLength, setLikesLength] = useState(item.likes?.length);

  useEffect(() => {
    setPostUser(users.filter((u) => u._id === item.userId));
  }, [currentUser, users, item]);

  const openFile = (url) => {
    navigate("/open-file", {
      state: { url },
    });
  };

  const likeToPost = () => {
    if (currentUser) {
      dispatch(likePost(item._id, currentUser?._id));
      dispatch(sendNotification(currentUser?._id, item?._id, item?.userId));
      setLike(true);
      setLikesLength((prev) => prev + 1);
    } else {
      alert("Please login!");
    }
  };
  const dislikeToPost = () => {
    dispatch(dislikePost(item._id, currentUser?._id));
    setLike(false);
    setLikesLength((prev) => prev - 1);
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="relative flex flex-col justify-between bg-white border-2 border-solid border-slate-100 p-3 pb-0 rounded-sm max-w-sm w-full mx-auto">
      <div className="">
        <img src={PDF} alt="pdf" className="w-16" />
        <p className="text-md mt-2 break-words">{item.fileName}</p>
        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
      </div>
      <div className="flex justify-between items-end pb-2">
        {/* delete button */}
        {currentUser?._id === item.userId && (
          <button
            onClick={() => handleDelete(item._id)}
            className="absolute right-3 top-3 border-2 border-red-400 rounded-full p-1"
          >
            <AiOutlineDelete className="text-red-500" />
          </button>
        )}
        <div className="flex items-center mt-3">
          <img
            src={postUser[0]?.profileImage ? postUser[0]?.profileImage : Avatar}
            alt=""
            className="w-5 h-5 mr-2 object-cover rounded-full"
          />
          <Link
            to={`/profile/${postUser[0]?._id}`}
            className="text-sm text-gray-800 cursor-pointer hover:underline"
          >
            {postUser[0]?.name}
          </Link>
        </div>
        <div className="flex items-center mr-2">
          {like ? (
            <AiFillLike
              className="text-2xl text-indigo-400 cursor-pointer"
              onClick={dislikeToPost}
            />
          ) : (
            <AiOutlineLike
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={likeToPost}
            />
          )}
          <span className="ml-1">{likesLength}</span>
        </div>
      </div>
      <footer className="flex items-center border-t">
        <button
          onClick={() => openFile(item.fileUrl)}
          className="text-xs py-3 w-full text-center cursor-pointer font-normal border-r"
        >
          Open
        </button>
        <a href={item.fileUrl} className="w-full text-center">
          <button className="text-xs py-3 w-full text-center cursor-pointer font-normal flex item-center justify-center">
            Download
            <BsDownload className="text-base ml-1" />
          </button>
        </a>
      </footer>
    </div>
  );
};

export default Post;
