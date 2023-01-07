import * as api from "../api";

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
  } catch (error) {
    console.log(error);
  }
};
