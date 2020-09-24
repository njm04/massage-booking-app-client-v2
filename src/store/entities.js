import { combineReducers } from "redux";
import appointmentsReducer from "./appointments";

export default combineReducers({
  appointments: appointmentsReducer,
});
