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
