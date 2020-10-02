import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ name, placeholder, label, register, readOnly }) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        placeholder={placeholder}
        ref={register}
        readOnly={readOnly}
      />
    </>
  );
};

export default Input;
