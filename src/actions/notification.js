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
  } catch (error) {
    console.log(error);
  }
};

export const readOneNotification = (userId, objId) => async (dispatch) => {
  try {
    await api.readOneNotification(userId, objId);
    dispatch(getUserNotifications(userId));
  } catch (error) {
    console.log(error);
  }
};

export const sendNotification =
  (likedUserId, postId, postUserId) => async (dispatch) => {
    try {
      await api.sendNotification(likedUserId, postId, postUserId);
      dispatch(getUserNotifications(likedUserId));
    } catch (error) {
      console.log(error);
    }
  };
