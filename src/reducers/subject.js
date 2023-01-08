const userReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "FETCH_SUBJECTS":
      return { ...state, data: action?.payload };
    default:
      return state;
  }
};

export default userReducer;
