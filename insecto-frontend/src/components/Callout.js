import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function Callout(props) {
  // const style = {
  // backgroundColor: `${props.onlyColor}`,
  // };

  return (
    <div className={props.callOutClass} style={{ borderLeftWidth: "10px", borderLeftColor: props.color }}>
      <Row>
        <Col xs={6}>
          <h5>{props.item}</h5>
        </Col>
        <Col xs={6} style={{ textAlign: "right" }}>
          <Button
            disabled
            variant="light"
            className="btn btn-xs "
            style={{ borderColor: "#909497", color: "#424949" }}
          >
            {props.status}
          </Button>
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
