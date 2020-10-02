import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    usersReceived: (appointments, action) => {
      appointments.list = action.payload;
    },
  },
});

const { usersReceived } = slice.actions;
export default slice.reducer;

export const loadUsers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/users",
      method: "GET",
      onSuccess: usersReceived.type,
    })
  );
};

export const getTherapists = createSelector(
  (state) => state.entities.users,
  (users) =>
    users.list.filter(
      (user) => user.userType.name === "therapist" && user.isAvailable
    )
);
