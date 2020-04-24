import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function ItemTypes() {
  return (
    <div>
      <Content
        title="ItemTypes"
        content={<Card title="All ItemTypes" body={itemTypeTable()} />}
      />
    </div>
  );
}

const itemTypeTable = () => {
  const heads = [
    "#",
    "Name",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
  ]; //get from api

  const data = [
    {
      type_id: 1,
      type_name: "ไฟ",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    {
      type_id: 2,
      type_name: "คอม",
      created_at: "test2",
      updated_at: "test2",
      update_by: "seeder2",
    },
  ]; //get from api
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
        {_.map(data, (itemType) => (
          <tr key={itemType.type_id}>
            <td>{itemType.type_id}</td>
            <td>{itemType.type_name}</td>
            <td>{itemType.created_at}</td>
            <td>{itemType.updated_at}</td>
            <td>{itemType.update_by}</td>
            <td>
              <i className="fa fa-edit" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
