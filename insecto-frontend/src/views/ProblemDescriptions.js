import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function ProblemDescriptions() {
  const [problemDescs, setProblemDescs] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}problem_descs`
      );
      setProblemDescs(res.data.problems_descs);
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
              <h2>Problem Descriptions</h2>
              <h6>รายการคำอธิบายปัญหาทั้งหมด</h6>
            </div>
          }
          badge={
            <div>
              <Button variant="info">Add</Button>
              &emsp;
              <Button variant="danger">Delete</Button>
            </div>
          }
          body={problemDesTable(problemDescs)}
        />
      }
    />
  );
}

const problemDesTable = (data) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>#</th>
          <th>Problem Description</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Update By</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {_.map(data, (problem_desc) => (
          <tr key={problem_desc.problem_des_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{problem_desc.problem_des_id}</td>
            <td>{problem_desc.problem_description}</td>
            <td>{problem_desc.created_at}</td>
            <td>{problem_desc.updated_at}</td>
            <td>{problem_desc.update_by}</td>
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
