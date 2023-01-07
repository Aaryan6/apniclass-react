import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import postReducer from "./post";
import userReducer from "./user";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  currentUserReducer,
});
