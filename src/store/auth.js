import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { apiCallBegan } from "./api";

const url = "/auth";
const tokenKey = "token";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    authRequested: (auth, action) => {
      auth.loading = true;
    },
    authFailed: (auth, action) => {
      auth.loading = false;
    },
    authTokenReceived: (auth, action) => {
      localStorage.setItem(tokenKey, action.payload);
      auth.loading = false;
    },
    authReceived: (auth, action) => {
      auth.user = action.payload;
      auth.isAuthenticated = !isEmpty(action.payload);
      auth.loading = false;
    },
    userLoggedOut: (auth, action) => {
      auth.user = action.payload;
      auth.isAuthenticated = !isEmpty(action.payload);
    },
  },
});

const { authRequested, authFailed, authTokenReceived } = slice.actions;
export const { authReceived, userLoggedOut } = slice.actions;
export default slice.reducer;

export const login = (user) => {
  return apiCallBegan({
    url,
    method: "POST",
    data: user,
    onStart: authRequested.type,
    onSuccess: authTokenReceived.type,
    onFailure: authFailed.type,
  });
};

export const getUser = createSelector(
  (state) => state.entities.auth,
  // check isAuthenticated or not, this function work either way
  (auth) => (auth.isAuthenticated ? auth.user : {})
);

export const isLoading = createSelector(
  (state) => state.entities.auth,
  (auth) => auth.loading
);
