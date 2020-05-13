import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage  } from "formik";

import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import Content from "../../components/Content";
import _ from "lodash";

export default function MobileSendProblem(props) {
  const [item, setItem] = useState([]);
  const [problemDes, setProblemDes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [titleDropdown, setTitleDropdown] = useState("Select Problem");
  const [showInputProblem, setShowInputProblem] = useState(false);
  const [inputProblem, setInputProblem] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const code = props.match.params.code;
  
  const fetchData = async () => {
    
    setIsLoading(true);
    try {
      const res = await axios.get(
        // `${process.env.REACT_APP_API_URL}sendproblem/ROOM-DOOR`
        `${process.env.REACT_APP_API_URL}sendproblem/`+code
        );
      setItem(res.data.item);
      setProblemDes(res.data.problemsThatCanSend, ...problemDes);
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
    setTitleDropdown(valuePro.problem_description);
    toggleInputProblemHandler(valuePro.problem_des_id);
  };

  const toggleInputProblemHandler = (key) => {
    console.log("id item", key);
    if (key === 0) {
      //? อื่นๆ
      setShowInputProblem(true);
      console.log(showInputProblem);
    } else {
      setShowInputProblem(false);
      console.log(showInputProblem);
    }
  };

  const problemInputChangedHandler = (event) => {
    setInputProblem(event.target.value);
    console.log(inputProblem);
  };

  const submitSendHandle = (event) => {
    event.preventDefault();
    const id = {
      item_id: item.item_id,
    };
    console.log("submit", titleDropdown, id);
    axios
      .post("http://127.0.0.1:8000/api/noti_problems/", {
        item_id: item.item_id,
        problem_des_id: problemDes.problem_des_id,
        problem_description: problemDes.problem_description,
      })
      .then((response) => {
        console.log("post : ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendProblemSchema = yup.object().shape({
    room: yup.string().required("Required"),
    itemCode: yup.string().required("Required"),
    itemName: yup.string().required("Required"),
    problemDescription: yup.string().required("Required"),
    other: yup.string()
  });

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
              <Formik
                validationSchema={SendProblemSchema} //กำหนด validation Schema
                initialValues={{
                  room: "",
                  itemCode: "",
                  itemName: "",
                  problemDescription: "",
                  other: ""
                }}
                onSubmit={()=>submitSendHandle()}
              >
                {({ errors, touched }) => (
                <Form>
                  <Row className="mt-4">
                    <Col>
                      <div className="col-md-5 form-group">
                        <label htmlFor="room">Room :</label>
                        <Field
                          type="text"
                          name="room"
                          className={`form-control ${touched.room ? errors.room ? 'is-invalid' : 'is-valid' : ''}`}
                          placeholder="Room"
                          value={item.room_id}
                          disabled
                        ></Field>
                        <ErrorMessage name="name" className="invalid-feedback" component="div" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="col-md-5" form-group>
                        <label htmlFor="itemCode">Item Code :</label>
                        <Field
                          type="text"
                          name="itemCode"
                          className={`form-control ${touched.itemCode ? errors.itemCode ? 'is-invalid' : 'is-valid' : ''}`}
                          placeholder="Item Code"
                          value={item.item_code}
                          disabled
                        ></Field>
                        <ErrorMessage name="itemCode" className="invalid-feedback" component="div" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="col-md-5 form-group">
                        <label htmlFor="itemName">Item Name :</label>
                        <Field
                          type="text"
                          name="itemName"
                          className={`form-control ${touched.itemName ? errors.itemName ? 'is-invalid' : 'is-valid' : ''}`}
                          placeholder="Item Name"
                          value={item.item_name}
                          disabled
                        ></Field>
                        <ErrorMessage name="itemName" className="invalid-feedback" component="div" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="col-md-5 form-group">
                        <label htmlFor="Problem">Problem:*</label>
                        <DropdownButton id="problemSend" title={titleDropdown}>
                          {_.map(problemDes, (problem) => (
                            <Dropdown.Item
                              key={problem.problem_des_id}
                              value={problem.problem_des_id}
                              name="problemDescription"
                              className={`form-control ${touched.problemDescription ? errors.problemDescription ? 'is-invalid' : 'is-valid' : ''}`}
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
                          name="etc"
                          className={`form-control ${touched.problemDescription ? errors.problemDescription ? 'is-invalid' : 'is-valid' : ''}`}
                          onSelect={() => {
                            dropdownHandel({problem_description: "อื่นๆ", problem_des_id: 0});
                          }}
                          >อื่นๆ
                          </Dropdown.Item>
                        </DropdownButton>
                        <ErrorMessage name="problemDescription" className="invalid-feedback" component="div" />
                      </div>
                    </Col>
                  </Row>
                  {showInputProblem === true ? (
                    <Row>
                      <Col>
                        <div className="col-md-12 form-group">
                          <Field
                            type="textarea"
                            name="other"
                            placeholder="ใส่ข้อมูลปัญหาอื่นๆ"
                            className={`form-control ${touched.other ? errors.other ? 'is-invalid' : 'is-valid' : ''}`}
                            onChange={problemInputChangedHandler}
                          ></Field>
                        </div>
                      </Col>
                    </Row>
                  ) : null}
                  <Row style={{ marginTop: 50 }}>
                    <Col xs={4} md={4} />
                    <Col xs={4} md={4}>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => submitSendHandle()}
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col xs={4} md={4} />
                  </Row>
                </Form>
                )}
              </Formik>
            </Container>
          </div>
        </>
      }
    />
  );
}
