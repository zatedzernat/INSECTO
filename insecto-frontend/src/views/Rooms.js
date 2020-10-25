import React, { useState, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import axios from "axios";
import { Button, Dropdown, Form, ButtonGroup } from "react-bootstrap";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";
import FilterComponent from "../components/FilterBox";
import Cookies from "js-cookie";

export default function Rooms(props) {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    room_id: 0,
    room_code: "",
    room_name: "",
    building_id: 0,
  };
  const [room, setRoom] = useState(initialState);
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [isGenAllQR, setIsGenAllQR] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms`,
        method: "GET",
        headers: { Authorization: token, user_id: user.id },
      });
      setData(res.data);
      setIsLoading(false);
      setIsExport(false);
      setIsGenAllQR(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/importfile.js";
    script.async = true;
    document.body.appendChild(script);
    fetchData();
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, [lastUpdate, user]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectBuilding("- select building name -");
    setModalShowAdd(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms`,
        method: "POST",
        headers: { Authorization: token, user_id: user.id },
        data: room,
      });
      setRoom(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
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
        let mess = mess1 + " " + mess2 + " " + mess3;
        Toast.fire({
          icon: "error",
          title: mess,
        });
      } else {
        console.log(error);
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms/${room.room_id}`,
        method: "DELETE",
        headers: { Authorization: token, user_id: user.id },
        data: room.room_id,
      });
      setRoom(initialState);
      if (res.data.error) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const deleteSelectedHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    let rooms = {
      rooms: selectedRows.map(({ room_id }) => room_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms/selected`,
        method: "POST",
        headers: { Authorization: token, user_id: user.id },
        data: rooms,
      });
      setToggleCleared(!toggleCleared);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
          width: 350,
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
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms/${room.room_id}`,
        method: "PUT",
        headers: { Authorization: token, user_id: user.id },
        data: room,
      });
      setRoom(initialState);
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        Toast.fire({
          icon: "error",
          title: error.response.data.errors.room_name,
        });
      } else {
        console.log(error);
      }
    }
  };

  const getRoomQRCode = async (row) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}get_room_qr/${row.room_code}`,
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, user_id: user.id },
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

  const getRoomsQRCode = async (event) => {
    setIsGenAllQR(true);
    event.preventDefault();
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}get_rooms_qr_zip`,
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, user_id: user.id },
        data: {
          rooms: selectedRows.map(({ room_id }) => room_id),
          url: window.location.origin,
        },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Rooms_QRCode.zip"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setIsGenAllQR(false);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const importHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowImport(false);
    try {
      const formData = new FormData();
      formData.append("import_file", file);

      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms/import`,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
          user_id: user.id,
        },
        data: formData,
      });
      if (res.data.errors) {
        Toast.fire({
          icon: "error",
          title: res.data.errors,
          width: 450,
        });
      } else {
        setLastUpdate(res.data.time);
        Toast.fire({
          icon: "success",
          title: res.data.success,
          width: 450,
        });
      }
    } catch (error) {
      console.log(error.response);
      let err_message = error.response.data.message;
      if (error.response.status === 422) {
        let message = error.response.data;
        if (message.errors.import_file) {
          Toast.fire({
            icon: "error",
            title: message.errors.import_file,
            width: 450,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: message.errors[0],
            width: 450,
          });
        }
      } else if (err_message.split(":")[0] === "Undefined index") {
        Toast.fire({
          icon: "error",
          width: 450,
          title: `Import file doesn't has '${
            err_message.split(":")[1]
          }' column!`,
        });
      } else {
        console.log(error);
      }
    }
  };

  const exportRooms = async (event) => {
    setIsExport(true);
    event.preventDefault();
    let rooms = {
      rooms: selectedRows.map(({ room_id }) => room_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}rooms/export`,
        data: rooms,
        method: "POST",
        headers: { Authorization: token, user_id: user.id },
        responseType: "blob",
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Rooms.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setIsExport(false);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const handleRowSelected = React.useCallback((state) => {
    let selected = state.selectedRows.map(
      ({ room_id, room_code, room_name }) => ({
        room_id,
        room_code,
        room_name,
      })
    );
    let sort = selected.sort((a, b) => a.room_id - b.room_id);
    setSelectedRows(sort);
  }, []);

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const roomTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        width: "70px",
        selector: "room_id",
      },
      {
        name: "Room Code*",
        selector: "room_code",
        sortable: true,
        width: "150px",
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
      // {
      //   name: "Created At",
      //   selector: "created_at",
      //   sortable: true,
      //   format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
      // },
      {
        name: "Last Updated",
        selector: "updated_at",
        sortable: true,
        format: (r) => moment(r.updated_at).format("D/MM/YYYY - HH:mm:ss"),
      },
      {
        name: "User",
        selector: "user.name",
        sortable: true,
        width: "135px",
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
              <i className="ion-edit" />
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
              style={{ fontSize: "15px" }}
            >
              <i className="fa fa-qrcode" />
              QR Code
            </Button>
          </>
        ),
        button: true,
        width: "120px",
      },
    ];

    const myFonts = {
      rows: {
        style: {
          fontSize: "15px",
        },
      },
      headCells: {
        style: {
          fontSize: "15px",
        },
      },
    };

    const filteredItems = data.rooms?.filter(
      (item) =>
        item.room_name |
        item.room_name.toLowerCase().includes(filterText.toLowerCase()) |
        item.room_code |
        item.room_code.toLowerCase().includes(filterText.toLowerCase()) |
        item.building.building_name |
        item.building.building_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.user.name |
        item.user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <DataTable
        columns={columns}
        data={filteredItems}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
        customStyles={myFonts}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    );
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
                <Button
                  variant="default"
                  style={{ backgroundColor: "#1BC5BD", color: "white" }}
                  onClick={() => {
                    setModalShowAdd(true);
                    setSelectBuilding("- select building name -");
                  }}
                >
                  Add
                </Button>
                &emsp;
                {selectedRows.length > 0 ? (
                  <>
                    <Button
                      variant="default"
                      onClick={() => {
                        setModalShowDel(true);
                      }}
                      style={{ backgroundColor: "#F64E60", color: "white" }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    style={{ backgroundColor: "#F64E60", color: "white" }}
                    disabled
                  >
                    Delete
                  </Button>
                )}
                &emsp;
                <Button
                  variant="default"
                  onClick={() => setModalShowImport(true)}
                  type="submit"
                  style={{ color: "white", backgroundColor: "#6993FF" }}
                >
                  Import Rooms
                </Button>
                &emsp;
                {selectedRows.length > 0 ? (
                  <>
                    {isExport === false ? (
                      <Button
                        variant="default"
                        onClick={exportRooms}
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        Export Rooms
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                    &emsp;
                    {isGenAllQR === false ? (
                      <Button
                        variant="default"
                        onClick={getRoomsQRCode}
                        style={{ color: "white", backgroundColor: "#66BB6A" }}
                      >
                        <i className="fa fa-qrcode" />
                        &nbsp; Rooms QR Code
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#66BB6A" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#6993FF" }}
                      disabled
                    >
                      Export Rooms
                    </Button>
                    &emsp;
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#66BB6A" }}
                      disabled
                    >
                      <i className="fa fa-qrcode" />
                      &nbsp; Rooms QR Code
                    </Button>
                  </>
                )}
              </div>
            }
            body={roomTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => {
              setModalShowAdd(false);
              setRoom(initialState);
            }}
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
                          setRoom({ ...room, room_code: event.target.value });
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
            onHide={() => {
              setModalShowDel(false);
              setRoom(initialState);
            }}
            title="Do you confirm to delete?"
            body={
              selectedRows.length > 0 ? (
                <div className="form-group col-form-label">
                  {selectedRows.map((room) => (
                    <p key={room.room_id}>
                      {room.room_code} - {room.room_name}
                    </p>
                  ))}
                  <p className="text-danger">
                    *** All items that relate to{" "}
                    {selectedRows.map(({ room_name }) => room_name).join(", ")}{" "}
                    will be delete too ***
                  </p>
                </div>
              ) : (
                <div className="form-group col-form-label">
                  <p>
                    "{room.room_code} - {room.room_name}"
                  </p>
                  <p className="text-danger">
                    *** All items that relate to {room.room_code} will be delete
                    too ***
                  </p>
                </div>
              )
            }
            method="POST"
            onSubmit={
              selectedRows.length > 0
                ? deleteSelectedHandleSubmit
                : deleteHandleSubmit
            }
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => {
              setModalShowEdit(false);
              setRoom(initialState);
            }}
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
                          ...room,
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
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Created At:</label>
                  <div className="col-sm-8 col-form-label">
                    {moment(room.created_at).format("D/MM/YYYY - HH:mm:ss")}
                  </div>
                </div>
              </>
            }
            method="POST"
            onSubmit={editHandleSubmit}
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowImport}
            onHide={() => setModalShowImport(false)}
            title="Import data of Rooms"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    File<span style={{ color: "red" }}>*</span>:
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile"
                        name="import_file"
                        onChange={(event) => setFile(event.target.files[0])}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile"
                      >
                        Choose file...
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row" style={{ marginBottom: 0 }}>
                  <label className="col-sm-12 col-form-label">
                    - Only .xls and .xlsx file type <br />- Import file must has
                    'Rooms' sheetname <br /> - Import file must has all columns
                    as insecto_data_format
                  </label>
                </div>
              </>
            }
            method="POST"
            onSubmit={importHandleSubmit}
            button="Import"
            close="Cancel"
          />
        </div>
      }
    />
  );
}
