import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUsers, getUserById, isLoading } from "../store/users";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button, Spinner, Badge } from "react-bootstrap";
import Table from "./common/table";
import EditUserModal from "./editUserModal";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const loading = useSelector(isLoading);
  const userById = useSelector(getUserById);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  const handleShow = (id) => {
    setShow(true);
    setUser(userById(id));
  };
  const columns = [
    { label: "Name", path: "name" },
    { label: "User type", path: "userType" },
    { label: "Email", path: "email" },
    { label: "Birthday", path: "birthDate" },
    { label: "Gender", path: "gender" },
    {
      label: "Status",
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
        <Button variant="outline-danger">
          <FaTrashAlt />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    console.log("all users");
    dispatch(loadUsers());
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
        <Table columns={columns} data={users} />
      )}
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
