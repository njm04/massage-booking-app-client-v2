import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { apiCallBegan } from "./api";
import { concatName, toastMessage } from "../utils/utils";
import auth from "../services/authService";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },
    usersRequestFailed: (users, action) => {
      users.loading = false;
    },
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
    accountCreated: (users, action) => {
      users.list.push(action.payload);
      users.loading = false;
      toastMessage(action.payload, "accountCreated");
    },
    accountEdited: (users, action) => {
      const { _id: userId } = action.payload;
      const index = users.list.findIndex((user) => user._id === userId);
      users.list[index] = action.payload;
      users.loading = false;
      const name = concatName(action.payload);
      toast.success(`${name}'s account has been updated successfully.`);
    },
    accountDeleted: (users, action) => {
      const { _id: userId } = action.payload;
      const index = users.list.findIndex((user) => user._id === userId);
      users.list.splice(index, 1);
      users.loading = false;
      const name = concatName(action.payload);
      toast.success(`${name}'s account has been deleted successfully.`);
    },
    passwordChanged: (users, action) => {
      users.loading = false;
      toast.success("Your password has been changed successfully.");
    },
  },
});

const {
  usersRequested,
  usersRequestFailed,
  usersReceived,
  accountCreated,
  accountEdited,
  accountDeleted,
  passwordChanged,
} = slice.actions;
const url = "/users";
export default slice.reducer;

export const loadUsers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "GET",
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const registerUser = (account) => {
  account.birthDate = account.birthDate.getTime();
  return apiCallBegan({
    url,
    method: "POST",
    data: account,
    onStart: usersRequested.type,
    onSuccess: accountCreated.type,
    onError: usersRequestFailed.type,
  });
};

export const createAccount = (account) => {
  account.birthDate = account.birthDate.getTime();
  return apiCallBegan({
    url: `${url}/create-user`,
    method: "POST",
    data: account,
    onStart: usersRequested.type,
    onSuccess: accountCreated.type,
    onError: usersRequestFailed.type,
  });
};

export const editAccount = (accountId, account) => {
  account.birthDate = account.birthDate.getTime();
  return apiCallBegan({
    url: `${url}/${accountId}`,
    method: "PUT",
    data: account,
    onStart: usersRequested.type,
    onSuccess: accountEdited.type,
    onError: usersRequestFailed.type,
  });
};

export const updateStatus = (accountId, data) => {
  return apiCallBegan({
    url: `${url}/update-status/${accountId}`,
    method: "PUT",
    data,
    onStart: usersRequested.type,
    onSuccess: accountEdited.type,
    onError: usersRequestFailed.type,
  });
};

export const deleteAccount = (accountId) => {
  return apiCallBegan({
    url: `${url}/${accountId}`,
    method: "DELETE",
    onStart: usersRequested.type,
    onSuccess: accountDeleted.type,
    onError: usersRequestFailed.type,
  });
};

export const changePassword = (accountId, data) => {
  return apiCallBegan({
    url: `${url}/change-password/${accountId}`,
    method: "PUT",
    data,
    onStart: usersRequested.type,
    onSuccess: passwordChanged.type,
    onError: usersRequestFailed.type,
  });
};

export const getAllUsers = createSelector(
  (state) => state.entities.users,
  (users) =>
    users.list.map((user) => {
      return {
        id: user._id,
        name: concatName(user),
        email: user.email,
        userType: user.userType.name,
        birthDate: moment(user.birthDate).format("MMMM D, YYYY"),
        gender: user.gender,
        status: user.status,
      };
    })
);

export const getUserById = createSelector(
  (state) => state.entities.users,
  (users) => _.memoize((id) => users.list.find((user) => user._id === id))
);

export const getTherapists = createSelector(
  (state) => state.entities.users,
  (users) =>
    users.list.filter(
      (user) => user.userType.name === "therapist" && user.status === "active"
    )
);

export const getTherapistsCalendarSchedules = createSelector(
  (state) => state.entities.users,
  (users) => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      if (currentUser.userType.name === "admin") {
        return users.list.filter(
          (user) =>
            user.userType.name === "therapist" && user.status === "active"
        );
      }

      if (currentUser.userType.name === "therapist") {
        return users.list.filter(
          (user) =>
            user._id === currentUser._id &&
            user.userType.name === "therapist" &&
            user.status === "active"
        );
      }
    }
  }
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
