import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import { Button, Alert, DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DropdownItem from "react-bootstrap/DropdownItem";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function Items() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
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
  const [item, setItem] = useState({
    item_code: 0,
    item_name: "",
    building_id: 0,
    room_id: 0,
    // brand_id: 0,
    serial_number: "",
    model: "",
    group: "",
  });
  const [rooms, setRooms] = useState({});
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );
  const [selectRoom, setSelectRoom] = useState("- select room name -");
  const [selectType, setSelectType] = useState("- select type name -");
  const [selectBrand, setSelectBrand] = useState("- select brand name -");
  const [selectGroup, setSelectGroup] = useState("- select group -");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}items`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const addHandleSubmit = async (event) => {
    event.preventDefault();
    setSelectBuilding("- select building name -");
    setSelectRoom("- select room name -");
    setSelectBrand("- select brand name -");
    setSelectType("- select typ name -");
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}items`,
        item
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
        let mess1 = error.response.data.errors.item_code
          ? error.response.data.errors.item_code
          : "";
        let mess2 = error.response.data.errors.item_name
          ? error.response.data.errors.item_name
          : "";
        let mess3 = error.response.data.errors.type_id
          ? error.response.data.errors.type_id
          : "";
        let mess4 = error.response.data.errors.room_id
          ? error.response.data.errors.room_id
          : "";
        let mess5 = error.response.data.errors.group
          ? error.response.data.errors.group
          : "";
        setIsError({
          error: true,
          message:
            mess1 + " " + mess2 + " " + mess3 + " " + mess4 + " " + mess5,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}items/${item.item_id}`,
        item.item_id
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
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}items/${item.item_id}`,
        item
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
        let mess1 = error.response.data.errors.item_name
          ? error.response.data.errors.item_name
          : "";
        let mess2 = error.response.data.errors.room_id
          ? error.response.data.errors.room_id
          : "";
        setIsError({
          error: true,
          message: mess1 + " " + mess2,
        });
      }
    }
  };

  const getItemQRCode = async (row) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}getqr/${row.item_code}`,
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
      link.setAttribute("download", `${row.item_code} (${row.group}).png`); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const getItemsQRCode = async (row) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}getqr_zip`,
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
      link.setAttribute("download", "Items_QRCode.zip"); //or any other extension
      document.body.appendChild(link);
      link.click();
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

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}items/import`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
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
      console.log(error.response);
      let err_message = error.response.data.message;
      if (error.response.status === 422) {
        setIsError({
          error: true,
          message: error.response.data.errors.import_file,
        });
      } else if (err_message.split(":")[0] === "Undefined index") {
        setIsError({
          error: true,
          message: `Import file doesn't has '${
            err_message.split(":")[1]
          }' column!`,
        });
      }
    }
  };

  const exportItems = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items/export`,
        method: "GET",
        responseType: "blob",
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Items.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const itemTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "item_id",
        sortable: true,
      },
      {
        name: "Item Code*",
        selector: "item_code",
        sortable: true,
      },
      {
        name: "Item Name",
        selector: "item_name",
        sortable: true,
      },
      {
        name: "Type",
        selector: "item_type.type_name",
        sortable: true,
      },
      {
        name: "Room",
        selector: "room.room_name",
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
                setItem(row);
                setSelectBrand(
                  row.brand?.brand_name || "- select brand name -"
                );
                setSelectType(row.item_type.type_name);
                setSelectBuilding(row.room.building.building_name);
                setSelectRoom(row.room.room_name);
                setSelectGroup(row.group);
                {
                  let mybd = _.find(data.buildings, row.building_id);
                  setRooms(mybd.rooms);
                }
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setItem(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
      },
      {
        name: "QR Code",
        cell: (row) => (
          <>
            <Button
              className="btn-xs"
              type="submit"
              variant="outline-success"
              size="sm"
              onClick={() => getItemQRCode(row)}
            >
              <i className="fa fa-qrcode" />
              QR Code
            </Button>
          </>
        ),
        button: true,
      },
    ];
    const ExpandedComponent = ({ data }) => (
      <div
        style={{
          textAlign: "center",
          fontSize: 14,
          backgroundColor: "#A7D3D8",
        }}
      >
        Building: {data.room.building.building_code} &emsp; Brand:{" "}
        {data.brand?.brand_name ?? "-"} &emsp; Serial Number: &nbsp;
        {data.serial_number ?? "-"} &emsp; Model: {data.model ?? "-"} &emsp;
        Group: {data.group} &emsp; Note: {data.note ?? "-"}
      </div>
    );
    return (
      <DataTable
        columns={columns}
        data={data.items}
        striped
        responsive
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={<ExpandedComponent />}
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
                <h2>Items</h2>
                <h6>รายการครุภัณฑ์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button
                  variant="info"
                  onClick={() => {
                    setModalShowAdd(true);
                    setSelectBrand("- select brand name -");
                    setSelectBuilding("- select building name -");
                    setSelectRoom("- select room name -");
                    setSelectType("- select type name -");
                    setSelectGroup("- select group -");
                    setRooms(data.rooms);
                  }}
                >
                  Add
                </Button>
                &emsp;
                <Button variant="danger">Delete</Button>
                &emsp;
                {data.countItems === 0 ? (
                  <Button
                    onClick={() => setModalShowImport(true)}
                    variant="warning"
                    type="submit"
                  >
                    Import Item(s)
                  </Button>
                ) : (
                  <>
                    <Button onClick={getItemsQRCode} variant="success">
                      <i className="fa fa-qrcode" />
                      All Item(s) QR Code
                    </Button>
                    &emsp;
                    <Button onClick={exportItems} variant="warning">
                      Export Item(s)
                    </Button>
                  </>
                )}
              </div>
            }
            body={itemTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Item"
            close="Close"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Item Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="item_code"
                      onChange={(event) =>
                        setItem({ item_code: event.target.value })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Item Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="item_name"
                      onChange={(event) =>
                        setItem({ ...item, item_name: event.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectType}
                      id="type"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(data.itemTypes, (type) => (
                        <Dropdown.Item
                          key={type.type_id}
                          eventKey={type.type_id}
                          onSelect={(eventKey) => {
                            setItem({
                              ...item,
                              type_id: eventKey,
                            });
                            setSelectType(type.type_name);
                          }}
                        >
                          {type.type_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
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
                          onSelect={(eventKey) => {
                            setRooms(building.rooms);
                            setSelectBuilding(building.building_name);
                            setSelectRoom("- select room name -");
                            setItem({
                              ...item,
                              room_id: null,
                            });
                          }}
                        >
                          {building.building_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Room: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectRoom}
                      id="r"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(rooms, (room) => (
                        <Dropdown.Item
                          key={room.room_id}
                          eventKey={room.room_id}
                          onSelect={(eventKey) => {
                            setItem({
                              ...item,
                              room_id: eventKey,
                            });
                            setSelectRoom(room.room_name);
                          }}
                        >
                          {room.room_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Brand:</label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectBrand}
                      id="bg-nested-dropdown-brand"
                      size="sm"
                      variant="warning"
                    >
                      {item.brand_id && (
                        <DropdownItem
                          eventKey={null}
                          onSelect={(eventKey) => {
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: item.room_id,
                              type_id: item.type_id,
                              building_id: item.building_id,
                              brand_id: eventKey,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                            });
                            setSelectBrand("no brand");
                          }}
                        >
                          no brand
                        </DropdownItem>
                      )}
                      {_.map(data.brands, (brand) => (
                        <Dropdown.Item
                          key={brand.brand_id}
                          eventKey={brand.brand_id}
                          onSelect={(eventKey) => {
                            setItem({
                              ...item,
                              brand_id: eventKey,
                            });
                            setSelectBrand(brand.brand_name);
                          }}
                        >
                          {brand.brand_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Serial Number:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="serial_number"
                      onChange={(event) =>
                        setItem({ ...item, serial_number: event.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Model:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      onChange={(event) =>
                        setItem({ ...item, model: event.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Group: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectGroup}
                      id="bg-nested-dropdown-group"
                      size="sm"
                      variant="warning"
                    >
                      <Dropdown.Item
                        eventKey="Y"
                        onSelect={(eventKey) => {
                          setItem({
                            ...item,
                            group: eventKey,
                          });
                          setSelectGroup("Y");
                        }}
                      >
                        Y
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="N"
                        onSelect={(eventKey) => {
                          setItem({
                            ...item,
                            group: eventKey,
                          });
                          setSelectGroup("N");
                        }}
                      >
                        N
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Note:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      onChange={(event) =>
                        setItem({
                          ...item,
                          note: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
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
                  "{item.item_code} - {item.item_name}"
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
            title="Edit Item"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Item Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="item_code"
                      value={item.item_code}
                      disabled
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Item Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="item_name"
                      value={item.item_name}
                      onChange={(event) =>
                        setItem({
                          item_id: item.item_id,
                          item_code: item.item_code,
                          item_name: event.target.value,
                          room_id: item.room_id,
                          type_id: item.type_id,
                          building_id: item.building_id,
                          brand_id: item.brand_id,
                          serial_number: item.serial_number,
                          model: item.model,
                          group: item.group,
                          note: item.note,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectType}
                      id="type"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(data.itemTypes, (type) => (
                        <Dropdown.Item
                          key={type.type_id}
                          eventKey={type.type_id}
                          onSelect={(eventKey) => {
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: item.room_id,
                              type_id: eventKey,
                              building_id: item.building_id,
                              brand_id: item.brand_id,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                              note: item.note,
                            });
                            setSelectType(type.type_name);
                          }}
                        >
                          {type.type_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
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
                          onSelect={(eventKey) => {
                            setRooms(building.rooms);
                            setSelectBuilding(building.building_name);
                            setSelectRoom("- select room name -");
                            setItem({
                              ...item,
                              room_id: null,
                            });
                          }}
                        >
                          {building.building_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Room: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectRoom}
                      id="r"
                      size="sm"
                      variant="warning"
                    >
                      {_.map(rooms, (room) => (
                        <Dropdown.Item
                          key={room.room_id}
                          eventKey={room.room_id}
                          onSelect={(eventKey) => {
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: eventKey,
                              type_id: item.type_id,
                              building_id: item.building_id,
                              brand_id: item.brand_id,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                              note: item.note,
                            });
                            setSelectRoom(room.room_name);
                          }}
                        >
                          {room.room_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Brand:</label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={selectBrand}
                      id="bg-nested-dropdown-brand"
                      size="sm"
                      variant="warning"
                    >
                      {item.brand_id && (
                        <DropdownItem
                          eventKey={null}
                          onSelect={(eventKey) => {
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: item.room_id,
                              type_id: item.type_id,
                              building_id: item.building_id,
                              brand_id: eventKey,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                              note: item.note,
                            });
                            setSelectBrand("no brand");
                          }}
                        >
                          no brand
                        </DropdownItem>
                      )}
                      {_.map(data.brands, (brand) => (
                        <Dropdown.Item
                          key={brand.brand_id}
                          eventKey={brand.brand_id}
                          onSelect={(eventKey) => {
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: item.room_id,
                              type_id: item.type_id,
                              building_id: item.building_id,
                              brand_id: eventKey,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                              note: item.note,
                            });
                            setSelectBrand(brand.brand_name);
                          }}
                        >
                          {brand.brand_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Serial Number:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="serial_number"
                      value={item.serial_number ?? "-"}
                      onChange={(event) =>
                        setItem({
                          item_id: item.item_id,
                          item_code: item.item_code,
                          item_name: item.item_name,
                          room_id: item.room_id,
                          type_id: item.type_id,
                          building_id: item.building_id,
                          brand_id: item.brand_id,
                          serial_number: event.target.value,
                          model: item.model,
                          group: item.group,
                          note: item.note,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Model:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={item.model ?? "-"}
                      onChange={(event) =>
                        setItem({
                          item_id: item.item_id,
                          item_code: item.item_code,
                          item_name: item.item_name,
                          room_id: item.room_id,
                          type_id: item.type_id,
                          building_id: item.building_id,
                          brand_id: item.brand_id,
                          serial_number: item.serial_number,
                          model: event.target.value,
                          group: item.group,
                          note: item.note,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Group: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <DropdownButton
                      title={item.group}
                      id="bg-nested-dropdown-g"
                      size="sm"
                      variant="warning"
                    >
                      <Dropdown.Item
                        eventKey="Y"
                        onSelect={(eventKey) => {
                          setItem({
                            item_id: item.item_id,
                            item_code: item.item_code,
                            item_name: item.item_name,
                            room_id: item.room_id,
                            type_id: item.type_id,
                            building_id: item.building_id,
                            brand_id: item.brand_id,
                            serial_number: item.serial_number,
                            model: item.model,
                            group: eventKey,
                            note: item.note,
                          });
                          setSelectGroup("Y");
                        }}
                      >
                        Y
                      </Dropdown.Item>

                      <Dropdown.Item
                        eventKey="N"
                        onSelect={(eventKey) => {
                          setItem({
                            item_id: item.item_id,
                            item_code: item.item_code,
                            item_name: item.item_name,
                            room_id: item.room_id,
                            type_id: item.type_id,
                            building_id: item.building_id,
                            brand_id: item.brand_id,
                            serial_number: item.serial_number,
                            model: item.model,
                            group: eventKey,
                            note: item.note,
                          });
                          setSelectGroup("N");
                        }}
                      >
                        N
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Note:</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      value={item.note ?? "-"}
                      onChange={(event) =>
                        setItem({
                          item_id: item.item_id,
                          item_code: item.item_code,
                          item_name: item.item_name,
                          room_id: item.room_id,
                          type_id: item.type_id,
                          building_id: item.building_id,
                          brand_id: item.brand_id,
                          serial_number: item.serial_number,
                          model: item.model,
                          group: item.group,
                          note: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            }
            method="POST"
            onSubmit={editHandleSubmit}
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowImport}
            onHide={() => setModalShowImport(false)}
            title="Import data of item(s)"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    File<span style={{ color: "red" }}>*</span>:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                  </div>
                </div>
                <div className="form-group row" style={{ marginBottom: 0 }}>
                  <label className="col-sm-12 col-form-label">
                    - Only .xls and .xlsx file type <br />- Import file must has
                    'Items' sheetname <br /> - Import file must has all columns
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
