import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, isLoading } from "../store/users";
import { getUser } from "../store/auth";
import Input from "./common/input";
import Error from "./common/error";

const changePasswordValidationSchema = yup.object({
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

let ChangePasswordForm = ({}, ref) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const defaultValues = {
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(changePassword(user._id, data));
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset(defaultValues);
  }, [isSubmitSuccessful, reset, defaultValues]);

  /*
  a parent component that renders 
  <EditAppointmentForm ref={formRef} /> 
  would be able to invoke submit: () => handleSubmit(onSubmit)()
   */
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  return (
    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Card>
                <Card.Body>
                  <Form.Group controlId="oldPassword">
                    <Input
                      name="password"
                      label="Type your current password"
                      type="password"
                      register={register}
                    />
                    {errors.password && (
                      <Error message={errors.password.message} />
                    )}
                  </Form.Group>

                  <Form.Group controlId="newPassword">
                    <Input
                      name="newPassword"
                      label="Type your new password"
                      register={register}
                      type="password"
                    />
                    {errors.newPassword && (
                      <Error message={errors.newPassword.message} />
                    )}
                  </Form.Group>
                  <Form.Group controlId="newPasswordConfirmation">
                    <Input
                      name="newPasswordConfirmation"
                      label="Retype your new password"
                      register={register}
                      type="password"
                    />
                    {errors.newPasswordConfirmation && (
                      <Error message={errors.newPasswordConfirmation.message} />
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

ChangePasswordForm = forwardRef(ChangePasswordForm);
export default ChangePasswordForm;
