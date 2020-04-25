import React , { useState, useEffect }  from "react";
import axios from "axios";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Button } from "react-bootstrap";

export default function Buildings() {
  const [buildings, setBuildings] = useState({})
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/buildings').then(response => {
      setBuildings(response.data)
    }).catch(function (error) {
      // handle error
      console.log(error);
    })
  });
  
  return (
    <div>
      <Content
        content={
          <Card
            title={
              <div>
                <h2>Buildings</h2>
                <h6>รายการตึกทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
              <Button variant="info">Add</Button>
              &emsp;
              <Button variant="danger">Delete</Button>
              </div>
            } 
            body={buildingTable(buildings)}
          />
        }
      />
    </div>
  );
}

const buildingTable = (data) => {
  const heads = [
    <input type="checkbox" />,
    "#",
    "Code",
    "Name",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
  ];

  // const data = [
  //   {
  //     building_id: 1,
  //     building_code: "SIT",
  //     building_name: "ตึกเทคโนโลยีสารสนเทศ",
  //     created_at: "test",
  //     updated_at: "test",
  //     update_by: "seeder",
  //   },
  //   {
  //     building_id: 2,
  //     building_code: "CB2",
  //     building_name: "อาคารเรียนรวม 2",
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
        {_.map(data, (building) => (
          <tr key={building.building_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{building.building_id}</td>
            <td>{building.building_code}</td>
            <td>{building.building_name}</td>
            <td>{building.created_at}</td>
            <td>{building.updated_at}</td>
            <td>{building.update_by}</td>
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
