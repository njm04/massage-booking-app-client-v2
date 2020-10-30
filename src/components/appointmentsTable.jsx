import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAppointments,
  getAppointments,
  deleteAppointment,
  isLoading,
} from "../store/appointments";
import { getTherapists, loadUsers } from "../store/users";
import { getUser } from "../store/auth";
import { Spinner } from "react-bootstrap";
import Table from "./common/table";
import FormModal from "./formModal";
import { createColumns } from "../utils/utils";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const therapists = useSelector(getTherapists);
  const appointments = useSelector(getAppointments);
  const loading = useSelector(isLoading);
  const [appointmentId, setAppointmentId] = useState("");
  const [show, setShow] = useState(false);
  const [appointmentDeleteId, setAppointmentDeleteId] = useState("");

  // data came from tableBody and passed to content() then to handleShow
  const handleShow = (id) => {
    setShow(true);
    setAppointmentId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
    setAppointmentDeleteId(id);
  };

  const columns = createColumns(user, handleShow, handleDelete);

  useEffect(() => {
    dispatch(loadAppointments());
    dispatch(loadUsers());
    console.log("i fire once");
  }, [dispatch, appointmentDeleteId]);

  return (
    <>
      {loading ? (
        <div>
          <Table columns={columns} />
          <Spinner animation="border" variant="primary" className="mt-5" />
          <h2>Loading...</h2>
        </div>
      ) : (
        <Table columns={columns} data={appointments} />
      )}
      <FormModal
        show={show}
        setShow={setShow}
        appointmentId={appointmentId}
        therapists={therapists}
        loading={loading}
      />
    </>
  );
};

export default AppointmentsTable;
