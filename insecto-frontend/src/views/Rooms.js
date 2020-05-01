import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import {
  Table,
  Button,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import FormModal from "../components/FormModal";

export default function Rooms() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );
  const [lastUpdate, setLastUpdate] = useState(0);
  const [room, setRoom] = useState({
    room_id: 0,
    room_code: "",
    room_name: "",
    building_id: 0,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}rooms`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectBuilding("- select building name -")
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}rooms`,
        room
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content
      content={
        <div>
          <Card
            title={
              <div>
                <h2>Rooms</h2>
                <h6>รายการห้องทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info" onClick={() => setModalShowAdd(true)}>Add</Button>
                &emsp;
                <Button variant="danger">Delete</Button>
              </div>
            }
            body={roomTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Room"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Room Code:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="room_code"
                      onChange={(event) =>
                        setRoom({ room_code: event.target.value })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Room Name:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="room_name"
                      onChange={(event) =>
                        setRoom({ ...room, room_name: event.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Building:</label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectBuilding}
                      id="building"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(data.buildings, (building) => (
                        <Dropdown.Item
                          key={building.building_id}
                          eventKey={building.building_id}
                          onSelect={(eventKey) => (
                            setRoom({
                              ...room,
                              building_id: eventKey,
                            }),
                            setSelectBuilding(building.building_name)
                          )}
                        >
                          {building.building_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>
              </>
            }
            method="POST"
            onSubmit={addHandleSubmit}
            button="Add"
          />
        </div>
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
        {_.map(data.rooms, (room) => (
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
