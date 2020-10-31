import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function MobileSendProblem(props) {
  const [item, setItem] = useState({});
  const [allproblemDes, setAllproblemDes] = useState([]);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [problemDes, setProblemDes] = useState({
    problem_des_id: 0,
    problem_description: "",
  });
  const [showInputProblem, setShowInputProblem] = useState(false);
  const [inputProblem, setInputProblem] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const code = props.match.params.code;
  const history = useHistory();
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState("");

  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/sendproblem/${code}`);
      } else {
        setItem(props.location.state.item);
        setAllproblemDes(props.location.state.allproblemDes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // setIsError({
        //   error: true,
        //   message: res.data.errors,
        // });
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        history.replace({
          pathname: "/send/success",
          state: { code: code },
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      {isError.error && (
        <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
          {isError.message}
        </Alert>
      )}

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
            <Row>
              <Form.Group as={Col} md="5">
                <Row className="position-relative">
                  {image ? (
                    <>
                      <img
                        src={image}
                        id="target"
                        alt="Preview"
                        width="270px"
                        height="auto"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: 0,
                          padding: 0,
                        }}
                      />
                      <label
                        className="btn position-absolute"
                        style={{
                          top: "5%",
                          left: "80%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "#F3F6F9",
                          color: "#7E8299",
                          opacity: 0.7,
                        }}
                        onClick={() => {
                          setImage();
                          setFileName("");
                        }}
                      >
                        X
                      </label>
                    </>
                  ) : null}
                </Row>
              </Form.Group>
              <Form.Group as={Col} md="5" className="ml-2">
                <Row>
                  <label
                    for="files"
                    className="btn"
                    style={{ backgroundColor: "transparent", color: "#0BB7AF" , borderColor: '#0BB7AF' }}
                  >
                    Add photo
                  </label>
                  <p className="pt-3 pl-3">{fileName}</p>
                  <input
                    type="file"
                    id="files"
                    name="upload"
                    style={{ visibility: "hidden" }}
                    accept=".jpg, .png, .jpeg"
                    onChange={onImageChange}
                  />
                </Row>
              </Form.Group>
            </Row>
            <Row style={{ marginTop: 40 }}>
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
