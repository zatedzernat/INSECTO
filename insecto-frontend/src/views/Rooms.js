import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import API from "../API";
import { Button } from "react-bootstrap";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    API.get(`rooms`)
      .then((response) => {
        setRooms(response.data.rooms);
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
                <h2>Rooms</h2>
                <h6>รายการห้องทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
              <Button variant="info">Add</Button>
              &emsp;
              <Button variant="danger">Delete</Button>
              </div>
            } 
            body={roomTable(rooms)}
          />
        }
      />
    </div>
  );
}

const roomTable = (data) => {
  const heads = [
    <input type="checkbox" />,
    "#",
    "Code",
    "Name",
    "Building",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
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
        {_.map(data, (room) => (
          <tr key={room.room_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{room.room_id}</td>
            <td>{room.room_code}</td>
            <td>{room.room_name}</td>
            <td>{room.building_name}</td>
            <td>{room.created_at}</td>
            <td>{room.updated_at}</td>
            <td>{room.update_by}</td>
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
