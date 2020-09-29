import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logout from "../common/logout";
import { getUser } from "../../store/auth";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector(getUser);
  const { firstName, lastName } = user;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
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
