import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";

const ChangePasswordButton = ({ setShow }) => {
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Dropdown.Item as={Button} onClick={handleShow}>
      <RiLockPasswordFill />
      <span className="pl-2">Change Password</span>
    </Dropdown.Item>
  );
};

export default ChangePasswordButton;
