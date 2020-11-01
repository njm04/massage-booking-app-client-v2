import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import { toast } from "react-toastify";
import moment from "moment";
import memoize from "lodash.memoize";
import { concatName, concatAddress, toastMessage } from "../utils/utils";

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
      toast.success("Appointment has been submitted successfully");
    },
    appointmentEdited: (appointments, action) => {
      const { _id: appointmentId } = action.payload;
      const index = appointments.list.findIndex(
        (appointment) => appointment._id === appointmentId
      );
      appointments.list[index] = action.payload;
      appointments.loading = false;
      toast.success("Appointment has been updated successfully");
    },
    appointmentDeleted: (appointments, action) => {
      appointments.list.filter((appointment) => !appointment.isDeleted);
      appointments.loading = false;
      toastMessage(action.payload.createdBy, "appointmentDeleted");
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
    onStart: appointmentsRequested.type,
    onSuccess: appointmentAdded.type,
    onError: appointmentsRequestFailed.type,
  });
};

export const editAppointment = (appointmentId, appointment) => {
  appointment.date = appointment.date.getTime();
  return apiCallBegan({
    url: `${url}/${appointmentId}`,
    method: "PUT",
    data: appointment,
    onStart: appointmentsRequested.type,
    onSuccess: appointmentEdited.type,
    onError: appointmentsRequestFailed.type,
  });
};

export const updateAppointmentStatus = (appointmentId, data) => {
  return apiCallBegan({
    url: `${url}/update-status/${appointmentId}`,
    method: "PUT",
    data,
    onStart: appointmentsRequested.type,
    onSuccess: appointmentEdited.type,
    onError: appointmentsRequestFailed.type,
  });
};

export const deleteAppointment = (appointmentId) => {
  return apiCallBegan({
    url: `${url}/delete/${appointmentId}`,
    method: "PUT",
    onStart: appointmentsRequested.type,
    onSuccess: appointmentDeleted.type,
    onError: appointmentsRequestFailed.type,
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
    appointments.list
      .filter(
        (appointment) =>
          appointment.status !== "completed" &&
          appointment.status !== "cancelled"
      )
      .map((appointment) => {
        return {
          id: appointment._id,
          name: concatName(appointment.customer),
          email: appointment.customer.email,
          massageType: appointment.massageType,
          duration: appointment.duration + " minutes",
          contactNumber: appointment.contactNumber,
          address: concatAddress(appointment),
          therapistId: appointment.therapist._id,
          therapistName: concatName(appointment.therapist),
          date: moment(appointment.date).format("MMMM D YYYY, h:mm A"),
          createdBy: concatName(appointment.createdBy),
          status: appointment.status,
        };
      })
);

export const getAppointmentsHistory = createSelector(
  (state) => state.entities.appointments,
  (appointments) =>
    appointments.list
      .filter(
        (appointment) =>
          appointment.status === "completed" ||
          appointment.status === "cancelled"
      )
      .map((appointment) => {
        return {
          id: appointment._id,
          name: concatName(appointment.customer),
          email: appointment.customer.email,
          massageType: appointment.massageType,
          duration: appointment.duration + " minutes",
          contactNumber: appointment.contactNumber,
          address: concatAddress(appointment),
          therapistId: appointment.therapist._id,
          therapistName: concatName(appointment.therapist),
          date: moment(appointment.date).format("MMMM D YYYY, h:mm A"),
          createdBy: concatName(appointment.createdBy),
          status: appointment.status,
        };
      })
);

export const isLoading = createSelector(
  (state) => state.entities.appointments,
  (appointments) => appointments.loading
);
