import React from "react";
import { Redirect } from "@reach/router";
import auth from "../../services/authService";

const PrivateRoute = (props) => {
  let { as: Comp, ...rest } = props;
  return auth.getCurrentUser() ? (
    <Comp {...rest} />
  ) : (
    <Redirect to="/login" noThrow />
  );
};

export default PrivateRoute;
