import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function Card(props) {
  const { height, width } = useWindowDimensions();
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
          width: 100,
          backgroundColor: "#FAFAFA",
          borderRadius: 5,
        };
        textStatus = "ดำเนินการเสร็จสิ้น";
        font = { color: "#43CF2A", fontSize: 11 };
        break;

      case "closed":
        styles = {
          borderColor: "#93D388",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 100,
          backgroundColor: "#FAFAFA",
          borderRadius: 5,
        };
        textStatus = "ดำเนินการเสร็จสิ้น";
        font = { color: "#43CF2A", fontSize: 11 };
        break;

      case "in progress":
        styles = {
          borderColor: "#A0DCFF",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 90,
          backgroundColor: "#FAFAFA",
          borderRadius: 5,
        };
        textStatus = "กำลังดำเนินการ";
        font = { color: "#2BB0FF", fontSize: 11 };
        break;

      default:
        styles = {
          borderColor: "rgb(255 148 234)",
          borderWidth: 1,
          borderStyle: "solid",
          height: 22,
          width: 97,
          backgroundColor: "#FAFAFA",
          borderRadius: 5,
        };
        textStatus = "รอการดำเนินการ";
        font = { color: "rgb(241 79 210)", fontSize: 11 };
        break;
    }

    return (
      <Container fluid className="mt-1 text-center pt-1" style={styles}>
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
              {width <= 700
                ? props.itemName.length > 14
                  ? props.itemName.slice(0, 14) + "..."
                  : props.itemName
                : props.itemName}
            </p>
          </Row>
          <Row>
            <p style={{ fontSize: 11, color: "#777777" }}>
              {width <= 700
                ? props.itemProblem.length > 18
                ? props.itemProblem.slice(0, 18) + "..."
                : props.itemProblem : props.itemProblem}
            </p>
          </Row>
        </Col>
        <Col className="col-3  mt-2 text-right">
          <p style={{ fontSize: 11, paddingTop: 3 }}>{props.room}</p>
        </Col>
        <Col className="col-4 mt-2 text-center">{statusBar()}</Col>
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