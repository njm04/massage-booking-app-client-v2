import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAppointments,
  getCompletedAppointments,
  deleteAppointment,
  isLoading,
} from "../store/appointments";
import { getTherapists, loadUsers } from "../store/users";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button, Spinner, Badge } from "react-bootstrap";
import Table from "./common/table";
import FormModal from "./formModal";

const AppointmentsHistory = () => {
  const dispatch = useDispatch();
  const therapists = useSelector(getTherapists);
  const appointments = useSelector(getCompletedAppointments);
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

  const columns = [
    { label: "Name", path: "name" },
    { label: "Massage type", path: "massageType" },
    { label: "Duration", path: "duration" },
    { label: "Therapist", path: "therapistName" },
    { label: "Contact number", path: "contactNumber" },
    { label: "Address", path: "address" },
    { label: "Date", path: "date" },
    {
      label: "Status",
      key: "status",
      content: (item) => {
        const variant =
          item.status === "pending"
            ? "danger"
            : item.status === "ongoing"
            ? "warning"
            : item.status === "cancelled"
            ? "dark"
            : "success";
        return <Badge variant={variant}>{item.status}</Badge>;
      },
    },
  ];

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

export default AppointmentsHistory;
