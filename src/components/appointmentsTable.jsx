import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Table } from "react-bootstrap";
import { loadAppointments, getAppointments } from "../store/appointments";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
// import TableHeader from "./common/tableHeader";
// import TableBody from "./common/tableBody";
import Table from "./common/table";
import NavBar from "./common/navBar";
import { getUser } from "../store/auth";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getAppointments);
  const user = useSelector(getUser);
  console.log(user);

  const columns = [
    { label: "Name", path: "name" },
    { label: "Massage type", path: "massageType" },
    { label: "Duration", path: "duration" },
    { label: "Contact number", path: "contactNumber" },
    { label: "Address", path: "address" },
    { label: "Date", path: "date" },
    {
      key: "edit",
      content: () => (
        <Button variant="outline-info">
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
      <NavBar />
      <Table columns={columns} data={appointments} />
      {/* <Table striped bordered hover>
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={appointments} />
      </Table> */}
    </>
  );
};

export default AppointmentsTable;
