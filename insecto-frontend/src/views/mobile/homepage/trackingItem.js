import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
require("moment/locale/th");

export default function TrackingItem(props) {
  const [problemInfo, setProblemInfo] = useState({});
  var textStatus = "";
  const history = useHistory();

  switch (problemInfo.status_name) {
    case "resolved":
      textStatus = "ดำเนินการเสร็จสิ้น";
      break;

    case "closed":
      textStatus = "ดำเนินการเสร็จสิ้น";
      break;

    case "in progress":
      textStatus = "กำลังดำเนินการ";
      break;

    default:
      textStatus = "รอการดำเนินการ";
      break;
  }

  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/`);
      } else {
        setProblemInfo(props.location.state.problemInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkData();
  });

  return (
    <>
      <Container>
        <Row>
          <Col
            className="pt-4 pb-2"
            style={{
              backgroundColor: "#F0F3F5",
              borderColor: "#E0E0E0",
              borderBottomWidth: 3,
              borderBottomStyle: "solid",
            }}
          >
            <p className="text-center p-0" style={{ fontSize: 20 }}>
              ระบบติดตามสถานะการซ่อมครุภัณฑ์
            </p>
          </Col>
        </Row>
        <div
          style={{
            borderColor: "#E2E2E2",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
          }}
        >
          <div className="mt-4 ml-4">
            <Row>
              <p style={{ fontSize: 24 }}>
                {problemInfo.item_code + " " + problemInfo.item_name}
              </p>
            </Row>
            <Row style={{ fontSize: 14 }}>
              <Col className="col-3 text-right">
                <p>ปัญหา</p>
              </Col>
              <Col className="col-1">:</Col>
              <Col className="col-8">{problemInfo.problem_description}</Col>
            </Row>
            <Row style={{ fontSize: 14 }}>
              <Col className="col-3 text-right">
                <p>ห้อง</p>
              </Col>
              <Col className="col-1">:</Col>
              <Col className="col-8">{problemInfo.room}</Col>
            </Row>
            <Row style={{ fontSize: 14 }}>
              <Col className="col-3 text-right">
                <p>อาคาร</p>
              </Col>
              <Col className="col-1">:</Col>
              <Col className="col-8">{problemInfo.building}</Col>
            </Row>
          </div>
        </div>
        <div className="mt-4 ml-4 mr-4">
          <Row>
            <p style={{ fontSize: 18 }}>สถานะการซ่อม</p>
          </Row>
          <Row style={{ fontSize: 14 }} className="text-left">
            <Col className="col-4">
              <p>{moment(problemInfo.updated_at).format("DD-MM-YYYY")}</p>
            </Col>
            <Col className="col-3">
              {moment(problemInfo.updated_at).format("LT")} น.
            </Col>
            <Col className="col-5">{textStatus}</Col>
          </Row>
        </div>
        <div
          className="ml-3 mr-3"
          style={{
            borderColor: "#E0E0E0",
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
          }}
        />
      </Container>
    </>
  );
}
