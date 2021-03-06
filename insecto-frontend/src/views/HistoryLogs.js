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
import { useHistory } from "react-router-dom";

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
  // const [count, setCount] = useState(7);
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
  const history = useHistory();
  const [daysStore, setDaysStore] = useSessionStorage("daysStore", 7);
  const [daysAllHistory, setDaysAllHistory] = useSessionStorage(
    "daysAllHistory",
    0
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (countDays === 0) {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}history_logs/${daysStore}`,
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
      setDaysAllHistory(temp.data.countDays);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        Cookies.remove("token");
        history.replace({
          pathname: "/admin",
          state: {
            login: "Please Login again!",
          },
        });
      }
    }
  };

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("daysStore"));
    const allItem = JSON.parse(sessionStorage.getItem("daysAllHistory"));
    if (items === null || items === 0) {
      // if( items < allItem ){
      setDaysStore(7);
      fetchData();
      console.log("first time", items);
      // }
    } else if (items < allItem) {
      setDaysStore(7);
      fetchData();
    } else {
      // if (window.performance) {
      //   if (performance.navigation.type === 1) {
      // console.log("reloaded");
      // setDaysStore(7);
      fetchData();
      console.log("local storage is", items);
      setDaysStore(items);
      //   } else {
      //     console.log("This page is not reloaded");
      //     console.log("local storage is", items);
      //     setDaysStore(items);
      //     fetchData();
      //   }
      // }
    }

    // const script = document.createElement("script");
    // script.src = "/scripts/logdata.js";
    // script.async = true;
    // document.body.appendChild(script);
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
    if (daysStore > countDays) {
      setHasMore(false);
      return;
    }
    setTimeout(async () => {
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}history_logs/${daysStore}`,
          method: "GET",
          headers: { Authorization: token, "User-Id": user.id },
        });
        setData(res.data);
        setDaysStore(daysStore + 7);
      } catch (error) {
        console.log(error.message);
      }
      // setCount(count + 7);
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
            dataLength={daysStore}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              countDays ? (
                <div className="overlay">
                  <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  {/* wait a moment */}
                </div>
              ) : null
            }
            endMessage={
              countDays ? (
                <p style={{ textAlign: "center", color: "rgb(209, 209, 209)" }}>
                  Looks like you've reached the end
                </p>
              ) : null
            }
          >
            {countDays ? (
              _.map(props.data, (value, key, i) => (
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
              ))
            ) : (
              <div className="overlay">There are no data to display</div>
            )}
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
                          <label className="col-form-label">From: </label>
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
                              max={moment(logsFromTo.to_date).format(
                                "YYYY-MM-DD"
                              )}
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
                              min={moment(logsFromTo.from_date).format(
                                "YYYY-MM-DD"
                              )}
                              max={moment().format("YYYY-MM-DD")}
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
            loading={isLoading ? "overlay" : ""}
          />
        }
      />
      <ButtonToTop scrollStepInPx="50" delayInMs="6.66" />;
    </>
  );
}

function useSessionStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.sessionStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage or remove if value is null or undefined
      if (valueToStore === undefined) {
        window.sessionStorage.removeItem(key);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
