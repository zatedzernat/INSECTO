import React , { useState, useEffect } from "react";
// import axios from "axios";
// import _ from "lodash";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
var _ = require("lodash");

export default function Brands() {
  /*
todo มันยังมี error อยู่ จะเกิดกับ file header & slidbar ด้วย
  const [brands, setBrands] = useState({})
  const getAllBrands = () => axios.get('http://127.0.0.1:8000/api/brands');
  ?useEffect(() => {
  !  getAllBrands.then(response => {
      setBrands(response.data)
  ?  }).catch(function (error) {
      // handle error
      console.log(error);
    })
  });
*/
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
    }
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

