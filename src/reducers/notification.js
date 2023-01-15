const notificationReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case "FETCH_USER_NOTIFICATIONS":
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default notificationReducer;
