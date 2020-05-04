import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table} from "react-bootstrap";
import _ from "lodash";
import axios from "axios";

export default function Statuses() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}statuses`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {_.map(data.statuses, (status) => (
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
          body={statusTable(data)}
          loading={isLoading ? "overlay" : ""}
        />
      }

    />
  );
}