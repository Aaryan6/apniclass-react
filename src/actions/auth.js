import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { getAllUsers } from "./user";

export const signup = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(userData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("ac_user"))));
    dispatch(getAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(userData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("ac_user"))));
    dispatch(getAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
