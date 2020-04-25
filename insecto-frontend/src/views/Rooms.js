import React, { useState, useEffect }  from "react";
import axios from "axios";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function Rooms() {
  const [rooms, setRooms] = useState({})
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/rooms').then(response => {
      setRooms(response.data)
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
                <h2>Rooms</h2>
                <h6>รายการห้องทั้งหมด</h6>
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

  // const data = [
  //   {
  //     room_id: 1,
  //     room_code: "T03",
  //     room_name: "Train 3",
  //     building_name: "ตึกเทคโนโลยีสารสนเทศ",
  //     created_at: "test",
  //     updated_at: "test",
  //     update_by: "seeder",
  //   },
  //   {
  //     room_id: 1,
  //     room_code: "T05",
  //     room_name: "Train 5",
  //     building_name: "ตึกเทคโนโลยีสารสนเทศ",
  //     created_at: "test",
  //     updated_at: "test",
  //     update_by: "seeder",
  //   },
  // ];
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
