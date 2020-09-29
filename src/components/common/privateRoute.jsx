import React from "react";
import { Redirect } from "@reach/router";
import Login from "../login";
import auth from "../../services/authService";

const PrivateRoute = (props) => {
  let { as: Comp, ...rest } = props;
  return auth.getCurrentUser() ? (
    <Comp {...rest} />
  ) : (
    <Redirect to="/" noThrow />
  );
};

export default PrivateRoute;
