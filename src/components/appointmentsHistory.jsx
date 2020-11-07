import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAppointments,
  getAppointmentsHistory,
  isLoading,
} from "../store/appointments";
import { Spinner, Badge } from "react-bootstrap";
import Table from "./common/table";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

const AppointmentsHistory = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getAppointmentsHistory);
  const loading = useSelector(isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = [];
    if (searchQuery) {
      filtered = appointments.filter(
        (appointment) =>
          appointment.name.toLowerCase().indexOf(searchQuery) !== -1 ||
          appointment.therapistName.toLowerCase().indexOf(searchQuery) !== -1 ||
          appointment.status.toLowerCase().indexOf(searchQuery) !== -1
      );
    } else {
      filtered = appointments;
    }
    const paginatedAppointments = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedAppointments };
  };

  useEffect(() => {
    dispatch(loadAppointments());
  }, [dispatch]);

  return (
    <>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search (customer, therapist, status)"
      />
      {loading ? (
        <div>
          <Table columns={columns} />
          <Spinner animation="border" variant="primary" className="mt-5" />
          <h2>Loading...</h2>
        </div>
      ) : (
        <Table columns={columns} data={getPageData().data} />
      )}
      <Pagination
        itemsCount={getPageData().totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AppointmentsHistory;
