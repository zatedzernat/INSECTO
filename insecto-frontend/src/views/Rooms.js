import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import {
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function Rooms() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    success: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [room, setRoom] = useState({
    room_id: 0,
    room_code: "",
    room_name: "",
    building_id: 0,
  });
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );

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
    setSelectBuilding("- select building name -");
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}rooms`,
        room
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        let mess1 = error.response.data.errors.room_code
          ? error.response.data.errors.room_code
          : "";
        let mess2 = error.response.data.errors.room_name
          ? error.response.data.errors.room_name
          : "";
        let mess3 = error.response.data.errors.building_id
          ? error.response.data.errors.building_id
          : "";
        setIsError({
          error: true,
          message: mess1 + " " + mess2 + " " + mess3,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}rooms/${room.room_id}`,
        room.room_id
      );
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}rooms/${room.room_id}`,
        room
      );
      if (res.data.errors) {
        setIsError({
          error: true,
          message: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        setIsSuccess({
          success: true,
          message: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        setIsError({
          error: true,
          message: error.response.data.errors.room_name,
        });
      }
    }
  };

  const getRoomQRCode = async (row) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}getroomqr/${row.room_code}`,
        method: "POST",
        responseType: "blob",
        data: {
          url: window.location.origin,
        },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${row.room_code}.png`); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const roomTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "room_id",
        sortable: true,
      },
      {
        name: "Room Code*",
        selector: "room_code",
        sortable: true,
      },
      {
        name: "Room Name",
        selector: "room_name",
        sortable: true,
      },
      {
        name: "Building Name",
        selector: "building.building_name",
        sortable: true,
      },
      {
        name: "Created At",
        selector: "created_at",
        sortable: true,
        format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      },
      {
        name: "Updated At",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/M/YYYY - HH:mm:ss"),
      },
      {
        name: "User",
        selector: "user.name",
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <>
            <span
              onClick={() => {
                setModalShowEdit(true);
                setRoom(row);
                setSelectBuilding(row.building.building_name); //? google->react hook setstate not updating
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setRoom(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
      },
      {
        name: "Room QR Code",
        cell: (row) => (
          <>
            <Button
              className="btn-xs"
              type="submit"
              variant="outline-success"
              size="sm"
              onClick={() => getRoomQRCode(row)}
            >
              <i className="fa fa-qrcode" />
              QR Code
            </Button>
          </>
        ),
        button: true,
      },
    ];
    return (
      <DataTable
        columns={columns}
        data={data.rooms}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    );
  };

  return (
    <Content
      content={
        <div>
          {isError.error && (
            <Alert
              variant="danger"
              onClose={() => setIsError(false)}
              dismissible
            >
              {isError.message}
            </Alert>
          )}
          {isSuccess.success && (
            <Alert
              variant="success"
              onClose={() => setIsSuccess(false)}
              dismissible
            >
              {isSuccess.message}
            </Alert>
          )}
          <Card
            title={
              <div>
                <h2>Rooms</h2>
                <h6>รายการห้องทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button
                  variant="info"
                  onClick={() => {
                    setModalShowAdd(true);
                    setSelectBuilding("- select building name -");
                  }}
                >
                  Add
                </Button>
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
            close="Close"
            title="Add Room"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="room_code"
                      onChange={(event) => {
                        let str = event.target.value;
                        let rs = str.indexOf("/");
                        if (rs === -1) {
                          setRoom({ room_code: event.target.value });
                        } else {
                          event.target.value = "";
                        }
                      }}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8">
                    <Form.Text className="text-muted">
                      Room Code can not contain "/"
                    </Form.Text>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
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
                  <label className="col-sm-4 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-add"
                        size="sm"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectBuilding}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {_.map(data.buildings, (building) => (
                          <Dropdown.Item
                            key={building.building_id}
                            eventKey={building.building_id}
                            onSelect={(eventKey) => {
                              setRoom({
                                ...room,
                                building_id: eventKey,
                              });
                              setSelectBuilding(building.building_name);
                            }}
                          >
                            {building.building_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>
              </>
            }
            method="POST"
            onSubmit={addHandleSubmit}
            button="Add"
          />

          <FormModal
            show={modalShowDel}
            onHide={() => setModalShowDel(false)}
            title="Do you confirm to delete?"
            body={
              <div className="form-group col-form-label">
                <p>
                  "{room.room_code} - {room.room_name}"
                </p>
                <p className="text-danger">
                  *** All items that relate to {room.room_code} will be delete
                  too ***
                </p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => setModalShowEdit(false)}
            title="Edit Room"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="room_code"
                      value={room.room_code}
                      disabled
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="room_name"
                      value={room.room_name}
                      onChange={(event) =>
                        setRoom({
                          room_id: room.room_id,
                          room_code: room.room_code,
                          building_id: room.building_id,
                          room_name: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit"
                        size="sm"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectBuilding}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {_.map(data.buildings, (building) => (
                          <Dropdown.Item
                            key={building.building_id}
                            eventKey={building.building_id}
                            onSelect={(eventKey) => {
                              setRoom({
                                room_id: room.room_id,
                                room_code: room.room_code,
                                room_name: room.room_name,
                                building_id: eventKey,
                              });
                              setSelectBuilding(building.building_name);
                            }}
                          >
                            {building.building_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>
              </>
            }
            method="POST"
            onSubmit={editHandleSubmit}
            button="Confirm"
            close="Cancel"
          />
        </div>
      }
    />
  );
}
