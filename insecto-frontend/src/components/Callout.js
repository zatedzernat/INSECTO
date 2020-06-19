import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function Callout(props) {
  // const style = {
  // backgroundColor: `${props.onlyColor}`,
  // };
  return (
    <div className={props.color} style={{ borderLeftWidth: "10px" }}>
      <Row>
        <Col xs={6}>
          <h5>{props.item}</h5>
        </Col>
        <Col xs={6} style={{ textAlign: "right" }}>
          <Button
            className="btn btn-default btn-xs "
            // style={style}
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
