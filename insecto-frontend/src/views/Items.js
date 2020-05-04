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
  const [objectDel, setObjectDel] = useState([]);
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
        `${process.env.REACT_APP_API_URL}items/${objectDel.item_id}`,
        objectDel.item_id
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

  const itemTable = (data) => {
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
            <th>Type</th>
            <th>Building</th>
            <th>Room</th>
            <th>Brand</th>
            <th>Serial Number</th>
            <th>Model</th>
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
              <td>{item.created_at}</td>
              <td>{item.updated_at}</td>
              <td>{item.update_by}</td>
              <td>
                <i className="fa fa-edit" />
                &emsp;
                <span  onClick={ () => {
                  setModalShowDel(true); 
                  setObjectDel(item);}}
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
                <Button variant="info" onClick={() => setModalShowAdd(true)}>
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
            title="Add Brand"
            close="Close"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Item Code:</label>
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
                  <label className="col-sm-3 col-form-label">Item Name:</label>
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
                  <label className="col-sm-3 col-form-label">Type:</label>
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
                          onSelect={(eventKey) => (
                            setItem({
                              ...item,
                              type_id: eventKey,
                            }),
                            setSelectType(type.type_name)
                          )}
                        >
                          {type.type_name}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
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
                            setItem({
                              ...item,
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

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Room:</label>
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
                          onSelect={(eventKey) => (
                            setItem({
                              ...item,
                              room_id: eventKey,
                            }),
                            setSelectRoom(room.room_name)
                          )}
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
                          onSelect={(eventKey) => (
                            setItem({
                              ...item,
                              brand_id: eventKey,
                            }),
                            setSelectBrand(brand.brand_name)
                          )}
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
                <p>"{objectDel.item_code} - {objectDel.item_name}"</p>
              </div>
            }
            method="POST"
            onSubmit={deleteHandleSubmit}
            button="Yes"
            close="No"
          />
        </div>
      }
    />
  );
}