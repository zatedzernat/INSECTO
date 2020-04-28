import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import FormModal from "../components/FormModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [brand, setBrand] = useState({
    brand_id: 0,
    brand_name: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}brands`);
      setBrands(res.data);
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
        `${process.env.REACT_APP_API_URL}brand/create`,
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
    setModalShow(false);
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
                <Button variant="info" onClick={() => setModalShow(true)}>
                  Add
                </Button>
                &emsp;
                <Button variant="danger">Delete</Button>
              </div>
            }
            body={brandTable(brands)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
          />
        </div>
      }
    />
  );
}

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
        {_.map(data, (brand) => (
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
              <i className="fa fa-times" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
