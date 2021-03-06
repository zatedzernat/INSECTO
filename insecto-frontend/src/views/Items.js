import React, { useState, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import _ from "lodash";
import { Button, Dropdown, Form, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DropdownItem from "react-bootstrap/DropdownItem";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";
import FilterComponent from "../components/FilterBox";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function Items(props) {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [modalShowMove, setModalShowMove] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    // item_code: 0,
    // item_name: "",
    // building_id: 0,
    // room_id: 0,
    // brand_id: 0,
    // serial_number: "",
    // model: "",
    // group: "",
  };
  const [item, setItem] = useState({});
  const [rooms, setRooms] = useState({});
  const [selectBuilding, setSelectBuilding] = useState(
    "- select building name -"
  );
  const [selectRoom, setSelectRoom] = useState("- select room name -");
  const [selectType, setSelectType] = useState("- select type name -");
  const [selectBrand, setSelectBrand] = useState("- select brand name -");
  const [selectGroup, setSelectGroup] = useState("- select group -");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [isGenAllQR, setIsGenAllQR] = useState(false);
  const [moveto, setMoveto] = useState(initialState);
  const [isMove, setIsMove] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;
  const history = useHistory();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items`,
        method: "GET",
        headers: { Authorization: token, "User-Id": user.id },
      });
      setData(res.data);
      setIsLoading(false);
      setIsExport(false);
      setIsGenAllQR(false);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        Cookies.remove("token");
        history.replace({
          pathname: "/admin",
          state: {
            login: "Please Login again!",
          },
        });
      }
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
    setSelectRoom("- select room name -");
    setSelectBrand("- select brand name -");
    setSelectType("- select type name -");
    setModalShowAdd(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items`,
        method: "POST",
        headers: { Authorization: token, "User-Id": user.id },
        data: item,
      });
      setItem(initialState);
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
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2 + " " + mess3 + " " + mess4 + " " + mess5,
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
        url: `${process.env.REACT_APP_API_URL}items/${item.item_id}`,
        method: "DELETE",
        headers: { Authorization: token, "User-Id": user.id },
        data: item.item_id,
      });
      setItem(initialState);
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
      console.log(JSON.stringify(error.response));
    }
  };

  const deleteSelectedHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    let items = {
      items: selectedRows.map(({ item_id }) => item_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items/selected/delete`,
        method: "POST",
        headers: { Authorization: token, "User-Id": user.id },
        data: items,
      });
      setToggleCleared(!toggleCleared);
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
      console.log(JSON.stringify(error.response));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items/${item.item_id}`,
        method: "PUT",
        headers: { Authorization: token, "User-Id": user.id },
        data: item,
      });
      setItem(initialState);
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
        let mess1 = error.response.data.errors.item_name
          ? error.response.data.errors.item_name
          : "";
        let mess2 = error.response.data.errors.room_id
          ? error.response.data.errors.room_id
          : "";
        Toast.fire({
          icon: "error",
          title: mess1 + " " + mess2,
        });
      } else {
        console.log(error);
      }
    }
  };
  const moveHandleSubmit = async (event) => {
    setIsMove(true);
    event.preventDefault();
    setSelectBuilding("- select building name -");
    setSelectRoom("- select room name -");
    setModalShowMove(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items/selected/move`,
        method: "POST",
        headers: { Authorization: token, "User-Id": user.id },
        data: {
          items: selectedRows.map(({ item_id }) => item_id),
          room_id: moveto,
        },
      });
      setToggleCleared(!toggleCleared);
      setMoveto(initialState);
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
      setIsMove(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemQRCode = async (row) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}get_item_qr/${row.item_code}`,
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, "User-Id": user.id },
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

  const getItemsQRCode = async (event) => {
    setIsGenAllQR(true);
    event.preventDefault();
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}get_items_qr_zip`,
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, "User-Id": user.id },
        data: {
          items: selectedRows.map(({ item_id }) => item_id),
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
        url: `${process.env.REACT_APP_API_URL}items/import`,
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
          "User-Id": user.id,
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

  const exportItems = async (event) => {
    setIsExport(true);
    event.preventDefault();
    // let items = {
    //   items: selectedRows.map(({ item_id }) => item_id),
    // };
    // let url = window.location.origin;
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}items/export`,
        data: {
          items: selectedRows.map(({ item_id }) => item_id),
          url: window.location.origin,
        },
        method: "POST",
        responseType: "blob",
        headers: { Authorization: token, "User-Id": user.id },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Items.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      setIsExport(false);
      setToggleCleared(!toggleCleared);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const handleRowSelected = React.useCallback((state) => {
    let selected = state.selectedRows.map(
      ({ item_id, item_code, item_name }) => ({
        item_id,
        item_code,
        item_name,
      })
    );
    let sort = selected.sort((a, b) => a.item_id - b.item_id);
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

  const itemTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        width: "70px",
        selector: "item_id",
      },
      {
        name: "Item Code*",
        selector: "item_code",
        sortable: true,
        width: "120px",
      },
      {
        name: "Item Name",
        selector: "item_name",
        sortable: true,
        width: "260px",
      },
      {
        name: "Type",
        selector: "item_type.type_name",
        sortable: true,
        width: "180px",
      },
      {
        name: "Room",
        selector: "room.room_name",
        sortable: true,
        width: "150px",
      },
      {
        name: "isGroup",
        selector: "group",
        sortable: true,
        center: true,
        width: "45px",
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
        width: " 200px",
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
                  let mybd = _.find(data.buildings, row.room.building);
                  setRooms(mybd.rooms);
                }
              }}
            >
              <i className="ion-edit" />
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
              style={{ fontSize: "15px" }}
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
          fontSize: "15px",
          backgroundColor: "#9CBBA6",
          padding: "3px",
        }}
      >
        Building: {data.room.building.building_code} &emsp; Brand:{" "}
        {data.brand?.brand_name ?? "-"} &emsp; Serial Number: &nbsp;
        {data.serial_number ?? "-"} &emsp; Model: {data.model ?? "-"} &emsp;
        Note: {data.note ?? "-"}
      </div>
    );

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

    const filteredItems = data.items?.filter(
      (item) =>
        item.item_code |
        item.item_code.toLowerCase().includes(filterText.toLowerCase()) |
        item.item_name |
        item.item_name.toLowerCase().includes(filterText.toLowerCase()) |
        item.group |
        item.group.toLowerCase().includes(filterText.toLowerCase()) |
        item.note |
        item.note?.toLowerCase().includes(filterText.toLowerCase()) |
        item.serial_number |
        item.serial_number?.toLowerCase().includes(filterText.toLowerCase()) |
        item.model |
        item.model?.toLowerCase().includes(filterText.toLowerCase()) |
        item.brand?.brand_name |
        item.brand?.brand_name
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.room.room_name |
        item.room.room_name.toLowerCase().includes(filterText.toLowerCase()) |
        item.room.building.building_code |
        item.room.building.building_code
          .toLowerCase()
          .includes(filterText.toLowerCase()) |
        item.item_type.type_name |
        item.item_type.type_name
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
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={<ExpandedComponent />}
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
                <h2>Items</h2>
                <h6>รายการครุภัณฑ์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button
                  variant="default"
                  style={{ color: "white", backgroundColor: "#1BC5BD" }}
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
                {selectedRows.length > 0 ? (
                  <>
                    <Button
                      onClick={() => {
                        setModalShowDel(true);
                      }}
                      variant="default"
                      style={{ color: "white", backgroundColor: "#F64E60" }}
                    >
                      Delete
                    </Button>
                    &emsp;
                    {isMove === false ? (
                      <Button
                        variant="default"
                        onClick={() => {
                          setModalShowMove(true);
                        }}
                        style={{ color: "white", backgroundColor: "#8950FC" }}
                      >
                        Move
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#8950FC" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#F64E60" }}
                      disabled
                    >
                      Delete
                    </Button>
                    &emsp;
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#8950FC" }}
                      disabled
                    >
                      Move
                    </Button>
                  </>
                )}
                &emsp;
                <Button
                  variant="default"
                  onClick={() => setModalShowImport(true)}
                  type="submit"
                  style={{ color: "white", backgroundColor: "#6993FF" }}
                >
                  Import Items
                </Button>
                &emsp;
                {selectedRows.length > 0 ? (
                  <>
                    {isExport === false ? (
                      <Button
                        variant="default"
                        onClick={exportItems}
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        Export Items
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
                        onClick={getItemsQRCode}
                        variant="default"
                        style={{ color: "white", backgroundColor: "#66BB6A" }}
                      >
                        <i className="fa fa-qrcode" />
                        &nbsp; Items QR Code
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#66BB6A" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                    &emsp;
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#6993FF" }}
                      disabled
                    >
                      Export Items
                    </Button>
                    &emsp;
                    <Button
                      variant="default"
                      style={{ color: "white", backgroundColor: "#66BB6A" }}
                      disabled
                    >
                      <i className="fa fa-qrcode" />
                      &nbsp; Items QR Code
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
            onHide={() => {
              setModalShowAdd(false);
              setItem(initialState);
            }}
            title="Add Item"
            close="Close"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Item Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="item_code"
                      onChange={(event) => {
                        let str = event.target.value;
                        let rs = str.indexOf("/");
                        if (rs === -1) {
                          setItem({ ...item, item_code: event.target.value });
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
                      Item Code can not contain "/"
                    </Form.Text>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Item Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
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
                  <label className="col-sm-4 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectType}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectRoom}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Group: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectGroup}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Brand:</label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectBrand}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {item.brand_id && (
                          <DropdownItem
                            eventKey={null}
                            onSelect={(eventKey) => {
                              setItem({
                                ...item,
                                brand_id: eventKey,
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Serial Number:
                  </label>
                  <div className="col-sm-8">
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
                  <label className="col-sm-4 col-form-label">Model:</label>
                  <div className="col-sm-8">
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
                  <label className="col-sm-4 col-form-label">Note:</label>
                  <div className="col-sm-8">
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
            onHide={() => {
              setModalShowDel(false);
              setItem(initialState);
            }}
            title="Do you confirm to delete?"
            body={
              selectedRows.length > 0 ? (
                <div className="form-group col-form-label">
                  {selectedRows.map((item) => (
                    <p key={item.item_id}>
                      {item.item_code} - {item.item_name}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="form-group col-form-label">
                  <p>
                    "{item.item_code} - {item.item_name}"
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
            show={modalShowMove}
            onHide={() => {
              setModalShowMove(false);
              setSelectBuilding("- select building name -");
            }}
            title="Move items to room"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
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
                              setRooms(building.rooms);
                              setSelectBuilding(building.building_name);
                              setSelectRoom("- select room name -");
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
                  <label className="col-sm-4 col-form-label">
                    Room: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectRoom}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {_.map(rooms, (room) => (
                          <Dropdown.Item
                            key={room.room_id}
                            eventKey={room.room_id}
                            onSelect={(eventKey) => {
                              setSelectRoom(room.room_name);
                              setMoveto(eventKey);
                            }}
                          >
                            {room.room_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            }
            method="POST"
            onSubmit={moveHandleSubmit}
            button="Confirm"
            close="Cancel"
          />

          <FormModal
            show={modalShowEdit}
            onHide={() => {
              setModalShowEdit(false);
              setItem(initialState);
            }}
            title="Edit Item"
            body={
              <div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Item Code: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
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
                  <label className="col-sm-4 col-form-label">
                    Item Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="item_name"
                      value={item.item_name}
                      onChange={(event) =>
                        setItem({
                          ...item,
                          item_name: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Type: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit-type"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectType}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Building: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit-building"
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Room: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit-room"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectRoom}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Group: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit-group"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {item.group}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Brand:</label>
                  <div className="col-sm-8">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        id="dropdown-edit-brand"
                        style={{ width: "303px" }}
                        variant="outline-primary"
                      >
                        {selectBrand}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="super-colors">
                        {item.brand_id && (
                          <DropdownItem
                            eventKey={null}
                            onSelect={(eventKey) => {
                              setItem({
                                ...item,
                                brand_id: eventKey,
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
                      </Dropdown.Menu>
                    </Dropdown>{" "}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Serial Number:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="serial_number"
                      value={item.serial_number ?? ""}
                      onChange={(event) =>
                        setItem({
                          ...item,
                          serial_number: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Model:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={item.model ?? ""}
                      onChange={(event) =>
                        setItem({
                          ...item,
                          model: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Note:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      value={item.note ?? ""}
                      onChange={(event) =>
                        setItem({
                          ...item,
                          note: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Created At:</label>
                  <div className="col-sm-8 col-form-label">
                    {moment(item.created_at).format("D/MM/YYYY - HH:mm:ss")}
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
            title="Import data of items"
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
