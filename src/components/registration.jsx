import React, { useEffect } from "react";
import { Form, Button, Card, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@reach/router";
import _ from "lodash";
import { toast } from "react-toastify";
import BirthDatePicker from "./common/birthDatePicker";
import { registrationValiditionSchema } from "../validation/registrationValiditionSchema";
import { registerUser, isLoading } from "../store/users";
import Input from "./common/input";
import Error from "./common/error";
import Spinner from "./common/spinner";

const Registration = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const defaultValues = {
    birthDate: null,
    gender: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
    resolver: yupResolver(registrationValiditionSchema),
  });

  const onSubmit = (data) => {
    if (!data.userType) data.userType = null;

    const account = _.pick(data, [
      "email",
      "password",
      "firstName",
      "lastName",
      "birthDate",
      "gender",
      "userType",
    ]);
    try {
      dispatch(registerUser(account));
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

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
                <Card.Header as="h2">Registration</Card.Header>
                <Card.Body>
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
                  <Button
                    variant="dark"
                    type="submit"
                    className="mr-2"
                    onClick={() => navigate("/login")}
                  >
                    {loading ? <Spinner /> : null}
                    <span>Back</span>
                  </Button>
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

export default Registration;
