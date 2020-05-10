import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";

export default function Buildings() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
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
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}buildings`,
        building
      );
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

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}buildings/${building.building_id}`,
        building.building_id
      );
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
  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}buildings/${building.building_id}`,
        building
      );
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
  const styles = {
    container: { color: "red" },
  };
  const buildingTable = (data) => {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>#</th>
            <th>
              Code <span style={styles.container}>*</span>
            </th>
            <th>
              Name
            </th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.map(data.buildings, (building) => (
            <tr key={building.building_id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{building.building_id}</td>
              <td>{building.building_code}</td>
              <td>{building.building_name}</td>
              <td>{building.created_at}</td>
              <td>{building.updated_at}</td>
              <td>{building.update_by}</td>
              <td>
                <span
                  onClick={() => {
                    setModalShowEdit(true);
                    setBuilding(building);
                  }}
                >
                  <i className="fa fa-edit" />
                </span>
                &emsp;
                <span
                  onClick={() => {
                    setModalShowDel(true);
                    setBuilding(building);
                  }}
                >
                  <i className="fa fa-times" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
        </div>
      }
    />
  );
}
