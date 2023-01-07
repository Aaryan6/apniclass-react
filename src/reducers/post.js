const postReducer = (state = { data: [] }, action) => {
    switch (action.type) {
      case "FETCH_ALL_POSTS":
        return { ...state, data: action?.data };
      default:
        return state;
    }
  };
  
  export default postReducer;
  