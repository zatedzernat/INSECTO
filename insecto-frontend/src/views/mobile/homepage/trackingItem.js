import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import _ from "lodash";
require("moment/locale/th");

export default function TrackingItem(props) {
  const [problemInfo, setProblemInfo] = useState({});
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  // var textStatus = "";
  const history = useHistory();
  const code = props.match.params.code;

  // switch (problemInfo.status_name) {
  //   case "resolved":
  // textStatus = "ดำเนินการเสร็จสิ้น";
  //     break;

  //   case "closed":
  // textStatus = "ดำเนินการเสร็จสิ้น";
  //     break;

  //   case "in progress":
  // textStatus = "กำลังดำเนินการ";
  //     break;

  //   default:
  // textStatus = "รอการดำเนินการ";
  //     break;
  // }

  const checkData = async () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/`);
      } else {
        setProblemInfo(props.location.state.problemInfo);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}history_logs/tracking/${code}`
        );
        setData(res.data);

        if (props.location.state.problemInfo.image_extension) {
          const res = await axios({
            url: `${process.env.REACT_APP_API_URL}noti_problems/getimage/${code}`,
            method: "GET",
            responseType: "blob",
          });
          setImage({
            url: URL.createObjectURL(res.data),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {image?.url ? (
              <Row className="mr-auto ml-auto">
                <Col>
                  <img src={image.url} alt="noti_image" width="250px" />
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <div className="mt-4 ml-4 mr-4">
          <Row>
            <p style={{ fontSize: 18 }}>สถานะการซ่อม</p>
          </Row>
          {_.map(data.noti_trackings, (noti) => {
            switch (noti.new_values.status_id) {
              case 1:
                // textStatus = "รอดำเนินการ";
                break;
              case 2:
              case 3:
              case 4:
              case 5:
              case 7:
                // textStatus = "กำลังดำเนินการ";
                break;
              case 8:
                // textStatus = "ดำเนินการเสร็จสิ้น";
                break;
              default:
                break;
            }
            return (
              <React.Fragment key={noti.id}>
                <Row style={{ fontSize: 14 }} className="text-left">
                  <Col className="col-4">
                    <p>{moment(noti.updated_at).format("DD-MM-YYYY")}</p>
                  </Col>
                  <Col className="col-3">
                    {moment(noti.updated_at).format("LT")} น.
                  </Col>
                  <Col className="col-5">{noti.status_name}</Col>
                </Row>
              </React.Fragment>
            );
          })}
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
