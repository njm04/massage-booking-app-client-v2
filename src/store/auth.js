import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    authReceived: (auth, action) => {
      auth.user = action.payload;
      auth.isAuthenticated = !isEmpty(action.payload);
    },
    userLoggedOut: (auth, action) => {
      auth.user = action.payload;
      auth.isAuthenticated = !isEmpty(action.payload);
    },
  },
});

export const { authReceived, userLoggedOut } = slice.actions;
export default slice.reducer;

export const getUser = createSelector(
  (state) => state.entities.auth,
  // check isAuthenticated or not, this function work either way
  (auth) => (auth.isAuthenticated ? auth.user : {})
);
