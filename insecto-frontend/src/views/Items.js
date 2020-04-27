import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Items() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}items`)
      .then((response) => {
        setItems(response.data.items);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Content
        content={
          <Card
            title={
              <div>
                <h2>Items</h2>
                <h6>รายการครุภัณฑ์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info">Add</Button>
                &emsp;
                <Button variant="danger">Delete</Button>
              </div>
            }
            body={itemTable(items)}
          />
        }
      />
    </div>
  );
}

const itemTable = (data) => {
  const heads = [
    <input type="checkbox" />,
    "#",
    "Code",
    "Name",
    "Building",
    "Room Name",
    "Brand",
    "Serial Number",
    "Model",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
  ];

  return (
    <Table striped hover>
      <thead>
        <tr>
          {heads.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {_.map(data, (item) => (
          <tr key={item.item_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{item.item_id}</td>
            <td>{item.item_code}</td>
            <td>{item.item_name}</td>
            <td>{item.building_name}</td>
            <td>{item.room_name}</td>
            <td>{item.brand_name}</td>
            <td>{item.serial_number}</td>
            <td>{item.model}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td>{item.update_by}</td>
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
