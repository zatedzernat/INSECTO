import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import Modal from "../components/MyModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}brands`);
      setBrands(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = (event) => {
    alert(555);
  };

  return (
    <Content
      content={
        <div>
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
          />

          <form method="post">
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onSubmit={() => handleAdd()}
              title="Add Brand"
              body={
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Brand Name:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="brand_name"
                    />
                  </div>
                </div>
              }
            />
          </form>
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
