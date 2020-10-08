import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import EditAppointmentForm from "./editAppointmentForm";

const FormModal = ({ show, setShow, appointmentId }) => {
  const formRef = useRef();

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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAppointmentForm ref={formRef} appointmentId={appointmentId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;
