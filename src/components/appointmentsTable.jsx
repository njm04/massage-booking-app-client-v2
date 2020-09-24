import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { loadAppointments, getAppointments } from "../store/appointments";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getAppointments);

  const columns = [
    { label: "#", path: "" },
    { label: "Name", path: "" },
    { label: "Massage type", path: "" },
    { label: "Duration", path: "" },
    { label: "Contact number", path: "" },
    { label: "Address", path: "" },
    { label: "Date", path: "" },
  ];

  useEffect(() => {
    dispatch(loadAppointments());
  }, []);

  return (
    <Table striped bordered hover>
      <TableHeader columns={columns} />
      {/* <TableBody columns={columns} data={appointments} /> */}
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment._id}>
            <td>{index + 1}</td>
            <td>{appointment.bookedBy.firstName}</td>
            <td>{appointment.massageType}</td>
            <td>{appointment.duration}</td>
            <td>{appointment.contactNumber}</td>
            <td>
              {appointment.address}, {appointment.city}, {appointment.zip}
            </td>
            <td>{new Date(appointment.date).toLocaleString()}</td>
            <td>
              <Button variant="outline-info">
                <FaEdit />
              </Button>
            </td>
            <td>
              <Button variant="outline-danger">
                <FaTrashAlt />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentsTable;
