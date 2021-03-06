import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export default function SelectItemInRoom(props) {
  const [room, setRoom] = useState({});
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const room_code = props.match.params.room_code;
  const history = useHistory();

  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/sendproblem/room/${room_code}`);
      } else {
        setItems(props.location.state.items);
        setRoom(props.location.state.room);
        setType(props.location.state.type);
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
        {_.map(items, (item) => {
          let icon = "";
          let icon2 = "";

          switch (type) {
            case "Light":
              icon = "ion ion-ios-lightbulb-outline";
              break;
            case "Computer":
              icon = "ion ion-ios-monitor-outline";
              break;
            case "Toilet":
              icon = "ion ion-man";
              icon2 = "ion ion-woman";
              break;
            case "Air-Condition":
              icon = "ion ion-ios-snowy";
              break;
            case "Printer":
              icon = "ion ion-ios-printer-outline";
              break;
            case "Room":
              icon = "ion ion-ios-home-outline";
              break;
            default:
              icon = "ion ion-ios-cog-outline";
              break;
          }
          return (
            <div
              key={item.item_id}
              className="card"
              onClick={() => handleClick(item)}
            >
              <div className="card-body p-0">
                <ul className="nav nav-pills flex-column">
                  <li
                    className="nav-item active"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="nav-link" style={{ color: "black" }}>
                      <i
                        className={icon}
                        style={{ height: "1rem", fontSize: "2em" }}
                      />
                      {icon2.length > 0 ? (
                        <i
                          className={icon2}
                          style={{ height: "1rem", fontSize: "2em" }}
                        />
                      ) : null}
                      <span style={{ fontSize: "24px", color: "black" }}>
                        {" "}
                        &nbsp;&nbsp;{item.item_name}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
            <h1>{type}</h1>
            <h6>{room.room_name}</h6>
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
