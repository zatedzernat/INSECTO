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
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();
  const statusBar = () => {
    var styles;
    var font;
    // var textStatus = "";  

    switch (props.status) {
      case 1:
      case 2:
      case 7:
        styles = {
          // borderColor: "rgb(255 148 234)",
          // borderWidth: 1,
          // borderStyle: "solid",
          height: 22,
          width: 80,
          // backgroundColor: "#FAFAFA",
          // backgroundColor: "#ffdd59",
          backgroundColor: "#fff4de",
          borderRadius: 5,
        };
        // textStatus = "รอการดำเนินการ";
        // font = { color: "rgb(241 79 210)", fontSize: 11 };
        font = { color: "#FFA800", fontSize: 11 };
        break;
      case 3:
      case 4:
      case 5:
        styles = {
          // borderColor: "#A0DCFF",
          // borderWidth: 1,
          // borderStyle: "solid",
          height: 22,
          width: 80,
          // backgroundColor: "#FAFAFA",
          // backgroundColor: "#cfedff",
          // backgroundColor: "#90CAF9",
          backgroundColor: "#e0eaff",
          borderRadius: 5,
        };
        // textStatus = "กำลังดำเนินการ";
        // font = { color: "#2BB0FF", fontSize: 11 };
        font = { color: "#6993FF", fontSize: 11 };
        break;
      case 8:
        styles = {
          // borderColor: "#93D388",
          // borderWidth: 1,
          // borderStyle: "solid",
          height: 22,
          width: 80,
          // backgroundColor: "#FAFAFA",
          // backgroundColor: "#C4E538",
          borderRadius: 5,
          backgroundColor: "#c9f7f4"
        };
        // textStatus = "ดำเนินการเสร็จสิ้น";
        // font = { color: "#43CF2A", fontSize: 11 };
        font = { color: "#1BC5BD", fontSize: 11 };
        break;
      default:
        break;
    }

    return (
      <Container fluid className="mt-1 text-center pt-1" style={styles}>
        {/* <p style={font}>{textStatus}</p> */}
        <p style={font}>{props.statusName}</p>
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
                  : props.itemProblem
                : props.itemProblem}
            </p>
          </Row>
        </Col>
        <Col className="col-3  mt-2 text-right">
          <p style={{ fontSize: 11, paddingTop: 3 }}>{props.room}</p>
        </Col>
        <Col className="col-4 mt-2 text-center">{statusBar()}</Col>
        <Col className="col-1 text-center pt-1">
          <i
            className="ion-ios-arrow-right"
            style={{ color: "#777777", fontSize: 25 }}
          ></i>
        </Col>
      </Row>
    </Container>
  );
}
