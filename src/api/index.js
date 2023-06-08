import axios from "axios";

// http://localhost:5000/api
// https://apniclass-mern-nodejs.onrender.com/api

const API = axios.create({
  baseURL: "https://apniclass-backend.onrender.com/api",
});

// authentication
export const signup = (userData) => API.post("/auth/signup", userData);
export const signin = (userData) => API.post("/auth/signin", userData);

// post
export const addPost = (postData) => API.post("/post/", postData);
export const getAllPosts = () => API.get("/post/");
export const likeToPost = (postId, userId) =>
  API.put(`/post/like/${postId}`, { userId });
export const dislikeToPost = (postId, userId) =>
  API.put(`/post/dislike/${postId}`, { userId });
export const updatePost = (postId, postData) =>
  API.put(`/post/${postId}`, postData);
export const deletePost = (postId) => API.delete(`/post/${postId}`);

// user
export const updateUser = (userId, userData) =>
  API.put(`/user/update/${userId}`, userData);
export const getAllUsers = () => API.get("/user");
export const getOneUser = (userId) => API.get(`/user/find/${userId}`);

// subjects
export const getSubjects = () => API.get("/subject");

// notification
export const getUserNotification = (userId) =>
  API.get(`/notification/${userId}`);
export const readNotifications = (userId) =>
  API.put(`/notification/read/${userId}`);
export const sendNotification = (likedUserId, postId, postUserId) =>
  API.put(`/notification/send/${postUserId}`, {
    likedUserId: likedUserId,
    postId: postId,
  });

export const readOneNotification = (userId, objId) =>
  API.put(`/notification/read-one/${userId}`, { objId: objId });
