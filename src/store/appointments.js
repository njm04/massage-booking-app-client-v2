import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import memoize from "lodash.memoize";
import { concatName, concatAddress } from "../utils/utils";

const slice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    appointmentsRequested: (appointments, action) => {
      appointments.loading = true;
    },
    appointmentsRequestFailed: (appointments, action) => {
      appointments.loading = false;
    },
    appointmentsReceived: (appointments, action) => {
      appointments.list = action.payload;
      appointments.loading = false;
    },
    appointmentAdded: (appointments, action) => {
      appointments.list.push(action.payload);
      appointments.loading = false;
    },
    appointmentEdited: (appointments, action) => {
      const { _id: appointmentId } = action.payload;
      const index = appointments.list.findIndex(
        (appointment) => appointment._id === appointmentId
      );
      appointments.list[index] = action.payload;
      appointments.loading = false;
    },
    appointmentDeleted: (appointments, action) => {
      console.log(action.payload);
      appointments.list.filter((appointment) => !appointment.isDeleted);
    },
    appointmentAddRequested: (appointments, action) => {
      appointments.loading = true;
    },
    appointmentAddFailed: (appointments, action) => {
      appointments.loading = false;
    },
    appointmentEditRequested: (appointments, action) => {
      appointments.loading = true;
    },
    appointmentEditFailed: (appointments, action) => {
      appointments.loading = false;
    },
  },
});

const {
  appointmentsRequested,
  appointmentsRequestFailed,
  appointmentsReceived,
  appointmentAdded,
  appointmentEdited,
  appointmentDeleted,
  appointmentAddRequested,
  appointmentAddFailed,
  appointmentEditRequested,
  appointmentEditFailed,
} = slice.actions;
export default slice.reducer;
const url = "/bookings";
export const loadAppointments = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: appointmentsRequested.type,
      onSuccess: appointmentsReceived.type,
      onError: appointmentsRequestFailed.type,
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

export const editAppointment = (appointmentId, appointment) => {
  appointment.date = appointment.date.getTime();
  return apiCallBegan({
    url: `${url}/${appointmentId}`,
    method: "PUT",
    data: appointment,
    onStart: appointmentEditRequested.type,
    onSuccess: appointmentEdited.type,
    onError: appointmentEditFailed.type,
  });
};

export const deleteAppointment = (appointmentId) => {
  return apiCallBegan({
    url: `${url}/delete/${appointmentId}`,
    method: "PUT",
    onStart: appointmentAddRequested.type,
    onSuccess: appointmentDeleted.type,
    onError: appointmentAddFailed.type,
  });
};

export const getAppointmentById = createSelector(
  (state) => state.entities.appointments,
  (appointments) =>
    memoize((id) =>
      appointments.list.find((appointment) => appointment._id === id)
    )
);

export const getAppointments = createSelector(
  (state) => state.entities.appointments,
  (appointments) =>
    appointments.list.map((appointment) => {
      return {
        id: appointment._id,
        name: concatName(appointment.user),
        firstName: appointment.user.firstName,
        lastName: appointment.user.lastName,
        massageType: appointment.massageType,
        duration: appointment.duration + " minutes",
        contactNumber: appointment.contactNumber,
        address: concatAddress(appointment),
        therapistId: appointment.therapist._id,
        therapistName: concatName(appointment.therapist),
        date: moment(appointment.date).format("MMMM D YYYY, h:mm A"),
      };
    })
);

export const isLoading = createSelector(
  (state) => state.entities.appointments,
  (appointments) => appointments.loading
);
