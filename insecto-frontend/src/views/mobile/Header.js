import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="/images/bug.png" alt="insecto logo" width="45px" />
          INSECTO
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
