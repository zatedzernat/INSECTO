import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Row, Col, Button } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import FormModal from "../components/FormModal";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonToTop from "../components/ButtonToTop";
import FormDateInput from "../components/FormDateInput";
import Cookies from "js-cookie";

const styles = {
  paddingLink: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 6,
    paddingLeft: 12,
  },
};

export default function HistoryLogs(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyLog, setHistoryLog] = useState({});
  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [count, setCount] = useState(7);
  const [countDays, setCountDays] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const initialState = {
    from_date: moment().subtract(7, "d").format("YYYY-MM-DD"),
    to_date: moment().format("YYYY-MM-DD"),
  };
  const [logsFromTo, setLogsFromTo] = useState(initialState);
  // const [intervalId, setIntervalId] = useState(0);
  const [isExport, setIsExport] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;
  const [userAll, setUserAll] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (countDays === 0) {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}history_logs/${count}`,
          method: "GET",
          headers: { Authorization: token, "User-Id": user.id },
        });
        setData(res.data);
      }
      const temp = await axios({
        url: `${process.env.REACT_APP_API_URL}history_logs`,
        method: "GET",
        headers: { Authorization: token, "User-Id": user.id },
      });
      setIsLoading(false);
      setCountDays(temp.data.countDays);
      setIsExport(false);
      setUserAll(temp.data.user);
    } catch (error) {
      console.log(error.message);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  const fetchMoreData = () => {
    if (count > countDays) {
      setHasMore(false);
      return;
    }
    setTimeout(async () => {
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}history_logs/${count}`,
          method: "GET",
          headers: { Authorization: token, "User-Id": user.id },
        });
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
      setCount(count + 7);
    }, 500);
  };

  const exportLogs = async (event) => {
    setIsExport(true);
    event.preventDefault();
    // console.log(logsFromTo);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}history_logs/export`,
        data: logsFromTo,
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, "User-Id": user.id },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Logs.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setLogsFromTo(initialState);
      setIsExport(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const HistoryLogCard = (props) => {
    return (
      <div>
        <div className="card-body">
          <InfiniteScroll
            dataLength={count}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="overlay">
                <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                {/* wait a moment */}
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center", color: "rgb(209, 209, 209)" }}>
                Looks like you've reached the end
              </p>
            }
          >
            {_.map(props.data, (value, key, i) => (
              <div
                key={key}
                className="card card-info"
                style={{ backgroundColor: "#EFEBE9" }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#BCAAA4" }}
                >
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
                      <Col>{moment(log.created_at).format("HH:mm:ss")}</Col>
                      <Col xs={3}>
                        {log.event[0].toUpperCase() + log.event.slice(1)}
                        <Button
                          style={styles.paddingLink}
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
                                - {upperKey(key)} changed from "
                                {value ?? "null"}" to "
                                {_.get(log.new_values, key)}"
                              </div>
                            ))}
                        <br />
                      </Col>
                      <Col xs={3}>
                        {_.find(userAll, { id: log.user_id })?.name ? (
                          <>by {_.find(userAll, { id: log.user_id })?.name}</>
                        ) : null}
                      </Col>
                    </Row>
                  ))}
                </div>
              </div>
            ))}
          </InfiniteScroll>
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

  // const GoToTop = () => {
  //   const [showScroll, setShowScroll] = useState(false);
  //   const checkScrollTop = () => {
  //     if (!showScroll && window.pageYOffset > 400) {
  //       setShowScroll(true);
  //     } else if (showScroll && window.pageYOffset <= 400) {
  //       setShowScroll(false);
  //     }
  //   };
  //   window.addEventListener("scroll", checkScrollTop);
  // };

  return (
    <>
      <Content
        content={
          <Card
            title={
              <div>
                <h2>History Logs</h2>
                <h6>รายการบันทึกประวัติการแก้ไขทั้งหมด</h6>
              </div>
            }
            badge={
              <FormDateInput
                body={
                  <>
                    <Row className="text-right">
                      <Col>
                        <div className="form-group row">
                          <label className="col-form-label">Form: </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="date"
                              name="from_date"
                              value={logsFromTo.from_date}
                              onChange={(event) =>
                                setLogsFromTo({
                                  ...logsFromTo,
                                  from_date: event.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group row">
                          <label className="col-form-label">To: </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="date"
                              name="to_date"
                              value={logsFromTo.to_date}
                              onChange={(event) =>
                                setLogsFromTo({
                                  ...logsFromTo,
                                  to_date: event.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="text-right">
                      <Col className="text-right mr-4">
                        {isExport === false ? (
                          <Button
                            onClick={exportLogs}
                            style={{
                              backgroundColor: "#6993FF",
                              color: "white",
                            }}
                          >
                            Export Logs
                          </Button>
                        ) : (
                          <Button
                            style={{
                              backgroundColor: "#6993FF",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-1x fa-sync-alt fa-spin" />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </>
                }
                method="POST"
                onSubmit={exportLogs}
              />
            }
            body={historyLogTable(data.logsByDays)}
            // loading={isLoading ? "overlay" : ""}
          />
        }
      />
      <ButtonToTop scrollStepInPx="50" delayInMs="6.66" />;
    </>
  );
}
