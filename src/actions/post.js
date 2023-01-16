import * as api from "../api";

export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();
    dispatch({ type: "FETCH_ALL_POSTS", data });
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (postData, navigate) => async (dispatch) => {
  try {
    await api.addPost(postData);
    navigate("/");
    dispatch(getAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    await api.likeToPost(postId, userId);
    dispatch(getAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = (postId, userId) => async (dispatch) => {
  try {
    await api.dislikeToPost(postId, userId);
    dispatch(getAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch(getAllPosts());
  } catch (error) {
    console.log(error);
  }
};
