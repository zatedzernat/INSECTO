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
import Cookies from "js-cookie";

export default function Brands(props) {
  const [data, setData] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowDel, setModalShowDel] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowImport, setModalShowImport] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const initialState = {
    brand_id: 0,
    brand_name: "",
  };
  const [brand, setBrand] = useState(initialState);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const token = Cookies.get("token");
  const { user } = props;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}brands`,
        method: "GET",
        headers: { Authorization: token, User_Id: user.id },
      });
      setData(res.data);
      setIsLoading(false);
      setIsExport(false);
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
    setModalShowAdd(false);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}brands`,
        method: "POST",
        headers: { Authorization: token, User_Id: user.id },
        data: brand,
      });
      setBrand(initialState);
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
          title: error.response.data.errors.brand_name,
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
        url: `${process.env.REACT_APP_API_URL}brands/${brand.brand_id}`,
        method: "DELETE",
        headers: { Authorization: token, User_Id: user.id },
        data: brand.brand_id,
      });
      setBrand(initialState);
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
      console.log(JSON.stringify(error));
    }
  };

  const deleteSelectedHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    let brands = {
      brands: selectedRows.map(({ brand_id }) => brand_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}brands/selected`,
        method: "POST",
        headers: { Authorization: token, User_Id: user.id },
        data: brands,
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
        url: `${process.env.REACT_APP_API_URL}brands/${brand.brand_id}`,
        method: "PUT",
        headers: { Authorization: token, User_Id: user.id },
        data: brand,
      });
      setBrand(initialState);
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
          title: error.response.data.errors.brand_name,
        });
      } else {
        console.log(error);
      }
    }
  };

  const importHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowImport(false);
    try {
      const formData = new FormData();
      formData.append("import_file", file);

      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}brands/import`,
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

  const exportBrands = async (event) => {
    setIsExport(true);
    event.preventDefault();
    let brands = {
      brands: selectedRows.map(({ brand_id }) => brand_id),
    };
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}brands/export`,
        data: brands,
        method: "POST",
        responseType: "blob",
        headers: {
          Authorization: token,
          user_id: user.id,
        },
      });
      // ref = https://stackoverflow.com/questions/58131035/download-file-from-the-server-laravel-and-reactjs
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Brands.xlsx"); //or any other extension
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
    let selected = state.selectedRows.map(({ brand_id, brand_name }) => ({
      brand_id,
      brand_name,
    }));
    let sort = selected.sort((a, b) => a.brand_id - b.brand_id);
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

  const brandTable = (data) => {
    const columns = [
      {
        name: "#",
        sortable: true,
        selector: "brand_id",
      },
      {
        name: "Brand Name*",
        selector: "brand_name",
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
                setBrand(row);
              }}
            >
              <i className="ion-edit" />
            </span>
            &emsp;
            <span
              onClick={() => {
                setModalShowDel(true);
                setBrand(row);
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

    const filteredItems = data.brands?.filter(
      (item) =>
        item.brand_name |
        item.brand_name.toLowerCase().includes(filterText.toLowerCase()) |
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
                <h2>Brands</h2>
                <h6>รายการการแบรนด์ทั้งหมด</h6>
              </div>
            }
            badge={
              <div>
                <Button
                  variant="default"
                  style={{ color: "white", backgroundColor: "#1BC5BD" }}
                  onClick={() => setModalShowAdd(true)}
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
                  </>
                ) : (
                  <Button
                    variant="default"
                    style={{ color: "white", backgroundColor: "#F64E60" }}
                    disabled
                  >
                    Delete
                  </Button>
                )}
                &emsp;
                <Button
                  onClick={() => setModalShowImport(true)}
                  type="submit"
                  variant="default"
                  style={{ color: "white", backgroundColor: "#6993FF" }}
                >
                  Import Brands
                </Button>
                &emsp;
                {selectedRows.length > 0 ? (
                  <>
                    {isExport === false ? (
                      <Button
                        onClick={exportBrands}
                        variant="default"
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        Export Brands
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        style={{ color: "white", backgroundColor: "#6993FF" }}
                      >
                        <i className="fas fa-1x fa-sync-alt fa-spin" />
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="default"
                    style={{ color: "white", backgroundColor: "#6993FF" }}
                    disabled
                  >
                    Export Brands
                  </Button>
                )}
              </div>
            }
            body={brandTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShowAdd}
            onHide={() => {
              setModalShowAdd(false);
              setBrand(initialState);
            }}
            title="Add Brand"
            body={
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                  Brand Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="brand_name"
                    onChange={(event) =>
                      setBrand({ ...brand, brand_name: event.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
              </div>
            }
            method="POST"
            onSubmit={addHandleSubmit}
            button="Add"
            close="Close"
          />

          <FormModal
            show={modalShowDel}
            onHide={() => {
              setModalShowDel(false);
              setBrand(initialState);
            }}
            title="Are you sure that you want to delete?"
            body={
              selectedRows.length > 0 ? (
                <div className="form-group col-form-label">
                  {selectedRows.map((brand) => (
                    <p key={brand.brand_id}>
                      {brand.brand_id} - {brand.brand_name}
                    </p>
                  ))}
                  <p className="text-danger">
                    *** All items which are{" "}
                    {selectedRows
                      .map(({ brand_name }) => brand_name)
                      .join(", ")}{" "}
                    be set to null ***
                  </p>
                </div>
              ) : (
                <div className="form-group col-form-label">
                  <p>"{brand.brand_name}"</p>
                  <p className="text-danger">
                    *** All items which are {brand.brand_name} be set to null
                    ***
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
              setBrand(initialState);
            }}
            title="Edit Brand"
            body={
              <>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Brand Name: <span style={styles.container}>*</span>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="brand_name"
                      value={brand.brand_name}
                      onChange={(event) =>
                        setBrand({
                          ...brand,
                          brand_name: event.target.value,
                        })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Created At:</label>
                  <div className="col-sm-8 col-form-label">
                    {moment(brand.created_at).format("D/MM/YYYY - HH:mm:ss")}
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
            title="Import data of Brands"
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
                    'Brands' sheetname <br /> - Import file must has all columns
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
