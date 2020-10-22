import { combineReducers } from "redux";
import appointmentsReducer from "./appointments";
import authReducer from "./auth";
import usersReducer from "./users";
import userTypesReducer from "./userTypes";

export default combineReducers({
  appointments: appointmentsReducer,
  auth: authReducer,
  users: usersReducer,
  userTypes: userTypesReducer,
});
