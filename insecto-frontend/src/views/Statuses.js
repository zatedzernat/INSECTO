import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function Statuses() {
  return (
    <div>
      <Content
        content={
          <Card
            title={
              <div>
                <h2>Statuses</h2>
                <h6>รายการสถานะทั้งหมด</h6>
              </div>
            }
            body={statusTable()}
          />
        }
      />
    </div>
  );
}

const statusTable = () => {
  const heads = ["#", "Name", "Created At", "Updated At", "Update By"]; //get from api

  const data = [
    {
      status_id: 1,
      status_name: "on hold",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    {
      status_id: 2,
      status_name: "in progress",
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
        {_.map(data, (status) => (
          <tr key={status.status_id}>
            <td>{status.status_id}</td>
            <td>{status.status_name}</td>
            <td>{status.created_at}</td>
            <td>{status.updated_at}</td>
            <td>{status.update_by}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
