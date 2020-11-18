import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { navigate, Redirect } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import auth from "../services/authService";
import http from "../services/httpService";
import Input from "./common/input";
import Spinner from "./common/spinner";
import { authReceived, login, isLoading } from "../store/auth";
import { loginValidationSchema } from "../validation/validationSchemas";

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const onSubmit = async (data) => {
    await dispatch(login(data));
    http.setJwt(auth.getJwt());
    dispatch(authReceived(auth.getCurrentUser()));
    navigate("/");
  };

  const onClick = () => {
    navigate("/registration");
  };

  if (auth.getCurrentUser()) return <Redirect to="/" noThrow />;
  return (
    <div>
      <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <Card className="mt-3">
                  <Card.Header as="h2">Login</Card.Header>
                  <Card.Body>
                    <Form.Group controlId="formBasicEmail">
                      <Input
                        name="email"
                        label="Email"
                        placeholder="Enter email"
                        register={register}
                      />
                      {errors.email && (
                        <Alert variant="danger">{errors.email.message}</Alert>
                      )}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Input
                        name="password"
                        label="Password"
                        placeholder="Password"
                        register={register}
                        type="password"
                      />
                      {errors.password && (
                        <Alert variant="danger">
                          {errors.password.message}
                        </Alert>
                      )}
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                      {loading ? (
                        <>
                          <Spinner />
                          <span>logging in</span>
                        </>
                      ) : (
                        <span>login</span>
                      )}
                    </Button>
                    <Button
                      variant="success"
                      type="button"
                      onClick={onClick}
                      block
                    >
                      Create Account
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default Login;
