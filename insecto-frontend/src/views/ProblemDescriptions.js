import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function ProblemDescriptions() {
  const [problemDescs, setProblemDescs] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}problem_descs`)
      .then((response) => {
        setProblemDescs(response.data.problems_descs);
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
    </div>
  );
}

const problemDesTable = (data) => {
  const heads = [
    <input type="checkbox" />,
    "#",
    "Problem Description",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
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
