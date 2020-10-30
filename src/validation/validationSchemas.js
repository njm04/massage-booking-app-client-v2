import * as yup from "yup";

export const changePasswordValidationSchema = yup.object({
  password: yup.string().min(5).max(1000).required("Password is required"),
  newPassword: yup
    .string()
    .min(5, "Your new password must be atleast 5 characters")
    .max(1000, "Your new password is too long")
    .required("Password is required"),
  newPasswordConfirmation: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address must not be empty"),
  password: yup.string().required("Invalid password"),
});

export const registrationValiditionSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is a required field"),
  password: yup
    .string()
    .min(5)
    .max(1000)
    .required("Password is a required field"),
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  birthDate: yup.date().required("Birthday is a required field").nullable(),
});

export const createUsersValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is a required field"),
  password: yup
    .string()
    .min(5)
    .max(1000)
    .required("Password is a required field"),
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  birthDate: yup.date().required("Birthday is a required field").nullable(),
  userType: yup.string().required("User type is a required field"),
});

export const editUsersValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is a required field"),
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  gender: yup.string().required("Gender is a required field"),
  birthDate: yup.date().required("Birthday is a required field").nullable(),
});

export const appointmentsSchema = (user) => {
  if (user && user.userType && user.userType.name === "admin") {
    return yup.object().shape({
      firstName: yup.string().required("Firstname is a required field"),
      lastName: yup.string().required("Firstname is a required field"),
      massageType: yup.string().required("Massage type is a required field"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email address is a required field"),
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
      address: yup
        .string()
        .min(3)
        .max(255)
        .required("Address is a required field"),
      addressTwo: yup.string().max(10),
      state: yup
        .string()
        .max(255)
        .required("State/Province is a required field"),
      city: yup.string().min(3).max(255).required("City is a required field"),
      zip: yup.string().min(6).max(255).required("Zip is a required field"),
      date: yup.date().required("Date and time is a required field").nullable(),
      therapist: yup.string().required("Therapist is a required field"),
    });
  }

  if (user && user.userType && user.userType.name === "customer") {
    return yup.object().shape({
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
      address: yup
        .string()
        .min(3)
        .max(255)
        .required("Address is a required field"),
      addressTwo: yup.string().max(10),
      state: yup
        .string()
        .max(255)
        .required("State/Province is a required field"),
      city: yup.string().min(3).max(255).required("City is a required field"),
      zip: yup.string().min(6).max(255).required("Zip is a required field"),
      date: yup.date().required("Date and time is a required field").nullable(),
      therapist: yup.string().required("Therapist is a required field"),
    });
  }
};
