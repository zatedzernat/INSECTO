import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Card(props) {
  const statusBar = () => {
    var styles;
    var font;
    var textStatus = "";

    switch (props.status) {
      case "resolved":
        styles = {
          borderColor: "#93D388",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 99,
          backgroundColor: "#FAFAFA",
          borderRadius: 5
        };
        textStatus = "ดำเนินการเสร็จสิ้น";
        font= {color: '#43CF2A', fontSize: 11}
        break;

      case "closed":
        styles = {
          borderColor: "#93D388",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 99,
          backgroundColor: "#FAFAFA",
          borderRadius: 5

        };
        textStatus = "ดำเนินการเสร็จสิ้น";
         font= {color: '#43CF2A', fontSize: 11}
        break;

      case "in progress":
        styles = {
          borderColor: "#A0DCFF",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 99,
          backgroundColor: "#FAFAFA",
          borderRadius: 5
        };
        textStatus = "กำลังดำเนินการ";
         font= {color: '#2BB0FF', fontSize: 11}
        break;

      default:
        styles = {
          borderColor: "#FBD4FF",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 99,
          backgroundColor: "#FAFAFA",
          borderRadius: 5,
        };
        textStatus = "รอการดำเนินการ";
         font= {color: '#F19EFF', fontSize: 11}
        break;
    }

    return (
      <Container fluid className="mt-1 text-center pt-1 ml-3" style={styles}>
        <p style={font}>{textStatus}</p>
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
        <Col className="col-4">
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
        <Col className="col-3  mt-2 text-right">
            <p  style={{ fontSize: 11, paddingTop: 3 }}>
                {props.room}
            </p>
        </Col>
        <Col className="col-4 mt-2">{statusBar()}</Col>
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
