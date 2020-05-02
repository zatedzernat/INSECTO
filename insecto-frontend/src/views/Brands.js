import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import FormModal from "../components/FormModal";

export default function Brands() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [idDel, setIdDel] = useState("");
  const [brand, setBrand] = useState({
    brand_id: 0,
    brand_name: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}brands`);
      setData(res.data);
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
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}brands`,
        brand
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
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}brands/${idDel}`,
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

  const brandTable = (data) => {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>#</th>
            <th>Brand Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.map(data.brands, (brand) => (
            <tr key={brand.brand_id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{brand.brand_id}</td>
              <td>{brand.brand_name}</td>
              <td>{brand.created_at}</td>
              <td>{brand.updated_at}</td>
              <td>{brand.update_by}</td>
              <td>
                <i className="fa fa-edit" />
                &emsp;
                <span  onClick={ () => {setModalShowDel(true); setIdDel(brand.brand_id);}}>
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
                <h2>Brands</h2>
                <h6>รายการการแบรนด์ทั้งหมด</h6>
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
            body={brandTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Brand"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Brand Name:</label>
                <div className="col-sm-9">
                <input
                    type="text"
                    className="form-control"
                    name="brand_name"
                    onChange={(event) =>
                      setBrand({ brand_name: event.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="POST"
            onSubmit={addHandleSubmit}
            button="Add"
            close="Close"
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

