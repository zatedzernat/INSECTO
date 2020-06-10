import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Callout(props) {
  return (
    <div className={props.color}>
      <Row>
        <Col xs={7}>
          <h5>{props.item}</h5>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <h6>{props.status}</h6>
        </Col>
      </Row>
      <Row>
        <Col>{props.problem}</Col>
        <Col style={{ textAlign: "right" }}>
          <h6>{props.time}</h6>
        </Col>
      </Row>
    </div>
  );
}
