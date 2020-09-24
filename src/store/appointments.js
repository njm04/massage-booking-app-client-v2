import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
  },
  reducers: {
    appointmentsReceived: (appointments, action) => {
      appointments.list = action.payload;
    },
  },
});

const { appointmentsReceived } = slice.actions;
export default slice.reducer;

export const loadAppointments = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/bookings",
      method: "GET",
      onSuccess: appointmentsReceived.type,
    })
  );
};

export const getAppointments = createSelector(
  (state) => state.entities.appointments,
  (appointments) => appointments.list
);
