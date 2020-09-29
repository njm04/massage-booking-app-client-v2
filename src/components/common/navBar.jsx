import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logout from "../common/logout";
import { getUser } from "../../store/auth";
import { useSelector } from "react-redux";
import { Link } from "@reach/router";

const NavBar = () => {
  const user = useSelector(getUser);
  const { firstName, lastName } = user;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Link className="nav-link" to="/dashboard">
          Appointments
        </Link>
        <Link className="nav-link" to="/book-appointment">
          Book Appointment
        </Link>
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
