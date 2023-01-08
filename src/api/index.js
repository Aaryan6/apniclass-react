import axios from "axios";

// http://localhost:5000/api

const API = axios.create({
  baseURL: "https://apniclass-mern-nodejs.onrender.com/api",
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
