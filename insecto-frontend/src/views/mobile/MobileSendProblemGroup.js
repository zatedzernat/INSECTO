import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import _ from "lodash";
import Callout from "../../components/Callout";
import SelectType from "./SelectTypeInRoom";

export default function MobileSendProblem(props) {
  const [itemGroupByType, setItemGroupByType] = useState({});
  const [room, setRoom] = useState({});
  const [problemsNotResolvedInRoom, setProblemsNotResolvedInRoom] = useState(
    []
  );
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [viewStep, setViewStep] = useState(0);
  const room_code = props.match.params.room_code;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}sendprobleminroom/${room_code}`
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        //* wait for check room (if not found return not found page (item and room))
        setRoom(res.data.room);
        setItemGroupByType(res.data.itemsGroupByType);
        if (res.data.problemsNotResolvedInRoom) {
          setViewStep(2);
        } else {
          setViewStep(1);
        }
        setProblemsNotResolvedInRoom(res.data.problemsNotResolvedInRoom);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HistoryProblemCallout = () => {
    return (
      <>
        {_.map(problemsNotResolvedInRoom, (problemNotResolvedInRoom) => {
          let color = "";
          let status = "";
          let fromnow = moment(problemNotResolvedInRoom.updated_at).fromNow();

          switch (problemNotResolvedInRoom.status_id) {
            case 1:
              color = "callout callout-warning";
              status = "รอดำเนินการ";
              break;
            case 2:
              color = "callout callout-info";
              status = "ดำเนินการอยู่";
              break;
            case 3:
              color = "callout callout-info";
              status = "ดำเนินการอยู่";
              break;
            case 4:
              color = "callout callout-info";
              status = "ดำเนินการอยู่";
              break;
            case 5:
              color = "callout callout-info";
              status = "ดำเนินการอยู่";
              break;
            default:
              break;
          }
          return (
            <Callout
              key={problemNotResolvedInRoom.noti_id}
              color={color}
              item={problemNotResolvedInRoom.item.item_name}
              problem={problemNotResolvedInRoom.problem_description}
              status={status}
              time={fromnow}
            />
          );
        })}
      </>
    );
  };

  const ProblemsNotResolved = () => {
    return (
      <>
        {isError.error && (
          <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
            {isError.message}
          </Alert>
        )}

        <div className="content m-3">
          <Container>
            <Row>
              <Col>
                <h1>ปัญหาที่ถูกแจ้ง</h1>
              </Col>
            </Row>
            <Row className="border-bottom ">
              <Col xs={4}>
                <h6>ห้อง {room.room_code}</h6>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <h6>{room.building?.building_name}</h6>
              </Col>
            </Row>
            <Row className="mt-4"></Row>

            <HistoryProblemCallout />
            <Row style={{ marginTop: 50 }}>
              <Button
                variant="light"
                type="submit"
                className="text-light"
                block
                style={{ backgroundColor: "#5091ff" }}
                onClick={() => setViewStep(2)}
              >
                แจ้งปัญหาเพิ่มเติม
              </Button>
            </Row>
          </Container>
        </div>
      </>
    );
  };

  switch (viewStep) {
    case 0:
      return <div></div>;
    case 1:
      return <ProblemsNotResolved />;
    case 2:
      return <SelectType room={room} itemGroupByType={itemGroupByType} />;
    default:
      break;
  }
}
