import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isLoading } from "../store/users";
import Spinner from "./common/spinner";
import ChangePasswordForm from "./changePasswordForm";

const ChangePasswordModal = ({ show, setShow }) => {
  const formRef = useRef();
  const loading = useSelector(isLoading);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.submit();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePasswordForm ref={formRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner /> : null}
            <span>Submit</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
