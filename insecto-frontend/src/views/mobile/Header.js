import React from "react";
import { Navbar, Row, Col } from "react-bootstrap";

export default function Header() {
  return (
      <Row>
        <Col>
        <Navbar className="border-bottom">
          <a href="/" className="brand-link text-dark">
            <img
              src="/images/bug.png"
              alt="insecto logo"
              className="brand-image img-circle elevation-3"
            />
            <span className="font-weight-dark">
              INSECTO
            </span>
          </a>
        </Navbar>
        </Col>
      </Row>
  );
}
