import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Form,
} from "react-bootstrap";
import Content from "../../components/Content";
import _ from "lodash";

export default function MobileSendProblem() {
  const [item, setItem] = useState([]);
  const [problemDes, setProblemDes] = useState(
  [{ value: "option1", key: "1" },
    { value: "option2", key: "2" },
    { value: "option3", key: "3" }]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [titleDropdown, setTitleDropdown] = useState("Select Problem");
  const [showInputProblem, setShowInputProblem] = useState(false);
  const [inputProblem, setInputProblem] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const fetchData = async () => {
    //! เขียนผิด const code = this.props.match.params.id;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}send-problem/2`
      );
      setItem(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const dropdownHandel = (problem) => {
    const valuePro = problem;
    console.log(problem);
    setTitleDropdown(valuePro.value)
    toggleInputProblemHandler(valuePro.key);
    console.log("hi you");
  };

  const toggleInputProblemHandler = (key) => {
    console.log("id item" , key)
    if (key === "3") {
      setShowInputProblem(true);
      console.log(showInputProblem)
    } else {
      setShowInputProblem(false);
      console.log(showInputProblem)
    }
  };

  const problemInputChangedHandler = (event) => {
    setInputProblem(event.target.value)
    console.log(inputProblem);
  };

  const submitSendHandle = (event) => {
    event.preventDefault();
    const id = {
      item_id: item.item_id,
    };
    console.log("submit", titleDropdown, id);
    axios
      .post("http://127.0.0.1:8000/api/send-problem/check", id)
      .then((response) => {
        console.log("post : ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmModalHandler = (event) => {
    setConfirmModal(true);
  };

  return (
    <Content
      content={
        <>
          <div className="content" style={{ backgroundColor: "#EDE7E7" }}>
            <Container>
              <Row>
                <Col>
                  <h1>Send Problem</h1>
                </Col>
              </Row>
              <Row className="border-bottom">
                <Col>
                  <h5>แจ้งปัญหาการใช้งานครุภัณฑ์ชำรุด</h5>
                </Col>
              </Row>
              {/* onSubmit={event => submitSendHandle(event)} */}
              <form>
                <Row className="mt-4">
                  <Col>
                    <Form>
                      <Form.Group className="col-md-5">
                        <Form.Label htmlFor="room">Room :</Form.Label>
                        <Form.Control
                          type="text"
                          name="room"
                          placeholder="Room"
                          className="form-control"
                          value={item.room_id}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group className="col-md-5">
                        <Form.Label htmlFor="itemCode">Item Code :</Form.Label>
                        <Form.Control
                          type="text"
                          name="itemCode"
                          placeholder="Item Code"
                          className="form-control"
                          value={item.item_code}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group className="col-md-5">
                        <Form.Label htmlFor="itemName">Item Name :</Form.Label>
                        <Form.Control
                          type="text"
                          name="itemName"
                          placeholder="Item Name"
                          className="form-control"
                          value={item.item_name}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="col-md-5">
                      <Form.Label htmlFor="Problem">Problem:*</Form.Label>
                      <DropdownButton id="problemSend" title={titleDropdown}>
                        {_.map(problemDes, (problem) => (
                          <Dropdown.Item
                            key={problem.key}
                            value={problem.key}
                            onSelect={() => {
                              dropdownHandel(problem);
                            }}
                          >
                            {problem.value}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Form.Group>
                  </Col>
                </Row>
                {showInputProblem === true ? (
                  <Row>
                    <Col>
                      <Form>
                        <Form.Group className="col-md-12">
                          <Form.Control
                            type="textarea"
                            name="other"
                            placeholder="ใส่ข้อมูลปัญหาอื่นๆ"
                            className="form-control"
                            onChange={problemInputChangedHandler}
                          ></Form.Control>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                ) : null}
                <Row style={{ marginTop: 50 }}>
                  <Col xs={4} md={4} />
                  <Col xs={4} md={4}>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => confirmModalHandler()}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col xs={4} md={4} />
                </Row>
              </form>
            </Container>
          </div>
        </>
      }
    />
  );
}
