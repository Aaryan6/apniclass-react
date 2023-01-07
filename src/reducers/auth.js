const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("ac_user", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case "LOGOUT":
      localStorage.removeItem("ac_user");
      return { ...state, data: null };
    default:
      return state;
  }
};

export default authReducer;
