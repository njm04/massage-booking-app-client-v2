import _ from "lodash";
import { toast } from "react-toastify";
import states from "../canadian-states.json";

export const concatName = (item) => {
  return `${item.firstName} ${item.lastName}`;
};

export const concatAddress = (obj) => {
  const addressTwo = obj.addressTwo ? obj.addressTwo + " " : "";
  return `${addressTwo}${obj.address}, ${obj.city}, ${obj.state}, ${obj.zip}`;
};

export const toastMessage = (obj) => {
  if (obj.userType.name === "customer") {
    toast.success("Account successfully created. Redirecting to login page");
  } else {
    toast.success(
      `${obj.userType.name.toUpperCase()} account successfully created.`
    );
  }
};

export const getCities = (abbreviation) => {
  const provAbbreviation = !abbreviation ? "AB" : abbreviation;
  return _.find(states, ["abbreviation", provAbbreviation]).cities;
};

export const createDefaultValues = (user, data = null) => {
  if (data && user && user.userType && user.userType.name === "admin") {
    return {
      firstName: data.customer.firstName,
      lastName: data.customer.lastName,
      email: data.customer.email,
      address: data.address,
      addressTwo: data.addressTwo,
      state: data.state,
      city: data.city,
      zip: data.zip,
      duration: data.duration,
      date: new Date(data.date),
      contactNumber: data.contactNumber,
      massageType: data.massageType,
      therapist: data.therapist._id,
    };
  } else if (data && user && user.userType && user.userType.name !== "admin") {
    return {
      firstName: data.customer.firstName,
      lastName: data.customer.lastName,
      email: data.customer.email,
      address: data.address,
      addressTwo: data.addressTwo,
      state: data.state,
      city: data.city,
      zip: data.zip,
      duration: data.duration,
      date: new Date(data.date),
      contactNumber: data.contactNumber,
      massageType: data.massageType,
      therapist: data.therapist._id,
    };
  } else if (user && user.userType && user.userType.name === "admin") {
    return {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      addressTwo: "",
      state: "AB",
      city: "Banff",
      zip: "",
      duration: 60,
      date: null,
      contactNumber: "",
      massageType: "Whole body massage",
      therapist: "",
    };
  } else {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      address: "",
      addressTwo: "",
      state: "AB",
      city: "Banff",
      zip: "",
      duration: 60,
      date: null,
      contactNumber: "",
      massageType: "Whole body massage",
      therapist: "",
    };
  }
};
