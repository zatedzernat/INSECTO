import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function HistoryLogs() {
  return (
    <div>
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
    </div>
  );
}

const historyLogTable = () => {
  const heads = ["#", "Time", "Action", "Last", "Present", "From", "By"]; //get from api

  const data = [
    {
      log_id: 1,
      log_time: "23:39",
      log_action: "Created",
      log_last: "-",
      log_present: "สมุด",
      log_from: "Item Types",
      log_by: "Hong",
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
        {_.map(data, (log) => (
          <tr key={log.log_id}>
            <td>{log.log_id}</td>
            <td>{log.log_time}</td>
            <td>{log.log_action}</td>
            <td>{log.log_last}</td>
            <td>{log.log_present}</td>
            <td>{log.log_from}</td>
            <td>{log.log_by}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
