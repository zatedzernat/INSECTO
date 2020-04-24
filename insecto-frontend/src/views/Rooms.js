import React from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function Rooms() {
  return (
    <div>
      <Content
        title="Rooms"
        content={<Card title="All Rooms" body={roomTable()} />}
      />
    </div>
  );
}

const roomTable = () => {
  const heads = [
    "#",
    "Code",
    "Name",
    "Building",
    "Created At",
    "Updated At",
    "Update By",
    "Action",
  ];

  const data = [
    {
      room_id: 1,
      room_code: "T03",
      room_name: "Train 3",
      building_name: "ตึกเทคโนโลยีสารสนเทศ",
      created_at: "test",
      updated_at: "test",
      update_by: "seeder",
    },
    {
      room_id: 1,
      room_code: "T05",
      room_name: "Train 5",
      building_name: "ตึกเทคโนโลยีสารสนเทศ",
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
        {_.map(data, (room) => (
          <tr key={room.room_id}>
            <td>{room.room_id}</td>
            <td>{room.room_code}</td>
            <td>{room.room_name}</td>
            <td>{room.building_name}</td>
            <td>{room.created_at}</td>
            <td>{room.updated_at}</td>
            <td>{room.update_by}</td>
            <td>
              <i className="fa fa-edit" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
