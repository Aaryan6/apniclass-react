import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNotifications } from "../actions/notification";

const Notification = () => {
  const notifications = useSelector((state) => state.notificationReducer?.data);
  useEffect(() => {
    // console.log(notifications);
  }, [notifications]);
  return (
    <div className="max-w-3xl mx-auto py-2">
      {notifications?.notifications?.map((notify) => {
        return <MessageBox notify={notify} key={notify._id} />;
      })}
    </div>
  );
};

export default Notification;

export const MessageBox = ({ notify }) => {
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

  useEffect(() => {
    dispatch(readNotifications()); //  read all the notifications
  }, []);

  if (!notify.seen) {
    return (
      <div
        className="bg-gray-50 rounded-lg relative flex items-center py-3 px-7 mx-2 text-sm text-gray-500 mb-2"
        role="alert"
      >
        <div className="w-2 h-2 bg-indigo-400 absolute left-3 rounded-full mr-2 flex-shrink-0"></div>
        {likedUser.name} liked 👍🏻 on your post - {post.fileName}
      </div>
    );
  }
};
