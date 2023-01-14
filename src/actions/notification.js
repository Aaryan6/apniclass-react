import * as api from "../api";

export const getUserNotifications = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserNotification(userId);
    dispatch({ type: "FETCH_USER_NOTIFICATIONS", data });
  } catch (error) {
    console.log(error);
  }
};

export const readNotifications = (userId) => async (dispatch) => {
  try {
    await api.readNotifications(userId);
    dispatch(getUserNotifications());
  } catch (error) {
    console.log(error);
  }
};
