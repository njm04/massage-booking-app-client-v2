import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    appointmentsReceived: (appointments, action) => {
      appointments.list = action.payload;
    },
    appointmentAdded: (appointments, action) => {
      appointments.list.push(action.payload);
      appointments.loading = false;
    },
    appointmentAddRequested: (appointments, action) => {
      appointments.loading = true;
    },
    appointmentAddFailed: (appointments, action) => {
      appointments.loading = false;
    },
  },
});

const {
  appointmentsReceived,
  appointmentAdded,
  appointmentAddRequested,
  appointmentAddFailed,
} = slice.actions;
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
    onStart: appointmentAddRequested.type,
    onSuccess: appointmentAdded.type,
    onError: appointmentAddFailed.type,
  });
};

export const getAppointments = createSelector(
  (state) => state.entities.appointments,
  (appointments) => appointments.list
);
