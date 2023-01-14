import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import postReducer from "./post";
import userReducer from "./user";
import subjectReducer from "./subject";
import notificationReducer from "./notification";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  currentUserReducer,
  subjectReducer,
  notificationReducer,
});
