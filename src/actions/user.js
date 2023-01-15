import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_ALL_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    await api.updateUser(userId, userData);
    dispatch(getAllUsers());
    dispatch(getOneUser(userId));
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getOneUser(userId);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("ac_user"))));
  } catch (error) {
    console.log(error);
  }
};
