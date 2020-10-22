import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logout from "../common/logout";
import { getUser } from "../../store/auth";
import { useSelector } from "react-redux";
import NavLink from "./navLink";

const NavBar = () => {
  const user = useSelector(getUser);
  const { firstName, lastName, userType = {} } = user;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/" className="nav-link">
          Appointments
        </NavLink>
        <NavLink className="nav-link" to="/book-appointment">
          Book Appointment
        </NavLink>
        {user && userType.name === "admin" ? (
          <>
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
      {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
      <Navbar.Text className="mr-2">
        Signed in as:{" "}
        <a href="#login">
          {firstName} {lastName}
        </a>
      </Navbar.Text>
      <Logout />
    </Navbar>
  );
};

export default NavBar;
