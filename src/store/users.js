import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import _ from "lodash";

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
      (user) => user.userType.name === "therapist" //&& user.isAvailable
    )
);

export const getTherapistSchedules = createSelector(
  (state) => state.entities.users,
  (users) =>
    _.memoize((id) => {
      const therapist = users.list.find((user) => user._id === id);
      return therapist.reservations.map((schedule) => ({
        date: schedule.date,
        duration: schedule.duration,
      }));
    })
);
