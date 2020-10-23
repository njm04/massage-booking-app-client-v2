import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import EditUserForm from "./editUserForm";
import Spinner from "./common/spinner";

const EditUserModal = ({ show, setShow, user, loading }) => {
  const formRef = useRef();

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.submit();
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditUserForm user={user} ref={formRef} />
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
  );
};

export default EditUserModal;
