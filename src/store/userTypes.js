import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "userTypes",
  initialState: {
    list: [],
  },
  reducers: {
    userTypesReceived: (userTypes, action) => {
      userTypes.list = action.payload;
    },
  },
});

const { userTypesReceived } = slice.actions;
const url = "/user-types";
export default slice.reducer;

export const loadUserTypes = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onSuccess: userTypesReceived.type,
    })
  );
};

export const getUserTypes = createSelector(
  (state) => state.entities.userTypes,
  (userTypes) => userTypes.list
);
