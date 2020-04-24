import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function NotificationProblems() {
  return (
    <div>
      <Content
        title="Notification Problems"
        content={<Card title="All Notification Problems" body={notiProblemTable()} />}
      />
    </div>
  );
}

const notiProblemTable = () => {
  const heads = [
    "#",
    "Item Code",
    "Item Name",
    "Problem Description",
    "Room Code",
    "Status",
    "Created At",
    "Updated At",
    "Update By",
    "Detail",
  ];

  const data = [
    {
      item_id: 1,
      item_code: "123",
      item_name: "หลอดไฟ",
      problem_des: "ไฟกระพริบ",
      room_code: "AAA",
      status: "waiting",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    
  ];
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
        {_.map(data, (notiProblem) => (
          <tr key={notiProblem.item_id}>
            <td>{notiProblem.item_id}</td>
            <td>{notiProblem.item_code}</td>
            <td>{notiProblem.item_name}</td>
            <td>{notiProblem.problem_des}</td>
            <td>{notiProblem.room_code}</td>
            <td>{notiProblem.status}</td>
            <td>{notiProblem.created_at}</td>
            <td>{notiProblem.updated_at}</td>
            <td>{notiProblem.update_by}</td>
            <td>
              <i className="fa fa-edit" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
