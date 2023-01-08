import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import postReducer from "./post";
import userReducer from "./user";
import subjectReducer from "./subject";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  currentUserReducer,
  subjectReducer,
});
