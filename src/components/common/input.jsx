import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ name, placeholder, label, register, readOnly, type }) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        placeholder={placeholder}
        ref={register}
        readOnly={readOnly}
        type={type}
      />
    </>
  );
};

export default Input;
