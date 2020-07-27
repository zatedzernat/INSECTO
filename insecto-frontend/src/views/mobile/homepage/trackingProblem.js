import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import Card from "../../../components/CardTracking";

export default function TrackingProblem() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}noti_problems`
      );
      setData(res.data.noti_problems);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusBar = () => {
    const arr = [];
    arr.push(
      data.map((item) => (
        <div onClick={() => alert("test")}>
        <Row
          style={{
            borderColor: "#E2E2E2",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
          }}
        >
          <Card
            itemName={item.item.item_code + " " + item.item.item_name}
            itemProblem={item.problem_description}
            room={item.item.room.room_name}
            status={item.status.status_name}
          />
        </Row>
        </div>
      ))
    );
    return arr;
  };

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
        {statusBar()}
      </Container>
    </>
  );
}
