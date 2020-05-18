import React from "react";
import {
    Container,
    Row,
    Col,
  } from "react-bootstrap";

  export default function trackingProblem() {
    return (
          <>
          <div style={{ backgroundColor: "#EDE7E7" }}>
            <Container>
              <Row>
                <Col>
                  <h1>tracking problem</h1>
                </Col>
              </Row>
              <Row className="border-bottom">
                <Col>
                  <h5>ปัญหาที่ถูกส่งแล้ว , ส่งเมื่อไร , status</h5>
                </Col>
              </Row>
              </Container>
              </div>
          </>
          )
  }