import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export default function SelectItemAndTypeInRoom(props) {
  const [room, setRoom] = useState({});
  const [itemGroupByType, setItemGroupByType] = useState({});
  const room_code = props.match.params.room_code;
  const history = useHistory();
  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/sendproblem/room/${room_code}`);
      } else {
        setRoom(props.location.state.room);
        setItemGroupByType(props.location.state.itemGroupByType);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectItem = () => {
    const handleClick = (item) => {
      history.push({
        pathname: `/sendproblem/${item.item_code}`,
        state: { form: "sendproblem in room" },
      });
    };

    return (
      <>
        {_.map(itemGroupByType, (value, key) => {
          let items = value;
          // switch (key) {
          //   case "Light":
          //     break;
          //   case "Computer":
          //     break;
          //   case "Toilet":
          //     break;
          //   case "Air-Condition":
          //     break;
          //   case "Printer":
          //     break;
          //   case "Room":
          //     break;
          //   default:
          //     break;
          // }
          return (
            // <ListGroup key={key} variant="flush">
            <ListGroup key={key}>
              <ListGroup.Item
                variant="secondary "
                style={{ fontWeight: "bold", background: "#E0E0E0" }}
              >
                {key}
              </ListGroup.Item>
              {_.map(items, (item) => (
                <ListGroup.Item
                  key={item.item_id}
                  action
                  style={{
                    textAlign: "center",
                    color: "black",
                    background: "#EEEEEE",
                  }}
                  onClick={() => handleClick(item)}
                >
                  {item.item_name}
                  <i
                    className="ion-ios-arrow-right"
                    style={{
                      color: "#777777",
                      fontSize: 20,
                      float: "right",
                    }}
                  ></i>
                </ListGroup.Item>
              ))}
            </ListGroup>
          );
        })}
      </>
    );
  };

  return (
    <div className="content m-3">
      <Container>
        <Row className="border-bottom ">
          <Col>
            <h1>{room.room_name}</h1>
            <h6>{room.building?.building_name}</h6>
          </Col>
        </Row>
        <Row className="mt-4"></Row>
        <p style={{ color: "red" }}>
          <i className="ion-checkmark-circled" /> &nbsp;
          เลือกครุภัณฑ์ที่ต้องการแจ้งปัญหา
        </p>
        <Row className="mt-4"></Row>
        <SelectItem />
      </Container>
    </div>
  );
}
