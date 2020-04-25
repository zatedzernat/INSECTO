import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Button } from "react-bootstrap";

export default function Items() {
  const [items, setItems] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

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

  // const data = [
  //   {
  //     item_id: 1,
  //     item_code: "111",
  //     item_name: "หลอดไฟ",
  //     building_name: "ตึกเทคโนโลยีสารสนเทศ",
  //     room_name: "Lab L",
  //     brand_name: "Philip",
  //     serial_number: "-",
  //     model: "-",
  //     created_at: "test",
  //     updated_at: "test",
  //     update_by: "seeder",
  //   },
  // ];
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
