import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAppointments,
  getAppointmentsHistory,
  isLoading,
} from "../store/appointments";
import { Spinner, Badge } from "react-bootstrap";
import Table from "./common/table";

const AppointmentsHistory = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getAppointmentsHistory);
  const loading = useSelector(isLoading);

  const columns = [
    { label: "Name", path: "name" },
    { label: "Email", path: "email" },
    { label: "Massage type", path: "massageType" },
    { label: "Duration", path: "duration" },
    { label: "Therapist", path: "therapistName" },
    { label: "Contact number", path: "contactNumber" },
    { label: "Address", path: "address" },
    { label: "Date", path: "date" },
    { label: "Created by", path: "createdBy" },
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
  }, [dispatch]);

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
    </>
  );
};

export default AppointmentsHistory;
