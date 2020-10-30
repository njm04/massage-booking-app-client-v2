import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import auth from "../../services/authService";
import { navigate } from "@reach/router";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../store/auth";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.logout();
    dispatch(userLoggedOut({}));
    navigate("/login");
  };

  return (
    <Dropdown.Item as={Button} onClick={handleLogout}>
      <FaSignOutAlt />
      <span className="pl-2">Logout</span>
    </Dropdown.Item>
  );
};

export default Logout;
