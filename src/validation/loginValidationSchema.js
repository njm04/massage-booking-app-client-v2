import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address must not be empty"),
  password: yup.string().required("Invalid password"),
});
