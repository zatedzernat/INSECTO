import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function Buildings() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [building, setBuilding] = useState({
    // building_id: 0,
    building_code: 0,
    building_name: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}buildings`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
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
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}buildings`,
        building
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
        let mess1 = error.response.data.errors.building_code
          ? error.response.data.errors.building_code
          : "";
        let mess2 = error.response.data.errors.building_name
          ? error.response.data.errors.building_name
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
        `${process.env.REACT_APP_API_URL}buildings/${building.building_id}`,
        building.building_id
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
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}buildings/${building.building_id}`,
        building
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
          message: error.response.data.errors.building_name,
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
        `${process.env.REACT_APP_API_URL}buildings/import`,
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

  const exportBuildings = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}buildings/export`,
        method: "GET",
        responseType: "blob",
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Buildings.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const buildingTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "building_id",
        sortable: true,
      },
      {
        name: "Building Code*",
        selector: "building_code",
        sortable: true,
      },
      {
        name: "Building Name",
        selector: "building_name",
        sortable: true,
      },
      {
        name: "Created At",
        selector: "created_at",
        sortable: true,
        format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      },
      {
        name: "Updated At",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/M/YYYY - HH:mm:ss"),
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
                setModalShowEdit(true);
                setBuilding(row);
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setBuilding(row);
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
        data={data.buildings}
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
                <h2>Buildings</h2>
                <h6>รายการตึกทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info" onClick={() => setModalShowAdd(true)}>
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
                  Import Buildings
                </Button>
                &emsp;
                {data.countBuildings === 0 ? null : (
                  <>
                    <Button onClick={exportBuildings} variant="warning">
                      Export Buildings
                    </Button>
                  </>
                )}
              </div>
            }
            body={buildingTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Building"
            close="Close"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Building Code: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="building_code"
                    onChange={(event) =>
                      setBuilding({
                        building_code: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>

                <label className="col-sm-3 col-form-label">
                  Building Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="building_name"
                    onChange={(event) =>
                      setBuilding({
                        ...building,
                        building_name: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            }
            method="POST"
            onSubmit={addHandleSubmit}
            button="Add"
          />

          <FormModal
            show={modalShowDel}
            onHide={() => setModalShowDel(false)}
            title="Do you confirm to delete?"
            body={
              <div className="form-group col-form-label">
                <p>
                  "{building.building_code} - {building.building_name}"
                </p>
                <p className="text-danger">
                  *** All rooms and items that relate to{" "}
                  {building.building_name} will be delete too ***
                </p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => setModalShowEdit(false)}
            title="Edit Building"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Building Code:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="building_code"
                    value={building.building_code}
                    required
                    disabled
                  />
                </div>
                <label className="col-sm-3 col-form-label">
                  Building Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="building_name"
                    value={building.building_name}
                    onChange={(event) =>
                      setBuilding({
                        ...building,
                        building_name: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="POST"
            onSubmit={editHandleSubmit}
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowImport}
            onHide={() => setModalShowImport(false)}
            title="Import data of Buildings"
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
                    'Buildings' sheetname <br /> - Import file must has all
                    columns as insecto_data_format
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
