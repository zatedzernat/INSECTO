import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";

export default function ItemTypes() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [itemType, setItemType] = useState({
    type_name: "",
  });
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}item_types`);
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
        `${process.env.REACT_APP_API_URL}item_type/create`,
        itemType
      );
      if (res.data.error) {
        setIsError({
          error: res.data.error,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(error);
    }
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
                <h2>Item Types</h2>
                <h6>รายการประเภทของครุภัณฑ์ทั้งหมด</h6>
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
            body={itemTypeTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Item Type"
            method="POST"
            onSubmit={addHandleSubmit}
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Item Type Name:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="type_name"
                    onChange={(event) =>
                      setItemType({ type_name: event.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            button="Add"
          />
        </div>
      }
    />
  );
}

const itemTypeTable = (data) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>#</th>
          <th>Name</th>
          <th>Created At</th>
          <th>Updated at</th>
          <th>Update By</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {_.map(data.item_types, (itemType) => (
          <tr key={itemType.type_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{itemType.type_id}</td>
            <td>{itemType.type_name}</td>
            <td>{itemType.created_at}</td>
            <td>{itemType.updated_at}</td>
            <td>{itemType.update_by}</td>
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
