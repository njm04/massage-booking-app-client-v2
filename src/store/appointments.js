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
    appointmentAdded: (appointments, action) => {
      appointments.list.push(action.payload);
    },
  },
});

const { appointmentsReceived, appointmentAdded } = slice.actions;
export default slice.reducer;
const url = "/bookings";
export const loadAppointments = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onSuccess: appointmentsReceived.type,
    })
  );
};

export const addAppointment = (appointment) => {
  appointment.date = appointment.date.getTime();
  return apiCallBegan({
    url,
    method: "POST",
    data: appointment,
    onSuccess: appointmentAdded.type,
  });
};

export const getAppointments = createSelector(
  (state) => state.entities.appointments,
  (appointments) => appointments.list
);
