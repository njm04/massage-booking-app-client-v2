import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import _ from "lodash";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    usersReceived: (users, action) => {
      users.list = action.payload;
    },
    createAccountRequested: (users, action) => {
      users.loading = true;
    },
    createAccountFailed: (users, action) => {
      users.loading = false;
    },
    accountCreated: (users, action) => {
      users.list.push(action.payload);
      users.loading = false;
    },
  },
});

const {
  usersReceived,
  createAccountRequested,
  createAccountFailed,
  accountCreated,
} = slice.actions;
const url = "/users";
export default slice.reducer;

export const loadUsers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onSuccess: usersReceived.type,
    })
  );
};

export const registerUser = (account) => {
  account.birthDate = account.birthDate.getTime();
  return apiCallBegan({
    url,
    method: "POST",
    data: account,
    onStart: createAccountRequested.type,
    onSuccess: accountCreated.type,
    onError: createAccountFailed.type,
  });
};

export const createAccount = (account) => {
  account.birthDate = account.birthDate.getTime();
  return apiCallBegan({
    url: `${url}/create-user`,
    method: "POST",
    data: account,
    onStart: createAccountRequested.type,
    onSuccess: accountCreated.type,
    onError: createAccountFailed.type,
  });
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

export const isLoading = createSelector(
  (state) => state.entities.users,
  (users) => users.loading
);
