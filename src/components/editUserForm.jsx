import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { Form, Card, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { editUsersValidationSchema } from "../validation/createUsersValidationSchema";
import { isLoading, editAccount } from "../store/users";
import { loadUserTypes, getUserTypes } from "../store/userTypes";
import { concatName } from "../utils/utils";
import Input from "./common/input";
import Error from "./common/error";
import BirthDatePicker from "./common/birthDatePicker";

let EditUserForm = ({ user }, ref) => {
  const dispatch = useDispatch();
  const userTypes = useSelector(getUserTypes);
  const loading = useSelector(isLoading);
  const defaultValues = {
    birthDate: moment(user.birthDate).toDate(),
    gender: user.gender,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType.name,
    status: user.status,
  };
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues,
    resolver: yupResolver(editUsersValidationSchema),
  });

  const onSubmit = (data) => {
    delete data.userType;
    const name = concatName(data);
    try {
      dispatch(editAccount(user._id, data));
      toast.success(`${name}'s account has been updated successfully.`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /*
  a parent component that renders 
  <EditAppointmentForm ref={formRef} /> 
  would be able to invoke submit: () => handleSubmit(onSubmit)()
   */
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  useEffect(() => {
    console.log("edit user");
    dispatch(loadUserTypes());
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Card className="mt-3">
                <Card.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                      <Input
                        name="firstName"
                        label="Firstname"
                        placeholder="Enter first name"
                        register={register}
                      />
                      {errors.firstName && (
                        <Error message={errors.firstName.message} />
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                      <Input
                        name="lastName"
                        label="Lastname"
                        placeholder="Enter last name"
                        register={register}
                      />
                      {errors.lastName && (
                        <Error message={errors.lastName.message} />
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="userType">
                      <Input
                        name="userType"
                        label="User type"
                        register={register}
                        disabled
                      />
                      {errors.userType && (
                        <Error message={errors.userType.message} />
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Input
                        name="email"
                        label="Email"
                        placeholder="Enter email"
                        register={register}
                      />
                      {errors.email && <Error message={errors.email.message} />}
                    </Form.Group>

                    <Form.Group as={Col} controlId="status">
                      <Form.Label>Status</Form.Label>
                      <Form.Control as="select" name="status" ref={register}>
                        <option value="active">Active</option>
                        <option value="suspend">Suspend</option>
                      </Form.Control>
                      {errors.gender && (
                        <Error message={errors.gender.message} />
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="birtDate">
                      <Form.Label>Birthday</Form.Label>
                      <Controller
                        control={control}
                        name="birthDate"
                        as={<BirthDatePicker />}
                      />
                      {errors.birthDate && (
                        <Error message={errors.birthDate.message} />
                      )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        defaultValue=""
                        ref={register}
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="declined">Decline to answer</option>
                      </Form.Control>
                      {errors.gender && (
                        <Error message={errors.gender.message} />
                      )}
                    </Form.Group>
                  </Form.Row>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

EditUserForm = forwardRef(EditUserForm);
export default EditUserForm;
