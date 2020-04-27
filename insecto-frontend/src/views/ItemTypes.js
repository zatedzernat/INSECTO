import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function ItemTypes() {
  const [itemTypes, setItemTypes] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}item_types`);
      setItemTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Content
      content={
        <Card
          title={
            <div>
              <h2>Item Types</h2>
              <h6>รายการประเภทของครุภัณฑ์ทั้งหมด</h6>
            </div>
          }
          badge={
            <div>
              <Button variant="info">Add</Button>
              &emsp;
              <Button variant="danger">Delete</Button>
            </div>
          }
          body={itemTypeTable(itemTypes)}
        />
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
        {_.map(data, (itemType) => (
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
