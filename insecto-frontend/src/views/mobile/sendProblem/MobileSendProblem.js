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
  const [imageFile, setImageFile] = useState();
  const [fileName, setFileName] = useState("");
  const [isLarge, setIsLarge] = useState(false);
  const [isHandleSent, setIsHandleSent] = useState(false);

  const checkData = () => {
    try {
      if (props.location.state === undefined) {
        history.replace(`/sendproblem/${code}`);
      } else {
        setItem(props.location.state.item);
        setAllproblemDes(props.location.state.allproblemDes);
        setIsLarge(false);
        setIsHandleSent(false);
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
    setIsHandleSent(true);
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("item_id", item.item_id);
      formData.append("problem_des_id", problemDes.problem_des_id);
      formData.append("problem_description", problemDes.problem_description);
      formData.append("filename", fileName);
      formData.append("image", imageFile);

      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}noti_problems`,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
        // data: {
        //   item_id: item.item_id,
        //   problem_des_id: problemDes.problem_des_id,
        //   problem_description: problemDes.problem_description,
        //   image: image,
        //   filename: fileName,
        // },
      });
      setImageFile(null);
      if (res.data.errors) {
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
      console.log("size", event.target.files[0].size);
      if (event.target.files[0].size < 5242880) {
        setIsLarge(false);
        setFileName(event.target.files[0].name);
        setImageFile(event.target.files[0]);
        let reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        setIsLarge(true);
        setImage();
        setFileName("");
      }
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
            <Form.Group as={Col}>
              <Row>
                {image ? (
                  <>
                    <img
                      src={image}
                      id="target"
                      alt="Preview"
                      width="32%"
                      height="8%"
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
                        top: "8%",
                        left: "61%",
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
                      x
                    </label>
                  </>
                ) : null}
              </Row>
            </Form.Group>
            <Row>
              <Form.Group className="ml-3">
                <Row>
                  <span
                    className="text-danger"
                    style={
                      isLarge
                        ? {
                            fontSize: "3%",
                            visibility: "visible",
                            marginBottom: 10,
                          }
                        : { visibility: "hidden" }
                    }
                  >
                    File must be .JPG or .PNG and less than 5MB.
                  </span>
                </Row>
                <Row>
                  <label
                    htmlFor="files"
                    className="btn"
                    style={{
                      backgroundColor: "transparent",
                      color: "#0BB7AF",
                      borderColor: "#0BB7AF",
                      width: "120px",
                      height: "35px",
                    }}
                  >
                    Add photo
                  </label>
                  {image ? (
                    <span className="pt-2 pl-3">
                      {fileName.length > 13
                        ? fileName.slice(0, 5) +
                          "..." +
                          fileName.slice(fileName.length - 7, fileName.length)
                        : fileName}
                    </span>
                  ) : (
                    <span className="pt-2 pl-3">No file chosen</span>
                  )}
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
                isHandleSent === false ? (
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
                    block
                    style={{ color: "white", backgroundColor: "#5091ff" }}
                  >
                    <i className="fas fa-1x fa-sync-alt fa-spin" />
                  </Button>
                )
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
