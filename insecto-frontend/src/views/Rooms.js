import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}rooms`);
      setRooms(res.data.rooms);
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
  );
}

const roomTable = (data) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>#</th>
          <th>Code</th>
          <th>Name</th>
          <th>Building</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Update By</th>
          <th>Action</th>
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
            <td>{room.building.building_name}</td>
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
