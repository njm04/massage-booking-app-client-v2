import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import auth from "../services/authService";
import { navigate, Redirect } from "@reach/router";
import { authReceived } from "../store/auth";
import { useDispatch } from "react-redux";
import http from "../services/httpService";

const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      http.setJwt(auth.getJwt());
      dispatch(authReceived(auth.getCurrentUser()));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.getCurrentUser()) return <Redirect to="/" noThrow />;
  return (
    <div>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Card className="mt-3">
                <Card.Header as="h2">Login</Card.Header>
                <Card.Body>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}
                  <Button variant="primary" type="submit" block>
                    login
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
