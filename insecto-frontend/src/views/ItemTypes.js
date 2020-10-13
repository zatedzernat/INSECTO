import React, { useState, useEffect, useMemo } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";
import FilterComponent from "../components/FilterBox";

export default function ItemTypes() {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    type_name: "",
  };
  const [itemType, setItemType] = useState(initialState);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}item_types`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
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
  }, [lastUpdate]);

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
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}item_types`,
        itemType
      );
      setItemType(initialState);
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
          title: error.response.data.errors.type_name,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}item_types/${itemType.type_id}`,
        itemType.type_id
      );
      setItemType(initialState);
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
    let item_types = {
      item_types: selectedRows.map(({ type_id }) => type_id),
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}item_types/selected`,
        item_types
      );
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
        `${process.env.REACT_APP_API_URL}item_types/${itemType.type_id}`,
        itemType
      );
      setItemType(initialState);
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
          title: error.response.data.errors.type_name,
        });
      }
    }
  };

  const importHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowImport(false);
    try {
      const formData = new FormData();
      formData.append("import_file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}item_types/import`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );
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
      console.log(error.response);
      let err_message = error.response.data.message;
      if (error.response.status === 422) {
        let message = error.response.data;
        if (message.errors.import_file) {
          Toast.fire({
            icon: "error",
            title: message.errors.import_file,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: message.errors[0],
          });
        }
      } else if (err_message.split(":")[0] === "Undefined index") {
        Toast.fire({
          icon: "error",
          title: `Import file doesn't has '${
            err_message.split(":")[1]
          }' column!`,
        });
      }
    }
  };

  const exportItemTypes = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}item_types/export`,
        method: "GET",
        responseType: "blob",
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Item_Types.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(JSON.stringify(error.response));
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const handleRowSelected = React.useCallback((state) => {
    let selected = state.selectedRows.map(({ type_id, type_name }) => ({
      type_id,
      type_name,
    }));
    let sort = selected.sort((a, b) => a.type_id - b.type_id);
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

  const itemTypeTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        width: "200px",
        selector: "type_id",
      },
      {
        name: "Type Name*",
        selector: "type_name",
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
      },
      {
        name: "Action",
        cell: (row) => (
          <>
            <span
              onClick={() => {
                setModalShowEdit(true);
                setItemType(row);
              }}
            >
              <i className="fa fa-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setItemType(row);
              }}
            >
              <i className="fa fa-times" />
            </span>
          </>
        ),
        button: true,
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

    const filteredItems = data.item_types?.filter(
      (item) =>
        item.type_name |
        item.type_name.toLowerCase().includes(filterText.toLowerCase()) |
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
                <h2>Item Types</h2>
                <h6>รายการประเภทของครุภัณฑ์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button variant="info" onClick={() => setModalShowAdd(true)}>
                  Add
                </Button>
                {selectedRows.length > 0 ? (
                  <>
                    &emsp;
                    <Button
                      onClick={() => {
                        setModalShowDel(true);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
                &emsp;
                <Button
                  onClick={() => setModalShowImport(true)}
                  variant="warning"
                  type="submit"
                >
                  Import Item Types
                </Button>
                &emsp;
                {data.countItemTypes === 0 ? null : (
                  <>
                    <Button onClick={exportItemTypes} variant="warning">
                      Export Item Types
                    </Button>
                  </>
                )}
              </div>
            }
            body={itemTypeTable(data)}
            loading={isLoading ? "overlay" : ""}
          />
          <FormModal
            show={modalShowAdd}
            onHide={() => {
              setModalShowAdd(false);
              setItemType(initialState);
            }}
            title="Add Item Type"
            method="POST"
            close="Close"
            onSubmit={addHandleSubmit}
            body={
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Item Type Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="type_name"
                    onChange={(event) =>
                      setItemType({
                        ...itemType,
                        type_name: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            button="Add"
          />
          <FormModal
            show={modalShowDel}
            onHide={() => {
              setModalShowDel(false);
              setItemType(initialState);
            }}
            title="Do you confirm to delete?"
            body={
              selectedRows.length > 0 ? (
                <div className="form-group col-form-label">
                  {selectedRows.map((item_type) => (
                    <p key={item_type.type_id}>
                      {item_type.type_id} - {item_type.type_name}
                    </p>
                  ))}
                  <p className="text-danger">
                    *** All items and problem descriptions that relate{" "}
                    {selectedRows.map(({ type_name }) => type_name).join(", ")}{" "}
                    will be delete too ***
                  </p>
                </div>
              ) : (
                <div className="form-group col-form-label">
                  <p>"{itemType.type_name}"</p>
                  <p className="text-danger">
                    *** All items and problem descriptions that relate{" "}
                    {itemType.type_name} will be delete too ***
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
              setItemType(initialState);
            }}
            title="Edit Item Type"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">
                    Item Type Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="type_name"
                      defaultValue={itemType.type_name}
                      onChange={(event) =>
                        setItemType({
                          ...itemType,
                          type_name: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">Created At:</label>
                  <div className="col-sm-7 col-form-label">
                    {moment(itemType.created_at).format("D/MM/YYYY - HH:mm:ss")}
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
            title="Import data of Item Types"
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
                    'Item_Types' sheetname <br /> - Import file must has all
                    columns as insecto_data_format
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
