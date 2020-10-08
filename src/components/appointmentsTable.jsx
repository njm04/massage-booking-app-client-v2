import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Table } from "react-bootstrap";
import { loadAppointments, getAppointments } from "../store/appointments";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
// import TableHeader from "./common/tableHeader";
// import TableBody from "./common/tableBody";
import Table from "./common/table";
import FormModal from "./formModal";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getAppointments);
  const [appointmentId, setAppointmentId] = useState("");
  const [show, setShow] = useState(false);

  // data came from tableBody and passed to content() then to handleShow
  const handleShow = (id) => {
    setShow(true);
    setAppointmentId(id);
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
      key: "edit",
      content: (id) => (
        <Button variant="outline-info" onClick={() => handleShow(id)}>
          <FaEdit />
        </Button>
      ),
    },
    {
      key: "delete",
      content: () => (
        <Button variant="outline-danger">
          <FaTrashAlt />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(loadAppointments());
    console.log("i fire once");
  }, [dispatch]);

  return (
    <>
      <Table columns={columns} data={appointments} />
      {/* <Table striped bordered hover>
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={appointments} />
      </Table> */}
      <FormModal show={show} setShow={setShow} appointmentId={appointmentId} />
    </>
  );
};

export default AppointmentsTable;
