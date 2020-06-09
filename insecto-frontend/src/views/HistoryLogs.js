import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Row, Col, Button } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import FormModal from "../components/FormModal";

export default function HistoryLogs() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyLog, setHistoryLog] = useState({});
  const [modalShowDetail, setModalShowDetail] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}history_logs`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "/scripts/logdata.js";
    // script.async = true;
    // document.body.appendChild(script);
    fetchData();
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  const historyLogTable = (data) => {
    const cols = ["Time", "Action", "Old Values", "New Values", "User"];
    return <HistoryLogCard cols={cols} data={data} />;
  };

  const upperKey = (key) => {
    let str = key.replace("_", " ");
    return str[0].toUpperCase() + str.slice(1);
  };

  const getModel = (auditable_type) => {
    let str = auditable_type.split("\\");
    str = str[str.length - 1];
    return str;
  };

  const HistoryLogCard = (props) => {
    return (
      <div>
        <div className="card-body">
          {_.map(props.data, (value, key, i) => (
            <div key={key} className="card card-info">
              <div className="card-header">
                <h3 className="card-title">{key}</h3>
                {i === 1 ? (
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                ) : (
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="card-body">
                {_.map(value, (log) => (
                  <Row key={log.id}>
                    <Col>{moment(log.updated_at).format("HH:mm:ss")}</Col>
                    <Col xs={3}>
                      {log.event[0].toUpperCase() + log.event.slice(1)}
                      <Button
                        variant="link"
                        onClick={() => {
                          setModalShowDetail(true);
                          setHistoryLog(log);
                        }}
                      >
                        {getModel(log.auditable_type)}
                      </Button>
                    </Col>
                    <Col xs={5}>
                      {log.old_values.length === 0
                        ? _.map(log.new_values, (value, key) => (
                            <div key={Math.random()}>
                              - {upperKey(key)}: {value}
                            </div>
                          ))
                        : _.map(log.old_values, (value, key) => (
                            <div key={Math.random()}>
                              - {upperKey(key)} changed from "{value ?? "null"}"{" "}
                              to "{_.get(log.new_values, key)}"
                            </div>
                          ))}
                      <br />
                    </Col>
                    <Col xs={3}>by "wait for log-in system"</Col>
                  </Row>
                ))}
              </div>
            </div>
          ))}
        </div>
        <FormModal
          show={modalShowDetail}
          onHide={() => setModalShowDetail(false)}
          title="Detail"
          body={
            <Row>
              <Col>
                <label className="col-sm-2 col-form-label">Log ID: </label>
                {historyLog.id}
              </Col>
            </Row>
          }
        />
      </div>
    );
  };

  return (
    <Content
      content={
        <Card
          title={
            <div>
              <h2>History Logs</h2>
              <h6>รายการบันทึกประวัติการแก้ไขทั้งหมด</h6>
            </div>
          }
          body={historyLogTable(data.history_logs)}
          loading={isLoading ? "overlay" : ""}
        />
      }
    />
  );
}
