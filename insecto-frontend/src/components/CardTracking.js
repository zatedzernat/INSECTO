import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Card(props) {
  const statusBar = () => {
    var styles;
    var textStatus = "";

    switch (props.status) {
      case "resolved":
        styles = {
          borderColor: "#93D388",
          borderWidth: 1,
          borderStyle: "solid",
          height: 35,
          width: 100,
          backgroundColor: "#43CF2A",
          borderRadius: 5
        };
        textStatus = "ดำเนินการเสร็จสิ้น";
        break;

      case "closed":
        styles = {
          borderColor: "#93D388",
          borderWidth: 1,
          borderStyle: "solid",
          height: 35,
          width: 100,
          backgroundColor: "#43CF2A",
          borderRadius: 5

        };
        textStatus = "ดำเนินการเสร็จสิ้น";
        break;

      case "in progress":
        styles = {
          borderColor: "#A0DCFF",
          borderWidth: 1,
          borderStyle: "solid",
          height: 35,
          width: 100,
          backgroundColor: "#2BB0FF",
          borderRadius: 5
        };
        textStatus = "กำลังดำเนินการ";
        break;

      default:
        styles = {
          borderColor: "#FBD4FF",
          borderWidth: 1,
          borderStyle: "solid",
          height: 35,
          width: 100,
          backgroundColor: "#DAA6DF",
          borderRadius: 5
        };
        textStatus = "รอการดำเนินการ";
        break;
    }

    return (
      <Container fluid className="mt-1 text-center pt-2 ml-3" style={styles}>
        <p style={{ fontSize: 11, color: 'white' }}>{textStatus}</p>
      </Container>
    );
  };
  return (
    <Container
      fluid
      className="m-0 pt-2 pl-4 pb-2 pr-2"
      style={{
        height: 60,
      }}
    >
      <Row>
        <Col className="col-5">
          <Row className="pb-0 mb-0" style={{ height: 22 }}>
            <p style={{ fontSize: 14 }}>
              {props.itemName.length > 15
                ? props.itemName.slice(0, 15) + "..."
                : props.itemName}
            </p>
          </Row>
          <Row>
            <p style={{ fontSize: 11, color: "#777777" }}>
              {props.itemProblem.length > 20
                ? props.itemProblem.slice(0, 20) + "..."
                : props.itemProblem}
            </p>
          </Row>
        </Col>
        <Col className="col-1">
          <Row>
            <p style={{ fontSize: 11, paddingTop: 3 }}>
              {props.room.length > 10
                ? props.room.slice(0, 10) + "..."
                : props.room}
            </p>
          </Row>
          <Row></Row>
        </Col>
        <Col className="col-5">{statusBar()}</Col>
        <Col className="col-1 text-center pt-2">
          <i
            className="fa fa-angle-right"
            style={{ color: "#777777", fontSize: 30 }}
          ></i>
        </Col>
      </Row>
    </Container>
  );
}
