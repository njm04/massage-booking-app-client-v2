import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import EditAppointmentForm from "./editAppointmentForm";
import Spinner from "./common/spinner";

const FormModal = ({ show, setShow, appointmentId, therapists, loading }) => {
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
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAppointmentForm
            ref={formRef}
            appointmentId={appointmentId}
            therapists={therapists}
          />
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

export default FormModal;
