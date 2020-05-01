import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";

export default function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [idDel, setIdDel] = useState("");
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
      setBuildings(res.data.buildings);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}building/create`,
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
      console.log(error);
    }
    setModalShowAdd(false);
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}building/${idDel}`,
        idDel
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
      console.log(error);
    }
    setModalShowDel(false);
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
            <th>Code</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.map(data, (building) => (
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
                <i className="fa fa-edit" />
                &emsp;
                <span  onClick={ () => {setModalShowDel(true); setIdDel(building.building_id);}}>
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
            body={buildingTable(buildings)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Building"
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
                    onChange={(event) =>
                      setBuilding({
                        ...building,
                        building_code: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>

                <label className="col-sm-3 col-form-label">
                  Building Name:
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
            title="Are you sure that you want to delete?"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">{idDel}</label>
                <div className="col-sm-9">
                </div>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />
        </div>
      }
    />
  );
}

