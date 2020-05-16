import React, { useState, useEffect } from "react";
import Content from "../components/Content";
import Card from "../components/Card";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import FormModal from "../components/FormModal";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function Brands() {
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
  const [brand, setBrand] = useState({
    brand_id: 0,
    brand_name: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}brands`);
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
    setModalShowAdd(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}brands`,
        brand
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
          message: error.response.data.errors.brand_name,
        });
      }
    }
  };

  const deleteHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowDel(false);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}brands/${brand.brand_id}`,
        brand.brand_id
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
      console.log(JSON.stringify(error));
    }
  };

  const editHandleSubmit = async (event) => {
    event.preventDefault();
    setModalShowEdit(false);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}brands/${brand.brand_id}`,
        brand
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
          message: error.response.data.errors.brand_name,
        });
      }
    }
  };

  const styles = {
    container: { color: "red" },
  };

  const brandTable = (data) => {
    const columns = [
      {
        name: "#",
        selector: "brand_id",
        sortable: true,
      },
      {
        name: "Brand Name*",
        selector: "brand_name",
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
        format: (r) => moment(r.created_at).format("D/M/YYYY - HH:mm:ss"),
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
              <i className="fa fa-edit" />
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
    return (
      <DataTable
        columns={columns}
        data={data.brands}
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
                <h2>Brands</h2>
                <h6>รายการการแบรนด์ทั้งหมด</h6>
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
            body={brandTable(data)}
            loading={isLoading ? "overlay" : ""}
          />

          <FormModal
            show={modalShowAdd}
            onHide={() => setModalShowAdd(false)}
            title="Add Brand"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Brand Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="brand_name"
                    onChange={(event) =>
                      setBrand({ brand_name: event.target.value })
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
            onHide={() => setModalShowDel(false)}
            title="Are you sure that you want to delete?"
            body={
              <div className="form-group col-form-label">
                <p>"{brand.brand_name}"</p>
                <p className="text-danger">
                  *** All items which are {brand.brand_name} be set to null ***
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
            title="Edit Brand"
            body={
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Brand Name: <span style={styles.container}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="brand_name"
                    value={brand.brand_name}
                    onChange={(event) =>
                      setBrand({
                        brand_id: brand.brand_id,
                        brand_name: event.target.value,
                      })
                    }
                    required
                    autoFocus
                  />
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
