import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button, Alert, Dropdown, ButtonGroup } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function ProblemDescriptions() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isError, setIsError] = useState({
    error: false,
    success: false,
    message: "",
    time: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [problemDesc, setProblemDesc] = useState({
    problem_des_id: 0,
    problem_description: "",
    type_id: "",
  });
  const [selectType, setSelectType] = useState("- select type name -");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}problem_descs`
      );
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/importfile.js";
    script.async = true;
    document.body.appendChild(script);
    fetchData();
    return () => {
      document.body.removeChild(script);
    };
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectType("- select type name -");
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}problem_descs`,
        problemDesc
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        let mess1 = error.response.data.errors.problem_description
          ? error.response.data.errors.problem_description
          : "";
        let mess2 = error.response.data.errors.type_id
          ? error.response.data.errors.type_id
          : "";
        setIsError({
          error: true,
          message: mess1 + " " + mess2,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}problem_descs/${problemDesc.problem_des_id}`,
        problemDesc.problem_des_id
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}problem_descs/${problemDesc.problem_des_id}`,
        problemDesc
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        setIsError({
          error: true,
          message: error.response.data.errors.problem_description,
        });
      }
    }
  };

  const importHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowImport(false);
    try {
      const formData = new FormData();
      formData.append("import_file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}problem_descs/import`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      console.log(error.response);
      let err_message = error.response.data.message;
      if (error.response.status === 422) {
        let message = error.response.data;
        if (message.errors.import_file) {
          setIsError({
            error: true,
            message: message.errors.import_file,
          });
        } else {
          setIsError({
            error: true,
            message: message.errors[0],
          });
        }
      } else if (err_message.split(":")[0] === "Undefined index") {
        setIsError({
          error: true,
          message: `Import file doesn't has '${
            err_message.split(":")[1]
          }' column!`,
        });
      }
    }
  };

  const exportProblemDescs = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}problem_descs/export`,
        method: "GET",
        responseType: "blob",
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Problem_Descs.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const problemDesTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "problem_des_id",
        sortable: true,
      },
      {
        name: "Problem Description*",
        selector: "problem_description",
        sortable: true,
      },
      {
        name: "Type*",
        selector: "item_type.type_name",
        sortable: true,
      },
      // {
      //   name: "Created At",
      //   selector: "created_at",
      //   sortable: true,
      //   format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      // },
      {
        name: "Last Updated",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/MM/YYYY - HH:mm:ss"),
      },
      {
        name: "User",
        selector: "user.name",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <>
            <span
              onClick={() => {
                setProblemDesc(row);
                setSelectType(row.item_type.type_name); //? google->react hook setstate not updating
                setModalShowEdit(true);
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setProblemDesc(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
      },
    ];
    return (
      <DataTable
        columns={columns}
        data={data.problem_descs}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    );
  };

  return (
    <Content
      content={
        <div>
          {isError.error && (
            <Alert
              variant="danger"
              onClose={() => setIsError(false)}
              dismissible
            >
              {isError.message}
            </Alert>
          )}
          {isSuccess.success && (
            <Alert
              variant="success"
              onClose={() => setIsSuccess(false)}
              dismissible
            >
              {isSuccess.message}
            </Alert>
          )}
          <Card
            title={
              <div>
                <h2>Problem Descriptions</h2>
                <h6>รายการคำอธิบายปัญหาทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button
                  variant="info"
                  onClick={() => {
                    setModalShowAdd(true);
                    setSelectType("- select type name -");
                  }}
                >
                  Add
                </Button>
                &emsp;
                <Button variant="danger">Delete</Button>
                &emsp;
                <Button
                  onClick={() => setModalShowImport(true)}
                  variant="warning"
                  type="submit"
                >
                  Import Problem Descs
                </Button>
                &emsp;
                {data.countProblemDescs === 0 ? null : (
                  <>
                    <Button onClick={exportProblemDescs} variant="warning">
                      Export Problem Descs
                    </Button>
                  </>
                )}
              </div>
            }
            body={problemDesTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Problem Description"
            method="POST"
            close="Close"
            onSubmit={addHandleSubmit}
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">
                    Problem Description: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="problem_description"
                      onChange={(event) =>
                        setProblemDesc({
                          problem_description: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-7">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "263px" }}
                        variant="outline-primary"
                      >
                        {selectType}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {_.map(data.types, (type) => (
                          <Dropdown.Item
                            key={type.type_id}
                            eventKey={type.type_id}
                            onSelect={(eventKey) => {
                              setProblemDesc({
                                ...problemDesc,
                                type_id: eventKey,
                              });
                              setSelectType(type.type_name);
                            }}
                          >
                            {type.type_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>
              </div>
            }
            button="Add"
          />

          <FormModal
            show={modalShowDel}
            onHide={() => setModalShowDel(false)}
            title="Do you confirm to delete?"
            body={
              <div className="form-group col-form-label">
                <p>"{problemDesc.problem_description}"</p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => setModalShowEdit(false)}
            title="Edit Problem Description"
            method="POST"
            onSubmit={editHandleSubmit}
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">
                    Problem Description:<span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="problem_description"
                      value={problemDesc.problem_description}
                      onChange={(event) =>
                        setProblemDesc({
                          problem_des_id: problemDesc.problem_des_id,
                          problem_description: event.target.value,
                          type_id: problemDesc.type_id,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">
                    Type:<span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-7">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "263px" }}
                        variant="outline-primary"
                      >
                        {selectType}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {_.map(data.types, (type) => (
                          <Dropdown.Item
                            key={type.type_id}
                            eventKey={type.type_id}
                            onSelect={(eventKey) => {
                              setProblemDesc({
                                problem_des_id: problemDesc.problem_des_id,
                                problem_description:
                                  problemDesc.problem_description,
                                type_id: eventKey,
                              });
                              setSelectType(type.type_name);
                            }}
                          >
                            {type.type_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">Created At:</label>
                  <div className="col-sm-7 col-form-label">
                    {moment(problemDesc.created_at).format("D/MM/YYYY - HH:mm:ss")}
                  </div>
                </div>
              </>
            }
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowImport}
            onHide={() => setModalShowImport(false)}
            title="Import data of Problem Descriptions"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    File<span style={{ color: "red" }}>*</span>:
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile"
                        name="import_file"
                        onChange={(event) => setFile(event.target.files[0])}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile"
                      >
                        Choose file...
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row" style={{ marginBottom: 0 }}>
                  <label className="col-sm-12 col-form-label">
                    - Only .xls and .xlsx file type <br />- Import file must has
                    'Problem_Descriptions' sheetname <br /> - Import file must
                    has all columns as insecto_data_format
                  </label>
                </div>
              </>
            }
            method="POST"
            onSubmit={importHandleSubmit}
            button="Import"
            close="Cancel"
          />
        </div>
      }
    />
  );
}
