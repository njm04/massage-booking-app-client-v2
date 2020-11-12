import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
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
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { createColumns } from "../utils/utils";
import { paginate } from "../utils/paginate";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const therapists = useSelector(getTherapists);
  const appointments = useSelector(getAppointments);
  const loading = useSelector(isLoading);
  const [appointmentId, setAppointmentId] = useState("");
  const [show, setShow] = useState(false);
  const [appointmentDeleteId, setAppointmentDeleteId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [pageSize] = useState(10);

  // data came from tableBody and passed to content() then to handleShow
  const handleShow = (id) => {
    setShow(true);
    setAppointmentId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
    setAppointmentDeleteId(id);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
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

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedAppointments = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedAppointments };
  };

  const columns = createColumns(user, handleShow, handleDelete);

  useEffect(() => {
    dispatch(loadAppointments());
    dispatch(loadUsers());
  }, [dispatch, appointmentDeleteId]);

  const { totalCount, data: allAppointments } = getPageData();

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
        <Table
          columns={columns}
          data={allAppointments}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
      )}
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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
