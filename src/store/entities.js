import { combineReducers } from "redux";
import appointmentsReducer from "./appointments";
import authReducer from "./auth";
import usersReducer from "./users";

export default combineReducers({
  appointments: appointmentsReducer,
  auth: authReducer,
  users: usersReducer,
});
