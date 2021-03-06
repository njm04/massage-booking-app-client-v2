import React, { useEffect, useState } from "react";
import { Form, Button, Card, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "@reach/router";
import BirthDatePicker from "./common/birthDatePicker";
import { createUsersValidationSchema } from "../validation/validationSchemas";
import { createAccount, isLoading } from "../store/users";
import { loadUserTypes, getUserTypes } from "../store/userTypes";
import { getUser } from "../store/auth";
import Input from "./common/input";
import Error from "./common/error";
import Spinner from "./common/spinner";

const CreateUser = () => {
  const dispatch = useDispatch();
  const userTypes = useSelector(getUserTypes);
  const loading = useSelector(isLoading);
  const user = useSelector(getUser);
  const [userType, setUserType] = useState("");
  const defaultValues = {
    birthDate: null,
    gender: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "",
    status: "",
  };
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    formState: { isSubmitSuccessful },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createUsersValidationSchema),
  });

  const handleUserTypeChange = (userTypeId) => {
    const type = userTypes.find((userType) => userType._id === userTypeId);
    setUserType(type.name);
  };

  const handleUserTypeClick = (userTypeId) => {
    const type = userTypes.find((userType) => userType._id === userTypeId);

    if (type && type.name && type.name === "customer")
      setValue("status", "unverified");
  };

  const onSubmit = (account) => {
    if (!account.userType) account.userType = null;
    dispatch(createAccount(account));
    setUserType("");
  };

  useEffect(() => {
    dispatch(loadUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset(defaultValues);
  }, [isSubmitSuccessful, reset, defaultValues]);

  if (user && user.userType) {
    if (user.userType.name === "therapist" || user.userType.name === "customer")
      return <Redirect to="/" noThrow />;
  }

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
                        onClick={(e) => handleUserTypeClick(e.target.value)}
                        onChange={(e) =>
                          handleUserTypeChange(e.currentTarget.value)
                        }
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
                      {userType === "customer" ? (
                        <Form.Control
                          as="input"
                          name="status"
                          ref={register}
                          readOnly
                        />
                      ) : (
                        <Form.Control
                          as="select"
                          name="status"
                          defaultValue=""
                          ref={register}
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          <option value="active">Active</option>
                          <option value="suspend">Suspend</option>
                        </Form.Control>
                      )}

                      {errors.status && (
                        <Error message={errors.status.message} />
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
