import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import { Button, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
export default function NotificationProblems() {
  return (
    <div>
      <Content
        content={
          <Card
            title={
              <div>
                <h2>Notification Problems</h2>
                <h6>รายการการแจ้งปัญหาทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info">Add</Button>
                &emsp;
                <Button variant="danger">Delete</Button>
              </div>
            }
            body={notiProblemTable()}
          />
        }
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
      status: "waiting button",
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
            {/* <td>{notiProblem.status}</td> */}
            <td>
              <DropdownButton
                as={ButtonGroup}
                title="waiting"
                id="bg-nested-dropdown"
                size="sm"
                variant="warning"
              >
              <Dropdown.Item eventKey="1">open</Dropdown.Item>
              </DropdownButton>
            </td>
            <td>{notiProblem.created_at}</td>
            <td>{notiProblem.updated_at}</td>
            <td>{notiProblem.update_by}</td>
            <td>
              <Button variant="link">Detail</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
