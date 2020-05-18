import React, { useState, useEffect } from "react";
import axios from "axios";
// import * as yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import FormModal from "../../components/FormModal";

import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Table,
  Form,
  Alert,
  Modal,
  Card,
} from "react-bootstrap";
import _ from "lodash";

export default function MobileSendProblem(props) {
  // const [data, setData] = useState([]);
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
  const [lastUpdate, setLastUpdate] = useState(0);
  const [titleDropdown, setTitleDropdown] = useState("Select Problem");
  const [showInputProblem, setShowInputProblem] = useState(false);
  const [inputProblem, setInputProblem] = useState("");
  const [historyProblem, setHistoryProblem] = useState(false);
  const [modalShowComplete, setModalShowComplete] = useState(false);
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
  }, [lastUpdate]);

  const dropdownHandel = (problem) => {
    const valuePro = problem;
    toggleInputProblemHandler(valuePro.problem_des_id, valuePro);
  };

  const toggleInputProblemHandler = (key, problem) => {
    if (key === 0) {
      setTitleDropdown("อื่นๆ");
      setShowInputProblem(true);
    } else {
      setProblemDes(problem);
      setTitleDropdown(problem.problem_description);
      setShowInputProblem(false);
    }
  };

  const problemInputChangedHandler = (event) => {
    setInputProblem(event.target.value);
    setProblemDes({
      problem_description: event.target.value,
      problem_des_id: "etc",
    });
  };

  const submitSendHandle = async (event) => {
    event.preventDefault();
    console.log(
      "submit",
      item.item_id,
      problemDes.problem_des_id,
      problemDes.problem_description
    );
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}noti_problems/`,
        {
          item_id: item.item_id,
          problem_des_id: problemDes.problem_des_id,
          problem_description: problemDes.problem_description,
        }
      );
      setModalShowComplete(true);
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  // const SendProblemSchema = yup.object().shape({
  //   room: yup.string(),
  //   itemCode: yup.string(),
  //   itemName: yup.string(),
  //   allproblemDescription: yup.string(),
  //   other: yup.string(),
  // });

  const historyProblemHandler = () => {
    setHistoryProblem(false);
  };

  const modalShowCompleteHandler = () => {
    setModalShowComplete(false);
  };

  const historyProblemCard = (data) => {
    return (
      <div>
        {_.map(data, (historyProblem) => (
          <Card style={{ width: "18rem" }}>
            <Card.Header className="text-center">
              {historyProblem.problem_description}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <small>Status: {historyProblem.status_id}</small>
              </Card.Text>
              <Card.Text>
                <small>Date: {historyProblem.created_at}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      // <Table striped bordered size="sm">
      //   <tbody>
      //     {_.map(data, (historyProblem) => (
      //       <tr key={historyProblem.noti_id}>
      //         <td>- {historyProblem.problem_description}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </Table>
    );
  };
  return (
    <>
      {isError.error && (
        <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
          {isError.message}
        </Alert>
      )}

      <Modal
        show={modalShowComplete}
        onHide={modalShowCompleteHandler}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false} //! error when set to true wait for fix https://github.com/react-bootstrap/react-bootstrap/issues/5075
      >
        <Modal.Header closeButton />
        <Modal.Body closeButton className="text-center m-3">
          <h3>THANK YOU!!</h3>
          <h6>ปัญหาของคุณถูกส่งแล้ว</h6>
          <h6>สามารถติดตามสถานะได้ที่</h6>
          <h6>www</h6>
        </Modal.Body>
      </Modal>

      <FormModal
        show={historyProblem}
        onHide={historyProblemHandler}
        title={"ปัญหาของ "+item.item_code+" ที่ถูกแจ้ง"}
        body={historyProblemCard(problemsNotResolved)}
        method="POST"
        onSubmit={historyProblemHandler}
        custom={
          <Button
            variant="light"
            type="submit"
            className="text-light"
            block
            style={{ backgroundColor: "#5091ff" }}
          >
            แจ้งปัญหาอื่น
          </Button>
        }
      />
      <div className="content m-3">
        <Container>
          <Row>
            <Col>
              <h1>Send Problem</h1>
            </Col>
          </Row>
          <Row className="border-bottom">
            <Col>
              <h6>แจ้งปัญหาการใช้งานครุภัณฑ์ชำรุด</h6>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <div className="col-md-5 form-group">
                <Form.Label htmlFor="room">Room :</Form.Label>
                <Form.Control
                  type="text"
                  name="room"
                  className="form-control"
                  placeholder="Room"
                  value={item?.room_id ?? ""}
                  disabled
                  size="sm"
                ></Form.Control>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="col-md-5 form-group">
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="col-md-5 form-group">
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="col-md-5 form-group">
                <Form.Label htmlFor="Problem">Problem:*</Form.Label>
                <DropdownButton
                  id="allproblemDescription"
                  title={titleDropdown}
                  variant="outline-primary"
                >
                  {_.map(allproblemDes, (problem) => (
                    <Dropdown.Item
                      key={problem.problem_des_id}
                      value={problem.problem_des_id}
                      onSelect={() => {
                        dropdownHandel(problem);
                      }}
                    >
                      {problem.problem_description}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item
                    key="0"
                    value="etc"
                    onSelect={() => {
                      dropdownHandel({
                        problem_description: "อื่นๆ",
                        problem_des_id: 0,
                      });
                    }}
                  >
                    อื่นๆ
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Col>
          </Row>
          <form method="POST" onSubmit={(event) => submitSendHandle(event)}>
            {showInputProblem === true ? (
              <Row>
                <Col>
                  <div className="col-md-12 form-group">
                    <Form.Control
                      type="text"
                      placeholder="ใส่ข้อมูลปัญหาอื่นๆ"
                      className="form-control"
                      value={inputProblem}
                      onChange={problemInputChangedHandler}
                    ></Form.Control>
                  </div>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 50 }}>
              <Button
                variant="light"
                type="submit"
                className="text-light"
                block
                style={{ backgroundColor: "#5091ff" }}
              >
                Submit
              </Button>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
}
