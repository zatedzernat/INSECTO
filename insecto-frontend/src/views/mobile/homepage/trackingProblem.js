import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Card from "../../../components/CardTracking";
import { Redirect } from "react-router-dom";

export default function TrackingProblem() {
  const [data, setData] = useState([]);
  const [problemInfo, setProblemInfo] = useState({});
  const [isClick, setIsClick] = useState(false);
  const [code, setCode] = useState("");

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

  const componentTracking = () => {
    if (isClick) {
      return (
        <Redirect
          push
          to={{
            pathname: `/tracking/${code}`,
            state: {
              problemInfo: problemInfo,
            },
          }}
        />
      );
    } else {
      return statusBar();
    }
  };

  const statusBar = () => {
    const arr = [];
    arr.push(
      data.map((item) => (
        <div
          key={Math.random()}
          onClick={() => {
            setIsClick(true);
            setCode(item.noti_id);
            setProblemInfo({
              item_code: item.item.item_code,
              item_name: item.item.item_name,
              problem_description: item.problem_description,
              status_name: item.status.status_name,
              room: item.item.room.room_name,
              building: item.item.room.building.building_name,
              updated_at: item.updated_at,
            });
          }}
        >
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
        {componentTracking()}
      </Container>
    </>
  );
}
