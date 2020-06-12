import React from "react";
import _ from "lodash";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import Callout from "../../components/Callout";

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
              key={problem.noti_id}
              color={color}
              item={problem.item.item_code}
              problem={problem.problem_description}
              status={status}
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
                  <h6>ห้อง {room.room_code}</h6>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h6>{room.building?.building_name}</h6>
                </Col>
              </>
            )}
            {item && (
              <>
                <Col xs={5}>
                  <h6>{item.item_code}</h6>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h6>ห้อง {item.room?.room_name}</h6>
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
