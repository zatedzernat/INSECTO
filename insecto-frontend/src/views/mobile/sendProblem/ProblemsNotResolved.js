import React from "react";
import _ from "lodash";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import Callout from "../../../components/Callout";

export default function ProblemsNotResolved({
  item,
  room,
  problems,
  setViewStep,
}) {
  const HistoryProblemCallout = () => {
    return (
      <>
        {_.map(problems, (problem) => {
          let color = "";
          let status = "";
          let fromnow = moment(problem.updated_at).fromNow();

          switch (problem.status_id) {
            case 1:
              color = "callout callout-warning";
              // color = "#F4FF81";
              status = "รอดำเนินการ";
              break;
            case 2:
              color = "callout callout-info";
              // color = "#B3E5FC";
              status = "กำลังดำเนินการ";
              break;
            case 3:
              color = "callout callout-info";
              // color = "#B3E5FC";
              status = "กำลังดำเนินการ";
              break;
            case 4:
              color = "callout callout-info";
              // color = "#B3E5FC";
              status = "กำลังดำเนินการ";
              break;
            case 5:
              color = "callout callout-info";
              // color = "#B3E5FC";
              status = "กำลังดำเนินการ";
              break;
            case 7:
              color = "callout callout-info";
              // color = "#B3E5FC";
              status = "กำลังดำเนินการ";
              break;
              default:
                color = "callout callout-secondary";
                // color = "#F4FF81";
              status = "อื่นๆ";
              break;
          }
          return (
            <Callout
              key={problem.noti_id}
              color={color}
              item={problem.item.item_code}
              problem={problem.problem_description}
              // status={status}
              status={problem.status.status_name}
              time={fromnow}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="content m-3">
        <Container>
          <Row>
            <Col>
              <h1>ปัญหาที่ถูกแจ้ง</h1>
            </Col>
          </Row>
          <Row className="border-bottom ">
            {room && (
              <>
                <Col xs={5}>
                  <h6>{room.room_name}</h6>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h6>{room.building?.building_name}</h6>
                </Col>
              </>
            )}
            {item && (
              <>
                <Col xs={5}>
                  <h6>{item.item_name}</h6>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h6>{item.room?.room_name}</h6>
                </Col>
              </>
            )}
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
}
