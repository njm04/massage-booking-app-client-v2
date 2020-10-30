import React, { useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { getUser } from "../../store/auth";
import { useSelector } from "react-redux";
import { FaUserCog } from "react-icons/fa";
import Logout from "../common/logout";
import NavLink from "./navLink";
import ChangePasswordButton from "../changePasswordButton";
import ChangePasswordModal from "../changePasswordModal";

const NavBar = () => {
  const user = useSelector(getUser);
  const { firstName, lastName, userType = {} } = user;
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mx-auto">
        <Navbar.Brand href="/">Massage Clinic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link">
              Appointments
            </NavLink>
            {user && userType.name === "customer" ? (
              <NavLink className="nav-link" to="/book-appointment">
                Book Appointment
              </NavLink>
            ) : null}
            {user && userType.name === "therapist" ? (
              <NavLink className="nav-link" to="/calendar">
                Calendar
              </NavLink>
            ) : null}
            {user && userType.name === "admin" ? (
              <>
                <NavLink className="nav-link" to="/book-appointment">
                  Book Appointment
                </NavLink>
                <NavLink className="nav-link" to="/calendar">
                  Calendar
                </NavLink>
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
                <NavLink className="nav-link" to="/create-user">
                  Create User
                </NavLink>
              </>
            ) : null}
          </Nav>
          <Navbar.Text className="mr-2">
            Signed in as:{" "}
            <a href="#login">
              {firstName} {lastName}
            </a>
          </Navbar.Text>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              <FaUserCog />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <Logout />
              <ChangePasswordButton setShow={setShow} />
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
      <ChangePasswordModal show={show} setShow={setShow} />
    </>
  );
};

export default NavBar;
