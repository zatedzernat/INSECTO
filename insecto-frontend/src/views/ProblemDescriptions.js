import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function ProblemDescriptions() {
  const [problemDescs, setProblemDescs] = useState({})
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/problem_descs').then(response => {
      setProblemDescs(response.data)
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
                <h2>Problem Descriptions</h2>
                <h6>รายการคำอธิบายปัญหาทั้งหมด</h6>
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

  // const data = [
  //   {
  //     problemDes_id: 1,
  //     problemDes_name: "ไฟดับ",
  //     created_at: "test",
  //     updated_at: "test",
  //     update_by: "seeder",
  //   },
  //   {
  //     problemDes_id: 2,
  //     problemDes_name: "คอมมดขึ้น",
  //     created_at: "test2",
  //     updated_at: "test2",
  //     update_by: "seeder2",
  //   },
  // ]; //get from api
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
        {_.map(data, (problemDes) => (
          <tr key={problemDes.problemDes_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{problemDes.problemDes_id}</td>
            <td>{problemDes.problemDes_name}</td>
            <td>{problemDes.created_at}</td>
            <td>{problemDes.updated_at}</td>
            <td>{problemDes.update_by}</td>
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
