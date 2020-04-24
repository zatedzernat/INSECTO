import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function Items() {
  return (
    <div>
      <Content
        title="Items"
        content={<Card title="All Items" body={itemTable()} />}
      />
    </div>
  );
}

const itemTable = () => {
  const heads = [
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

  const data = [
    {
      item_id: 1,
      item_code: "111",
      item_name: "หลอดไฟ",
      building_name: "ตึกเทคโนโลยีสารสนเทศ",
      room_name: "Lab L",
      brand_name: "Philip",
      serial_number: "-",
      model: "-",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
