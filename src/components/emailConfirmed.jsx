import React from "react";
import { navigate } from "@reach/router";
import { Button } from "react-bootstrap";

const EmailConfirmed = () => {
  return (
    <div className="container email-confirmed">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Thank you!</h1>
            <h2>Email verified successfully</h2>
            <div className="error-details">
              You can now login and access your account.
            </div>
            <div className="error-actions">
              <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
