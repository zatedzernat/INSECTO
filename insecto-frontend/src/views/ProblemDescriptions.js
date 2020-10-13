import React, { useState, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";
import FilterComponent from "../components/FilterBox";

export default function ProblemDescriptions() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    problem_des_id: 0,
    problem_description: "",
    type_id: "",
  };
  const [problemDesc, setProblemDesc] = useState(initialState);
  const [selectType, setSelectType] = useState("- select type name -");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectType("- select type name -");
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}problem_descs`,
        problemDesc
      );
      setProblemDesc(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
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
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2,
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
      setProblemDesc(initialState);
      if (res.data.error) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const deleteSelectedHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    let problem_descs = {
      problem_descs: selectedRows.map(({ problem_des_id }) => problem_des_id),
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}problem_descs/selected`,
        problem_descs
      );
      setToggleCleared(!toggleCleared);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
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
      setProblemDesc(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        Toast.fire({
          icon: "error",
          title: error.response.data.errors.problem_description,
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
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      console.log(error.response);
      let err_message = error.response.data.message;
      if (error.response.status === 422) {
        let message = error.response.data;
        if (message.errors.import_file) {
          Toast.fire({
            icon: "error",
            title: message.errors.import_file,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: message.errors[0],
          });
        }
      } else if (err_message.split(":")[0] === "Undefined index") {
        Toast.fire({
          icon: "error",
          title: `Import file doesn't has '${
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

  const handleRowSelected = React.useCallback((state) => {
    let selected = state.selectedRows.map(
      ({ problem_des_id, problem_description }) => ({
        problem_des_id,
        problem_description,
      })
    );
    let sort = selected.sort((a, b) => a.problem_des_id - b.problem_des_id);
    setSelectedRows(sort);
  }, []);

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const problemDesTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        width: "70px",
        selector: "problem_des_id",
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

    const myFonts = {
      rows: {
        style: {
          fontSize: "15px",
        },
      },
      headCells: {
        style: {
          fontSize: "15px",
        },
      },
    };

    const filteredItems = data.problem_descs?.filter(
      (item) =>
        item.problem_description |
        item.problem_description
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.item_type.type_name |
        item.item_type.type_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.user.name |
        item.user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <DataTable
        columns={columns}
        data={filteredItems}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
        customStyles={myFonts}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    );
  };

  return (
    <Content
      content={
        <div>
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
                {selectedRows.length > 0 ? (
                  <>
                    &emsp;
                    <Button
                      onClick={() => {
                        setModalShowDel(true);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
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
            onHide={() => {
              setModalShowAdd(false);
              setProblemDesc(initialState);
            }}
            title="Add Problem Description"
            method="POST"
            close="Close"
            onSubmit={addHandleSubmit}
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Problem Description: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      name="problem_description"
                      onChange={(event) =>
                        setProblemDesc({
                          ...problemDesc,
                          problem_description: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-6">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "223px" }}
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
            onHide={() => {
              setModalShowDel(false);
              setProblemDesc(initialState);
            }}
            title="Do you confirm to delete?"
            body={
              selectedRows.length > 0 ? (
                <div className="form-group col-form-label">
                  {selectedRows.map((problem_desc) => (
                    <p key={problem_desc.problem_des_id}>
                      {problem_desc.problem_des_id} -{" "}
                      {problem_desc.problem_description}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="form-group col-form-label">
                  <p>"{problemDesc.problem_description}"</p>
                </div>
              )
            }
            method="POST"
            onSubmit={
              selectedRows.length > 0
                ? deleteSelectedHandleSubmit
                : deleteHandleSubmit
            }
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => {
              setModalShowEdit(false);
              setProblemDesc(initialState);
            }}
            title="Edit Problem Description"
            method="POST"
            onSubmit={editHandleSubmit}
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Problem Description:<span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      name="problem_description"
                      value={problemDesc.problem_description}
                      onChange={(event) =>
                        setProblemDesc({
                          ...problemDesc,
                          problem_description: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">
                    Type:<span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-6">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "223px" }}
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
                <div className="form-group row">
                  <label className="col-sm-6 col-form-label">Created At:</label>
                  <div className="col-sm-6 col-form-label">
                    {moment(problemDesc.created_at).format(
                      "D/MM/YYYY - HH:mm:ss"
                    )}
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
