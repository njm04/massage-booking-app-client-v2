import { toast } from "react-toastify";

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
