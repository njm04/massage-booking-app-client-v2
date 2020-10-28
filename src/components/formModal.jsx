import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import EditAppointmentForm from "./editAppointmentForm";
import UpdateAppointmentStatusModal from "./updateAppointmentStatusForm";
import Spinner from "./common/spinner";
import { getUser } from "../store/auth";
import { useSelector } from "react-redux";

const FormModal = ({ show, setShow, appointmentId, therapists, loading }) => {
  const formRef = useRef();
  const user = useSelector(getUser);

  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.submit();
  };

  const form = () => {
    if (user && user.userType && user.userType.name === "therapist") {
      return (
        <UpdateAppointmentStatusModal
          ref={formRef}
          appointmentId={appointmentId}
          therapists={therapists}
        />
      );
    } else {
      return (
        <EditAppointmentForm
          ref={formRef}
          appointmentId={appointmentId}
          therapists={therapists}
        />
      );
    }
  };

  const title = () => {
    if (user && user.userType && user.userType.name === "therapist") {
      return "Update Status";
    } else {
      return "Edit Appointment";
    }
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
          <Modal.Title>{title()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form()}</Modal.Body>
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
