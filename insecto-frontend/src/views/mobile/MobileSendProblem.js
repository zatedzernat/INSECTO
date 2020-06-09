import React, { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "../../components/FormModal";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Modal,
  Card,
} from "react-bootstrap";
import _ from "lodash";

export default function MobileSendProblem(props) {
  const [item, setItem] = useState({
    item_code: "Item Code",
    room_id: 0,
    item_name: "Item name",
  });
  const [allproblemDes, setAllProblemDes] = useState([]);
  const [problemDes, setProblemDes] = useState({
    problem_des_id: 0,
    problem_description: "",
  });
  const [problemsNotResolved, setProblemsNotResolved] = useState([]);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [showInputProblem, setShowInputProblem] = useState(false);
  const [inputProblem, setInputProblem] = useState("");
  const [historyProblem, setHistoryProblem] = useState(false);
  const [modalShowComplete, setModalShowComplete] = useState(false);
  const [canSubmit, setCanSubmit] = useState("");
  const code = props.match.params.code;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}sendproblem/` + code
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setItem(res.data.item);
        setAllProblemDes(res.data.problemsThatCanSend);
        setProblemsNotResolved(res.data.problemsNotResolved);
        if (res.data.problemsNotResolved.length !== 0 && !modalShowComplete) {
          setHistoryProblem(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleInputProblemHandler = (problem_des_id) => {
    if (problem_des_id === "") {
      setShowInputProblem(false);
      setCanSubmit(false);
    } else if (problem_des_id === "etc") {
      setShowInputProblem(true);
    } else {
      let problem_desc = _.find(allproblemDes, (a) => {
        return a.problem_des_id === parseInt(problem_des_id);
      });
      setProblemDes({
        problem_des_id: problem_des_id,
        problem_description: problem_desc.problem_description,
      });
      setShowInputProblem(false);
      setCanSubmit(true);
    }
  };

  const problemInputChangedHandler = (event) => {
    setInputProblem(event.target.value);
    let value = event.target.value;
    if (value === "" || value.trim().length === 0) {
      setCanSubmit(false);
    } else {
      setProblemDes({
        problem_des_id: "etc",
        problem_description: event.target.value,
      });
      setCanSubmit(true);
    }
  };

  const submitSendHandle = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}noti_problems`,
        {
          item_id: item.item_id,
          problem_des_id: problemDes.problem_des_id,
          problem_description: problemDes.problem_description,
        }
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setModalShowComplete(true);
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  const historyProblemCard = (problemsNotResolved) => {
    return (
      <div>
        {_.map(problemsNotResolved, (problemNotResolved) => {
          let date = moment(problemNotResolved.created_at).format("D/M/YYYY");
          let time = moment(problemNotResolved.created_at).format("HH:mm:ss");
          let fromnow = moment(problemNotResolved.created_at).fromNow();
          return (
            <Card
              key={
                problemNotResolved.problem_des_id +
                problemNotResolved.problem_description
              }
              className="card card-outline card-primary"
            >
              <Card.Header>
                <label className="col-form-group">
                  {problemNotResolved.problem_description}
                </label>
              </Card.Header>
              <Card.Body>
                <div className="form-group">
                  Status: {problemNotResolved.status.status_name} <br />
                  Date: {date} <br />
                  Time: {time} ({fromnow})
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {isError.error && (
        <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
          {isError.message}
        </Alert>
      )}

      {/* <Modal
        show={modalShowComplete}
        onHide={() => {
          setModalShowComplete(false);
          window.location.href = "/";
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false} //! error when set to true wait for fix https://github.com/react-bootstrap/react-bootstrap/issues/5075
      >
        <Modal.Body className="text-center m-3">
          <h3>THANK YOU!!</h3>
          <h6>ปัญหาของคุณถูกส่งแล้ว</h6>
          <h6>สามารถติดตามสถานะได้ที่</h6>
          <h6>www</h6>
        </Modal.Body>
      </Modal> */}

      <FormModal
        show={historyProblem}
        onHide={() => setHistoryProblem(false)}
        title={"ปัญหาของ " + item.item_code + " ที่ถูกแจ้ง"}
        body={historyProblemCard(problemsNotResolved)}
        method="POST"
        custom={
          <Button
            variant="light"
            type="submit"
            className="text-light"
            block
            style={{ backgroundColor: "#5091ff" }}
            onClick={() => setHistoryProblem(false)}
          >
            แจ้งปัญหาอื่น
          </Button>
        }
      />

      <div className="content m-3">
        <Container>
          <Form.Row>
            <Col>
              <h1>Send Problem</h1>
            </Col>
          </Form.Row>
          <Row className="border-bottom">
            <Col>
              <h6>แจ้งปัญหาการใช้งานครุภัณฑ์ชำรุด</h6>
            </Col>
          </Row>
          <Row className="mt-4">
            <Form.Group as={Col} md="5">
              <Form.Label htmlFor="room">Room :</Form.Label>
              <Form.Control
                type="text"
                name="room"
                className="form-control"
                placeholder="Room"
                value={item.room?.room_name ?? "-"}
                disabled
                size="sm"
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="5">
              <Form.Label htmlFor="itemCode">Item Code :</Form.Label>
              <Form.Control
                type="text"
                name="itemCode"
                className="form-control"
                placeholder="Item Code"
                value={item?.item_code ?? ""}
                disabled
                size="sm"
              ></Form.Control>
            </Form.Group>
          </Row>
          <Form.Row>
            <Form.Group as={Col} md="5">
              <Form.Label htmlFor="itemName">Item Name :</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                className="form-control"
                placeholder="Item Name"
                value={item?.item_name ?? ""}
                disabled
                size="sm"
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Row>
            <Form.Group as={Col} md="5">
              <Form.Label htmlFor="Problem">Problem:*</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => {
                  toggleInputProblemHandler(event.target.value);
                }}
              >
                <option value="">-- Select Problem --</option>
                {_.map(allproblemDes, (problem) => (
                  <option
                    key={problem.problem_des_id}
                    value={problem.problem_des_id}
                  >
                    {problem.problem_description}
                  </option>
                ))}
                <option key="0" value="etc">
                  อื่น ๆ
                </option>
              </Form.Control>
            </Form.Group>
          </Row>
          <form method="POST" onSubmit={(event) => submitSendHandle(event)}>
            {showInputProblem === true ? (
              <Row>
                <Form.Group as={Col} md="5">
                  <Form.Control
                    type="text"
                    placeholder="ใส่ข้อมูลปัญหาอื่น ๆ"
                    className="form-control"
                    value={inputProblem}
                    onChange={problemInputChangedHandler}
                  ></Form.Control>
                </Form.Group>
              </Row>
            ) : null}
            <Row style={{ marginTop: 50 }}>
              {canSubmit ? (
                <Button
                  variant="light"
                  type="submit"
                  className="text-light"
                  block
                  active
                  style={{ backgroundColor: "#5091ff" }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="light"
                  type="submit"
                  className="text-light"
                  block
                  disabled
                  style={{ backgroundColor: "#5091ff" }}
                >
                  Submit
                </Button>
              )}
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
}
