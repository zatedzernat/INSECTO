import React from "react";
import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Container>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img src="/images/bug.png" alt="insecto logo" width="45px" />
          INSECTO
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>
    </Container>
  );
}
