import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { useHistory, Link } from "react-router-dom";

export default function SelectTypeInRoom(props) {
  const [itemGroupByType, setItemGroupByType] = useState({});
  const [room, setRoom] = useState({});
  const room_code = props.match.params.room_code;
  const history = useHistory();
  let index = 0;

  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/sendproblem/room/${room_code}`);
      } else {
        setItemGroupByType(props.location.state.itemGroupByType);
        setRoom(props.location.state.room);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  const SelectType = () => {
    return (
      <>
        {_.map(itemGroupByType, (value, key) => {
          index += 1;
          let icon = "";
          let icon2 = "";
          let float = "";
          if (index % 2 === 0) {
            float = "col-lg-6 col-6 float-right";
          } else {
            float = "col-lg-6 col-6 float-left";
          }
          switch (key) {
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
            <Link
              key={index}
              style={{ color: "black" }}
              to={{
                pathname: `/sendproblem/room/${room_code}/types/items`,
                state: { items: value, room: room, type: key },
              }}
            >
              <div className={float}>
                <div
                  className="small-box"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="inner">
                    <i
                      className={icon}
                      style={{ height: "1rem", fontSize: "3.75em" }}
                    />
                    {icon2.length > 0 ? (
                      <i
                        className={icon2}
                        style={{ height: "1rem", fontSize: "3.75em" }}
                      />
                    ) : null}
                    <h6>{key}</h6>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="content m-3">
        <Container>
          <Row className="border-bottom ">
            <Col>
              <h1>{room.room_name}</h1>
              <h6>{room.building?.building_name}</h6>
            </Col>
          </Row>
          <Row className="mt-4"></Row>
          <SelectType />
        </Container>
      </div>
    </>
  );
}
