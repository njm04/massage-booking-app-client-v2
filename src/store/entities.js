import { combineReducers } from "redux";
import appointmentsReducer from "./appointments";
import authReducer from "./auth";

export default combineReducers({
  appointments: appointmentsReducer,
  auth: authReducer,
});
