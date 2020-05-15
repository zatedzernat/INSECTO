import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import {
  Table,
  Button,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";

export default function Items() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [item, setItem] = useState({
    item_code: 0,
    item_name: "",
    building_id: 0,
    room_id: 0,
    brand_id: 0,
    serial_number: "",
    model: "",
    group: "",
  });
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );
  const [selectRoom, setSelectRoom] = useState("- select room name -");
  const [selectType, setSelectType] = useState("- select type name -");
  const [selectBrand, setSelectBrand] = useState("- select brand name -");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}items`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };
  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  console.log(JSON.stringify(item))
  const addHandleSubmit = async (event) => {
    console.log(JSON.stringify(item));
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
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
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
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
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
      if (res.data.error) {
        setIsError({
          error: true,
          message: res.data.message,
        });
      } else {
        setLastUpdate(res.data.time);
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data.errors));
    }
  };
  const styles = {
    container: { color: "red" },
  };
  const itemTable = (data) => {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>#</th>
            <th>
              Code <span style={styles.container}>*</span>
            </th>
            <th>Name</th>
            <th>Type</th>
            <th>Building</th>
            <th>Room</th>
            <th>Brand</th>
            <th>Serial Number</th>
            <th>Model</th>
            <th>Group</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Update By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {_.map(data.items, (item) => (
            <tr key={item.item_id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.item_id}</td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{item.item_type.type_name}</td>
              <td>{item.room.building.building_name}</td>
              <td>{item.room.room_name}</td>
              <td>{item.brand?.brand_name || "-"}</td>
              <td>{item.serial_number ?? "-"}</td>
              <td>{item.model ?? "-"}</td>
              <td>{item.group}</td>
              <td>{item.created_at}</td>
              <td>{item.updated_at}</td>
              <td>{item.update_by}</td>
              <td>
                <span
                  onClick={() => {
                    setModalShowEdit(true);
                    setItem(item);
                    setSelectBrand(item.brand.brand_name);
                    setSelectType(item.item_type.type_name);
                    setSelectBuilding(item.room.building.building_name);
                    setSelectRoom(item.room.room_name);
                  }}
                >
                  <i className="fa fa-edit" />
                </span>
                &emsp;
                <span
                  onClick={() => {
                    setModalShowDel(true);
                    setItem(item);
                  }}
                >
                  <i className="fa fa-times" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
                  }}
                >
                  Add
                </Button>
                &emsp;
                <Button variant="danger">Delete</Button>
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
                            setItem({
                              ...item,
                              building_id: eventKey,
                            });
                            setSelectBuilding(building.building_name);
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
                      {_.map(data.rooms, (room) => (
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
                      id="bg-nested-dropdown"
                      size="sm"
                      variant="warning"
                    >
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
                    <input
                      type="text"
                      className="form-control"
                      name="group"
                      onChange={(event) =>
                        setItem({ ...item, group: event.target.value })
                      }
                      required
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
                            setItem({
                              item_id: item.item_id,
                              item_code: item.item_code,
                              item_name: item.item_name,
                              room_id: item.room_id,
                              type_id: item.type_id,
                              building_id: eventKey,
                              brand_id: item.brand_id,
                              serial_number: item.serial_number,
                              model: item.model,
                              group: item.group,
                            });
                            setSelectBuilding(building.building_name);
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
                      {_.map(data.rooms, (room) => (
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
                      id="bg-nested-dropdown"
                      size="sm"
                      variant="warning"
                    >
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
                    <input
                      type="text"
                      className="form-control"
                      name="group"
                      value={item.group}
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
                          group: event.target.value,
                        })
                      }
                      required
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
        </div>
      }
    />
  );
}
