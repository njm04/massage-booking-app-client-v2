import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUsers } from "../store/users";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import Table from "./common/table";

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const columns = [
    { label: "Name", path: "name" },
    { label: "User type", path: "userType" },
    { label: "Email", path: "email" },
    { label: "Birthday", path: "birthDate" },
    { label: "Gender", path: "gender" },
    {
      key: "edit",
      content: (id) => (
        <Button variant="outline-info">
          <FaEdit />
        </Button>
      ),
    },
    {
      key: "delete",
      content: (id) => (
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

  return <Table columns={columns} data={users} />;
};

export default UsersTable;
