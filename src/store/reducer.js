import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import { userLoggedOut } from "./auth";

const appReducer = combineReducers({
  entities: entitiesReducer,
});

export default (state, action) => {
  if (action.type === userLoggedOut.type) state = undefined;

  return appReducer(state, action);
};
