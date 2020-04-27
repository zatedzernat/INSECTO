import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";

export default function Statuses() {
  const [statuses, setStatuses] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}statuses`);
      setStatuses(res.data);
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
              <h2>Statuses</h2>
              <h6>รายการสถานะทั้งหมด</h6>
            </div>
          }
          body={statusTable(statuses)}
        />
      }
    />
  );
}

const statusTable = (data) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
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
