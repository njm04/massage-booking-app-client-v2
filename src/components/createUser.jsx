import React, { useEffect } from "react";
import { Form, Button, Card, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import BirthDatePicker from "./common/birthDatePicker";
import { createUsersValidationSchema } from "../validation/usersValidationSchema";
import { createAccount, isLoading } from "../store/users";
import { loadUserTypes, getUserTypes } from "../store/userTypes";
import Input from "./common/input";
import Error from "./common/error";
import Spinner from "./common/spinner";

const CreateUser = () => {
  const dispatch = useDispatch();
  const userTypes = useSelector(getUserTypes);
  const loading = useSelector(isLoading);
  const defaultValues = {
    birthDate: null,
    gender: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "",
    status: "active",
  };
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createUsersValidationSchema),
  });

  const onSubmit = (account) => {
    if (!account.userType) account.userType = null;

    try {
      dispatch(createAccount(account));
      const type = userTypes.find(
        (userType) => userType._id === account.userType
      );
      toast.success(`${type.name.toUpperCase()} account successfully created.`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    dispatch(loadUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset(defaultValues);
  }, [isSubmitSuccessful, reset, defaultValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Card className="mt-3">
                <Card.Header as="h2">Create user</Card.Header>
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
                      <Form.Label>User type</Form.Label>
                      <Form.Control
                        as="select"
                        name="userType"
                        defaultValue=""
                        ref={register}
                      >
                        <option value="" disabled>
                          Select user type
                        </option>
                        {userTypes !== [] &&
                          userTypes.map((userType) => (
                            <option key={userType._id} value={userType._id}>
                              {userType.name}
                            </option>
                          ))}
                      </Form.Control>
                      {errors.userType && (
                        <Error message={errors.userType.message} />
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
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Input
                        name="email"
                        label="Email"
                        placeholder="Enter email"
                        register={register}
                      />
                      {errors.email && <Error message={errors.email.message} />}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Input
                        name="password"
                        label="Password"
                        placeholder="password"
                        type="password"
                        register={register}
                      />
                      {errors.password && (
                        <Error message={errors.password.message} />
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Button variant="primary" type="submit">
                    {loading ? <Spinner /> : null}
                    <span>Submit</span>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

export default CreateUser;
