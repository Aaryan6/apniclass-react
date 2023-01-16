import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readOneNotification } from "../actions/notification";
import { AiOutlineCheck } from "react-icons/ai";
import Sidebar from "../components/Sidebar";

const Notification = ({ showSidebar, setShowSidebar }) => {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const notifications = useSelector((state) => state.notificationReducer?.data);

  return (
    <div className="flex w-full">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="max-w-3xl mx-auto py-2 flex-1">
        {notifications?.notifications
          ?.filter((ntf) => ntf.seen === false)
          .map((notify) => {
            return (
              <MessageBox
                notify={notify}
                key={notify._id}
                currentUser={currentUser}
              />
            );
          })}
        {notifications?.notifications?.filter((ntf) => ntf.seen === false)
          .length === 0 && (
          <p className="text-center text-sm mt-4">No notifications! 🔕</p>
        )}
      </div>
    </div>
  );
};

export default Notification;

export const MessageBox = ({ notify, currentUser }) => {
  const [likedUser, setLikedUser] = useState({});
  const [post, setPost] = useState({});
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setLikedUser(
      reducers.userReducer.data?.filter(
        (user) => user._id === notify.likedUserId
      )[0]
    );
    setPost(
      reducers.postReducer.data.posts?.filter(
        (post) => post._id === notify.postId
      )[0]
    );
  }, [notify, reducers]);

  // useEffect(() => {
  //   dispatch(readNotifications(currentUser?._id)); //  read all the notifications
  // }, [dispatch]);

  const readNotification = (userId, objId) => {
    dispatch(readOneNotification(userId, objId)); //  read one the notifications
  };

  if (!notify.seen) {
    return (
      <div
        className="bg-gray-50 rounded-lg relative flex items-center justify-between py-3 px-7 mx-2 text-sm text-gray-500 mb-2"
        role="alert"
      >
        <div className="w-2 h-2 bg-indigo-400 absolute left-3 rounded-full mr-2 flex-shrink-0"></div>
        <span>
          {likedUser.name} liked 👍🏻 on your post - {post.fileName}
        </span>
        <button
          onClick={() => readNotification(currentUser?._id, notify?._id)}
          className="w-7 h-7 ml-2 border-2 border-green-300 flex-shrink-0 grid place-items-center rounded-full"
        >
          <AiOutlineCheck className="text-green-400" />
        </button>
      </div>
    );
  }
};
