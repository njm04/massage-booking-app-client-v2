import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "@reach/router";
import {
  getAllUsers,
  loadUsers,
  getUserById,
  deleteAccount,
  isLoading,
} from "../store/users";
import { getUser } from "../store/auth";
import { paginate } from "../utils/paginate";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button, Spinner, Badge } from "react-bootstrap";
import Table from "./common/table";
import EditUserModal from "./editUserModal";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const authUser = useSelector(getUser);
  const loading = useSelector(isLoading);
  const userById = useSelector(getUserById);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const handleShow = (id) => {
    setShow(true);
    setUser(userById(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteAccount(id));
  };

  const columns = [
    { label: "Name", path: "name" },
    { label: "User type", path: "userType" },
    { label: "Email", path: "email" },
    { label: "Birthday", path: "birthDate" },
    { label: "Gender", path: "gender" },
    {
      label: "Status",
      key: "status",
      content: (item) => {
        const variant = item.status === "active" ? "success" : "danger";
        return <Badge variant={variant}>{item.status}</Badge>;
      },
    },
    {
      key: "edit",
      content: (item) => (
        <Button variant="outline-info" onClick={() => handleShow(item.id)}>
          <FaEdit />
        </Button>
      ),
    },
    {
      key: "delete",
      content: (item) => (
        <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
          <FaTrashAlt />
        </Button>
      ),
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
      filtered = users.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchQuery) !== -1 ||
          user.userType.toLowerCase().indexOf(searchQuery) !== -1 ||
          user.status.toLowerCase().indexOf(searchQuery) !== -1
      );
    } else {
      filtered = users;
    }
    const paginatedUsers = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedUsers };
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (authUser && authUser.userType) {
    if (
      authUser.userType.name === "therapist" ||
      authUser.userType.name === "customer"
    )
      return <Redirect to="/" noThrow />;
  }

  return (
    <>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search (name, user type, status)"
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
      <EditUserModal
        show={show}
        setShow={setShow}
        user={user}
        loading={loading}
      />
    </>
  );
};

export default UsersTable;
