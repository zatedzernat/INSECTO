import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import API from "../API";

export default function Statuses() {
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    API.get(`statuses`)
      .then((response) => {
        setStatuses(response.data);
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
                <h2>Statuses</h2>
                <h6>รายการสถานะทั้งหมด</h6>
              </div>
            }
            body={statusTable(statuses)}
          />
        }
      />
    </div>
  );
}

const statusTable = (data) => {
  const heads = ["#", "Name", "Description"]; //get from api

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
            <td>{status.status_description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
