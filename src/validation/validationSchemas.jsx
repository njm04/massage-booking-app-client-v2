import * as yup from "yup";

export const appoinmentFormSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is a required field"),
  lastName: yup.string().required("Firstname is a required field"),
  massageType: yup.string().required("Massage type is a required field"),
  duration: yup
    .number()
    .min(60)
    .max(120)
    .required("Duration is a required field"),
  contactNumber: yup
    .string()
    .min(10)
    .max(20)
    .required("Contact number is a required field"),
  address: yup.string().min(3).max(255).required("Address is a required field"),
  addressTwo: yup.string().max(10),
  state: yup.string().max(255).required("State/Province is a required field"),
  city: yup.string().min(3).max(255).required("City is a required field"),
  zip: yup.string().min(6).max(255).required("Zip is a required field"),
  date: yup.date().required("Date and time is a required field"),
});
