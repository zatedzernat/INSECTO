import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function HistoryLogs() {
  return (
    <Content
      content={
        <Card
          title={
            <div>
              <h2>History Logs</h2>
              <h6>รายการบันทึกประวัติทั้งหมด</h6>
            </div>
          }
          body={historyLogTable()}
        />
      }
    />
  );
}

const historyLogTable = () => {
  const data = [
    {
      log_id: 1,
      log_action: "Created",
      log_by: "Hong",
    },
  ]; //get from api
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Action</th>
          <th>Update By</th>
        </tr>
      </thead>
      <tbody>
        {_.map(data, (log) => (
          <tr key={log.log_id}>
            <td>{log.log_id}</td>
            <td>{log.log_action}</td>
            <td>{log.log_by}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
