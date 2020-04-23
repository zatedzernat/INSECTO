import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
var _ = require("lodash");

export default function Brands() {
  return (
    <div>
      <Content
        title="Brands"
        content={<Card title="Brand" body={brandtable()} />}
      />
    </div>
  );
}

function brandtable() {
  const heads = [
    "Brand ID",
    "Brand Name",
    "Created At",
    "Updated At",
    "Update By",
  ]; //get from api

  const data = [
    {
      brand_id: 1,
      brand_name: "HP",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    {
      brand_id: 2,
      brand_name: "HONG",
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
        {_.map(data, (brand) => (
          <tr key={brand.brand_id}>
            <td>{brand.brand_id}</td>
            <td>{brand.brand_name}</td>
            <td>{brand.created_at}</td>
            <td>{brand.updated_at}</td>
            <td>{brand.update_by}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

