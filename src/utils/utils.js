import _ from "lodash";

export const concatName = (item) => {
  return `${item.firstName} ${item.lastName}`;
};

export const concatAddress = (obj) => {
  const addressTwo = obj.addressTwo ? obj.addressTwo + " " : "";
  return `${addressTwo}${obj.address}, ${obj.city}, ${obj.state}, ${obj.zip}`;
};
