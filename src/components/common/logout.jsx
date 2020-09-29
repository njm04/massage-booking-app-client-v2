import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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
    navigate("/");
  };

  return (
    // <OverlayTrigger
    //   key="bottom"
    //   placement="bottom"
    //   overlay={
    //     <Tooltip id="bottom">
    //       <strong>Log out</strong>.
    //     </Tooltip>
    //   }
    // >
    <Button variant="outline-light" onClick={handleLogout}>
      <FaSignOutAlt />
    </Button>
    // </OverlayTrigger>
  );
};

export default Logout;
