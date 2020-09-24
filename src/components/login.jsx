import React from "react";
import { Form, Button, Card } from "react-bootstrap";

const Login = () => {
  return (
    <div>
      <Form className="mt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Card className="mt-3">
                <Card.Header as="h2">Login</Card.Header>
                <Card.Body>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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
